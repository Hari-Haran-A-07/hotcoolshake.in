import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { usePageLoader } from '../context/LoadingContext';
import { ProductDetailModal } from '../components/common/ProductDetailModal';
import {
  Search,
  Flame,
  Snowflake,
  RotateCw,
  Sparkles,
  Plus,
  SlidersHorizontal,
  Coffee,
  Check,
  Filter,
} from 'lucide-react';

export const Menu = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'ALL';
  const initialProd = searchParams.get('product');

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [activeTemp, setActiveTemp] = useState('ALL');
  const [selectedDiet, setSelectedDiet] = useState('ALL');
  const [selectedFlavorFilter, setSelectedFlavorFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { startPageTransition } = usePageLoader();

  // Section 15 Full Menu Taxonomy
  const menuCategories = [
    { id: 'ALL', name: 'ALL CREATIONS' },
    { id: 'latest', name: 'THE LATEST' },
    { id: 'hot-coffee', name: 'SIGNATURE HOT' },
    { id: 'cool-coffee', name: 'SIGNATURE COOL' },
    { id: 'coffee-espresso', name: 'COFFEE & ESPRESSO' },
    { id: 'shakes', name: 'SHAKES' },
    { id: 'signature-drinks', name: 'SPECIALTY DRINKS' },
    { id: 'iced-coffee', name: 'ICED COFFEE' },
    { id: 'desserts', name: 'DESSERT COFFEE' },
    { id: 'bakery', name: 'BAKERY' },
    { id: 'food', name: 'SNACKS' },
    { id: 'seasonal', name: 'SEASONAL' },
    { id: 'at-home', name: 'COFFEE AT HOME' },
    { id: 'custom', name: 'CUSTOM CREATIONS' },
  ];

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.getProducts({}),
          api.getCategories(),
        ]);

        if (prodRes.success) {
          setProducts(prodRes.products);
          if (initialProd) {
            const found = prodRes.products.find((p) => p.slug === initialProd);
            if (found) setSelectedProduct(found);
          }
        }
        if (catRes.success) setCategories(catRes.categories);
      } catch (err) {
        console.warn('Catalog load fallback handled:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, [initialProd]);

  // Filter and Sort Products
  const filteredProducts = products.filter((p) => {
    let matchesCategory = true;
    if (activeCategory !== 'ALL') {
      if (activeCategory === 'custom') {
        matchesCategory = p.categorySlug === 'custom' || p.badge?.includes('Custom');
      } else if (activeCategory === 'latest') {
        matchesCategory = p.featured || p.badge?.includes('New');
      } else {
        matchesCategory = p.categorySlug === activeCategory || p.categorySlug?.includes(activeCategory);
      }
    }

    const matchesTemp = activeTemp === 'ALL' || p.temperature === activeTemp || (p.temperature === 'DUAL_SERVE');

    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.flavorNotes && p.flavorNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesFlavor =
      selectedFlavorFilter === 'ALL' ||
      (p.flavorNotes && p.flavorNotes.some((n) => n.toLowerCase().includes(selectedFlavorFilter.toLowerCase())));

    return matchesCategory && matchesTemp && matchesSearch && matchesFlavor;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
    return 0;
  });

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(product, 1, {}, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-radial-coffee opacity-95 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Menu Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30">
            <Coffee className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>THE BEVERAGE CATALOG</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            INTERNATIONAL <span className="text-brand-gradient">MENU.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans">
            Explore single-origin thermal extractions, cryogenic sub-zero cold brews, velvet shakes, and artisan pairings.
          </p>
        </div>

        {/* Filter Controls Bar (Section 45) */}
        <div className="p-6 rounded-[32px] bg-[#3C2A21]/90 border border-[#EEDCC6]/20 mb-8 space-y-4 shadow-coffee-card">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-[#EEDCC6]/60 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee, flavors, notes..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-sans text-[#F4E8D1] placeholder-[#EEDCC6]/50 focus:outline-none focus:border-[#EEDCC6]"
              />
            </div>

            {/* Temperature Quick Toggle */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
              {[
                { id: 'ALL', label: 'All Temperatures' },
                { id: 'HOT', label: 'Hot (68°C)', icon: Flame },
                { id: 'COOL', label: 'Cool (04°C)', icon: Snowflake },
                { id: 'SHAKE', label: 'Shakes', icon: RotateCw },
              ].map((t) => {
                const Icon = t.icon;
                const isSelected = activeTemp === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTemp(t.id)}
                    className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all flex-shrink-0 ${
                      isSelected
                        ? 'bg-brand-gradient text-[#2A1B16] shadow-cream-glow font-black'
                        : 'bg-[#2A1B16] text-[#EEDCC6]/80 hover:text-[#F4E8D1] border border-[#EEDCC6]/20'
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Flavor Filter & Sort */}
            <div className="flex items-center space-x-3 w-full lg:w-auto">
              <select
                value={selectedFlavorFilter}
                onChange={(e) => setSelectedFlavorFilter(e.target.value)}
                className="px-4 py-2.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none"
              >
                <option value="ALL">All Flavors</option>
                <option value="Vanilla">Vanilla</option>
                <option value="Caramel">Caramel</option>
                <option value="Cocoa">Chocolate / Mocha</option>
                <option value="Pistachio">Pistachio / Nutty</option>
                <option value="Honey">Sweet / Honey</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none"
              >
                <option value="featured">Featured Curations</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Horizontal Pills (Section 15) */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-3 no-scrollbar border-t border-[#2A1B16]">
            {menuCategories.map((cat) => {
              const isCatActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all flex-shrink-0 ${
                    isCatActive
                      ? 'bg-brand-gradient text-[#2A1B16] shadow-sm font-black'
                      : 'bg-[#2A1B16] text-[#EEDCC6]/80 hover:text-[#F4E8D1] border border-[#EEDCC6]/20'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Coffee Laboratory Shortcut Banner */}
        <div className="mb-10 p-6 rounded-3xl bg-[#3C2A21] border-2 border-[#EEDCC6]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-[#EEDCC6] animate-pulse flex-shrink-0" />
            <div>
              <div className="font-display font-bold text-base text-[#F4E8D1]">
                WANT TO ENGINEER YOUR OWN BESPOKE BLEND?
              </div>
              <div className="text-xs text-[#EEDCC6]/80 font-sans">
                Choose your vessel, flavor particles, and thermal state in the 3D Coffee Lab.
              </div>
            </div>
          </div>
          <button
            onClick={() => startPageTransition('/make-your-coffee', 'COFFEE LAB')}
            className="px-6 py-2.5 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-sm hover:brightness-105 transition-all flex-shrink-0"
          >
            LAUNCH COFFEE LAB
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product._id || idx}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
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
                    {product.flavorNotes?.map((note, nIdx) => (
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
                  CUSTOMIZE & SPECS →
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
    </div>
  );
};

export default Menu;
