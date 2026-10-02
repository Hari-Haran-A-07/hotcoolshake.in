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
            <div className="px-6 py-5 border-b border-[#EEDCC6]/15 flex items-center justify-between bg-[#3C2A21]/50">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-full bg-[#EEDCC6] text-[#2A1B16]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#F4E8D1] tracking-tight">
                    YOUR CURATED BAG
                  </h3>
                  <span className="text-[11px] font-mono text-[#EEDCC6]/70">
                    {cartItems.length} {cartItems.length === 1 ? 'CREATION' : 'CREATIONS'} SELECTED
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-[#EEDCC6]/80 hover:text-[#F4E8D1] hover:bg-[#3C2A21] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="p-4 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20 text-[#EEDCC6]">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[#F4E8D1]">
                      Your Bag is Empty
                    </h4>
                    <p className="text-xs font-sans text-[#EEDCC6]/70 max-w-xs mt-1">
                      Explore our international menu or step into the Virtual Coffee Lab to craft your custom beverage.
                    </p>
                  </div>
                  <div className="flex flex-col w-full space-y-2 pt-2">
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        startPageTransition('/make-your-coffee', 'VIRTUAL COFFEE LAB');
                      }}
                      className="w-full py-3 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-bold tracking-wider uppercase shadow-coffee-glow hover:bg-[#F4E8D1] transition-all"
                    >
                      CRAFT CUSTOM COFFEE
                    </button>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        startPageTransition('/menu', 'INTERNATIONAL MENU');
                      }}
                      className="w-full py-3 rounded-full bg-[#3C2A21] text-[#F4E8D1] font-mono text-xs font-bold tracking-wider uppercase border border-[#EEDCC6]/20 hover:bg-[#3C2A21]/80 transition-all"
                    >
                      BROWSE MENU
                    </button>
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.cartKey}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3.5 rounded-2xl bg-[#3C2A21]/60 border border-[#EEDCC6]/15 hover:border-[#EEDCC6]/30 transition-all"
                  >
                    <div className="flex space-x-3">
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#2A1B16] flex-shrink-0 border border-[#EEDCC6]/20">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-display font-bold text-sm text-[#F4E8D1] truncate pr-2">
                            {item.name}
                          </h4>
                          <span className="font-mono font-bold text-sm text-[#EEDCC6]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Temperature & Custom Details Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          <span
                            className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                              item.temperature === 'HOT'
                                ? 'bg-amber-900/40 text-[#EEDCC6] border border-[#EEDCC6]/30'
                                : 'bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30'
                            }`}
                          >
                            {item.temperature === 'HOT' ? (
                              <Flame className="w-2.5 h-2.5 text-[#EEDCC6]" />
                            ) : (
                              <Snowflake className="w-2.5 h-2.5 text-[#EEDCC6]" />
                            )}
                            <span>{item.temperature}</span>
                          </span>

                          {item.customDetails?.bottle && (
                            <span className="text-[10px] font-mono text-[#EEDCC6]/80 bg-[#2A1B16]/80 px-2 py-0.5 rounded-full">
                              {item.customDetails.bottle}
                            </span>
                          )}
                        </div>

                        {/* Flavors list if custom */}
                        {item.customDetails?.flavors && item.customDetails.flavors.length > 0 && (
                          <p className="text-[10px] font-mono text-[#EEDCC6]/60 mt-1 truncate">
                            Flavors: {item.customDetails.flavors.join(', ')}
                          </p>
                        )}

                        {/* Quantity Controls & Delete */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2 bg-[#2A1B16] px-2 py-1 rounded-full border border-[#EEDCC6]/20">
                            <button
                              onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                              className="text-[#EEDCC6] hover:text-[#F4E8D1] p-0.5"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold px-1.5 text-[#F4E8D1]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                              className="text-[#EEDCC6] hover:text-[#F4E8D1] p-0.5"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.cartKey)}
                            className="text-[#EEDCC6]/50 hover:text-red-400 p-1.5 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout CTA */}
            {cartItems.length > 0 && (
              <div className="px-6 py-5 border-t border-[#EEDCC6]/15 bg-[#3C2A21]/80 space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. HOTCOOL10)"
                      className="w-full px-3.5 py-2 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] placeholder-[#EEDCC6]/40 focus:outline-none focus:border-[#EEDCC6]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-[#3C2A21] hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-wider uppercase transition-all"
                  >
                    APPLY
                  </button>
                </form>

                {promoMessage && (
                  <p className="text-[11px] font-mono text-[#EEDCC6] flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-[#EEDCC6]" />
                    <span>{promoMessage}</span>
                  </p>
                )}

                {/* Pricing Breakdown */}
                <div className="space-y-1.5 text-xs font-mono text-[#EEDCC6]/80 pt-2 border-t border-[#EEDCC6]/10">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#F4E8D1]">${subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#EEDCC6]">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Climate-Locked Courier Delivery</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between text-base font-display font-bold text-[#F4E8D1] pt-2 border-t border-[#EEDCC6]/15">
                    <span>TOTAL</span>
                    <span className="text-[#EEDCC6] font-mono">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#EEDCC6] to-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  <span>PROCEED TO SECURE CHECKOUT</span>
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
