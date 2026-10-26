/**
 * HOT COOL SHAKE Barista Tip & Appreciation Engine
 */

export const TIP_PRESETS = [
  { label: '10%', rate: 0.10, description: 'Nice appreciation' },
  { label: '15%', rate: 0.15, description: 'Great extraction!' },
  { label: '20%', rate: 0.20, description: 'Master Barista Love' },
];

/**
 * Calculates tip based on preset percentage, custom amount, or round-up.
 */
export function calculateTip({ subtotal = 0, type = 'percentage', value = 0.15 }) {
  const cleanSubtotal = Math.max(0, parseFloat(subtotal) || 0);

  if (type === 'percentage') {
    const rate = parseFloat(value) || 0;
    const amount = Math.round(cleanSubtotal * rate * 100) / 100;
    return {
      tipType: 'percentage',
      rate,
      amount,
      totalWithTip: Math.round((cleanSubtotal + amount) * 100) / 100,
    };
  }

  if (type === 'round_up') {
    const nextDollar = Math.ceil(cleanSubtotal);
    const amount = Math.round((nextDollar - cleanSubtotal) * 100) / 100;
    return {
      tipType: 'round_up',
      amount: amount === 0 ? 1.00 : amount,
      totalWithTip: amount === 0 ? cleanSubtotal + 1.00 : nextDollar,
    };
  }

  // Custom fixed tip
  const customAmount = Math.max(0, Math.round(parseFloat(value) * 100) / 100);
  return {
    tipType: 'custom',
    amount: customAmount,
    totalWithTip: Math.round((cleanSubtotal + customAmount) * 100) / 100,
  };
}
