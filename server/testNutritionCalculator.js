import assert from 'assert';
import { calculateBeverageNutrition } from './utils/nutritionCalculator.js';

console.log('--- Running Nutrition Calculator Test Suite ---');

// Test 1: Black double espresso without milk or flavors
const espressoNutrition = calculateBeverageNutrition({
  roastType: 'espresso',
  shots: 2,
  volumeMl: 60,
  milkType: 'none',
  flavors: []
});

assert.strictEqual(espressoNutrition.calories, 10, 'Double espresso should be ~10 calories');
assert.strictEqual(espressoNutrition.caffeineMg, 128, 'Double espresso should be 128mg caffeine');
assert.strictEqual(espressoNutrition.sugarsG, 0, 'Espresso alone should have 0 sugar');

// Test 2: Oat milk beverage with vanilla flavor
const oatLatte = calculateBeverageNutrition({
  roastType: 'espresso',
  shots: 2,
  volumeMl: 300,
  milkType: 'oat',
  flavors: [{ name: 'Vanilla', intensity: 'MEDIUM' }]
});

assert.ok(oatLatte.calories > 50, 'Oat latte should have positive caloric content');
assert.ok(oatLatte.sugarsG > 0, 'Oat latte with syrup should have positive sugar');
assert.strictEqual(oatLatte.caffeineMg, 128, 'Caffeine should match 2 espresso shots');

// Test 3: Cold brew calculation by volume
const coldBrewNutrition = calculateBeverageNutrition({
  roastType: 'coldBrew',
  shots: 0,
  volumeMl: 400,
  milkType: 'none',
  flavors: []
});

assert.strictEqual(coldBrewNutrition.calories, 8, '400ml cold brew should have 8 calories');
assert.strictEqual(coldBrewNutrition.caffeineMg, 180, '400ml cold brew should have 180mg caffeine');

console.log('✅ All Nutrition Calculator tests passed successfully!');
