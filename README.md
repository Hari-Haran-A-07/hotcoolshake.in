# HOT COOL SHAKE | International Coffee & Beverage Experience

An international premium coffee and beverage web application built on the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) featuring an interactive **Virtual Coffee Laboratory**, accelerated temperature chamber automation, real-time climate-locked order tracking, and an administrative command center.

---

## ☕ Brand Identity & Exact Palette

- **Brand Name**: HOT COOL SHAKE
- **Main Brand Idea**: *"HOT. COOL. YOUR WAY."*
- **Secondary Messaging**: *"Craft Your Perfect Coffee."* | *"From Your Imagination to Your Cup."* | *"One Coffee. Infinite Possibilities."*
- **Insignia**: **Triple-Wave Emblem** (Rising Steam Wave + Sub-Zero Ice Crystal Facet + Centrifugal Vortex Ribbon)
- **Palette**:
  - `#2A1B16`: Primary Deep Coffee Brown
  - `#3C2A21`: Secondary Espresso Brown
  - `#EEDCC6`: Warm Cream
  - `#F4E8D1`: Premium Ivory

---

## 🌟 Signature Features & Architectural Highlights

### 1. 12-Phase Cinematic Opening Sequence
- Recreates the luxury beverage reference animation:
  1. Minimal Ivory Canvas
  2. Centered HOT COOL SHAKE Vessel Appearance
  3. Continuous Viscous Coffee Liquid Pour
  4. Fluid Viscosity Physics
  5. Bubbling and Turbulence Engine
  6. Thermal Steam Bloom (68°C)
  7. Sub-Zero Frost & Condensation (04°C)
  8. Triple-Wave Emblem Formation
  9. Brand Logo Reveal & Tagline
  10. Seamless Transition to Homepage

### 2. Global 5-Second Branded Page Loading System
- Intentional, cinematic branded transition on major navigations.
- Pulsing Triple-Wave emblem, viscous liquid fill bar, extraction percentage counter (0% to 100%), rotating micro-copy, and a fast-forward skip control.

### 3. "MAKE YOUR COFFEE" — Virtual Coffee Laboratory (The Signature Experience)
- **Step 01: Choose Your Bottle**: Classic Glass Lab (450ml), Signature Thermal Vessel (500ml), Obsidian Premium Flask (550ml), Cryo Chill Hydro (600ml), Aero Sport Flask (750ml).
- **Step 02: Choose Flavor & Intensity**: 15 Global Flavor Library essences (Madagascar Vanilla, Salted Caramel, Belgian Mocha, Pistachio, Irish Cream, Mint, Maple, etc.) with Light, Medium, and Strong intensity calibration and real-time liquid layer reactions.
- **Step 03: Choose Condition (HOT vs COOL)**: Interactive thermal steam (68°C) vs cryogenic frost (04°C) selection.
- **Step 04: Accelerated Automation Chamber Simulation**: Real-time virtual refrigerator cryogenic chamber (04°C) or precision induction heating chamber (68°C) simulation with live temperature and time telemetry.
- **Step 05: Location & Route Telemetry**: Destination entry with animated dispatch journey tracker.
- **Step 06: Final Custom Coffee Reveal**: High-resolution custom bottle with personalized name badge, instant order dispatch, recipe download, and multi-crafting.

### 4. International Beverage Menu (7 Categories)
- Categories: *Hot Coffee*, *Cool Coffee*, *Shakes*, *Signature Drinks*, *Seasonal*, *Desserts*, *Food*.
- Dynamic search, temperature filter pills (Hot, Cool, Shakes), sorting, and interactive *Product Detail Modal* with custom milk, size, and sweetness options.

### 5. Live Order Tracking System (`/track-order/:id`)
- Visual live pipeline:
  `CUSTOMIZED` ➔ `ORDER CONFIRMED` ➔ `PREPARING` ➔ `QUALITY CHECK` ➔ `READY` ➔ `DISPATCHED` ➔ `OUT FOR DELIVERY` ➔ `DELIVERED`
- Real-time courier details, climate-lock temperature telemetry, and an interactive **Advance Order Stage (Simulator)** button for live testing.

### 6. Admin Command Dashboard (`/admin`)
- Real-time MongoDB stats (Gross Revenue, Processed Orders, Custom Lab Formulas, Active Members).
- Order Status Updater (updates database with 1 click).
- Custom Coffee Gallery (inspect user-crafted recipes).
- Catalog CRUD (add/delete menu items).
- Concierge Inquiries Manager.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0+ or v20.0+ (Tested on v24.21.0)
- **npm**: v9.0+ or v11.0+

### Setup & Startup

1. **Install Dependencies**:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

2. **Run in Development Mode** (Starts both Backend on `5000` & Vite on `5173`):
   ```bash
   npm run dev
   ```

3. **Run Production Server** (Builds client and serves on single port `http://localhost:5000`):
   ```bash
   npm run build
   npm start
   ```

> **Zero-Config Database Notice**: The application connects to `MONGODB_URI` if provided in `.env`, or automatically launches an embedded **In-Memory MongoDB** instance and auto-seeds the catalog with 14+ products, 15 flavors, 5 bottles, 7 international hubs, and test orders.

---

## 🔑 Demo & Test Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Director / Admin** | `admin@hotcoolshake.com` | `admin123` |
| **Customer** | `sophia@example.com` | `user123` |

*(Quick 1-click test fill buttons are also provided directly inside the Sign In modal).*

---

## 📁 Repository Structure

```
HOTCOOLSHAKE/
├── client/
│   ├── public/
│   │   └── favicon.svg           # Triple-Wave Emblem SVG
│   ├── src/
│   │   ├── components/
│   │   │   └── common/           # TripleWaveLogo, Header, Footer, CartDrawer,
│   │   │                         # PageLoaderModal, OpeningExperience, CheckoutModal,
│   │   │                         # ProductDetailModal, AuthModal
│   │   ├── context/              # AuthContext, CartContext, LoadingContext
│   │   ├── pages/                # Home, Menu, MakeYourCoffee, OurStory,
│   │   │                         # Locations, Sustainability, Technology,
│   │   │                         # TrackOrder, Contact, AdminDashboard
│   │   ├── sections/home/        # HeroSection, BrandConceptStrip, SignatureLabTeaser,
│   │   │                         # FeaturedMenuSection, StorySection, etc.
│   │   ├── services/             # api.js (REST API Client)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css             # Luxury Coffee Palette & Tailored Utilities
│   └── tailwind.config.js
├── server/
│   ├── config/                   # db.js (MongoDB + Memory Server Fallback)
│   ├── controllers/              # Auth, Product, CustomCoffee, Order, Location, Admin
│   ├── middleware/               # auth.js, errorHandler.js
│   ├── models/                   # User, Product, Category, Flavor, Bottle, CustomCoffee, Order, Location, Review, ContactMessage
│   ├── routes/                   # api.js
│   ├── seed.js                   # High-Fidelity Catalog Seed Data
│   └── server.js                 # Express Application Entrypoint
├── .env.example
├── package.json
└── README.md
```

---

## ☕ HOT COOL SHAKE • "HOT. COOL. YOUR WAY."
