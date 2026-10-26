/**
 * HOT COOL SHAKE Digital Invoice & Tax Receipt Generator
 */

export function generateInvoice({ orderId, customerName, items = [], tip = 0, currency = 'USD' }) {
  const invoiceNumber = `HCS-INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateIssued = new Date().toISOString();

  let subtotal = 0;
  const lineItems = items.map((item) => {
    const unitPrice = parseFloat(item.price || 0);
    const qty = parseInt(item.quantity || 1, 10);
    const itemTotal = unitPrice * qty;
    subtotal += itemTotal;

    return {
      name: item.name || item.customBlendTitle || 'Craft Beverage',
      category: item.category || 'Laboratory Blend',
      condition: item.condition || 'THERMAL',
      quantity: qty,
      unitPrice,
      total: itemTotal,
    };
  });

  const taxRate = 0.05; // 5% standard beverage tax
  const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
  const tipAmount = parseFloat(tip || 0);
  const grandTotal = Math.round((subtotal + taxAmount + tipAmount) * 100) / 100;

  return {
    invoiceNumber,
    orderId: orderId || `ORD-${Date.now()}`,
    dateIssued,
    customerName: customerName || 'Valued Guest',
    brand: 'HOT COOL SHAKE INC.',
    tagline: 'HOT. COOL. YOUR WAY.',
    lineItems,
    financials: {
      currency,
      subtotal: Math.round(subtotal * 100) / 100,
      taxRate: `${taxRate * 100}%`,
      taxAmount,
      tipAmount,
      grandTotal,
    },
    verificationHash: Buffer.from(`${invoiceNumber}:${grandTotal}:${dateIssued}`).toString('base64').slice(0, 16),
  };
}
