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

  const [selectedTemp, setSelectedTemp] = useState(product?.temperature || 'COOL');
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
          className="fixed inset-0 bg-[#2A1B16]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#2A1B16] text-[#F4E8D1] rounded-[32px] overflow-hidden border border-[#EEDCC6]/20 shadow-2xl z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-[#3C2A21] text-[#EEDCC6] hover:text-[#F4E8D1] hover:bg-[#EEDCC6] hover:text-[#2A1B16] transition-all border border-[#EEDCC6]/20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left Col: High-Res Beverage Visual & Notes */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#3C2A21] to-[#2A1B16] p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#EEDCC6]/15 relative">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  {product.badge && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-[#EEDCC6] text-[#2A1B16]">
                      {product.badge}
                    </span>
                  )}
                  <div className="flex items-center space-x-1 text-[#EEDCC6] text-xs font-mono">
                    <Star className="w-3.5 h-3.5 fill-[#EEDCC6]" />
                    <span>{product.rating || 4.9}</span>
                    <span className="opacity-60">({product.reviewsCount || 150})</span>
                  </div>
                </div>

                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-[#2A1B16] border border-[#EEDCC6]/20 shadow-espresso-dark mb-6 group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16]/80 via-transparent to-transparent" />
                </div>
              </div>

              {/* Flavor Profile Strip */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
                  FLAVOR NOTES & ROAST ACCENT
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.flavorNotes?.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-[#3C2A21] text-xs font-mono text-[#F4E8D1] border border-[#EEDCC6]/20"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Customization Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F4E8D1]">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans mt-2 leading-relaxed">
                  {product.description}
                </p>
                {product.story && (
                  <p className="text-xs italic text-[#EEDCC6]/60 mt-1.5">
                    "{product.story}"
                  </p>
                )}
              </div>

              {/* Temperature Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono font-bold tracking-wider text-[#EEDCC6] uppercase block">
                  1. SERVING TEMPERATURE
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTemp('HOT')}
                    className={`flex items-center justify-center space-x-2 py-3 rounded-2xl border text-xs font-mono font-bold tracking-wider transition-all ${
                      selectedTemp === 'HOT'
                        ? 'bg-[#3C2A21] border-[#EEDCC6] text-[#F4E8D1] shadow-coffee-glow'
                        : 'bg-[#2A1B16] border-[#EEDCC6]/20 text-[#EEDCC6]/70 hover:border-[#EEDCC6]/50'
                    }`}
                  >
                    <Flame className="w-4 h-4 text-[#EEDCC6]" />
                    <span>STEAMED HOT (68°C)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTemp('COOL')}
                    className={`flex items-center justify-center space-x-2 py-3 rounded-2xl border text-xs font-mono font-bold tracking-wider transition-all ${
                      selectedTemp === 'COOL'
                        ? 'bg-[#3C2A21] border-[#EEDCC6] text-[#F4E8D1] shadow-coffee-glow'
                        : 'bg-[#2A1B16] border-[#EEDCC6]/20 text-[#EEDCC6]/70 hover:border-[#EEDCC6]/50'
                    }`}
                  >
                    <Snowflake className="w-4 h-4 text-[#EEDCC6]" />
                    <span>CRYOGENIC COOL (04°C)</span>
                  </button>
                </div>
              </div>

              {/* Vessel Capacity / Size */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono font-bold tracking-wider text-[#EEDCC6] uppercase block">
                  2. VESSEL CAPACITY
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sizeOptions.map((opt) => (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setSelectedSize(opt.name)}
                      className={`p-2.5 rounded-xl text-center border text-xs font-mono transition-all ${
                        selectedSize === opt.name
                          ? 'bg-[#3C2A21] border-[#EEDCC6] text-[#F4E8D1] font-bold shadow-sm'
                          : 'bg-[#2A1B16] border-[#EEDCC6]/20 text-[#EEDCC6]/70 hover:border-[#EEDCC6]/50'
                      }`}
                    >
                      <div className="font-bold">{opt.name.split(' ')[0]}</div>
                      <div className="text-[10px] opacity-75">{opt.name.split(' ')[1]}</div>
                      {opt.extra > 0 && (
                        <div className="text-[10px] text-[#EEDCC6] mt-0.5">+${opt.extra.toFixed(2)}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Customization */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold tracking-wider text-[#EEDCC6] uppercase block">
                  3. ARTISAN MILK BASE
                </label>
                <select
                  value={selectedMilk}
                  onChange={(e) => setSelectedMilk(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                >
                  {milkOptions.map((m) => (
                    <option key={m} value={m} className="bg-[#2A1B16]">
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sweetness Calibration */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold tracking-wider text-[#EEDCC6] uppercase block">
                  4. SWEETNESS CALIBRATION
                </label>
                <select
                  value={selectedSweetness}
                  onChange={(e) => setSelectedSweetness(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                >
                  {sweetnessOptions.map((s) => (
                    <option key={s} value={s} className="bg-[#2A1B16]">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bottom Quantity & Add to Cart Bar */}
              <div className="pt-4 border-t border-[#EEDCC6]/15 flex items-center justify-between gap-4">
                {/* Quantity */}
                <div className="flex items-center space-x-3 bg-[#3C2A21] px-3.5 py-2 rounded-full border border-[#EEDCC6]/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#EEDCC6] hover:text-[#F4E8D1]"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono font-bold text-sm text-[#F4E8D1] w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#EEDCC6] hover:text-[#F4E8D1]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#EEDCC6] to-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {isAdded ? 'ADDED TO BAG' : `ADD TO BAG • $${currentPrice.toFixed(2)}`}
                  </span>
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
