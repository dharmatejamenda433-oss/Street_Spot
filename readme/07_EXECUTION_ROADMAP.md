# 🚀 StreetSpot: Step-by-Step Execution Roadmap

This document outlines the systematic, phased implementation plan that we will execute immediately when you say **"START"**.

---

## 📅 Roadmap Overview

```
[ Phase 1: Foundation & Auth ] ───> [ Phase 2: Geo-Spatial Backend ] ───> [ Phase 3: Customer Web UI ]
                                                                                   │
[ Phase 6: Final Demo & Polish ] <── [ Phase 5: WhatsApp & QR ] <─── [ Phase 4: Vendor Dashboard ]
```

---

## 🛠️ Phase-by-Phase Breakdown

### Phase 1: Backend Foundation & Database Connection
- [ ] Install required backend packages (`mongoose`, `cors`, `jsonwebtoken`, `bcryptjs`, `dotenv`).
- [ ] Configure MongoDB connection module (`src/config/db.js`).
- [ ] Implement Mongoose Schemas:
  - `User.js` (Authentication & Roles)
  - `Vendor.js` (Geospatial 2dsphere indexing)
  - `Product.js` (Menu items & prices)
  - `Offer.js` (Flash discounts)
- [ ] Build Authentication Controller & Routes (`/api/auth/register`, `/api/auth/login`).

### Phase 2: Geospatial Discovery & Vendor Engine
- [ ] Build `$near` spatial query controller (`/api/vendors/nearby`).
- [ ] Implement vendor profile management (`/api/vendors/location`, `/api/vendors/status`).
- [ ] Build Product Catalog CRUD (`/api/products`).
- [ ] Build Flash Offers engine (`/api/offers`).
- [ ] Create mock seed script (`src/seed.js`) with realistic stalls (Ravi's Pani Puri, Fresh Fruit Cart, Lakshmi Flowers) for instant testing.

### Phase 3: Customer Mobile-First Frontend (Vite + React + Tailwind)
- [ ] Initialize `client/` React app with Vite and Tailwind CSS.
- [ ] Build customer Discovery Home Screen:
  - Header with current location indicator & radius selector (500m, 1km, 3km).
  - Category filter pills (🍜 Street Food, 🍎 Fruits, 🌸 Flowers, 🥤 Juice/Tea).
  - Vendor cards showing distance, open status badge, rating, and active offer tag.
- [ ] Integrate Leaflet/OpenStreetMap interactive map view to view stalls as pins.
- [ ] Build Stall Detail Page:
  - Digital menu list with prices in ₹.
  - Active flash offer banner with countdown timer.
  - "Get Directions" button (opens Google Maps).

### Phase 4: Vendor Dashboard & Live GPS Broadcast
- [ ] Build Vendor Login & Signup interface.
- [ ] Create 1-Tap "Broadcast My Current Location" button using HTML5 browser geolocation.
- [ ] Create "Stall Open / Closed" toggle switch.
- [ ] Build Menu Item Manager (Add dish name, price ₹, category, and photo).
- [ ] Build Flash Deal Creator ("Post Today's 10% Off Deal").

### Phase 5: WhatsApp Sharing & QR Standee Generator
- [ ] Build instant WhatsApp share button using `api.whatsapp.com/send` formatted with emojis and link.
- [ ] Build direct customer-to-vendor chat link via `wa.me/<phone>`.
- [ ] Implement QR code generator for vendors to preview and print their stall's digital standee.

### Phase 6: Testing, Polish & BBA Presentation Pack
- [ ] End-to-end user journey test: Customer discovering vendor -> viewing menu -> claiming offer -> sharing on WhatsApp.
- [ ] Polish UI with smooth transitions and mobile viewport optimization.
- [ ] Prepare demo guide and BBA presentation talking points.

