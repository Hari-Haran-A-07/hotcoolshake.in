/**
 * Currency Conversion Engine for HOT COOL SHAKE International Orders
 * Base Currency: INR (₹)
 */

export const SUPPORTED_CURRENCIES = {
  INR: { symbol: '₹', name: 'Indian Rupee', rateToINR: 1.0, locale: 'en-IN' },
  USD: { symbol: '$', name: 'US Dollar', rateToINR: 83.5, locale: 'en-US' },
  EUR: { symbol: '€', name: 'Euro', rateToINR: 90.2, locale: 'de-DE' },
  GBP: { symbol: '£', name: 'British Pound', rateToINR: 105.8, locale: 'en-GB' },
  AED: { symbol: 'AED', name: 'UAE Dirham', rateToINR: 22.75, locale: 'ar-AE' },
  JPY: { symbol: '¥', name: 'Japanese Yen', rateToINR: 0.55, locale: 'ja-JP' },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', rateToINR: 62.1, locale: 'en-SG' }
};

/**
 * Converts an amount from one currency to another
 * @param {number} amount - Amount to convert
 * @param {string} from - Source currency code (e.g., 'INR', 'USD')
 * @param {string} to - Target currency code
 * @param {number} [decimalPlaces=2] - Rounding decimal places
 * @returns {number}
 */
export function convertPrice(amount, from = 'INR', to = 'USD', decimalPlaces = 2) {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
    throw new Error(`Invalid amount provided: ${amount}`);
  }

  const fromUpper = from.toUpperCase();
  const toUpper = to.toUpperCase();

  const sourceMeta = SUPPORTED_CURRENCIES[fromUpper];
  const targetMeta = SUPPORTED_CURRENCIES[toUpper];

  if (!sourceMeta) {
    throw new Error(`Unsupported source currency: ${from}`);
  }
  if (!targetMeta) {
    throw new Error(`Unsupported target currency: ${to}`);
  }

  if (fromUpper === toUpper) {
    return Number(amount.toFixed(decimalPlaces));
  }

  // Convert to INR first, then to target currency
  const amountInINR = amount * sourceMeta.rateToINR;
  const targetAmount = amountInINR / targetMeta.rateToINR;

  const factor = Math.pow(10, decimalPlaces);
  return Math.round(targetAmount * factor) / factor;
}

/**
 * Formats a given monetary amount according to the target currency locale and symbol
 * @param {number} amount - Amount
 * @param {string} currencyCode - Currency code
 * @returns {string} Formatted string
 */
export function formatCurrency(amount, currencyCode = 'INR') {
  const code = currencyCode.toUpperCase();
  const meta = SUPPORTED_CURRENCIES[code];

  if (!meta) {
    return `${amount} ${code}`;
  }

  try {
    return new Intl.NumberFormat(meta.locale, {
      style: 'currency',
      currency: code,
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: code === 'JPY' ? 0 : 2
    }).format(amount);
  } catch {
    return `${meta.symbol} ${amount.toFixed(2)}`;
  }
}

/**
 * Retrieves exchange rate multiplier relative to INR
 * @param {string} currencyCode
 * @returns {number}
 */
export function getExchangeRate(currencyCode) {
  const code = currencyCode.toUpperCase();
  const meta = SUPPORTED_CURRENCIES[code];
  if (!meta) {
    throw new Error(`Currency ${currencyCode} not found in rate table`);
  }
  return meta.rateToINR;
}

/**
 * Lists all supported currency codes and metadata
 * @returns {Array<{ code: string, symbol: string, name: string, rateToINR: number }>}
 */
export function listSupportedCurrencies() {
  return Object.entries(SUPPORTED_CURRENCIES).map(([code, meta]) => ({
    code,
    symbol: meta.symbol,
    name: meta.name,
    rateToINR: meta.rateToINR
  }));
}
