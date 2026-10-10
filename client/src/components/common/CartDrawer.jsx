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
            className="fixed inset-0 z-50 bg-[#2A1B16]/80 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#2A1B16] text-[#F4E8D1] shadow-2xl flex flex-col border-l border-[#EEDCC6]/20"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#EEDCC6]/20 flex items-center justify-between bg-[#3C2A21]">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-full bg-[#EEDCC6] text-[#2A1B16]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-[#F4E8D1] tracking-tight uppercase">
                    YOUR CURATED BAG
                  </h3>
                  <span className="text-[11px] font-mono text-[#EEDCC6]">
                    {cartItems.length} {cartItems.length === 1 ? 'CREATION' : 'CREATIONS'} SELECTED
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-[#EEDCC6]/70 hover:text-[#F4E8D1] hover:bg-[#2A1B16] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="p-4 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20 text-[#EEDCC6]">
                    <ShoppingBag className="w-8 h-8 text-[#EEDCC6]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-lg text-[#F4E8D1]">
                      YOUR BAG IS EMPTY
                    </h4>
                    <p className="text-xs text-[#EEDCC6]/70 max-w-xs">
                      Explore our international menu or formulate your personalized bespoke coffee.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      startPageTransition('/make-your-coffee', 'COFFEE LAB');
                    }}
                    className="px-6 py-3 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-md hover:bg-[#F4E8D1] transition-all"
                  >
                    MAKE YOUR COFFEE
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-4 rounded-2xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#2A1B16] border border-[#EEDCC6]/20 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="space-y-0.5">
                          <h4 className="font-display font-bold text-sm text-[#F4E8D1] leading-snug">
                            {item.name}
                          </h4>
                          <div className="text-xs font-mono font-bold text-[#EEDCC6]">
                            ${item.price?.toFixed(2)}
                          </div>
                          {item.customDetails?.temperature && (
                            <span className="text-[10px] font-mono text-[#EEDCC6]/80 block">
                              {item.customDetails.temperature}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-lg text-[#EEDCC6]/60 hover:text-red-400 hover:bg-[#2A1B16] transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#EEDCC6]/10 text-xs font-mono">
                      <div className="flex items-center space-x-2 bg-[#2A1B16] p-1 rounded-xl border border-[#EEDCC6]/20">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-lg hover:bg-[#3C2A21] text-[#EEDCC6] hover:text-[#F4E8D1]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-lg hover:bg-[#3C2A21] text-[#EEDCC6] hover:text-[#F4E8D1]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-[#F4E8D1]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-[#EEDCC6]/20 bg-[#3C2A21] space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex space-x-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo Code (e.g. VIP20)"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] placeholder-[#EEDCC6]/40 uppercase font-mono focus:outline-none focus:border-[#EEDCC6]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#2A1B16] hover:bg-[#EEDCC6] text-[#EEDCC6] hover:text-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono font-bold uppercase transition-all"
                  >
                    APPLY
                  </button>
                </form>

                {promoMessage && (
                  <p className="text-[11px] font-mono text-[#EEDCC6]">
                    {promoMessage}
                  </p>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs font-mono text-[#EEDCC6]/70">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-[#F4E8D1]">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#EEDCC6]">
                      <span>VIP Discount ({discountPercent}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Climate-Locked Dispatch:</span>
                    <span className="text-[#F4E8D1]">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#F4E8D1] pt-2 border-t border-[#EEDCC6]/20">
                    <span>TOTAL CHARGE:</span>
                    <span className="text-base text-[#EEDCC6]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-4 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-xl hover:bg-[#F4E8D1] transition-all flex items-center justify-center space-x-2"
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
