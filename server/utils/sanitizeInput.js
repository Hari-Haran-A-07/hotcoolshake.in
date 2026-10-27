/**
 * Input Sanitization Utility to prevent Cross-Site Scripting (XSS)
 * and strip malicious control sequences from user inputs
 */

/**
 * Escape HTML special characters
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Deeply sanitize an object's string properties
 * @template T
 * @param {T} data
 * @returns {T}
 */
export function sanitizePayload(data) {
  if (data === null || data === undefined) return data;

  if (typeof data === 'string') {
    return escapeHtml(data.trim());
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizePayload(item));
  }

  if (typeof data === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizePayload(value);
    }
    return sanitized;
  }

  return data;
}
