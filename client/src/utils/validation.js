/**
 * Validation and Regex Helpers
 * HOT COOL SHAKE International Coffee Experience
 */

/**
 * Validate standard email address format
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email.trim().toLowerCase());
}

/**
 * Validate phone number (supports Indian 10-digit and international E.164 formats)
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const indianMobile = /^(?:\+91|91|0)?[6-9]\d{9}$/;
  const international = /^\+?[1-9]\d{7,14}$/;
  return indianMobile.test(cleaned) || international.test(cleaned);
}

/**
 * Calculate password security strength score (0 to 4)
 * @param {string} password
 * @returns {{ score: number, label: string, feedback: string[] }}
 */
export function checkPasswordStrength(password) {
  if (!password || typeof password !== 'string') {
    return { score: 0, label: 'Very Weak', feedback: ['Password cannot be empty'] };
  }

  let score = 0;
  const feedback = [];

  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Add an uppercase letter');

  if (/[0-9]/.test(password)) score++;
  else feedback.push('Add a numeric digit');

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push('Add a special character');

  const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Excellent'];
  return {
    score,
    label: labels[score] || 'Weak',
    feedback
  };
}

/**
 * Sanitize and normalize promotional coupon code
 * @param {string} code
 * @returns {string}
 */
export function normalizeCouponCode(code) {
  if (!code || typeof code !== 'string') return '';
  return code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
}
