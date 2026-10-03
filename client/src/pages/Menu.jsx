import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { ProductDetailModal } from '../components/common/ProductDetailModal';
import {
  Search,
  Flame,
  Snowflake,
  Wind,
  Sparkles,
  Plus,
  Star,
  SlidersHorizontal,
  Coffee,
  Check,
} from 'lucide-react';

export const Menu = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeTemp, setActiveTemp] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.getProducts({}),
          api.getCategories(),
        ]);

        if (prodRes.success) setProducts(prodRes.products);
        if (catRes.success) setCategories(catRes.categories);
      } catch (err) {
        console.warn('Catalog load fallback handled:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  // Filter and Sort Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'ALL' || p.categorySlug === activeCategory;
    const matchesTemp = activeTemp === 'ALL' || p.temperature === activeTemp || (p.temperature === 'DUAL_SERVE');
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.flavorNotes && p.flavorNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesTemp && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
    return 0; // default order
  });

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(product, 1, {}, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-radial-navy opacity-95 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Menu Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#D6A06A] uppercase font-bold px-4 py-1.5 rounded-full bg-[#0B2538] border border-[#B8783E]/30">
            <Coffee className="w-3.5 h-3.5 text-[#67D9D0]" />
            <span>THE BEVERAGE COLLECTION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F7FAF9] uppercase">
            INTERNATIONAL <span className="text-brand-gradient">MENU.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A8B0B4] font-sans">
            Explore our comprehensive collection of single-origin thermal extracts, sub-zero nitro infusions, and signature vortex shakes.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-6 rounded-[32px] bg-[#0B2538]/70 border border-[#B8783E]/20 mb-10 space-y-4 shadow-luxury-card">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-[#A8B0B4] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flavours, single-origins, notes..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#071A2B] border border-[#B8783E]/30 text-xs font-sans text-[#F7FAF9] placeholder-[#A8B0B4]/60 focus:outline-none focus:border-[#67D9D0]"
              />
            </div>

            {/* Temperature Quick Toggle */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
              {[
                { id: 'ALL', label: 'All Temps' },
                { id: 'HOT', label: 'Hot (68°C)', icon: Flame },
                { id: 'COOL', label: 'Cool (04°C)', icon: Snowflake },
                { id: 'SHAKE', label: 'Shakes', icon: Wind },
              ].map((t) => {
                const Icon = t.icon;
                const isSelected = activeTemp === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTemp(t.id)}
                    className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all flex-shrink-0 ${
                      isSelected
                        ? 'bg-brand-gradient text-[#071A2B] shadow-bronze-glow'
                        : 'bg-[#071A2B] text-[#A8B0B4] hover:text-[#F7FAF9] border border-white/10'
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="w-full lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-[#071A2B] border border-[#B8783E]/30 text-xs font-mono text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
              >
                <option value="featured">Featured Curations</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Horizontal Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-2 no-scrollbar border-t border-[#071A2B]">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all flex-shrink-0 ${
                activeCategory === 'ALL'
                  ? 'bg-[#B8783E] text-[#071A2B] font-black'
                  : 'bg-[#071A2B] text-[#A8B0B4] hover:text-[#F7FAF9]'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => {
              const isCatActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat._id || cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all flex-shrink-0 ${
                    isCatActive
                      ? 'bg-[#67D9D0] text-[#071A2B] font-black'
                      : 'bg-[#071A2B] text-[#A8B0B4] hover:text-[#F7FAF9]'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product._id || idx}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedProduct(product)}
              data-cursor="view"
              className="product-card bg-[#0B2538]/70 hover:bg-[#0B2538] rounded-[32px] p-6 border border-[#B8783E]/20 hover:border-[#67D9D0]/50 shadow-luxury-card hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-[#071A2B] mb-5 border border-[#B8783E]/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/90 via-transparent to-transparent" />

                  {/* Temperature Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        product.temperature === 'HOT'
                          ? 'bg-[#071A2B] text-[#D6A06A] border border-[#B8783E]/50'
                          : 'bg-[#071A2B] text-[#67D9D0] border border-[#67D9D0]/50'
                      }`}
                    >
                      {product.temperature === 'HOT' ? (
                        <Flame className="w-3 h-3 text-[#B8783E]" />
                      ) : (
                        <Snowflake className="w-3 h-3 text-[#67D9D0]" />
                      )}
                      <span>{product.temperature}</span>
                    </span>
                  </div>

                  {product.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-brand-gradient text-[#071A2B] shadow-md">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Price Tag Overlay on Bottom Image */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-base font-mono font-black text-[#F7FAF9] px-2.5 py-1 rounded-lg bg-[#071A2B]/85 backdrop-blur-sm border border-[#B8783E]/30">
                      ${product.price?.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-extrabold text-xl text-[#F7FAF9] group-hover:text-[#67D9D0] transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#A8B0B4] font-sans line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Flavor Notes Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {product.flavorNotes?.map((note, nIdx) => (
                      <span
                        key={nIdx}
                        className="text-[10px] font-mono text-[#D6A06A] bg-[#071A2B] px-2.5 py-0.5 rounded-full border border-[#B8783E]/20"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-6 mt-6 border-t border-[#071A2B] flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#67D9D0] group-hover:underline">
                  CUSTOMIZE & SPECS →
                </span>

                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="p-3 rounded-full bg-[#071A2B] hover:bg-brand-gradient text-[#F7FAF9] hover:text-[#071A2B] border border-[#B8783E]/40 shadow-md hover:scale-110 transition-all"
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
    </div>
  );
};

export default Menu;
