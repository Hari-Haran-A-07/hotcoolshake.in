import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import {
  X,
  Star,
  Flame,
  Snowflake,
  RotateCw,
  Plus,
  Minus,
  ShoppingBag,
  Check,
  ShieldAlert,
  Activity,
} from 'lucide-react';

export const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  const [selectedTemp, setSelectedTemp] = useState(product?.temperature || 'HOT');
  const [selectedSize, setSelectedSize] = useState('Standard 450ml');
  const [selectedMilk, setSelectedMilk] = useState('Velvet Silk Oat Milk');
  const [selectedSweetness, setSelectedSweetness] = useState('50% Balanced');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('CUSTOMIZE'); // 'CUSTOMIZE' | 'NUTRITION' | 'INGREDIENTS'

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
    'Pure Black Extract (No Milk)',
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
          className="fixed inset-0 bg-[#2A1B16]/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#3C2A21] text-[#F4E8D1] rounded-[36px] overflow-hidden border-2 border-[#EEDCC6]/30 shadow-2xl z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-[#2A1B16] text-[#EEDCC6] hover:text-[#F4E8D1] hover:bg-[#2A1B16]/80 transition-all border border-[#EEDCC6]/20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left Image Section */}
            <div className="lg:col-span-5 relative bg-[#2A1B16] min-h-[300px] lg:min-h-[500px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3C2A21] via-transparent to-transparent lg:hidden" />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="px-3.5 py-1 rounded-full bg-brand-gradient text-[#2A1B16] text-[10px] font-mono font-black uppercase shadow-md">
                  {product.badge || 'SIGNATURE'}
                </span>
              </div>
            </div>

            {/* Right Customization Section (Section 16) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#EEDCC6] uppercase mb-1 font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#EEDCC6]" />
                  <span>{product.rating || 4.9} RATING • 100% DIRECT ORIGIN</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F4E8D1] uppercase">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Tabs for Customization vs Nutrition vs Ingredients */}
              <div className="flex items-center space-x-2 border-b border-[#2A1B16] pb-2">
                {['CUSTOMIZE', 'NUTRITION', 'INGREDIENTS'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase transition-all ${
                      activeTab === tab
                        ? 'bg-[#EEDCC6] text-[#2A1B16]'
                        : 'text-[#EEDCC6]/70 hover:text-[#F4E8D1]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'CUSTOMIZE' && (
                <div className="space-y-5">
                  {/* Temperature Selection */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-bold text-[#EEDCC6] uppercase tracking-wider block">
                      TEMPERATURE SELECTION
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedTemp('HOT')}
                        className={`p-3 rounded-2xl border text-xs font-mono font-bold transition-all flex items-center justify-center space-x-2 ${
                          selectedTemp === 'HOT'
                            ? 'bg-[#2A1B16] border-[#EEDCC6] text-[#EEDCC6] shadow-cream-glow'
                            : 'bg-[#2A1B16]/50 border-white/10 text-[#EEDCC6]/70'
                        }`}
                      >
                        <Flame className="w-4 h-4 text-[#EEDCC6]" />
                        <span>HOT (68°C STEAM)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTemp('COOL')}
                        className={`p-3 rounded-2xl border text-xs font-mono font-bold transition-all flex items-center justify-center space-x-2 ${
                          selectedTemp === 'COOL'
                            ? 'bg-[#2A1B16] border-[#F4E8D1] text-[#F4E8D1] shadow-cream-glow'
                            : 'bg-[#2A1B16]/50 border-white/10 text-[#EEDCC6]/70'
                        }`}
                      >
                        <Snowflake className="w-4 h-4 text-[#F4E8D1]" />
                        <span>COOL (04°C CRYO)</span>
                      </button>
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-bold text-[#EEDCC6] uppercase tracking-wider block">
                      VESSEL SIZE
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {sizeOptions.map((sz) => (
                        <button
                          key={sz.name}
                          type="button"
                          onClick={() => setSelectedSize(sz.name)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            selectedSize === sz.name
                              ? 'bg-[#2A1B16] border-[#EEDCC6] text-[#F4E8D1] shadow-cream-glow'
                              : 'bg-[#2A1B16]/50 border-[#EEDCC6]/20 text-[#EEDCC6]/70'
                          }`}
                        >
                          <div className="text-[10px] font-mono font-bold">{sz.name.split(' ')[0]}</div>
                          <div className="text-[9px] font-mono text-[#EEDCC6]">{sz.name.split(' ')[1]}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Milk Base Selection */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-bold text-[#EEDCC6] uppercase tracking-wider block">
                      MILK BASE
                    </label>
                    <select
                      value={selectedMilk}
                      onChange={(e) => setSelectedMilk(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none"
                    >
                      {milkOptions.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Nutrition Tab (Section 16) */}
              {activeTab === 'NUTRITION' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/20 text-center">
                      <div className="text-xl font-mono font-bold text-[#F4E8D1]">{product.nutrition?.calories || 180}</div>
                      <div className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase">CALORIES</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/20 text-center">
                      <div className="text-xl font-mono font-bold text-[#EEDCC6]">{product.nutrition?.caffeine || '140mg'}</div>
                      <div className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase">CAFFEINE</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/20 text-center">
                      <div className="text-xl font-mono font-bold text-[#F4E8D1]">{product.nutrition?.sugar || '12g'}</div>
                      <div className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase">SUGAR</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-[#EEDCC6]/80">
                      <span>Total Fat</span>
                      <span>{product.nutrition?.fat || '4.5g'}</span>
                    </div>
                    <div className="flex justify-between text-[#EEDCC6]/80">
                      <span>Protein</span>
                      <span>{product.nutrition?.protein || '6.0g'}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#2A1B16]/60 border border-[#EEDCC6]/20 text-[11px] font-sans text-[#EEDCC6]/70 flex items-start space-x-2">
                    <ShieldAlert className="w-4 h-4 text-[#EEDCC6] flex-shrink-0 mt-0.5" />
                    <span>Allergen Notice: Prepared in facilities handling tree nuts, dairy, and soy. Vegan options crafted with dedicated steaming wands.</span>
                  </div>
                </div>
              )}

              {/* Ingredients Tab (Section 16) */}
              {activeTab === 'INGREDIENTS' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 space-y-3">
                    <span className="text-[11px] font-mono font-bold text-[#EEDCC6] uppercase tracking-wider block">
                      SOURCE INGREDIENTS
                    </span>
                    <ul className="space-y-2 text-xs font-sans text-[#F4E8D1]">
                      {product.ingredients && product.ingredients.length > 0 ? (
                        product.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            <Check className="w-3.5 h-3.5 text-[#EEDCC6]" />
                            <span>{ing}</span>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="flex items-center space-x-2">
                            <Check className="w-3.5 h-3.5 text-[#EEDCC6]" />
                            <span>100% Arabica Single-Origin Espresso Ristretto</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Check className="w-3.5 h-3.5 text-[#EEDCC6]" />
                            <span>Micro-Textured Velvet Silk Oat Milk</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Check className="w-3.5 h-3.5 text-[#EEDCC6]" />
                            <span>Organic Madagascar Bourbon Vanilla Extract</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Quantity & Sticky Add to Cart (Section 16) */}
              <div className="pt-4 border-t border-[#2A1B16] flex items-center justify-between gap-4 sticky bottom-0 bg-[#3C2A21] py-2">
                <div className="flex items-center space-x-2 bg-[#2A1B16] p-1.5 rounded-2xl border border-[#EEDCC6]/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 rounded-xl hover:bg-[#3C2A21] text-[#EEDCC6] hover:text-[#F4E8D1]"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono font-bold text-sm px-2 text-[#F4E8D1]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 rounded-xl hover:bg-[#3C2A21] text-[#EEDCC6] hover:text-[#F4E8D1]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-cream-glow hover:brightness-105 transition-all flex items-center justify-center space-x-2"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADDED TO BAG</span>
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
