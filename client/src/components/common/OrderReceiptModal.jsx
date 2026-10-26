import React from 'react';
import { X, Printer, CheckCircle, Coffee } from 'lucide-react';

export default function OrderReceiptModal({ isOpen, onClose, order = {} }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const items = order.items || [
    { name: 'Signature Thermal Vessel (500ml)', qty: 1, price: 9.50 },
    { name: 'Nitro Cold Brew Reserve', qty: 1, price: 6.50 },
  ];

  const subtotal = items.reduce((acc, i) => acc + (i.price * (i.qty || 1)), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-sm bg-[#F4E8D1] text-[#2A1B16] rounded-2xl p-6 shadow-2xl font-mono text-xs border border-[#EEDCC6]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Close receipt"
        >
          <X className="w-4 h-4 text-[#2A1B16]" />
        </button>

        {/* Receipt Header */}
        <div className="text-center pb-4 border-b border-dashed border-[#2A1B16]/30">
          <div className="flex justify-center mb-1">
            <Coffee className="w-6 h-6 text-[#2A1B16]" />
          </div>
          <h2 className="font-bold text-base tracking-widest uppercase">HOT COOL SHAKE</h2>
          <p className="text-[10px] text-[#2A1B16]/70">HOT. COOL. YOUR WAY.</p>
          <p className="text-[9px] text-[#2A1B16]/50 mt-1">Order #{order.orderId || 'HCS-78921'}</p>
          <p className="text-[9px] text-[#2A1B16]/50">{new Date().toLocaleString()}</p>
        </div>

        {/* Items */}
        <div className="py-4 space-y-2 border-b border-dashed border-[#2A1B16]/30">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div>
                <span className="font-semibold">{item.name}</span>
                <span className="text-[#2A1B16]/60 text-[10px] block">x{item.qty || 1}</span>
              </div>
              <span className="font-bold">${((item.price || 0) * (item.qty || 1)).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="py-3 space-y-1 border-b border-dashed border-[#2A1B16]/30">
          <div className="flex justify-between text-[#2A1B16]/70">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#2A1B16]/70">
            <span>Tax (5%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-sm pt-1 border-t border-[#2A1B16]/20">
            <span>TOTAL</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Barcode & Footer */}
        <div className="pt-4 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-700 font-bold mb-2">
            <CheckCircle className="w-3.5 h-3.5" /> Payment Verified
          </div>
          <div className="font-mono text-[9px] tracking-widest text-[#2A1B16]/40 uppercase">
            * * * THANK YOU FOR CRAFTING * * *
          </div>

          <button
            onClick={handlePrint}
            className="mt-4 w-full py-2 bg-[#2A1B16] text-[#F4E8D1] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#3C2A21] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Print Thermal Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
