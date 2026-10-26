import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'hcs_favorite_blends';

export function useFavoriteBlends() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to storage:', e);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((blend) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === blend.id || item.customBlendTitle === blend.customBlendTitle);
      if (exists) {
        return prev.filter((item) => (item.id || item.customBlendTitle) !== (blend.id || blend.customBlendTitle));
      } else {
        return [
          {
            ...blend,
            id: blend.id || `blend_${Date.now()}`,
            savedAt: new Date().toISOString(),
          },
          ...prev,
        ];
      }
    });
  }, []);

  const isFavorite = useCallback(
    (blendIdOrTitle) => {
      return favorites.some((item) => item.id === blendIdOrTitle || item.customBlendTitle === blendIdOrTitle);
    },
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
}
