import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { SUPPORTED_LOCALES, getActiveLocale, setActiveLocale } from '../../utils/i18n';

export default function LanguageSelector() {
  const [currentLocale, setCurrentLocale] = useState(getActiveLocale);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleLocaleChange = (e) => {
      if (e.detail?.locale) setCurrentLocale(e.detail.locale);
    };
    window.addEventListener('hcs_locale_changed', handleLocaleChange);
    return () => window.removeEventListener('hcs_locale_changed', handleLocaleChange);
  }, []);

  const handleSelect = (code) => {
    setActiveLocale(code);
    setCurrentLocale(code);
    setIsOpen(false);
  };

  const activeObj = SUPPORTED_LOCALES.find((l) => l.code === currentLocale) || SUPPORTED_LOCALES[0];

  return (
    <div className="relative inline-block text-left font-mono">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-[#3C2A21]/70 border border-[#EEDCC6]/20 text-[#EEDCC6] text-xs hover:border-[#EEDCC6] transition-all"
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="font-bold uppercase text-[11px]">{activeObj.code}</span>
        <ChevronDown className="w-3 h-3 text-[#EEDCC6]/70" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/30 shadow-2xl py-1 z-50 backdrop-blur-xl animate-fade-in"
          role="menu"
        >
          {SUPPORTED_LOCALES.map((loc) => (
            <button
              key={loc.code}
              type="button"
              onClick={() => handleSelect(loc.code)}
              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                currentLocale === loc.code
                  ? 'bg-[#EEDCC6] text-[#2A1B16] font-bold'
                  : 'text-[#F4E8D1] hover:bg-[#3C2A21]'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{loc.flag}</span>
                <span>{loc.label}</span>
              </span>
              <span className="text-[10px] uppercase font-mono opacity-60">{loc.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
