# Changelog

All notable changes to the **HOT COOL SHAKE** project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.2.0] - 2026-10-27

### Added
- **Date & Relative Time Utility**: Localized date formatting, brewing timer strings, and human-friendly relative offsets in `client/src/utils/dateFormatter.js`.
- **Form & Input Validation**: Validation for international/Indian phone formats, email regex, coupon code normalization, and password entropy evaluation in `client/src/utils/validation.js`.
- **Caffeine Allowance Tracker**: Beverage-specific caffeine estimator with FDA daily limit (400mg) percentage tracking in `client/src/utils/caffeineCalculator.js`.
- **Flavor & Pastry Pairings**: Gourmet pairing engine matching light, medium, dark, and nitro roasts to artisanal desserts in `client/src/utils/coffeePairings.js`.
- **Brand Palette & Contrast Utility**: Theme color tokens and WCAG 2.1 compliance contrast ratio checker in `client/src/utils/colorPalette.js`.
- **Native Share & Clipboard Fallback**: Cross-platform Web Share API integration in `client/src/utils/shareUtils.js`.
- **Text Receipt Slip Generator**: ASCII receipt formatter for slips and terminal receipts in `client/src/utils/orderReceiptFormatter.js`.
- **Client Analytics Tracker**: Lightweight session storage event queue in `client/src/utils/analyticsTracker.js`.
- **useDebounce Hook**: React debounce hook for search queries and filter inputs in `client/src/hooks/useDebounce.js`.
- **useLocalStorage Hook**: Synchronized local storage hook with cross-tab update propagation in `client/src/hooks/useLocalStorage.js`.
- **useWindowDimensions Hook**: Responsive viewport dimension observer with breakpoint flags in `client/src/hooks/useWindowDimensions.js`.
- **useInterval Hook**: Declarative timer hook adhering to React lifecycle in `client/src/hooks/useInterval.js`.
- **useDocumentTitle Hook**: Dynamic page title and branding updater in `client/src/hooks/useDocumentTitle.js`.
- **useAudioFeedback Hook**: Web Audio API micro-synthesizer for button clicks and success cues in `client/src/hooks/useAudioFeedback.js`.
- **CoffeeRoastBadge Component**: Visual roast indicator pill with roast level styling in `client/src/components/common/CoffeeRoastBadge.jsx`.
- **SkeletonLoader Component**: Shimmer skeleton placeholder for cards and text in `client/src/components/common/SkeletonLoader.jsx`.
- **BadgePill Component**: Dietary (vegan, organic, sugar-free) and seasonal tag component in `client/src/components/common/BadgePill.jsx`.
- **NewsletterModal Component**: Interactive coffee club subscription modal with reward coupon in `client/src/components/common/NewsletterModal.jsx`.
- **Promo Discount Engine**: Server-side coupon verification and threshold calculation in `server/utils/discountEngine.js`.
- **Order Number Generator**: Collision-resistant alphanumeric order identifier generator in `server/utils/orderNumberGenerator.js`.
- **Input Sanitization Utility**: Deep XSS sanitizer escaping unsafe HTML sequences in `server/utils/sanitizeInput.js`.
- **Structured JSON Logger**: Production log dispatcher with severity levels in `server/utils/logger.js`.
- **System Health Diagnostics**: Server memory profiling and MongoDB ping latency check in `server/utils/healthCheck.js`.
- **Dietary Filter Unit Tests**: Test suite for dietary restriction matching in `server/testDietaryFilters.js`.
- **Discount Engine Unit Tests**: Automated unit tests for promo discounts in `server/testDiscountEngine.js`.
- **Nutrition Calculator Unit Tests**: Nutrition and calorie aggregation test suite in `server/testNutritionCalculator.js`.
- **Architecture Documentation**: Comprehensive guide on system topology, caching, and subsystems in `docs/ARCHITECTURE.md`.

---

## [2.1.0] - 2026-10-26

### Added
- **Social Media Metadata**: Complete OpenGraph, Twitter Card, and Apple Web App meta tags in `index.html`.
- **Network Resilience**: `useNetworkStatus` hook and reactive `OfflineBanner` displaying disconnection warnings.
- **Clipboard Utility**: Resilient `copyToClipboard` helper with fallback and toast confirmation.
- **Dietary & Allergen Filtering**: Server utility for filtering menus by Vegan, Gluten-Free, Dairy-Free, and Keto flags.
- **Nutritional Calculation Engine**: `nutritionCalculator` estimating calories, caffeine (mg), sugars, fat, and protein.
- **Nutrition Facts Modal**: Interactive `NutritionFactsModal` component with visual caffeine and calorie gauges.
- **Coffee Flavor Wheel**: `CoffeeFlavorWheel` component offering sensory aroma spectrum notes and profile explorer.
- **Favorite Blends Hook**: `useFavoriteBlends` hook for bookmarking and re-ordering custom crafted bottles.
- **Digital Invoice Generator**: `invoiceGenerator` producing itemized tax receipts with verification hashes.
- **Order Receipt Modal**: `OrderReceiptModal` providing a printable luxury thermal receipt.
- **FAQ Filter Enhancements**: Real-time counter and query reset controls in knowledge base.
- **Barista Appreciation Engine**: `tipCalculator` supporting percentage presets and round-up donation tiers.
- **Interactive Tip Selector**: `BaristaTipSelector` component integrated into ordering workflow.
- **Soundscape Mute Switch**: Instant master mute and volume slider controls in `SensoryAudioPlayer`.
- **Beverage Share Card**: `shareCard` utility utilizing Web Share API with social media fallbacks.
- **Artisan Brewing Chronometer**: `BrewingTimerModal` with preset countdown timers for V60, Espresso, French Press, and Cold Brew.
- **Order Webhook Dispatcher**: `webhookDispatcher` simulating telemetry updates (`CHAMBER_EXTRACTION`, `CLIMATE_LOCK`, `IN_TRANSIT`).
- **Live Order Indicator**: Pulsing radar badge in navigation header linking directly to Order Telemetry.
- **Multi-Language i18n Engine**: Localization dictionary supporting English, French, Japanese, and Spanish.
- **Language Selector Dropdown**: `LanguageSelector` component for instant global locale switching.
- **Environmental Impact Calculator**: `ecoImpact` utility calculating plastic cups saved and CO2 offset.
- **Eco-Savings Widget**: `EcoImpactWidget` highlighting sustainability contributions and trees planted equivalent.
- **Security Defense Unit Tests**: `testSecurity.js` testing HTTP security headers and rate limiter logic.
- **Contributing Guidelines**: Standardized `CONTRIBUTING.md` including Git workflow, Conventional Commits, and code standards.
- **Changelog**: Comprehensive `CHANGELOG.md` tracking all release milestones.

---

## [2.0.0] - Earlier Release

- Virtual Coffee Laboratory (Bottle selection, flavor layering, thermodynamic simulation).
- Dual Temperature Engine (Thermal 68°C vs Cryogenic 04°C).
- OpenAPI specification and interactive API documentation.
- Rate-limiting and security middleware defense layer.
- CI/CD build matrix with GitHub Actions.
