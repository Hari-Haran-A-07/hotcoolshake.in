import assert from 'assert';
import {
  DIETARY_FLAGS,
  filterByDietaryRestrictions,
  evaluateAllergenWarnings
} from './utils/dietaryFilters.js';

console.log('--- Running Dietary Filters Test Suite ---');

const mockProducts = [
  { id: 1, name: 'Oat Cold Brew', dietary: ['VEGAN', 'DAIRY_FREE'] },
  { id: 2, name: 'Whole Milk Latte', dietary: ['GLUTEN_FREE'] },
  { id: 3, name: 'Almond Keto Mocha', dietary: ['VEGAN', 'DAIRY_FREE', 'KETO_FRIENDLY', 'SUGAR_FREE'] }
];

// Test 1: Empty filter returns all products
const allItems = filterByDietaryRestrictions(mockProducts, []);
assert.strictEqual(allItems.length, 3, 'Should return all items when no preference is selected');

// Test 2: Single flag filter
const veganItems = filterByDietaryRestrictions(mockProducts, [DIETARY_FLAGS.VEGAN]);
assert.strictEqual(veganItems.length, 2, 'Should return 2 vegan items');

// Test 3: Multiple flag filter
const ketoVegan = filterByDietaryRestrictions(mockProducts, [DIETARY_FLAGS.VEGAN, DIETARY_FLAGS.KETO_FRIENDLY]);
assert.strictEqual(ketoVegan.length, 1, 'Should return 1 item matching both vegan and keto-friendly');
assert.strictEqual(ketoVegan[0].id, 3);

// Test 4: Allergen warnings evaluation for dairy
const dairyWarnings = evaluateAllergenWarnings('Whole Milk', []);
assert.ok(dairyWarnings.includes('Contains Dairy'), 'Should detect dairy allergen');

// Test 5: Allergen warnings for almond and hazelnut
const nutWarnings = evaluateAllergenWarnings('Almond Milk', ['Hazelnut Syrup']);
assert.ok(nutWarnings.some((w) => w.includes('Almond')), 'Should detect almond nut warning');
assert.ok(nutWarnings.some((w) => w.includes('Tree Nuts')), 'Should detect hazelnut nut warning');

console.log('✅ All Dietary Filter tests passed successfully!');
