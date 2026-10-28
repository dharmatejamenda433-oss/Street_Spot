# 💻 StreetSpot: Complete MERN Tech Stack Breakdown

This document provides a comprehensive inventory of all technologies, libraries, packages, and tools powering the **StreetSpot MERN Stack application**.

---

## 1. Stack Overview

```
M - MongoDB   : Document database with native Geospatial 2dsphere indexing.
E - Express.js : Lightweight RESTful API server framework on Node.js.
R - React.js   : High-performance, component-based frontend (powered by Vite & Tailwind CSS).
N - Node.js    : Asynchronous JavaScript runtime environment.
```

---

## 2. Backend Tech Stack (Server-Side)

### Core Technologies
- **Runtime:** Node.js (v18.x or v20.x LTS)
- **Framework:** Express.js (v5.x or v4.x)
- **Architecture:** Clean MVC (Model - View/Route - Controller - Middleware)
- **Module System:** ECMAScript Modules (`"type": "module"` in `package.json`)

### NPM Packages (Backend Dependencies):

| Package Name | Purpose / Reason for Inclusion |
| :--- | :--- |
| `express` | Web application framework for routing and middleware. |
| `mongoose` | Object Data Modeling (ODM) library for MongoDB with GeoJSON support. |
| `dotenv` | Loads environment variables from `.env` file into `process.env`. |
| `cors` | Enables Cross-Origin Resource Sharing for communication with frontend. |
| `jsonwebtoken` (`jwt`) | Generates and verifies secure stateless user authentication tokens. |
| `bcryptjs` | Hashes and salts vendor passwords securely before saving to database. |
| `multer` | Handles multipart/form-data for image uploads (vendor photos, menu items). |
| `cloudinary` | Cloud image storage SDK for uploading and delivering optimized images. |
| `multer-storage-cloudinary` | Direct streaming bridge between Multer and Cloudinary. |
| `express-validator` | Validates and sanitizes incoming user input (names, prices, coordinates). |
| `morgan` | HTTP request logger for debugging in development. |
| `qrcode` | Node library to generate dynamic QR codes for vendor stall profiles. |

### Development Dependencies:
- `nodemon`: Automatically restarts the Node server upon file changes.

---

## 3. Frontend Tech Stack (Client-Side)

### Core Technologies
- **Framework:** React.js (v18.x or v19.x)
- **Build Tool:** Vite (Ultra-fast development server and optimized production bundler)
- **Styling:** Tailwind CSS (Utility-first CSS framework for rapid, mobile-first responsive design)
- **Icons:** Lucide React (Clean, modern icon library for stall categories, GPS icons, etc.)

### Frontend Libraries & Utilities:

| Package Name | Purpose / Reason for Inclusion |
| :--- | :--- |
| `react-router-dom` | Client-side routing (Home, Vendor Details, Vendor Portal, Login). |
| `axios` | HTTP client for making API requests to the Express backend. |
| `leaflet` & `react-leaflet` | Free, open-source interactive mapping for displaying vendor pins. |
| `react-hot-toast` | Lightweight, beautiful toast notifications for actions (e.g., "Location updated!"). |
| `canvas-confetti` | Visual celebrations when offers are claimed or shared. |

---

## 4. Mobile & Progressive Web App (PWA) Layer

Instead of forcing users to download an 80MB app from the Play Store, StreetSpot operates as an **installable PWA**:
- **Web App Manifest (`manifest.json`):** Allows customers and vendors to tap **"Add to Home Screen"** on Chrome/Safari, creating an app icon on their phone just like a native app.
- **HTML5 Geolocation API:** Uses `navigator.geolocation.getCurrentPosition()` to obtain precise device latitude and longitude.
- **Web Share API:** Uses `navigator.share()` on mobile devices to open native WhatsApp, Telegram, or SMS share dialogs.

---

## 5. Development Directory Structure Preview

```
streetspot/
├── package.json
├── package-lock.json
├── README.md
├── readme/                         # Comprehensive documentation
│   ├── 01_PROJECT_OVERVIEW.md
│   ├── 02_SYSTEM_ARCHITECTURE.md
│   ├── 03_ALL_REQUIREMENTS.md
│   ├── 04_MERN_TECH_STACK.md
│   ├── 05_DATABASE_DESIGN.md
│   ├── 06_API_ENDPOINTS.md
│   └── 07_EXECUTION_ROADMAP.md
├── src/                            # Backend Source Code
│   ├── .env                        # Environment Configuration
│   ├── server.js                   # Application Entrypoint
│   ├── config/                     # Database & Cloudinary configurations
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── models/                     # Mongoose Schema Definitions
│   │   ├── User.js
│   │   ├── Vendor.js
│   │   ├── Product.js
│   │   └── Offer.js
│   ├── controllers/                # Business logic handlers
│   │   ├── authController.js
│   │   ├── vendorController.js
│   │   ├── productController.js
│   │   └── offerController.js
│   ├── routes/                     # REST API Route Declarations
│   │   ├── authRoutes.js
│   │   ├── vendorRoutes.js
│   │   ├── productRoutes.js
│   │   └── offerRoutes.js
│   └── middlewares/                # Authentication & Error Middlewares
│       ├── authMiddleware.js
│       └── errorMiddleware.js
└── client/                         # Frontend React + Vite Application (Created in Phase 2)
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── components/             # Reusable UI components (Navbar, StallCard, Map)
    │   ├── pages/                  # Page Views (Home, StallDetails, VendorDashboard)
    │   └── services/               # API Callers (api.js)
```

