# 🏛️ StreetSpot: System Architecture & Technical Design

This document details the high-level architecture, module breakdown, spatial discovery engine, and third-party integrations for **StreetSpot**.

---

## 1. High-Level Architecture Diagram

```
+---------------------------------------------------------------------------------------+
|                                    CLIENT LAYER                                       |
|  +--------------------------------------------+  +---------------------------------+  |
|  |     Customer Web App / PWA (Mobile-first)   |  |     Vendor Dashboard / PWA      |  |
|  |   - GPS Location Detection                  |  |   - 1-Tap Live GPS Broadcast    |  |
|  |   - Leaflet / Mapbox Map View               |  |   - Stall Open/Closed Switch    |  |
|  |   - Category Filter (Food, Fruits, etc.)    |  |   - Product & Price Manager     |  |
|  |   - Live Offers & WhatsApp Share            |  |   - Flash Deal Creator          |  |
|  +--------------------------------------------+  +---------------------------------+  |
+-------------------------------------------|-------------------------------------------+
                                            | HTTPS / REST API
                                            v
+---------------------------------------------------------------------------------------+
|                                  API GATEWAY & BACKEND                                |
|  [ Express.js + Node.js Application Server (Port 7000) ]                              |
|                                                                                       |
|  +---------------------+  +---------------------+  +-------------------------------+  |
|  |  Auth Middleware    |  |  Geospatial Engine  |  |  Vendor & Product Controller  |  |
|  |  (JWT & Roles)      |  |  (MongoDB $near)    |  |  (CRUD & Status Toggles)      |  |
|  +---------------------+  +---------------------+  +-------------------------------+  |
|  +---------------------+  +---------------------+  +-------------------------------+  |
|  |  Offers Engine      |  |  Image Upload Svc   |  |  WhatsApp Link Generator      |  |
|  |  (Auto-Expiry)      |  |  (Cloudinary/Multer)|  |  (wa.me / Share Payloads)     |  |
|  +---------------------+  +---------------------+  +-------------------------------+  |
+--------------------|------------------------|------------------------|----------------+
                     |                        |                        |
                     v                        v                        v
+-----------------------------+  +------------------------+  +--------------------------+
|       DATA PERSISTENCE      |  |   CLOUD MEDIA STORAGE  |  |  THIRD PARTY INTEGRATION |
|   MongoDB Atlas Database    |  |       Cloudinary       |  |  WhatsApp Click-to-Chat  |
|  - 2dsphere Spatial Index   |  |  - Vendor Stall Photos |  |  OpenStreetMap / Leaflet  |
|  - Users (Customers/Vendors)|  |  - Product Dish Images |  |  Google Maps Navigation   |
|  - Stalls & Coordinates     |  |  - QR Code Badges      |  |  Web Share API (Mobile)   |
|  - Menus & Flash Offers     |  +------------------------+  +--------------------------+
+-----------------------------+
```

---

## 2. Component Architecture Breakdown

### A. Frontend Layer (React.js + Tailwind CSS + Mobile-First PWA)
- **Customer Interface:**
  - Auto-prompts for user location via HTML5 Geolocation API (`navigator.geolocation.getCurrentPosition`).
  - Displays nearby stalls within selected radius (500m, 1km, 2km, 5km).
  - Interactive map view using OpenStreetMap + Leaflet (free, zero API cost) or Google Maps.
  - Category pill filters: Street Food, Fruits & Veggies, Flowers, Juices & Tea, Local Goods.
  - Direct WhatsApp share button invoking native Web Share API or WhatsApp URL scheme.
- **Vendor Portal:**
  - Fast onboarding (Mobile number / OTP or email login).
  - One-tap "Update My Current Location" button that grabs GPS coordinates and publishes immediately.
  - "Stall Status" switch: Open / Closed.
  - Product Catalog creator: Add Item Name, Category, Price (₹), and optional Photo.
  - Flash Offer maker: Title, Discount %, Start Time, Expiry Time.

### B. Backend Layer (Node.js & Express.js REST API)
- **Controller-Service-Repository Pattern:** Modular and maintainable architecture.
- **Authentication & Authorization:** JWT (JSON Web Tokens) with role checks (`CUSTOMER`, `VENDOR`, `ADMIN`).
- **Geo-Spatial Query Engine:** Utilizes MongoDB's native GeoJSON point structure and `$near` / `$geoWithin` operators to calculate spherical distance in meters.
- **Offer Lifecycle Daemon/Filter:** Automatically filters out expired deals on query time without requiring heavy cron daemons.

### C. Database Layer (MongoDB Atlas)
- Collections: `users`, `vendors`, `products`, `offers`, `categories`, `reviews`.
- Uses geospatial `2dsphere` indexes on coordinates `[longitude, latitude]` for ultra-fast spatial searches.

---

## 3. The Hyperlocal Geolocation Discovery Engine

To allow a customer at `[customer_lng, customer_lat]` to find all street stalls within `radiusInMeters` (e.g., 2000 meters / 2 km):

```
       Customer Position
       (Lng, Lat)
            *
          / | \
   500m  /  |  \  1.2km
        /   |   \
       v    v    v
     Stall1 Stall2 Stall3
   (PaniPuri) (Fruits) (Tea)
```

### MongoDB Query Execution:
```javascript
// GeoJSON Point Search using MongoDB $near
const stalls = await Vendor.find({
  isOpen: true,
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [customerLongitude, customerLatitude]
      },
      $maxDistance: maxRadiusInMeters // e.g. 2000m (2 km)
    }
  }
}).select("businessName category location address bannerImage rating activeOffer");
```

---

## 4. WhatsApp Integration Architecture

StreetSpot empowers street vendors through two distinct WhatsApp mechanisms:

1. **Vendor-to-Customer Sharing (Flyer Generator):**
   - When a vendor creates an offer (e.g., *"10% off Pani Puri till 6 PM"*), the app dynamically formats an engaging WhatsApp share message with emojis, offer description, and a direct link to the stall's live location:
   ```
   https://api.whatsapp.com/send?text=Hey!%20Visit%20Ravi%27s%20Pani%20Puri%20today!%20Get%2010%25%20off%20between%204PM-6PM.%20Find%20our%20stall%20here:%20https://streetspot.app/stall/65f12a...
   ```
2. **Customer-to-Vendor Chat (Click-to-Chat):**
   - Customers can tap a "Chat with Vendor" button to ask queries (*"Bhaiya, is sev puri available today?"*) directly opening WhatsApp without saving the vendor's phone number:
   ```
   https://wa.me/919876543210?text=Hello%20Ravi,%20I%20found%20your%20stall%20on%20StreetSpot!
   ```

---

## 5. Security & Performance Strategy
1. **Rate Limiting:** Protect APIs from scraping using `express-rate-limit`.
2. **Input Validation:** Strict validation using `zod` or `joi` to sanitize stall descriptions and prices.
3. **Optimized Image Delivery:** Images compressed and served via Cloudinary CDN or WebP format for 3G/4G low-bandwidth street environments.
4. **Offline Resilience / PWA Service Worker:** Enables customers to view previously loaded menus even if mobile data drops temporarily.

