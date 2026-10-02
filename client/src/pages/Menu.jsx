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
        console.warn('Catalog load error:', err);
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
    <div className="min-h-screen pt-28 pb-24 bg-[#F4E8D1] text-[#2A1B16] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Menu Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#3C2A21] uppercase font-bold px-4 py-1.5 rounded-full bg-[#EEDCC6] border border-[#3C2A21]/20">
            <Coffee className="w-3.5 h-3.5" />
            <span>THE BEVERAGE MANIFESTO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#2A1B16] uppercase">
            INTERNATIONAL MENU.
          </h1>
          <p className="text-xs sm:text-sm text-[#3C2A21]/80 font-sans">
            Explore our comprehensive collection of single-origin thermal extracts, sub-zero nitro infusions, and artisanal patisserie.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-6 rounded-[32px] bg-[#EEDCC6]/50 border border-[#3C2A21]/15 mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-[#3C2A21]/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flavors, single-origins, notes..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#F4E8D1] border border-[#3C2A21]/20 text-xs font-sans text-[#2A1B16] placeholder-[#3C2A21]/40 focus:outline-none focus:border-[#2A1B16]"
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
                        ? 'bg-[#2A1B16] text-[#F4E8D1]'
                        : 'bg-[#F4E8D1] text-[#2A1B16] hover:bg-[#EEDCC6] border border-[#3C2A21]/20'
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
                className="w-full px-4 py-2.5 rounded-full bg-[#F4E8D1] border border-[#3C2A21]/20 text-xs font-mono text-[#2A1B16] focus:outline-none"
              >
                <option value="featured">Featured Curations</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Horizontal Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-2 no-scrollbar border-t border-[#3C2A21]/10">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all flex-shrink-0 ${
                activeCategory === 'ALL'
                  ? 'bg-[#2A1B16] text-[#F4E8D1]'
                  : 'bg-[#F4E8D1]/70 text-[#2A1B16] hover:bg-[#F4E8D1]'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all flex-shrink-0 ${
                  activeCategory === cat.slug
                    ? 'bg-[#2A1B16] text-[#F4E8D1]'
                    : 'bg-[#F4E8D1]/70 text-[#2A1B16] hover:bg-[#F4E8D1]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs font-mono text-[#3C2A21]/70 px-2">
          <span>SHOWING {filteredProducts.length} CREATIONS</span>
          <span>CALIBRATED FOR YOUR TASTE</span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product._id || idx}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onClick={() => setSelectedProduct(product)}
              className="bg-[#EEDCC6]/50 hover:bg-[#EEDCC6] rounded-[28px] p-5 border border-[#3C2A21]/15 hover:border-[#3C2A21]/40 shadow-card-lux transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-52 w-full rounded-2xl overflow-hidden bg-[#2A1B16] mb-4 border border-[#3C2A21]/15">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16]/80 via-transparent to-transparent" />

                  {/* Temperature Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                        product.temperature === 'HOT'
                          ? 'bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30'
                          : 'bg-[#3C2A21] text-[#F4E8D1] border border-[#EEDCC6]/30'
                      }`}
                    >
                      {product.temperature === 'HOT' ? (
                        <Flame className="w-2.5 h-2.5 text-[#EEDCC6]" />
                      ) : (
                        <Snowflake className="w-2.5 h-2.5 text-[#EEDCC6]" />
                      )}
                      <span>{product.temperature}</span>
                    </span>
                  </div>

                  {product.badge && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-[#EEDCC6] text-[#2A1B16] shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="text-sm font-mono font-black text-[#F4E8D1] px-2 py-0.5 rounded-lg bg-[#2A1B16]/80">
                      ${product.price?.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                  <h3 className="font-display font-extrabold text-lg text-[#2A1B16] group-hover:text-[#3C2A21] leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#3C2A21]/75 font-sans line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {product.flavorNotes?.slice(0, 2).map((note, nIdx) => (
                      <span
                        key={nIdx}
                        className="text-[9px] font-mono text-[#3C2A21] bg-[#F4E8D1] px-2 py-0.5 rounded-full border border-[#3C2A21]/15"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-[#3C2A21]/15 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-[#3C2A21] group-hover:underline">
                  CUSTOMIZE →
                </span>

                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="p-2.5 rounded-full bg-[#2A1B16] hover:bg-[#3C2A21] text-[#F4E8D1] shadow-md hover:scale-110 transition-all"
                  aria-label="Add to bag"
                >
                  <Plus className="w-3.5 h-3.5" />
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
