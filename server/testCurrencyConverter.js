import assert from 'assert';
import {
  convertPrice,
  formatCurrency,
  getExchangeRate,
  listSupportedCurrencies,
  SUPPORTED_CURRENCIES
} from './utils/currencyConverter.js';

console.log('--- Running Currency Converter Test Suite ---');

// Test 1: Identity conversion (same currency)
const identityINR = convertPrice(500, 'INR', 'INR');
assert.strictEqual(identityINR, 500, 'Converting INR to INR should return identical amount');

const identityUSD = convertPrice(25.5, 'USD', 'USD');
assert.strictEqual(identityUSD, 25.5, 'Converting USD to USD should return identical amount');

// Test 2: INR to USD conversion
// 835 INR at rate 83.5 INR/USD should be 10.00 USD
const usdResult = convertPrice(835, 'INR', 'USD');
assert.strictEqual(usdResult, 10.0, '835 INR should convert to exactly 10.00 USD');

// Test 3: USD to INR conversion (Inverse)
// 10 USD should convert back to 835 INR
const inrBack = convertPrice(10, 'USD', 'INR');
assert.strictEqual(inrBack, 835.0, '10 USD should convert back to 835 INR');

// Test 4: Cross-currency conversion (USD to EUR)
// 100 USD = 8350 INR. 8350 / 90.2 = ~92.57 EUR
const eurResult = convertPrice(100, 'USD', 'EUR');
assert.strictEqual(eurResult, 92.57, '100 USD should convert to 92.57 EUR');

// Test 5: Supported currencies listing
const currencies = listSupportedCurrencies();
assert.ok(currencies.length >= 7, 'Should support at least 7 currencies');
assert.ok(currencies.some((c) => c.code === 'INR' && c.symbol === '₹'));
assert.ok(currencies.some((c) => c.code === 'USD' && c.symbol === '$'));
assert.ok(currencies.some((c) => c.code === 'JPY' && c.symbol === '¥'));

// Test 6: Currency formatting
const formattedINR = formatCurrency(1250, 'INR');
assert.ok(formattedINR.includes('1,250') || formattedINR.includes('1250'), 'Should format INR amount');

// Test 7: Error handling for negative or invalid inputs
assert.throws(() => {
  convertPrice(-50, 'INR', 'USD');
}, /Invalid amount provided/, 'Should throw on negative amounts');

assert.throws(() => {
  convertPrice(100, 'XYZ', 'USD');
}, /Unsupported source currency/, 'Should throw on unsupported currency');

console.log('✅ All Currency Converter tests passed successfully!');
