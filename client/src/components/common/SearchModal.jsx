import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { api } from '../../services/api';
import { Search, X, Coffee, Sparkles, MapPin, BookOpen, ArrowRight } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [locations, setLocations] = useState([]);
  const { startPageTransition } = usePageLoader();

  useEffect(() => {
    if (!isOpen) return;
    const loadSearchData = async () => {
      try {
        const [prodRes, flvRes, locRes] = await Promise.all([
          api.getProducts({ limit: 50 }),
          api.getFlavors(),
          api.getLocations(),
        ]);
        if (prodRes.success) setProducts(prodRes.products || []);
        if (flvRes.success) setFlavors(flvRes.flavors || []);
        if (locRes.success) setLocations(locRes.locations || []);
      } catch (e) {
        console.warn('Search data load fallback', e);
      }
    };
    loadSearchData();
  }, [isOpen]);

  // Static stories & FAQ data for search
  const stories = [
    { title: 'The Science of Sub-Zero Nitrogen Extraction', category: 'TECHNOLOGY', slug: 'cryo-extraction-science' },
    { title: 'Sourcing Bourbon Vanilla in Madagascar', category: 'SOURCING', slug: 'madagascar-bourbon-vanilla' },
    { title: 'Why 68°C is the Perfect Thermal Drinking Point', category: 'CRAFT', slug: 'thermal-perfection-68c' },
    { title: 'Circular Coffee Vessels: The 100-Year Bottle', category: 'SUSTAINABILITY', slug: 'circular-vessels' },
    { title: 'The Art of Sonic Vortex Beverage Blending', category: 'INNOVATION', slug: 'vortex-blending-art' },
  ];

  const faqs = [
    { question: 'How does the Make Your Coffee lab work?', link: '/make-your-coffee' },
    { question: 'What is the temperature difference between HOT and COOL?', link: '/make-your-coffee' },
    { question: 'How do I earn and redeem Shake Points in Rewards?', link: '/rewards' },
    { question: 'Can I track my courier delivery live?', link: '/track-order' },
    { question: 'Where are HOT COOL SHAKE flagship roasteries located?', link: '/locations' },
  ];

  const query = searchTerm.toLowerCase().trim();

  const searchResults = useMemo(() => {
    if (!query) return null;

    const matchedProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.flavorNotes?.some((fn) => fn.toLowerCase().includes(query)) ||
        p.temperature?.toLowerCase().includes(query)
    );

    const matchedFlavors = flavors.filter(
      (f) =>
        f.name.toLowerCase().includes(query) ||
        f.description?.toLowerCase().includes(query) ||
        f.category?.toLowerCase().includes(query)
    );

    const matchedLocations = locations.filter(
      (l) =>
        l.name.toLowerCase().includes(query) ||
        l.city.toLowerCase().includes(query) ||
        l.country.toLowerCase().includes(query)
    );

    const matchedStories = stories.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
    );

    const matchedFaqs = faqs.filter(
      (f) => f.question.toLowerCase().includes(query)
    );

    return {
      products: matchedProducts,
      flavors: matchedFlavors,
      locations: matchedLocations,
      stories: matchedStories,
      faqs: matchedFaqs,
      total:
        matchedProducts.length +
        matchedFlavors.length +
        matchedLocations.length +
        matchedStories.length +
        matchedFaqs.length,
    };
  }, [query, products, flavors, locations]);

  const handleNavigate = (path, title) => {
    onClose();
    startPageTransition(path, title);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md overflow-y-auto pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-3xl bg-[#2A1B16] rounded-3xl border-2 border-[#EEDCC6]/30 shadow-2xl p-6 relative overflow-hidden"
        >
          {/* Header Search Input */}
          <div className="flex items-center justify-between pb-4 border-b border-[#3C2A21]">
            <div className="flex items-center space-x-3 flex-grow">
              <Search className="w-5 h-5 text-[#EEDCC6]" />
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search coffee, flavors, stores, stories, FAQs (e.g. Vanilla, 68°C, Mumbai)..."
                className="w-full bg-transparent text-[#F4E8D1] placeholder-[#EEDCC6]/50 text-base font-sans focus:outline-none"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#3C2A21] text-[#EEDCC6] hover:bg-[#EEDCC6] hover:text-[#2A1B16] transition-colors ml-3"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions when empty */}
          {!query && (
            <div className="pt-6 space-y-6">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold block mb-3">
                  POPULAR SUGGESTIONS
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Vanilla', 'Mocha', 'Nitro Cold Brew', 'Pistachio', 'Hot 68°C', 'Make Your Coffee', 'London Mayfair', 'Shake Points'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="px-3.5 py-1.5 rounded-full bg-[#3C2A21] hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-xs font-mono text-[#F4E8D1] border border-[#EEDCC6]/20 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold block mb-3">
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <div className="space-y-2">
                  {faqs.slice(0, 3).map((faq, i) => (
                    <button
                      key={i}
                      onClick={() => handleNavigate(faq.link, 'HOT COOL SHAKE FAQ')}
                      className="w-full p-3 rounded-2xl bg-[#3C2A21]/60 hover:bg-[#3C2A21] text-left text-xs font-sans text-[#EEDCC6] hover:text-[#F4E8D1] flex items-center justify-between transition-colors border border-[#EEDCC6]/10"
                    >
                      <span>{faq.question}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#EEDCC6]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Live Search Results Matrix */}
          {searchResults && (
            <div className="pt-6 space-y-6 max-h-[60vh] overflow-y-auto pr-1">
              <div className="flex items-center justify-between text-xs font-mono text-[#EEDCC6]">
                <span>Found {searchResults.total} matches for "{searchTerm}"</span>
              </div>

              {/* Products Matches */}
              {searchResults.products.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold block">
                    BEVERAGES & PRODUCTS ({searchResults.products.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {searchResults.products.slice(0, 6).map((product) => (
                      <div
                        key={product._id || product.slug}
                        onClick={() => handleNavigate(`/menu?product=${product.slug}`, product.name)}
                        className="p-3 rounded-2xl bg-[#3C2A21] hover:border-[#EEDCC6] border border-[#EEDCC6]/20 cursor-pointer transition-all flex items-center space-x-3 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#2A1B16] overflow-hidden flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-display font-bold text-[#F4E8D1] truncate">
                            {product.name}
                          </div>
                          <div className="text-[10px] font-mono text-[#EEDCC6]">
                            ${product.price?.toFixed(2)} • {product.temperature}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavors Matches */}
              {searchResults.flavors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold block">
                    COFFEE FLAVOR LAB ({searchResults.flavors.length})
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {searchResults.flavors.slice(0, 6).map((flv) => (
                      <button
                        key={flv.name}
                        onClick={() => handleNavigate('/make-your-coffee', 'COFFEE LAB')}
                        className="p-2.5 rounded-xl bg-[#3C2A21] text-left text-xs font-mono text-[#F4E8D1] hover:bg-[#EEDCC6] hover:text-[#2A1B16] transition-colors border border-[#EEDCC6]/15 truncate"
                      >
                        <Sparkles className="w-3 h-3 mb-1 text-[#EEDCC6]" />
                        <span className="font-bold block truncate">{flv.name}</span>
                        <span className="text-[9px] opacity-75">{flv.category || 'FLAVOR'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stores Matches */}
              {searchResults.locations.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold block">
                    ROASTERY LOCATIONS ({searchResults.locations.length})
                  </span>
                  <div className="space-y-2">
                    {searchResults.locations.map((loc) => (
                      <div
                        key={loc.name}
                        onClick={() => handleNavigate('/locations', 'STORE LOCATOR')}
                        className="p-3 rounded-2xl bg-[#3C2A21] hover:border-[#EEDCC6] border border-[#EEDCC6]/20 cursor-pointer flex items-center justify-between text-xs font-mono text-[#F4E8D1]"
                      >
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-[#EEDCC6]" />
                          <div>
                            <div className="font-bold">{loc.name}</div>
                            <div className="text-[10px] text-[#EEDCC6]/75">{loc.city}, {loc.country}</div>
                          </div>
                        </div>
                        <span className="text-[10px] text-[#EEDCC6]">VIEW STORE →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stories Matches */}
              {searchResults.stories.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold block">
                    EDITORIAL & STORIES ({searchResults.stories.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.stories.map((story, i) => (
                      <div
                        key={i}
                        onClick={() => handleNavigate('/stories', 'EDITORIAL STORIES')}
                        className="p-3 rounded-xl bg-[#3C2A21]/80 hover:bg-[#3C2A21] cursor-pointer flex items-center justify-between text-xs text-[#F4E8D1]"
                      >
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-[#EEDCC6]" />
                          <span>{story.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#EEDCC6] uppercase font-bold">{story.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.total === 0 && (
                <div className="py-8 text-center text-xs font-mono text-[#EEDCC6]">
                  No exact matches found for "{searchTerm}". Try searching "Vanilla", "68°C", "Cold Brew", or "Locations".
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
