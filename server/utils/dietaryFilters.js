/**
 * Dietary and Allergen Utilities for HOT COOL SHAKE
 */

export const DIETARY_FLAGS = {
  VEGAN: 'VEGAN',
  DAIRY_FREE: 'DAIRY_FREE',
  GLUTEN_FREE: 'GLUTEN_FREE',
  KETO_FRIENDLY: 'KETO_FRIENDLY',
  SUGAR_FREE: 'SUGAR_FREE',
  NUT_FREE: 'NUT_FREE',
};

export const COMMON_ALLERGENS = ['dairy', 'nuts', 'soy', 'gluten', 'caffeine'];

/**
 * Filter beverages according to dietary restrictions
 * @param {Array} items - List of beverage items
 * @param {Array<string>} activePreferences - List of required dietary flags
 */
export function filterByDietaryRestrictions(items = [], activePreferences = []) {
  if (!activePreferences || activePreferences.length === 0) return items;

  return items.filter((item) => {
    const itemDietary = (item.dietary || []).map((d) => d.toUpperCase());
    return activePreferences.every((pref) => itemDietary.includes(pref.toUpperCase()));
  });
}

/**
 * Determine allergen warning badges for a custom crafted beverage
 */
export function evaluateAllergenWarnings(milkBase = '', flavors = []) {
  const warnings = [];

  const lowerMilk = (milkBase || '').toLowerCase();
  if (lowerMilk.includes('whole') || lowerMilk.includes('dairy') || lowerMilk.includes('half')) {
    warnings.push('Contains Dairy');
  } else if (lowerMilk.includes('almond')) {
    warnings.push('Contains Tree Nuts (Almond)');
  } else if (lowerMilk.includes('soy')) {
    warnings.push('Contains Soy');
  }

  flavors.forEach((flavor) => {
    const name = (flavor.name || flavor || '').toLowerCase();
    if (name.includes('pistachio') || name.includes('hazelnut') || name.includes('walnut')) {
      if (!warnings.includes('Contains Tree Nuts')) warnings.push('Contains Tree Nuts');
    }
  });

  return warnings;
}
