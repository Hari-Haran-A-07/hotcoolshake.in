import React, { useState, useEffect } from 'react';
import { CURRENCIES, getPreferredCurrency, setPreferredCurrency } from '../../utils/currency';
import { ChevronDown } from 'lucide-react';

export const CurrencySelector = () => {
  const [current, setCurrent] = useState(getPreferredCurrency);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleCurrencyChange = (e) => {
      setCurrent(e.detail);
    };
    window.addEventListener('hcs_currency_changed', handleCurrencyChange);
    return () => window.removeEventListener('hcs_currency_changed', handleCurrencyChange);
  }, []);

  const handleSelect = (code) => {
    setPreferredCurrency(code);
    setCurrent(CURRENCIES[code]);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-[#3C2A21]/70 hover:bg-[#3C2A21] border border-[#EEDCC6]/20 text-[#EEDCC6] text-xs font-mono transition-all"
        title="Select Currency"
        aria-label="Currency Selector"
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="font-bold">{current.code}</span>
        <ChevronDown className={`w-3 h-3 text-[#EEDCC6]/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/20 shadow-2xl z-50 py-1.5 overflow-hidden backdrop-blur-md">
            <div className="px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-[#EEDCC6]/40">
              Select Currency
            </div>
            {Object.values(CURRENCIES).map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleSelect(curr.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  current.code === curr.code
                    ? 'bg-[#EEDCC6]/15 text-[#EEDCC6] font-bold'
                    : 'text-[#EEDCC6]/80 hover:bg-[#3C2A21] hover:text-[#F4E8D1]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{curr.flag}</span>
                  <span>{curr.code}</span>
                </div>
                <span className="font-mono text-[11px] text-[#EEDCC6]/50">{curr.symbol}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencySelector;
