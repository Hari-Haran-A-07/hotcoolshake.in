import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('hcs_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('hcs_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to sync favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (product) => {
    if (!product) return;
    const prodId = product._id || product.id || product.slug;
    setFavorites((prev) => {
      const exists = prev.some((p) => (p._id || p.id || p.slug) === prodId);
      if (exists) {
        return prev.filter((p) => (p._id || p.id || p.slug) !== prodId);
      } else {
        return [...prev, product];
      }
    });
  };

  const isFavorite = (productId) => {
    if (!productId) return false;
    return favorites.some((p) => (p._id || p.id || p.slug) === productId);
  };

  const removeFavorite = (productId) => {
    setFavorites((prev) => prev.filter((p) => (p._id || p.id || p.slug) !== productId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleFavorite,
        isFavorite,
        removeFavorite,
        clearFavorites,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
