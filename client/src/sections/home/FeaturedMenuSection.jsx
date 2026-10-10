import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { usePageLoader } from '../../context/LoadingContext';
import { ProductDetailModal } from '../../components/common/ProductDetailModal';
import {
  Flame,
  Snowflake,
  RotateCw,
  Plus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const FeaturedMenuSection = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { startPageTransition } = usePageLoader();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.getProducts({ featured: 'true' });
        if (res.success && res.products?.length > 0) {
          setProducts(res.products);
        }
      } catch (err) {
        console.warn('Featured products fetch handled', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Primary categories from Master Prompt (Section 14)
  const categories = [
    { id: 'ALL', label: 'All Signatures' },
    { id: 'hot-coffee', label: 'SIGNATURE HOT', icon: Flame },
    { id: 'cool-coffee', label: 'SIGNATURE COOL', icon: Snowflake },
    { id: 'shakes', label: 'SIGNATURE SHAKE', icon: RotateCw },
    { id: 'signature-drinks', label: 'SPECIALTY DRINKS', icon: Sparkles },
  ];

  const filteredProducts = activeCategory === 'ALL'
    ? products
    : products.filter((p) => p.categorySlug === activeCategory || p.temperature === activeCategory.toUpperCase().replace('-COFFEE', ''));

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(product, 1, {}, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <section className="py-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Ambient background atmosphere */}
      <div className="absolute inset-0 bg-radial-coffee opacity-90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#EEDCC6]" />
              <span>THE SIGNATURE COLLECTION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
              SIGNATURE ROASTS & <span className="text-brand-gradient">CREATIONS.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans max-w-lg">
              Explore our internationally acclaimed lineup of thermal extractions, cryogenic nitro brews, and blended vortex shakes.
            </p>
          </div>

          <button
            onClick={() => startPageTransition('/menu', 'BEVERAGE MENU')}
            className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] hover:text-[#F4E8D1] uppercase group"
          >
            <span>EXPLORE FULL MENU (30+ CREATIONS)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-cream-glow font-black'
                    : 'bg-[#3C2A21] text-[#EEDCC6]/80 hover:text-[#F4E8D1] hover:bg-[#3C2A21]/90 border border-[#EEDCC6]/20'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid with Rich Hover Effects (Section 14 & 51) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.slice(0, 6).map((product, idx) => (
            <motion.div
              key={product._id || idx}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setSelectedProduct(product)}
              data-cursor="view"
              className="product-card bg-[#3C2A21]/90 hover:bg-[#3C2A21] rounded-[32px] p-6 border border-[#EEDCC6]/20 hover:border-[#EEDCC6]/60 shadow-coffee-card hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-[#2A1B16] mb-5 border border-[#EEDCC6]/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16]/90 via-transparent to-transparent" />

                  {/* Temperature Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        product.temperature === 'HOT'
                          ? 'bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/40'
                          : 'bg-[#2A1B16] text-[#F4E8D1] border border-[#EEDCC6]/40'
                      }`}
                    >
                      {product.temperature === 'HOT' ? (
                        <Flame className="w-3 h-3 text-[#EEDCC6]" />
                      ) : product.temperature === 'SHAKE' ? (
                        <RotateCw className="w-3 h-3 text-[#EEDCC6]" />
                      ) : (
                        <Snowflake className="w-3 h-3 text-[#F4E8D1]" />
                      )}
                      <span>{product.temperature}</span>
                    </span>
                  </div>

                  {product.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-brand-gradient text-[#2A1B16] shadow-md">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-base font-mono font-black text-[#F4E8D1] px-2.5 py-1 rounded-lg bg-[#2A1B16]/90 backdrop-blur-sm border border-[#EEDCC6]/30">
                      ${product.price?.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-extrabold text-xl text-[#F4E8D1] group-hover:text-[#EEDCC6] transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#EEDCC6]/80 font-sans line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Flavor Notes Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {product.flavorNotes?.slice(0, 3).map((note, nIdx) => (
                      <span
                        key={nIdx}
                        className="text-[10px] font-mono text-[#EEDCC6] bg-[#2A1B16] px-2.5 py-0.5 rounded-full border border-[#EEDCC6]/20"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-6 mt-6 border-t border-[#2A1B16] flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#EEDCC6] group-hover:underline">
                  CUSTOMIZE & ORDER →
                </span>

                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="p-3 rounded-full bg-[#2A1B16] hover:bg-brand-gradient text-[#F4E8D1] hover:text-[#2A1B16] border border-[#EEDCC6]/40 shadow-md hover:scale-110 transition-all"
                  aria-label={`Quick add ${product.name}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default FeaturedMenuSection;
