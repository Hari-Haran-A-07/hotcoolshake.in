/**
 * Promo Code and Discount Calculation Engine
 * HOT COOL SHAKE International Coffee Experience
 */

export const ACTIVE_PROMO_CODES = {
  WELCOME10: {
    type: 'percentage',
    value: 10,
    minSpend: 15,
    maxDiscount: 10,
    description: '10% off for first time guests'
  },
  FIRSTBREW: {
    type: 'percentage',
    value: 20,
    minSpend: 25,
    maxDiscount: 15,
    description: '20% off your initial artisan order'
  },
  SHAKE5: {
    type: 'flat',
    value: 5,
    minSpend: 20,
    maxDiscount: 5,
    description: '$5 flat discount on signature shakes'
  },
  VIPCOFFEE: {
    type: 'percentage',
    value: 15,
    minSpend: 0,
    maxDiscount: 25,
    description: '15% VIP Club member discount'
  }
};

/**
 * Validate a promotional code and calculate applied discount
 * @param {string} code Promo code string
 * @param {number} subtotal Cart subtotal amount in dollars
 * @returns {{
 *   valid: boolean,
 *   code: string,
 *   discount: number,
 *   finalTotal: number,
 *   message: string
 * }}
 */
export function calculatePromoDiscount(code, subtotal) {
  const normCode = String(code || '').trim().toUpperCase();
  const safeSubtotal = Number(subtotal) || 0;

  if (!normCode) {
    return {
      valid: false,
      code: '',
      discount: 0,
      finalTotal: safeSubtotal,
      message: 'No promo code provided.'
    };
  }

  const promo = ACTIVE_PROMO_CODES[normCode];
  if (!promo) {
    return {
      valid: false,
      code: normCode,
      discount: 0,
      finalTotal: safeSubtotal,
      message: `Invalid or expired coupon code "${normCode}".`
    };
  }

  if (safeSubtotal < promo.minSpend) {
    return {
      valid: false,
      code: normCode,
      discount: 0,
      finalTotal: safeSubtotal,
      message: `Minimum order of $${promo.minSpend.toFixed(2)} required for code "${normCode}".`
    };
  }

  let calculatedDiscount = 0;
  if (promo.type === 'percentage') {
    calculatedDiscount = (safeSubtotal * promo.value) / 100;
  } else if (promo.type === 'flat') {
    calculatedDiscount = promo.value;
  }

  if (promo.maxDiscount && calculatedDiscount > promo.maxDiscount) {
    calculatedDiscount = promo.maxDiscount;
  }

  // Ensure discount does not exceed subtotal
  calculatedDiscount = Math.min(calculatedDiscount, safeSubtotal);
  const finalTotal = Math.max(0, safeSubtotal - calculatedDiscount);

  return {
    valid: true,
    code: normCode,
    discount: Number(calculatedDiscount.toFixed(2)),
    finalTotal: Number(finalTotal.toFixed(2)),
    message: `Promo code "${normCode}" applied successfully!`
  };
}
