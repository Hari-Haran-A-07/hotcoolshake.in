# HOT COOL SHAKE REST API Reference (v2.0)

Welcome to the **HOT COOL SHAKE API Documentation**. This document covers primary endpoints, payload schemas, and headers required to interact with the backend services.

## Base URLs
- **Production**: `https://hotcoolshake.in/api`
- **Development**: `http://localhost:5000/api`

---

## Endpoints

### 1. Health Check
- **`GET /api/health`**
- **Response**:
```json
{
  "status": "online",
  "brand": "HOT COOL SHAKE",
  "motto": "HOT. COOL. YOUR WAY.",
  "timestamp": "2026-10-13T14:40:00.000Z"
}
```

### 2. Products Catalog
- **`GET /api/products`**
- Returns all handcrafted hot coffees, nitro cold brews, signature shakes, and pastries.
- Filter by `category` or `temperature` query params:
  - `GET /api/products?category=COLD_BREW`

### 3. Bottles & Vessels
- **`GET /api/bottles`**
- Retrieves the 5 patented vessels:
  - Signature Thermal Vessel (500ml)
  - Cryogenic Double-Wall Flask (750ml)
  - Tokyo Glass Flask (350ml)
  - Minimalist Vacuum Tumbler (400ml)
  - Ceramic Heritage Carafe (1000ml)

### 4. Flavors & Aromas
- **`GET /api/flavors`**
- Returns 15 single-origin botanical flavor drops (e.g., Madagascar Vanilla Bean, Golden Honey Blossom, Smoked Oak).

### 5. Custom Coffee Creation
- **`POST /api/custom-coffee`**
- **Request Body**:
```json
{
  "creatorName": "Julian Ross",
  "customBlendTitle": "Cryo Velvet Reserve",
  "bottle": { "name": "Cryogenic Double-Wall Flask", "capacity": "750ml", "price": 12.00 },
  "roastBase": "Ethiopian Yirgacheffe Light Roast",
  "temperature": "CRYOGENIC_CHILL",
  "flavors": [
    { "name": "Madagascar Vanilla Bean", "intensity": "MEDIUM" }
  ]
}
```

### 6. Tasting Feedback & NPS
- **`POST /api/feedback`**
- Submits palate evaluation, NPS score (0 - 10), and sensory observations.
- **`GET /api/feedback`**
- Returns summary statistics and recent feedback.

### 7. Satellite Telemetry
- **`GET /api/telemetry/live`**
- Returns real-time Aero-Grid™ metrics: roast drum pressures, extraction bar temperatures, and flagship status.

---

## Authentication
Protected routes require a Bearer token in the `Authorization` header:
```
Authorization: Bearer <jwt-token>
```
Tokens are issued via `POST /api/auth/login` or `POST /api/auth/register`.
