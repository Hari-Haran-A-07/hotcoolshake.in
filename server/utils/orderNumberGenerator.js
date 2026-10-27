import crypto from 'crypto';

/**
 * Unique and Formatted Order Identifier Generator
 * Generates human-friendly, collision-resistant tracking codes:
 * e.g., HCS-2026-X8K9 or HCS-EXPR-4921
 */

/**
 * Generate a unique formatted order number
 * @param {'STD'|'EXPR'|'CUST'} [prefix='STD'] Order tier prefix
 * @returns {string}
 */
export function generateOrderNumber(prefix = 'STD') {
  const year = new Date().getFullYear();
  const randomChars = crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, 4);
  const safePrefix = String(prefix).toUpperCase().slice(0, 4);
  return `HCS-${safePrefix}-${year}-${randomChars}`;
}

/**
 * Validate order number format
 * @param {string} orderNumber
 * @returns {boolean}
 */
export function isValidOrderNumber(orderNumber) {
  if (!orderNumber || typeof orderNumber !== 'string') return false;
  const regex = /^HCS-[A-Z]{3,4}-\d{4}-[A-Z0-9]{4}$/;
  return regex.test(orderNumber.trim());
}
