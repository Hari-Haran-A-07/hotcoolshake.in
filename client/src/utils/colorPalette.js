/**
 * Brand Color Palette Tokens & WCAG Contrast Accessibility Helper
 * HOT COOL SHAKE International Coffee Experience
 */

export const BRAND_PALETTE = {
  espresso: '#1A0F0D',
  espressoLight: '#2C1B17',
  amberGold: '#E6A15C',
  amberDark: '#B36D2C',
  cream: '#F7F2EC',
  roastDark: '#120A08',
  nitroCyan: '#38BDF8',
  matchaGreen: '#10B981',
  errorRed: '#EF4444'
};

/**
 * Convert 6-digit hex color to RGB object
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number }|null}
 */
export function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length !== 6) return null;

  return {
    r: parseInt(cleanHex.substring(0, 2), 16),
    g: parseInt(cleanHex.substring(2, 4), 16),
    b: parseInt(cleanHex.substring(4, 6), 16)
  };
}

/**
 * Calculate relative luminance according to WCAG 2.1 specs
 * @param {string} hex
 * @returns {number}
 */
export function getRelativeLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two hex colors (1:1 to 21:1)
 * @param {string} hex1
 * @param {string} hex2
 * @returns {number}
 */
export function getContrastRatio(hex1, hex2) {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

/**
 * Verify whether color pair passes WCAG AA criteria (min 4.5:1 for normal text, 3:1 for large)
 * @param {string} foregroundHex
 * @param {string} backgroundHex
 * @param {boolean} [isLargeText=false]
 * @returns {{ ratio: number, passesAA: boolean, passesAAA: boolean }}
 */
export function checkAccessibilityCompliance(foregroundHex, backgroundHex, isLargeText = false) {
  const ratio = getContrastRatio(foregroundHex, backgroundHex);
  const minAA = isLargeText ? 3.0 : 4.5;
  const minAAA = isLargeText ? 4.5 : 7.0;

  return {
    ratio,
    passesAA: ratio >= minAA,
    passesAAA: ratio >= minAAA
  };
}
