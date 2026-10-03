import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import {
  X,
  Star,
  Flame,
  Snowflake,
  Sparkles,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  const [selectedTemp, setSelectedTemp] = useState(product?.temperature || 'HOT');
  const [selectedSize, setSelectedSize] = useState('Standard 450ml');
  const [selectedMilk, setSelectedMilk] = useState('Velvet Silk Oat Milk');
  const [selectedSweetness, setSelectedSweetness] = useState('50% Balanced');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const sizeOptions = [
    { name: 'Standard 450ml', extra: 0 },
    { name: 'Reserve 550ml', extra: 1.50 },
    { name: 'Grand Flask 750ml', extra: 3.00 },
  ];

  const milkOptions = [
    'Velvet Silk Oat Milk',
    'California Almond Cream',
    'Whole Organic Dairy',
    'Cold-Pressed Coconut Milk',
    'Pure Black Extract',
  ];

  const sweetnessOptions = [
    '0% Pure Unsweetened',
    '25% Hint of Raw Cane',
    '50% Balanced Maple',
    '100% Full Indulgence',
  ];

  const sizeExtra = sizeOptions.find((s) => s.name === selectedSize)?.extra || 0;
  const currentPrice = (product.price + sizeExtra) * quantity;

  const handleAddToCart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(
      product,
      quantity,
      {
        temperature: selectedTemp,
        size: selectedSize,
        milk: selectedMilk,
        sweetness: selectedSweetness,
      },
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#071A2B]/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#0B2538] text-[#F7FAF9] rounded-[36px] overflow-hidden border-2 border-[#B8783E]/40 shadow-2xl z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-[#071A2B] text-[#A8B0B4] hover:text-[#F7FAF9] hover:bg-[#071A2B]/80 transition-all border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left Image Section */}
            <div className="lg:col-span-5 relative bg-[#071A2B] min-h-[300px] lg:min-h-[500px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2538] via-transparent to-transparent lg:hidden" />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="px-3.5 py-1 rounded-full bg-brand-gradient text-[#071A2B] text-[10px] font-mono font-black uppercase shadow-md">
                  {product.badge || 'SIGNATURE'}
                </span>
              </div>
            </div>

            {/* Right Customization Section */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#D6A06A] uppercase mb-1">
                  <Star className="w-3.5 h-3.5 fill-[#D6A06A]" />
                  <span>{product.rating || 4.9} RATING • 100% ETHICAL ORIGIN</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F7FAF9] uppercase">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#A8B0B4] font-sans mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Story */}
              {product.story && (
                <div className="p-3.5 rounded-2xl bg-[#071A2B] border border-[#B8783E]/20 text-xs text-[#D6A06A] font-sans italic">
                  "{product.story}"
                </div>
              )}

              {/* Temperature Selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono font-bold text-[#67D9D0] uppercase tracking-wider block">
                  CALIBRATED TEMPERATURE
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTemp('HOT')}
                    className={`p-3 rounded-2xl border text-xs font-mono font-bold transition-all flex items-center justify-center space-x-2 ${
                      selectedTemp === 'HOT'
                        ? 'bg-[#071A2B] border-[#B8783E] text-[#D6A06A] shadow-bronze-glow'
                        : 'bg-[#071A2B]/50 border-white/10 text-[#A8B0B4]'
                    }`}
                  >
                    <Flame className="w-4 h-4 text-[#B8783E]" />
                    <span>HOT 68°C</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTemp('COOL')}
                    className={`p-3 rounded-2xl border text-xs font-mono font-bold transition-all flex items-center justify-center space-x-2 ${
                      selectedTemp === 'COOL'
                        ? 'bg-[#071A2B] border-[#67D9D0] text-[#67D9D0] shadow-teal-glow'
                        : 'bg-[#071A2B]/50 border-white/10 text-[#A8B0B4]'
                    }`}
                  >
                    <Snowflake className="w-4 h-4 text-[#67D9D0]" />
                    <span>COOL 04°C</span>
                  </button>
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono font-bold text-[#67D9D0] uppercase tracking-wider block">
                  VESSEL CAPACITY
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sizeOptions.map((sz) => (
                    <button
                      key={sz.name}
                      type="button"
                      onClick={() => setSelectedSize(sz.name)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedSize === sz.name
                          ? 'bg-[#071A2B] border-[#67D9D0] text-[#F7FAF9] shadow-teal-glow'
                          : 'bg-[#071A2B]/50 border-white/10 text-[#A8B0B4]'
                      }`}
                    >
                      <div className="text-[10px] font-mono font-bold">{sz.name.split(' ')[0]}</div>
                      <div className="text-[9px] font-mono text-[#D6A06A]">{sz.name.split(' ')[1]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2 bg-[#071A2B] p-1.5 rounded-2xl border border-white/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 rounded-xl hover:bg-[#0B2538] text-[#A8B0B4] hover:text-[#F7FAF9]"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono font-bold text-sm px-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 rounded-xl hover:bg-[#0B2538] text-[#A8B0B4] hover:text-[#F7FAF9]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADDED TO CURATED BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG • ${currentPrice.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;
