/**
 * Printable and Plaintext Order Receipt Generator
 * HOT COOL SHAKE International Coffee Experience
 */

/**
 * Format order details into a clean ASCII receipt slip
 * @param {object} order
 * @returns {string}
 */
export function generateTextReceipt(order) {
  const line = '------------------------------------------';
  const doubleLine = '==========================================';
  const pad = (str, len, align = 'left') => {
    const s = String(str || '');
    if (align === 'right') return s.padStart(len, ' ');
    return s.padEnd(len, ' ');
  };

  const orderId = order.orderNumber || order._id || 'ORD-UNKNOWN';
  const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleString() : new Date().toLocaleString();
  const customerName = order.customerName || (order.user && order.user.name) || 'Valued Guest';

  const rows = [];
  rows.push(doubleLine);
  rows.push('          HOT COOL SHAKE STUDIO          ');
  rows.push('       Artisan Beverages & Coffee        ');
  rows.push(doubleLine);
  rows.push(`Order ID: ${orderId}`);
  rows.push(`Date:     ${dateStr}`);
  rows.push(`Guest:    ${customerName}`);
  rows.push(line);
  rows.push(`${pad('Item', 24)} ${pad('Qty', 5, 'right')} ${pad('Total', 11, 'right')}`);
  rows.push(line);

  const items = Array.isArray(order.items) ? order.items : [];
  items.forEach((item) => {
    const name = (item.name || item.title || 'Coffee Item').slice(0, 23);
    const qty = item.quantity || 1;
    const price = Number((item.price || 0) * qty).toFixed(2);
    rows.push(`${pad(name, 24)} ${pad(qty, 5, 'right')} ${pad(`$${price}`, 11, 'right')}`);
  });

  rows.push(line);
  const subtotal = Number(order.subtotal || order.totalAmount || 0).toFixed(2);
  const discount = Number(order.discount || 0).toFixed(2);
  const total = Number(order.totalAmount || order.subtotal || 0).toFixed(2);

  rows.push(`${pad('Subtotal:', 30)} ${pad(`$${subtotal}`, 11, 'right')}`);
  if (Number(discount) > 0) {
    rows.push(`${pad('Promo Discount:', 30)} ${pad(`-$${discount}`, 11, 'right')}`);
  }
  rows.push(doubleLine);
  rows.push(`${pad('GRAND TOTAL:', 30)} ${pad(`$${total}`, 11, 'right')}`);
  rows.push(doubleLine);
  rows.push('       Thank you for brewing with us!     ');
  rows.push('          www.hotcoolshake.in            ');
  rows.push(doubleLine);

  return rows.join('\n');
}
