import assert from 'assert';
import {
  calculateDeliveryEstimate,
  isPeakHour,
  TEMPERATURE_CALIBRATION_TIMES
} from './utils/deliveryEstimator.js';

console.log('--- Running Delivery Estimator Test Suite ---');

// Test 1: Standard single item delivery calculation during off-peak (Local 2 PM)
const offPeakTime = new Date(2026, 10, 1, 14, 0, 0);
const standardEstimate = calculateDeliveryEstimate({
  distanceKm: 2,
  itemsCount: 1,
  temperatureMode: 'AMBIENT',
  currentTime: offPeakTime,
  isRaining: false
});

assert.strictEqual(standardEstimate.prepMinutes, 10, 'Ambient prep time should be 8 + 2 = 10 mins');
assert.strictEqual(standardEstimate.transitMinutes, 5, '2km at 2.5 min/km = 5 mins');
assert.strictEqual(standardEstimate.totalMinutes, 15, 'Total should be 15 mins');
assert.strictEqual(standardEstimate.isPeakDemand, false, '14:00 should not be peak rush');

// Test 2: Cryogenic thermal delay addition
const cryogenicEstimate = calculateDeliveryEstimate({
  distanceKm: 2,
  itemsCount: 1,
  temperatureMode: 'CRYOGENIC',
  currentTime: offPeakTime,
  isRaining: false
});

assert.strictEqual(cryogenicEstimate.prepMinutes, 13, 'Cryogenic prep time should be 8 + 5 = 13 mins');
assert.strictEqual(cryogenicEstimate.totalMinutes, 18, 'Total cryogenic should be 18 mins');

// Test 3: Multiple items volume adjustment
const multiItemEstimate = calculateDeliveryEstimate({
  distanceKm: 2,
  itemsCount: 4,
  temperatureMode: 'THERMAL',
  currentTime: offPeakTime,
  isRaining: false
});

// Thermal prep = 8 (base) + 4 (thermal) + (3 * 2) = 18 mins
assert.strictEqual(multiItemEstimate.prepMinutes, 18, '4 thermal beverages should require 18 mins prep');

// Test 4: Rain weather penalty
const rainEstimate = calculateDeliveryEstimate({
  distanceKm: 2,
  itemsCount: 1,
  temperatureMode: 'AMBIENT',
  currentTime: offPeakTime,
  isRaining: true
});
// 5 min transit + 8 min rain = 13 mins transit
assert.strictEqual(rainEstimate.transitMinutes, 13, 'Rain should add 8 mins transit penalty');

// Test 5: Validation errors on negative values
assert.throws(() => {
  calculateDeliveryEstimate({ distanceKm: -1 });
}, /Invalid distance/, 'Should reject negative distance');

assert.throws(() => {
  calculateDeliveryEstimate({ itemsCount: 0 });
}, /Invalid item count/, 'Should reject item count below 1');

console.log('✅ All Delivery Estimator tests passed successfully!');
