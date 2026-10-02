import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { usePageLoader } from '../../context/LoadingContext';
import { ProductDetailModal } from '../../components/common/ProductDetailModal';
import {
  Flame,
  Snowflake,
  Wind,
  Plus,
  ArrowRight,
  Star,
  Sparkles,
  ShoppingBag,
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
        if (res.success) {
          setProducts(res.products);
        }
      } catch (err) {
        console.warn('Could not load featured products, using catalog fallback:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const categories = [
    { id: 'ALL', label: 'All Curations' },
    { id: 'hot-coffee', label: 'Hot Coffee', icon: Flame },
    { id: 'cool-coffee', label: 'Cool Coffee', icon: Snowflake },
    { id: 'shakes', label: 'Shakes', icon: Wind },
    { id: 'signature-drinks', label: 'Signatures', icon: Sparkles },
  ];

  const filteredProducts = activeCategory === 'ALL'
    ? products
    : products.filter((p) => p.categorySlug === activeCategory);

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(product, 1, {}, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <section className="py-24 bg-[#F4E8D1] text-[#2A1B16] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#3C2A21] uppercase font-bold px-3 py-1 rounded-full bg-[#EEDCC6] border border-[#3C2A21]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE BEVERAGE COLLECTION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#2A1B16] uppercase">
              MASTER ROASTS & INFUSIONS.
            </h2>
            <p className="text-xs sm:text-sm text-[#3C2A21]/80 font-sans max-w-lg">
              Explore our internationally acclaimed menu of single-origin thermal extractions, cryogenic nitro brews, and blended vortex shakes.
            </p>
          </div>

          <button
            onClick={() => startPageTransition('/menu', 'INTERNATIONAL MENU')}
            className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-[#2A1B16] hover:text-[#3C2A21] uppercase group"
          >
            <span>VIEW FULL MENU (30+ CREATIONS)</span>
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
                    ? 'bg-[#2A1B16] text-[#F4E8D1] shadow-espresso-dark'
                    : 'bg-[#EEDCC6]/80 text-[#2A1B16] hover:bg-[#EEDCC6] border border-[#3C2A21]/15'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.slice(0, 6).map((product, idx) => (
            <motion.div
              key={product._id || idx}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setSelectedProduct(product)}
              className="bg-[#EEDCC6]/40 hover:bg-[#EEDCC6]/80 rounded-[32px] p-6 border border-[#3C2A21]/15 hover:border-[#3C2A21]/40 shadow-card-lux transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-[#2A1B16] mb-5 border border-[#3C2A21]/15">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16]/80 via-transparent to-transparent" />

                  {/* Temperature Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        product.temperature === 'HOT'
                          ? 'bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/40'
                          : 'bg-[#3C2A21] text-[#F4E8D1] border border-[#EEDCC6]/40'
                      }`}
                    >
                      {product.temperature === 'HOT' ? (
                        <Flame className="w-3 h-3 text-[#EEDCC6]" />
                      ) : (
                        <Snowflake className="w-3 h-3 text-[#EEDCC6]" />
                      )}
                      <span>{product.temperature}</span>
                    </span>
                  </div>

                  {product.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-[#EEDCC6] text-[#2A1B16] shadow-md">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Price Tag Overlay on Bottom Image */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-base font-mono font-black text-[#F4E8D1] px-2.5 py-1 rounded-lg bg-[#2A1B16]/80 backdrop-blur-sm">
                      ${product.price?.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-extrabold text-xl text-[#2A1B16] group-hover:text-[#3C2A21] transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#3C2A21]/80 font-sans line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Flavor Notes Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {product.flavorNotes?.slice(0, 3).map((note, nIdx) => (
                      <span
                        key={nIdx}
                        className="text-[10px] font-mono text-[#3C2A21] bg-[#F4E8D1] px-2.5 py-0.5 rounded-full border border-[#3C2A21]/15"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-6 mt-6 border-t border-[#3C2A21]/15 flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#3C2A21] group-hover:underline">
                  CUSTOMIZE & SPECS →
                </span>

                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="p-3 rounded-full bg-[#2A1B16] hover:bg-[#3C2A21] text-[#F4E8D1] shadow-md hover:scale-110 transition-all"
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
