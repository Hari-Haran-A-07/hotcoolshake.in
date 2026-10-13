import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, X, Search, ShoppingBag, Heart, HelpCircle, CornerDownLeft } from 'lucide-react';

export const KeyboardShortcutsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('hcs_toggle_shortcuts', handleToggle);
    window.addEventListener('hcs_close_modals', handleClose);

    return () => {
      window.removeEventListener('hcs_toggle_shortcuts', handleToggle);
      window.removeEventListener('hcs_close_modals', handleClose);
    };
  }, []);

  const shortcuts = [
    { keys: ['Ctrl', 'K'], label: 'Open Instant Search', icon: Search },
    { keys: ['/'], label: 'Quick Focus Search', icon: Search },
    { keys: ['B'], label: 'Open Shopping Bag Drawer', icon: ShoppingBag },
    { keys: ['W'], label: 'Open Saved Reserves / Wishlist', icon: Heart },
    { keys: ['?'], label: 'Toggle Keyboard Shortcuts Modal', icon: HelpCircle },
    { keys: ['Esc'], label: 'Dismiss Any Modal or Drawer', icon: CornerDownLeft },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#0F0B08]/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="relative w-full max-w-md rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/25 p-6 shadow-2xl z-10 text-[#F4E8D1]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#EEDCC6]/15">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-[#3C2A21] border border-[#EEDCC6]/20">
                  <Command className="w-5 h-5 text-[#EEDCC6]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F4E8D1] tracking-wide">
                    Keyboard Shortcuts
                  </h3>
                  <p className="text-xs font-mono text-[#EEDCC6]/60">Tactile Speed Navigation</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#EEDCC6]/60 hover:text-[#F4E8D1] hover:bg-[#3C2A21] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {shortcuts.map((sc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#3C2A21]/40 border border-[#EEDCC6]/10 hover:border-[#EEDCC6]/25 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <sc.icon className="w-4 h-4 text-[#C49A45]" />
                    <span className="text-xs text-[#EEDCC6]/90">{sc.label}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    {sc.keys.map((k, kIdx) => (
                      <kbd
                        key={kIdx}
                        className="px-2 py-0.5 rounded bg-[#1C120C] border border-[#EEDCC6]/25 text-[11px] font-mono font-bold text-[#EEDCC6] shadow-inner"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#EEDCC6]/15 text-center">
              <span className="text-[11px] font-mono text-[#EEDCC6]/50">
                Press <kbd className="px-1.5 py-0.5 rounded bg-[#1C120C] border border-[#EEDCC6]/20 text-[10px]">Esc</kbd> anytime to close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcutsModal;
