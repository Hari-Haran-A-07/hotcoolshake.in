# HOT COOL SHAKE - API & Services v2.3 Guide

This guide documents the enterprise utility engines and telemetry services introduced in the **v2.3** release cycle of **HOT COOL SHAKE**.

---

## 1. Delivery Estimation Engine (`server/utils/deliveryEstimator.js`)

Predictive telemetry engine calculating preparation and transit times based on thermal states, courier distance, and urban peak hours.

### Parameters

| Field | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `distanceKm` | `number` | Courier transit distance from laboratory in kilometers | `3.5` |
| `itemsCount` | `number` | Total number of custom beverages in the order | `1` |
| `temperatureMode` | `string` | `'CRYOGENIC'` \| `'THERMAL'` \| `'AMBIENT'` | `'CRYOGENIC'` |
| `currentTime` | `Date` | Timestamp for rush-hour evaluation | `new Date()` |
| `isRaining` | `boolean` | Weather penalty flag (+8 mins transit delay) | `false` |

### Sample Usage

```javascript
import { calculateDeliveryEstimate } from './utils/deliveryEstimator.js';

const estimate = calculateDeliveryEstimate({
  distanceKm: 4.2,
  itemsCount: 2,
  temperatureMode: 'CRYOGENIC',
  isRaining: false
});

console.log(estimate);
// Output:
// {
//   prepMinutes: 15,
//   transitMinutes: 11,
//   totalMinutes: 26,
//   eta: '2026-11-01T18:45:00.000Z',
//   isPeakDemand: false,
//   breakdown: { basePrep: 8, thermalAdjustment: 5, volumeAdjustment: 2, transitDistance: 11, ... }
// }
```

---

## 2. Multi-Currency Conversion Utility (`server/utils/currencyConverter.js`)

Real-time international currency conversion and locale-aware formatting for overseas orders.

### Supported Currencies

- `INR` (₹) - Base Currency
- `USD` ($) - United States Dollar (83.50)
- `EUR` (€) - Euro (90.20)
- `GBP` (£) - British Pound Sterling (105.80)
- `AED` (AED) - UAE Dirham (22.75)
- `JPY` (¥) - Japanese Yen (0.55)
- `SGD` (S$) - Singapore Dollar (62.10)

### Sample Usage

```javascript
import { convertPrice, formatCurrency } from './utils/currencyConverter.js';

// Convert 2,500 INR to USD
const usdPrice = convertPrice(2500, 'INR', 'USD'); // 29.94

// Format price with locale symbol
const formatted = formatCurrency(usdPrice, 'USD'); // "$29.94"
```

---

## 3. Gift Card & Voucher Engine (`server/utils/giftCardEngine.js`)

Cryptographic token generator with Luhn-variant checksum calculation to generate and redeem digital gift certificates.

### Card Format
- Pattern: `HCS-XXXX-XXXX-C` (where `C` is a verified check character).
- Available Tiers: `BRONZE` (₹500), `SILVER` (₹1000), `GOLD` (₹2500), `PLATINUM` (₹5000), `DIAMOND` (₹10000).

### Sample Usage

```javascript
import {
  generateGiftCardCode,
  verifyGiftCardChecksum,
  redeemGiftCardBalance
} from './utils/giftCardEngine.js';

// Generate new card
const code = generateGiftCardCode(); // e.g. "HCS-7P4K-9W2M-Z"

// Verify validity
const verification = verifyGiftCardChecksum(code);
if (verification.isValid) {
  // Redeem balance
  const result = redeemGiftCardBalance(1000, 450);
  console.log(`Remaining Balance: ₹${result.remainingBalance}`); // 550
}
```

---

## 4. Client Components & Hooks

### `useCopyToClipboard` (`client/src/hooks/useCopyToClipboard.js`)
- React hook offering `copy(text)`, `isCopied`, `error`, and auto-reset timeout.

### `RatingStars` (`client/src/components/common/RatingStars.jsx`)
- Interactive or read-only star component with hover state, numeric score, and review count badge.

### `OrderProgressBar` (`client/src/components/common/OrderProgressBar.jsx`)
- Visual multi-step progress bar showing live beverage state (`RECEIVED` → `BREWING` → `CALIBRATION` → `DISPATCHED` → `DELIVERED`).
