import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { usePageLoader } from '../../context/LoadingContext';
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Flame,
  Snowflake,
  Sparkles,
  Coffee,
} from 'lucide-react';

export const WishlistDrawer = () => {
  const { favorites, isWishlistOpen, setIsWishlistOpen, removeFavorite, clearFavorites } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  const { startPageTransition } = usePageLoader();

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  const handleBrowseMenu = () => {
    setIsWishlistOpen(false);
    startPageTransition('/menu', 'BEVERAGE MENU');
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 z-50 bg-[#2A1B16]/80 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#2A1B16] border-l border-[#EEDCC6]/20 shadow-2xl flex flex-col text-[#F4E8D1]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#EEDCC6]/15 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/20">
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-lg text-[#F4E8D1] tracking-wide">
                    SAVED RESERVES
                  </h2>
                  <p className="text-xs font-mono text-[#EEDCC6]/70">
                    {favorites.length} {favorites.length === 1 ? 'Creation' : 'Creations'} Bookmarked
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {favorites.length > 0 && (
                  <button
                    onClick={clearFavorites}
                    className="text-[11px] font-mono text-[#EEDCC6]/60 hover:text-rose-400 transition-colors uppercase px-2 py-1"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 rounded-full hover:bg-[#3C2A21] text-[#EEDCC6] transition-colors"
                  aria-label="Close saved drinks drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="w-16 h-16 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20 flex items-center justify-center text-[#EEDCC6]">
                    <Heart className="w-8 h-8 text-[#EEDCC6]/40" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg text-[#F4E8D1]">
                      NO DRINKS SAVED YET
                    </h3>
                    <p className="text-xs font-mono text-[#EEDCC6]/70 max-w-xs">
                      Bookmark your favorite single-origin extractions or cryogenic drinks from our menu to easily re-order.
                    </p>
                  </div>
                  <button
                    onClick={handleBrowseMenu}
                    className="px-6 py-3 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#F4E8D1] transition-all flex items-center space-x-2"
                  >
                    <span>EXPLORE MENU</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                favorites.map((product) => {
                  const prodId = product._id || product.id || product.slug;
                  return (
                    <motion.div
                      layout
                      key={prodId}
                      className="p-4 rounded-2xl bg-[#3C2A21]/60 border border-[#EEDCC6]/20 flex items-center space-x-4 hover:border-[#EEDCC6]/40 transition-all"
                    >
                      <img
                        src={product.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop'}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#EEDCC6]/15 bg-[#2A1B16]"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5 mb-1">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/20 text-[#EEDCC6] font-bold">
                            {product.temperature === 'HOT' ? 'HOT 68°C' : 'COOL 04°C'}
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-sm text-[#F4E8D1] truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs font-mono font-bold text-[#EEDCC6] mt-0.5">
                          ${product.price?.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col space-y-2 items-end shrink-0">
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className="px-3 py-1.5 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] text-[11px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1 transition-all"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>ADD</span>
                        </button>
                        <button
                          onClick={() => removeFavorite(prodId)}
                          className="p-1.5 text-[#EEDCC6]/50 hover:text-rose-400 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Bottom Drawer Actions */}
            {favorites.length > 0 && (
              <div className="p-6 border-t border-[#EEDCC6]/15 bg-[#2A1B16]">
                <button
                  onClick={handleBrowseMenu}
                  className="w-full py-3.5 rounded-full bg-[#3C2A21] hover:bg-[#4A352A] text-[#F4E8D1] border border-[#EEDCC6]/30 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                >
                  <Coffee className="w-4 h-4 text-[#EEDCC6]" />
                  <span>VIEW COMPLETE MENU</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;
