# 📍 StreetSpot: Discover Local. Support Local.

> **Hyperlocal Micro-Vendor Discovery & Digital Empowerment Platform**  
> *A full-stack MERN application connecting street-side vendors (pani puri carts, fruit stalls, flower sellers) with nearby customers via live GPS discovery, digital menus, flash offers, and WhatsApp sharing.*

---

## 📚 Complete Project Documentation (`/readme` Folder)

The complete architectural and technical specifications have been prepared in the `readme/` folder:

| Document | Description | Link |
| :--- | :--- | :--- |
| **01. Project Overview** | Problem statement, target personas, BBA business model, & monetization | [Read Overview](readme/01_PROJECT_OVERVIEW.md) |
| **02. System Architecture** | High-level architecture, Geo-spatial query engine, & WhatsApp flow | [Read Architecture](readme/02_SYSTEM_ARCHITECTURE.md) |
| **03. Complete Requirements** | Functional & non-functional requirements, hardware & software specs | [Read Requirements](readme/03_ALL_REQUIREMENTS.md) |
| **04. MERN Tech Stack** | Complete package list, development tools, & directory structure | [Read Tech Stack](readme/04_MERN_TECH_STACK.md) |
| **05. Database Design** | MongoDB schemas (Users, Vendors, Products, Offers) & GeoJSON index | [Read DB Design](readme/05_DATABASE_DESIGN.md) |
| **06. REST API Endpoints** | All API route signatures, request bodies, & response examples | [Read API Specs](readme/06_API_ENDPOINTS.md) |
| **07. Execution Roadmap** | The 6-phase implementation plan ready to run when you say **"START"** | [Read Roadmap](readme/07_EXECUTION_ROADMAP.md) |

---

## 🌟 Quick Summary of the System

### 1. The Core Architecture
```
[ Customer / Mobile PWA ]  <=====>  [ Express.js REST API ]  <=====>  [ MongoDB Atlas ]
         |                                   |                              |
         |-- Live GPS Detection              |-- Geospatial $near Query     |-- 2dsphere Spatial Index
         |-- Leaflet Map Pins                |-- JWT Authentication         |-- Stalls & Menus
         |-- 1-Tap WhatsApp Share            |-- Flash Offer Lifecycle      |-- Active Flash Deals
```

### 2. The Tech Stack at a Glance
- **Database:** MongoDB Atlas with `2dsphere` spatial indexing for instant location-based queries (`$near`, `$maxDistance`).
- **Backend:** Node.js & Express.js (Port 7000) with JWT Auth, Mongoose ODM, and CORS.
- **Frontend:** React.js (Vite) + Tailwind CSS for a mobile-first, responsive PWA experience.
- **Maps & Geolocation:** HTML5 Geolocation API + Leaflet / OpenStreetMap (100% free, no credit card required).
- **Social Marketing:** Direct WhatsApp Click-to-Chat (`wa.me`) and Viral Share links (`api.whatsapp.com/send`).

---

## 🚦 Ready to Build?

Everything has been documented, structured, and organized. 

**Whenever you are ready, simply reply with `START` or `LET'S GO`, and we will immediately begin Phase 1: setting up the database connection, models, and backend authentication!**

