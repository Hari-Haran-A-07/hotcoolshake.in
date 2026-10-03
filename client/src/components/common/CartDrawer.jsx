import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { usePageLoader } from '../../context/LoadingContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  Check,
  Flame,
  Snowflake,
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    discountPercent,
    deliveryFee,
    total,
    promoCode,
    setPromoCode,
    promoMessage,
    applyPromoCode,
  } = useCart();

  const { startPageTransition } = usePageLoader();
  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-[#071A2B]/85 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#071A2B] text-[#F7FAF9] shadow-2xl flex flex-col border-l border-[#B8783E]/30"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0B2538]">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-full bg-brand-gradient text-[#071A2B]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-[#F7FAF9] tracking-tight uppercase">
                    YOUR CURATED BAG
                  </h3>
                  <span className="text-[11px] font-mono text-[#D6A06A]">
                    {cartItems.length} {cartItems.length === 1 ? 'CREATION' : 'CREATIONS'} SELECTED
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-[#A8B0B4] hover:text-[#F7FAF9] hover:bg-[#071A2B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="p-4 rounded-full bg-[#0B2538] border border-[#B8783E]/20 text-[#A8B0B4]">
                    <ShoppingBag className="w-8 h-8 text-[#67D9D0]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-lg text-[#F7FAF9]">
                      YOUR BAG IS EMPTY
                    </h4>
                    <p className="text-xs text-[#A8B0B4] max-w-xs">
                      Explore our international menu or formulate your personalized bespoke coffee.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      startPageTransition('/make-your-coffee', 'VIRTUAL COFFEE LAB');
                    }}
                    className="px-6 py-3 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all"
                  >
                    MAKE YOUR COFFEE
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-4 rounded-2xl bg-[#0B2538] border border-[#B8783E]/20 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#071A2B] border border-white/10 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="space-y-0.5">
                          <h4 className="font-display font-bold text-sm text-[#F7FAF9] leading-snug">
                            {item.name}
                          </h4>
                          <div className="text-xs font-mono font-bold text-[#67D9D0]">
                            ${item.price?.toFixed(2)}
                          </div>
                          {item.customDetails?.condition && (
                            <span className="text-[10px] font-mono text-[#D6A06A] block">
                              {item.customDetails.condition}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-lg text-[#A8B0B4] hover:text-red-400 hover:bg-[#071A2B] transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                      <div className="flex items-center space-x-2 bg-[#071A2B] p-1 rounded-xl border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-lg hover:bg-[#0B2538] text-[#A8B0B4] hover:text-[#F7FAF9]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-lg hover:bg-[#0B2538] text-[#A8B0B4] hover:text-[#F7FAF9]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-[#F7FAF9]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0B2538] space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex space-x-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo Code (e.g. VIP20)"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] placeholder-[#A8B0B4]/60 uppercase font-mono focus:outline-none focus:border-[#67D9D0]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#071A2B] hover:bg-[#071A2B]/80 text-[#67D9D0] border border-[#67D9D0]/30 text-xs font-mono font-bold uppercase transition-all"
                  >
                    APPLY
                  </button>
                </form>

                {promoMessage && (
                  <p className="text-[11px] font-mono text-[#67D9D0]">
                    {promoMessage}
                  </p>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs font-mono text-[#A8B0B4]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-[#F7FAF9]">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#67D9D0]">
                      <span>VIP Discount ({discountPercent}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Climate-Locked Dispatch:</span>
                    <span className="text-[#F7FAF9]">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#F7FAF9] pt-2 border-t border-white/10">
                    <span>TOTAL CHARGE:</span>
                    <span className="text-base text-brand-gradient">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                >
                  <span>PROCEED TO CHECKOUT • ${total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
