/**
 * International Multi-Currency Conversion & Formatting Engine
 * HOT COOL SHAKE Global Flagship Experience
 */

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, flag: '🇺🇸', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, flag: '🇪🇺', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, flag: '🇬🇧', name: 'British Pound' },
  INR: { code: 'INR', symbol: '₹', rate: 83.5, flag: '🇮🇳', name: 'Indian Rupee' },
  JPY: { code: 'JPY', symbol: '¥', rate: 155.0, flag: '🇯🇵', name: 'Japanese Yen' },
  AED: { code: 'AED', symbol: 'د.إ', rate: 3.67, flag: '🇦🇪', name: 'UAE Dirham' },
};

const STORAGE_KEY = 'hcs_preferred_currency';

export const getPreferredCurrency = () => {
  if (typeof window === 'undefined') return CURRENCIES.USD;
  const saved = localStorage.getItem(STORAGE_KEY);
  return CURRENCIES[saved] || CURRENCIES.USD;
};

export const setPreferredCurrency = (currencyCode) => {
  if (typeof window === 'undefined') return;
  if (CURRENCIES[currencyCode]) {
    localStorage.setItem(STORAGE_KEY, currencyCode);
    window.dispatchEvent(new CustomEvent('hcs_currency_changed', { detail: CURRENCIES[currencyCode] }));
  }
};

export const formatPrice = (priceInUsd, currency = null) => {
  const activeCurr = currency || getPreferredCurrency();
  const converted = Number(priceInUsd || 0) * activeCurr.rate;
  
  if (activeCurr.code === 'JPY') {
    return `${activeCurr.symbol}${Math.round(converted).toLocaleString()}`;
  }
  
  return `${activeCurr.symbol}${converted.toFixed(2)}`;
};
