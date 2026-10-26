# Changelog

All notable changes to the **HOT COOL SHAKE** project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
