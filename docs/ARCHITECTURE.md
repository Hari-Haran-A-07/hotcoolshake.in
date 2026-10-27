# HOT COOL SHAKE - System Architecture & Engineering Guide

## 1. System Overview

**HOT COOL SHAKE** is a full-stack MERN application offering an artisanal coffee ordering and custom recipe crafting experience. The system is engineered around modular service layers, resilient fallback handling, and responsive frontend design.

```
                    +------------------------+
                    |    React 18 Frontend   |
                    | (Vite + TailwindCSS)   |
                    +-----------+------------+
                                |
                   HTTP / REST  |  JSON Web Tokens
                                v
                    +------------------------+
                    |   Node.js / Express    |
                    |      API Gateway       |
                    +-----------+------------+
                                |
               Mongoose ODM / MongoDB Memory Server
                                v
                    +------------------------+
                    |     MongoDB Atlas /    |
                    |      Memory Store      |
                    +------------------------+
```

## 2. Directory Architecture

```
HOTCOOLSHAKE/
|-- client/
|   |-- src/
|   |   |-- components/common/   # Reusable UI components (Modals, Badges, Drawers)
|   |   |-- context/             # Global React Contexts (Auth, Cart, Toast, Theme)
|   |   |-- hooks/               # Custom hooks (useDebounce, useLocalStorage, etc.)
|   |   |-- pages/               # Top-level view controllers & route components
|   |   |-- sections/home/       # Modular homepage layout strips
|   |   |-- services/            # Axios API clients and audio synthesizers
|   |   `-- utils/               # Formatting, calculations, and validators
|-- server/
|   |-- config/                  # Database connectivity & environment configs
|   |-- controllers/             # Business logic handlers
|   |-- middleware/              # Auth, security guards, error interceptors
|   |-- models/                  # Mongoose data schemas
|   |-- routes/                  # REST endpoint definitions
|   `-- utils/                   # Shared backend calculation & logging engines
`-- docs/                        # Project architectural references & API guides
```

## 3. Core Subsystems

### 3.1 Custom Beverage Customizer & Nutrition Engine
- Dynamic pricing, calorie estimation, and allergen flag detection run client-side for immediate feedback and are verified server-side in `server/utils/nutritionCalculator.js`.

### 3.2 Security & Threat Mitigation
- Input sanitization via `server/utils/sanitizeInput.js`.
- Express rate-limiting, CORS whitelisting, and Helmet headers.
- Non-blocking MongoDB memory server fallback when production Atlas connection is unreachable.

### 3.3 Offline & Resilience Layer
- Cross-tab cart synchronization via `useLocalStorage` and window `storage` events.
- Network status detection via `useNetworkStatus`.
- Graceful degradation with local cache fallback in `storageCache.js`.

## 4. Testing Strategy
- Unit tests run under Node's native `assert` module:
  - `node server/testApi.js`
  - `node server/testSecurity.js`
  - `node server/testDietaryFilters.js`
  - `node server/testDiscountEngine.js`
  - `node server/testNutritionCalculator.js`
