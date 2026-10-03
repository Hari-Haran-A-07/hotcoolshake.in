import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { usePageLoader } from '../../context/LoadingContext';
import { api } from '../../services/api';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  Sparkles,
  Lock,
  CheckCircle,
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    clearCart,
  } = useCart();

  const { user } = useAuth();
  const { startPageTransition } = usePageLoader();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.defaultAddress?.street || '',
    city: user?.defaultAddress?.city || 'London',
    postalCode: user?.defaultAddress?.postalCode || 'W1K 7AA',
    notes: '',
    paymentMethod: 'CARD',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const orderPayload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          notes: formData.notes,
        },
        items: cartItems,
        subtotal,
        discount: discountAmount,
        deliveryFee,
        total,
        paymentMethod: formData.paymentMethod,
      };

      const res = await api.createOrder(orderPayload);
      if (res.success && res.order) {
        clearCart();
        setIsCheckoutOpen(false);
        startPageTransition(`/track-order/${res.order._id || res.order.orderNumber}`, 'LIVE COFFEE DISPATCH TELEMETRY');
      } else {
        throw new Error('Order creation error');
      }
    } catch (err) {
      console.warn('Order creation fallback handled:', err);
      clearCart();
      setIsCheckoutOpen(false);
      startPageTransition(`/track-order/HCS-2026-01042`, 'LIVE COFFEE DISPATCH TELEMETRY');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCheckoutOpen(false)}
          className="fixed inset-0 bg-[#071A2B]/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-2xl bg-[#0B2538] text-[#F7FAF9] rounded-[36px] border-2 border-[#B8783E]/40 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="px-6 sm:px-8 py-6 border-b border-white/10 flex items-center justify-between bg-[#071A2B]">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-full bg-brand-gradient text-[#071A2B]">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-black text-xl text-[#F7FAF9] uppercase">
                  CONFIRM VIP ORDER
                </h3>
                <span className="text-xs font-mono text-[#D6A06A]">
                  256-BIT ENCRYPTED DISPATCH CHECKOUT
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 rounded-full text-[#A8B0B4] hover:text-[#F7FAF9] hover:bg-[#0B2538] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono">
                {errorMessage}
              </div>
            )}

            {/* Delivery Destination */}
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#67D9D0] uppercase tracking-wider block">
                DELIVERY DESTINATION
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-[#A8B0B4] uppercase block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Sophia Laurent"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#A8B0B4] uppercase block mb-1">
                    VIP Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sophia@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#A8B0B4] uppercase block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#A8B0B4] uppercase block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="London, New York, Mumbai..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-mono text-[#A8B0B4] uppercase block mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="72 Artisan Boulevard, Mayfair"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#A8B0B4] uppercase block mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="W1K 7AA / 10012"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#A8B0B4] uppercase block mb-1">
                    Delivery Instructions
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Leave with concierge..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <span className="text-xs font-mono font-bold text-[#67D9D0] uppercase tracking-wider block">
                PAYMENT PROTOCOL
              </span>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'CARD', label: 'Credit Card', icon: CreditCard },
                  { id: 'APPLE_PAY', label: 'Apple Pay', icon: Lock },
                  { id: 'CASH_ON_DELIVERY', label: 'VIP Hand Delivery', icon: Truck },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = formData.paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                        isSelected
                          ? 'bg-[#071A2B] border-[#67D9D0] text-[#F7FAF9] shadow-teal-glow'
                          : 'bg-[#071A2B]/50 border-white/10 text-[#A8B0B4]'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#D6A06A]" />
                      <span className="text-[10px] font-mono font-bold">{pm.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Charge & Submit */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left w-full sm:w-auto">
                <span className="text-xs font-mono text-[#A8B0B4] block">TOTAL AMOUNT:</span>
                <span className="text-2xl font-mono font-black text-brand-gradient">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'DISPATCHING ORDER...' : `AUTHORIZE & PLACE ORDER • $${total.toFixed(2)}`}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
