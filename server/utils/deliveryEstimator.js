/**
 * Delivery Time Estimation Engine for HOT COOL SHAKE Artisanal Beverages
 * Integrates beverage thermal calibration, volume scaling, distance, and peak hour telemetry.
 */

export const TEMPERATURE_CALIBRATION_TIMES = {
  CRYOGENIC: 5, // Cryogenic nitrogen flash-chill & vacuum insulation (+5 mins)
  THERMAL: 4,   // Thermal lock & heat retention calibration (+4 mins)
  AMBIENT: 2    // Standard room-temperature preparation (+2 mins)
};

export const BASE_PREP_MINUTES = 8;
export const MINUTES_PER_KM = 2.5; // Urban courier average transit time
export const ITEM_OVERHEAD_MINUTES = 2; // Incremental time per beverage after first

/**
 * Checks if a given Date is within urban peak demand rush hours
 * @param {Date} date
 * @returns {boolean}
 */
export function isPeakHour(date = new Date()) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeVal = hours + minutes / 60;

  // Morning rush: 8:00 to 10:30
  const isMorningPeak = timeVal >= 8.0 && timeVal <= 10.5;
  // Evening rush: 16:30 to 19:30
  const isEveningPeak = timeVal >= 16.5 && timeVal <= 19.5;

  return isMorningPeak || isEveningPeak;
}

/**
 * Estimates order preparation and transit delivery time
 * @param {{
 *   distanceKm: number,
 *   itemsCount: number,
 *   temperatureMode?: 'CRYOGENIC' | 'THERMAL' | 'AMBIENT',
 *   currentTime?: Date,
 *   isRaining?: boolean
 * }} params
 * @returns {{
 *   prepMinutes: number,
 *   transitMinutes: number,
 *   totalMinutes: number,
 *   eta: string,
 *   isPeakDemand: boolean,
 *   breakdown: {
 *     basePrep: number,
 *     thermalAdjustment: number,
 *     volumeAdjustment: number,
 *     transitDistance: number,
 *     rushHourSurge: number,
 *     weatherAdjustment: number
 *   }
 * }}
 */
export function calculateDeliveryEstimate({
  distanceKm = 3.5,
  itemsCount = 1,
  temperatureMode = 'CRYOGENIC',
  currentTime = new Date(),
  isRaining = false
}) {
  if (distanceKm < 0 || isNaN(distanceKm)) {
    throw new Error(`Invalid distance: ${distanceKm}`);
  }
  if (itemsCount < 1 || isNaN(itemsCount)) {
    throw new Error(`Invalid item count: ${itemsCount}`);
  }

  const mode = temperatureMode.toUpperCase();
  const thermalAdjustment = TEMPERATURE_CALIBRATION_TIMES[mode] ?? TEMPERATURE_CALIBRATION_TIMES.AMBIENT;
  const volumeAdjustment = Math.max(0, itemsCount - 1) * ITEM_OVERHEAD_MINUTES;

  const basePrep = BASE_PREP_MINUTES;
  const prepMinutes = basePrep + thermalAdjustment + volumeAdjustment;

  const rawTransit = distanceKm * MINUTES_PER_KM;
  const weatherAdjustment = isRaining ? 8 : 0;
  const peak = isPeakHour(currentTime);
  const surgeMultiplier = peak ? 1.25 : 1.0;

  const transitMinutes = Math.round((rawTransit + weatherAdjustment) * surgeMultiplier);
  const totalMinutes = Math.round(prepMinutes + transitMinutes);

  const etaDate = new Date(currentTime.getTime() + totalMinutes * 60 * 1000);

  return {
    prepMinutes,
    transitMinutes,
    totalMinutes,
    eta: etaDate.toISOString(),
    isPeakDemand: peak,
    breakdown: {
      basePrep,
      thermalAdjustment,
      volumeAdjustment,
      transitDistance: Math.round(rawTransit),
      rushHourSurge: peak ? Math.round(rawTransit * 0.25) : 0,
      weatherAdjustment
    }
  };
}
