# 📋 StreetSpot: Complete Project Requirements Specification

This document details all **Functional**, **Non-Functional**, **Hardware/Software**, and **External Service** requirements required to build, run, and scale **StreetSpot**.

---

## 1. Functional Requirements (FR)

### A. Customer Module
- **FR-C1: Hyperlocal Discovery:**
  - The app must request the customer's current GPS location.
  - The app must calculate and display nearby vendors within a user-selectable radius (500m, 1km, 3km, 5km).
  - Stalls must be sortable by distance, rating, and active offers.
- **FR-C2: Category Filtering & Search:**
  - Customers can filter by categories: Street Food, Fruits & Vegetables, Flowers & Pooja, Juices & Beverages, Handicrafts & Others.
  - Keyword search by dish or stall name (e.g., "Pani Puri", "Mangoes", "Chai").
- **FR-C3: Stall Profile & Digital Menu:**
  - View vendor details: Business Name, Profile photo/cart photo, Operating hours, Live Status (Open/Closed), Distance, and Address/Landmark.
  - View complete product list with prices (in ₹), description, veg/non-veg tags, and photos.
- **FR-C4: Live Offers & Discounts:**
  - Highlight ongoing flash deals (e.g., "Buy 2 Get 1 Free", "Flat 10% Off 4 PM - 6 PM").
  - Countdown timer indicating when the offer expires.
- **FR-C5: Navigation & Directions:**
  - One-tap "Get Directions" opening the customer's native Google Maps / Apple Maps directed to the vendor's coordinates.
- **FR-C6: Social Sharing (WhatsApp):**
  - Customer can tap "Share Stall" to generate an instant WhatsApp link/message to invite friends to the stall.
  - Customer can tap "Chat on WhatsApp" to message the vendor directly.

---

### B. Vendor Module (Vendor Dashboard)
- **FR-V1: Vendor Registration & Authentication:**
  - Simple signup with Name, Phone Number/Email, Password, and Business Category.
  - Session management using JWT.
- **FR-V2: Real-Time Location Publishing:**
  - One-tap button: "Update My Stall Location Now" that grabs the mobile device's live GPS coordinates (`[longitude, latitude]`) and updates the database instantly.
  - Ability to set a static landmark description (e.g., *"Opposite City Bank ATM, MG Road"*).
- **FR-V3: Live Stall Status Toggle:**
  - Quick toggle button: **🟢 Open Now** / **🔴 Closed Today** / **🚚 Relocated**.
  - Automatically hide closed stalls from the primary discovery feed.
- **FR-V4: Product Catalog Management:**
  - Add, edit, or delete items: Item Name, Price (₹), Category, Image upload, Available/Out-of-stock toggle.
- **FR-V5: Flash Deal / Offer Creator:**
  - Create promotional offers: Title, Discount percentage or combo deal, Start time, and End time.
  - Single-click toggle to activate or deactivate an offer.
- **FR-V6: WhatsApp Marketing Generator:**
  - Auto-generated WhatsApp promo text with stall link ready to send to the vendor's WhatsApp status or broadcast lists.
  - Downloadable or printable QR Code linking directly to the vendor's StreetSpot profile.

---

### C. Admin & Moderation Module (Optional / Phase 2)
- **FR-A1: Vendor Verification:** Review reported fake or abusive listings.
- **FR-A2: Analytics Dashboard:** Total active vendors, searches performed, top categories, and daily active users.

---

## 2. Non-Functional Requirements (NFR)

| Category | Requirement | Specification |
| :--- | :--- | :--- |
| **Usability & UX** | Extreme Simplicity | UI must be intuitive for non-tech-savvy street vendors; large buttons, clear icons, minimal typing. |
| **Performance** | Fast Load Times | Spatial queries (`$near`) must return results in < 300ms for a 5km radius. |
| **Mobile-First** | 100% Responsive PWA | Optimized for budget Android smartphones (3G/4G connections, 360px viewport). |
| **Reliability** | Availability | 99.5% uptime on backend REST APIs. |
| **Security** | Data Protection | Passwords hashed using `bcryptjs` (salt rounds >= 10); JWT authentication with signed tokens. |
| **Cost Efficiency** | Zero Base Infrastructure Cost | Entire stack built using free-tier tools (MongoDB Atlas M0, Render/Vercel free tier, Cloudinary free tier, OpenStreetMap). |

---

## 3. Hardware & Software Requirements

### Development Environment (Your PC / Laptop):
- **Operating System:** Windows 10/11, macOS, or Linux.
- **Runtime Environment:** Node.js (v18.x or v20.x LTS installed).
- **Package Manager:** `npm` (v9+) or `pnpm` / `yarn`.
- **Code Editor:** VS Code or Antigravity IDE with ESLint & Prettier extensions.
- **Testing Tools:** Postman or Thunder Client (for REST API testing), Chrome DevTools (Mobile View Emulator).

### Client / End-User Devices:
- Any modern smartphone (Android / iOS) with GPS location capability and Chrome / Safari / Edge browser.
- WhatsApp installed (for sharing and customer-to-vendor communication).

---

## 4. Third-Party Services & Accounts Needed (All Free Tiers)

1. **MongoDB Atlas:** Free Cloud Database (512MB M0 Cluster).
2. **Cloudinary:** Free Media Storage for vendor photos and dish images (25GB free tier).
3. **Map Tiles Provider:** OpenStreetMap (OSM) via Leaflet.js (100% Free, no credit card required) or Google Maps Geocoding API.
4. **Hosting & Deployment (Future):**
   - Backend API: Render.com or Railway.app (Free Tier).
   - Frontend UI: Vercel or Netlify (Free Tier).

