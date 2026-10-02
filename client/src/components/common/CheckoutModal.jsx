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
        // Start cinematic page transition to order tracking
        startPageTransition(`/track-order/${res.order._id}`, 'LIVE COFFEE DISPATCH TELEMETRY');
      }
    } catch (err) {
      console.error('Order creation error:', err);
      setErrorMessage(err.message || 'Failed to confirm order. Please verify your details.');
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
          className="fixed inset-0 bg-[#2A1B16]/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#2A1B16] text-[#F4E8D1] rounded-[32px] overflow-hidden border border-[#EEDCC6]/20 shadow-2xl z-10 my-8"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#EEDCC6]/15 flex items-center justify-between bg-[#3C2A21]">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-full bg-[#EEDCC6] text-[#2A1B16]">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#F4E8D1]">
                  HOT COOL SHAKE DISPATCH LAB
                </h3>
                <span className="text-[11px] font-mono text-[#EEDCC6]/70">
                  CLIMATE-CALIBRATED DIRECT DELIVERY
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 rounded-full text-[#EEDCC6]/70 hover:text-[#F4E8D1] hover:bg-[#2A1B16] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-900/40 border border-red-500/40 text-red-200 text-xs font-mono">
                {errorMessage}
              </div>
            )}

            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>1. DESTINATION & CONTACT TELEMETRY</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6]/80 uppercase block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sophia Laurent"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/25 text-xs font-sans text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6]/80 uppercase block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sophia@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/25 text-xs font-sans text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6]/80 uppercase block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/25 text-xs font-sans text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6]/80 uppercase block mb-1">
                    City / Flagship Hub *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="London, New York, Mumbai..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/25 text-xs font-sans text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-mono text-[#EEDCC6]/80 uppercase block mb-1">
                    Delivery Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="450 Innovation Way, Suite 100"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/25 text-xs font-sans text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6]/80 uppercase block mb-1">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="10012"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/25 text-xs font-sans text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6]/80 uppercase block mb-1">
                    Concierge Notes
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Leave in thermal box"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/25 text-xs font-sans text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>2. PAYMENT PROTOCOL</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'CARD', label: 'Credit Card' },
                  { id: 'APPLE_PAY', label: 'Apple Pay' },
                  { id: 'GOOGLE_PAY', label: 'Google Pay' },
                  { id: 'CASH_ON_DELIVERY', label: 'On Delivery' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: p.id })}
                    className={`py-3 px-2 rounded-xl border text-xs font-mono font-semibold text-center transition-all ${
                      formData.paymentMethod === p.id
                        ? 'bg-[#3C2A21] border-[#EEDCC6] text-[#F4E8D1] shadow-coffee-glow'
                        : 'bg-[#2A1B16] border-[#EEDCC6]/20 text-[#EEDCC6]/60'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Total & Confirmation Button */}
            <div className="pt-4 border-t border-[#EEDCC6]/15 space-y-4">
              <div className="flex items-center justify-between text-sm font-mono text-[#EEDCC6]">
                <span>TOTAL CHARGE ({cartItems.length} ITEMS)</span>
                <span className="text-lg font-bold text-[#F4E8D1] font-display">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#EEDCC6] to-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING TO BREW LAB...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>CONFIRM & INITIALIZE DISPATCH</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
