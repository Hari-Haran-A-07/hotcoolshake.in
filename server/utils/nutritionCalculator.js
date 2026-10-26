/**
 * HOT COOL SHAKE Nutrition Calculator Engine
 * Estimates Calories, Caffeine, Sugars, Fat, and Protein based on recipe ingredients.
 */

const BASE_SPECS = {
  espresso: { caloriesPerShot: 5, caffeinePerShot: 64, sugar: 0, fat: 0, protein: 0.5 },
  coldBrew: { caloriesPer100ml: 2, caffeinePer100ml: 45, sugar: 0, fat: 0, protein: 0.2 },
  matcha: { caloriesPerServing: 25, caffeinePerServing: 35, sugar: 1, fat: 0, protein: 1 },
  decaf: { caloriesPerShot: 4, caffeinePerShot: 2, sugar: 0, fat: 0, protein: 0.5 },
};

const MILK_PER_100ML = {
  whole: { calories: 62, sugar: 4.8, fat: 3.3, protein: 3.1 },
  oat: { calories: 45, sugar: 3.5, fat: 1.5, protein: 1.0 },
  almond: { calories: 24, sugar: 1.5, fat: 1.2, protein: 0.8 },
  coconut: { calories: 38, sugar: 2.8, fat: 2.1, protein: 0.5 },
  soy: { calories: 42, sugar: 2.5, fat: 1.8, protein: 3.0 },
  none: { calories: 0, sugar: 0, fat: 0, protein: 0 },
};

const FLAVOR_INTENSITY_MULTIPLIER = {
  LIGHT: 1,
  MEDIUM: 1.5,
  STRONG: 2.2,
};

/**
 * Calculates nutritional profile for custom crafted or menu items
 */
export function calculateBeverageNutrition({
  roastType = 'espresso',
  shots = 2,
  volumeMl = 450,
  milkType = 'oat',
  flavors = [],
}) {
  let calories = 0;
  let caffeineMg = 0;
  let sugarsG = 0;
  let fatG = 0;
  let proteinG = 0;

  // 1. Roast / Coffee Base
  if (roastType === 'coldBrew') {
    calories += (volumeMl / 100) * BASE_SPECS.coldBrew.caloriesPer100ml;
    caffeineMg += (volumeMl / 100) * BASE_SPECS.coldBrew.caffeinePer100ml;
  } else {
    const base = BASE_SPECS[roastType] || BASE_SPECS.espresso;
    calories += shots * base.caloriesPerShot;
    caffeineMg += shots * base.caffeinePerShot;
    proteinG += shots * base.protein;
  }

  // 2. Milk component (~40% volume if milk beverage)
  const milkKey = Object.keys(MILK_PER_100ML).find((k) => milkType.toLowerCase().includes(k)) || 'none';
  const milkSpec = MILK_PER_100ML[milkKey];
  if (milkKey !== 'none') {
    const milkVolume = volumeMl * 0.4;
    calories += (milkVolume / 100) * milkSpec.calories;
    sugarsG += (milkVolume / 100) * milkSpec.sugar;
    fatG += (milkVolume / 100) * milkSpec.fat;
    proteinG += (milkVolume / 100) * milkSpec.protein;
  }

  // 3. Flavors & Syrups
  flavors.forEach((f) => {
    const intensity = (f.intensity || 'MEDIUM').toUpperCase();
    const mult = FLAVOR_INTENSITY_MULTIPLIER[intensity] || 1.5;
    // Standard syrup pump is ~20 kcal, 5g sugar
    calories += 20 * mult;
    sugarsG += 5 * mult;
  });

  return {
    calories: Math.round(calories),
    caffeineMg: Math.round(caffeineMg),
    sugarsG: Math.round(sugarsG * 10) / 10,
    fatG: Math.round(fatG * 10) / 10,
    proteinG: Math.round(proteinG * 10) / 10,
  };
}
