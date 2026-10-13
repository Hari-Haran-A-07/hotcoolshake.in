import { useEffect } from 'react';

/**
 * Global Keyboard Shortcuts Hook
 * Provides tactile accessibility and rapid navigation for baristas and power users.
 */
export const useKeyboardShortcuts = ({
  onToggleSearch,
  onToggleCart,
  onToggleWishlist,
  onToggleHelp,
  onEscape,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is currently typing inside an input, textarea, or contentEditable element
      const targetTag = e.target.tagName.toLowerCase();
      const isInput = targetTag === 'input' || targetTag === 'textarea' || e.target.isContentEditable;

      if (e.key === 'Escape') {
        if (onEscape) onEscape();
        window.dispatchEvent(new CustomEvent('hcs_close_modals'));
        return;
      }

      if (isInput) return;

      // Ctrl+K or Cmd+K or Slash (/) -> Search
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || e.key === '/') {
        e.preventDefault();
        if (onToggleSearch) onToggleSearch();
      }

      // '?' -> Shortcut Help Sheet
      if (e.key === '?') {
        e.preventDefault();
        if (onToggleHelp) onToggleHelp();
      }

      // 'b' or 'B' -> Cart (Shopping Bag)
      if (e.key.toLowerCase() === 'b' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        if (onToggleCart) onToggleCart();
      }

      // 'w' or 'W' -> Wishlist
      if (e.key.toLowerCase() === 'w' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        if (onToggleWishlist) onToggleWishlist();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleSearch, onToggleCart, onToggleWishlist, onToggleHelp, onEscape]);
};

export default useKeyboardShortcuts;
