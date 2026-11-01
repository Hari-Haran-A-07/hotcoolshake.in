import crypto from 'crypto';

/**
 * Gift Card Engine for HOT COOL SHAKE Digital Vouchers
 * Includes secure checksum generation, validation, and balance redemption.
 */

export const GIFT_CARD_TIERS = {
  BRONZE: { code: 'BRONZE', valueINR: 500, label: 'Artisan Bronze Card' },
  SILVER: { code: 'SILVER', valueINR: 1000, label: 'Connoisseur Silver Card' },
  GOLD: { code: 'GOLD', valueINR: 2500, label: 'Master Sommelier Gold Card' },
  PLATINUM: { code: 'PLATINUM', valueINR: 5000, label: 'Laboratory Platinum Card' },
  DIAMOND: { code: 'DIAMOND', valueINR: 10000, label: 'Cryogenic Diamond Card' }
};

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Base-32 excluding ambiguous chars (0, O, 1, I)

/**
 * Calculates a check-digit character for an alphanumeric token
 * @param {string} payload
 * @returns {string} Single character checksum
 */
export function calculateChecksum(payload) {
  let sum = 0;
  for (let i = 0; i < payload.length; i++) {
    const code = payload.charCodeAt(i);
    sum = (sum * 31 + code) % CHARSET.length;
  }
  return CHARSET[sum];
}

/**
 * Generates a branded, checksummed gift card code (e.g. HCS-7K9A-M42B-X)
 * @param {string} [prefix='HCS']
 * @returns {string} Formatted gift card code
 */
export function generateGiftCardCode(prefix = 'HCS') {
  const randomBytes = crypto.randomBytes(8);
  let payload = '';

  for (let i = 0; i < 8; i++) {
    payload += CHARSET[randomBytes[i] % CHARSET.length];
  }

  const part1 = payload.substring(0, 4);
  const part2 = payload.substring(4, 8);
  const rawToken = `${prefix}-${part1}-${part2}`;
  const checksumChar = calculateChecksum(rawToken.replace(/-/g, ''));

  return `${rawToken}-${checksumChar}`;
}

/**
 * Verifies if a given gift card code satisfies format and checksum validity
 * @param {string} code - Gift card code to verify
 * @returns {{ isValid: boolean, reason?: string }}
 */
export function verifyGiftCardChecksum(code) {
  if (typeof code !== 'string') {
    return { isValid: false, reason: 'Gift card code must be a string' };
  }

  const normalized = code.trim().toUpperCase();
  const segments = normalized.split('-');

  if (segments.length !== 4) {
    return { isValid: false, reason: 'Invalid gift card format. Expected 4 segments (e.g. HCS-XXXX-XXXX-X)' };
  }

  const [prefix, part1, part2, checkChar] = segments;

  if (prefix.length < 2 || part1.length !== 4 || part2.length !== 4 || checkChar.length !== 1) {
    return { isValid: false, reason: 'Invalid segment lengths in gift card code' };
  }

  const rawToken = `${prefix}${part1}${part2}`;
  const expectedCheckChar = calculateChecksum(rawToken);

  if (checkChar !== expectedCheckChar) {
    return { isValid: false, reason: 'Gift card checksum validation failed. Code is invalid or mistyped.' };
  }

  return { isValid: true };
}

/**
 * Applies a purchase charge against an existing gift card balance
 * @param {number} currentBalance - Card current balance in INR
 * @param {number} purchaseAmount - Total order amount to deduct
 * @returns {{
 *   deductedAmount: number,
 *   remainingBalance: number,
 *   outOfPocketDue: number,
 *   fullyCovered: boolean
 * }}
 */
export function redeemGiftCardBalance(currentBalance, purchaseAmount) {
  if (typeof currentBalance !== 'number' || currentBalance < 0) {
    throw new Error('Current balance must be a non-negative number');
  }
  if (typeof purchaseAmount !== 'number' || purchaseAmount < 0) {
    throw new Error('Purchase amount must be a non-negative number');
  }

  const deductedAmount = Math.min(currentBalance, purchaseAmount);
  const remainingBalance = Number((currentBalance - deductedAmount).toFixed(2));
  const outOfPocketDue = Number((purchaseAmount - deductedAmount).toFixed(2));
  const fullyCovered = outOfPocketDue === 0;

  return {
    deductedAmount,
    remainingBalance,
    outOfPocketDue,
    fullyCovered
  };
}
