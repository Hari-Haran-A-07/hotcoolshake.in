/**
 * HOT COOL SHAKE Environmental Impact & Carbon Offset Engine
 */

export const IMPACT_METRICS = {
  CO2_GRAMS_PER_CUP: 110, // ~110g CO2 equivalent per single-use cup avoided
  WATER_LITERS_PER_CUP: 1.2, // ~1.2 liters of water saved in manufacturing
  PLASTIC_GRAMS_PER_LID: 15, // ~15g disposable plastic
};

/**
 * Calculates cumulative sustainability savings based on number of reusable orders
 * @param {number} reusableOrdersCount
 */
export function calculateEcoSavings(reusableOrdersCount = 1) {
  const count = Math.max(0, parseInt(reusableOrdersCount, 10) || 0);

  const cupsAvoided = count;
  const co2SavedGrams = count * IMPACT_METRICS.CO2_GRAMS_PER_CUP;
  const waterSavedLiters = Math.round(count * IMPACT_METRICS.WATER_LITERS_PER_CUP * 10) / 10;
  const plasticSavedGrams = count * IMPACT_METRICS.PLASTIC_GRAMS_PER_LID;

  // Trees equivalent (approx 21kg CO2 sequestered per mature tree per year = 21,000g)
  const treesPlantedEquivalent = Math.round((co2SavedGrams / 21000) * 100) / 100;

  return {
    cupsAvoided,
    co2SavedKg: Math.round((co2SavedGrams / 1000) * 100) / 100,
    waterSavedLiters,
    plasticSavedGrams,
    treesPlantedEquivalent,
  };
}
