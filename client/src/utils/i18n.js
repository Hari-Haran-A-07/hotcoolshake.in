/**
 * HOT COOL SHAKE Internationalization (i18n) Engine
 * Supported Locales: en (English), fr (Français), ja (日本語), es (Español)
 */

export const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

const TRANSLATIONS = {
  en: {
    tagline: 'HOT. COOL. YOUR WAY.',
    craftCta: 'MAKE YOUR COFFEE',
    menu: 'MENU',
    telemetry: 'TELEMETRY',
    cart: 'CART',
    orderNow: 'ORDER NOW',
    subtotal: 'SUBTOTAL',
    checkout: 'CHECKOUT',
    thermalExt: 'Thermal Steam Extraction (68°C)',
    cryoExt: 'Sub-Zero Cryo Mist (04°C)',
  },
  fr: {
    tagline: 'CHAUD. FROID. À VOTRE FAÇON.',
    craftCta: 'CRÉEZ VOTRE CAFÉ',
    menu: 'MENU',
    telemetry: 'TÉLÉMÉTRIE',
    cart: 'PANIER',
    orderNow: 'COMMANDER',
    subtotal: 'SOUS-TOTAL',
    checkout: 'COMMANDER',
    thermalExt: 'Extraction Vapeur Thermique (68°C)',
    cryoExt: 'Brume Cryo Sous-Zéro (04°C)',
  },
  ja: {
    tagline: '温も、冷も、あなたらしく。',
    craftCta: 'コーヒーを調合する',
    menu: 'メニュー',
    telemetry: 'テレメトリー',
    cart: 'カート',
    orderNow: '今すぐ注文',
    subtotal: '小計',
    checkout: 'チェックアウト',
    thermalExt: '熱抽出スチーム (68°C)',
    cryoExt: '極低温ミスト冷却 (04°C)',
  },
  es: {
    tagline: 'CALIENTE. FRÍO. A TU MANERA.',
    craftCta: 'CREA TU CAFÉ',
    menu: 'MENÚ',
    telemetry: 'TELEMETRÍA',
    cart: 'CARRITO',
    orderNow: 'ORDENAR AHORA',
    subtotal: 'SUBTOTAL',
    checkout: 'PAGAR',
    thermalExt: 'Extracción Térmica por Vapor (68°C)',
    cryoExt: 'Neblina Criogénica Bajo Cero (04°C)',
  },
};

const STORAGE_KEY = 'hcs_active_locale';

export function getActiveLocale() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }
  return 'en';
}

export function setActiveLocale(locale) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, locale);
    window.dispatchEvent(new CustomEvent('hcs_locale_changed', { detail: { locale } }));
  }
}

export function t(key, defaultVal = '') {
  const loc = getActiveLocale();
  const dict = TRANSLATIONS[loc] || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || defaultVal || key;
}
