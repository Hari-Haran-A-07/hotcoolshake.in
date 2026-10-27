import assert from 'assert';
import { calculatePromoDiscount, ACTIVE_PROMO_CODES } from './utils/discountEngine.js';

console.log('--- Running Discount Engine Test Suite ---');

// Test 1: Invalid/empty code
const emptyRes = calculatePromoDiscount('', 50);
assert.strictEqual(emptyRes.valid, false);
assert.strictEqual(emptyRes.discount, 0);
assert.strictEqual(emptyRes.finalTotal, 50);

// Test 2: Valid percentage discount
const welcomeRes = calculatePromoDiscount('WELCOME10', 30);
assert.strictEqual(welcomeRes.valid, true);
assert.strictEqual(welcomeRes.discount, 3);
assert.strictEqual(welcomeRes.finalTotal, 27);

// Test 3: Min spend requirement not met
const lowSpendRes = calculatePromoDiscount('FIRSTBREW', 10);
assert.strictEqual(lowSpendRes.valid, false);
assert.ok(lowSpendRes.message.includes('Minimum order'));

// Test 4: Flat discount calculation
const flatRes = calculatePromoDiscount('SHAKE5', 25);
assert.strictEqual(flatRes.valid, true);
assert.strictEqual(flatRes.discount, 5);
assert.strictEqual(flatRes.finalTotal, 20);

// Test 5: Max discount cap enforced
const cappedRes = calculatePromoDiscount('WELCOME10', 200);
assert.strictEqual(cappedRes.valid, true);
assert.strictEqual(cappedRes.discount, 10, 'Should cap at maximum discount of $10');
assert.strictEqual(cappedRes.finalTotal, 190);

console.log('✅ All Discount Engine tests passed successfully!');
