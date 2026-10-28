# 🌐 StreetSpot: REST API Specification

This document details all backend REST API endpoints, request payloads, query parameters, and response structures.

**Base URL:** `http://localhost:7000/api`

---

## 1. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/register`
Register a new customer or vendor account.
- **Access:** Public
- **Request Body:**
```json
{
  "name": "Ravi Kumar",
  "email": "ravi@streetspot.com",
  "phone": "+919876543210",
  "password": "securepassword123",
  "role": "vendor" // or "customer"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsIn...",
  "user": {
    "_id": "65f12a3b...",
    "name": "Ravi Kumar",
    "email": "ravi@streetspot.com",
    "role": "vendor"
  }
}
```

---

### `POST /api/auth/login`
Authenticate user and return JWT bearer token.
- **Access:** Public
- **Request Body:**
```json
{
  "email": "ravi@streetspot.com",
  "password": "securepassword123"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsIn...",
  "user": {
    "_id": "65f12a3b...",
    "name": "Ravi Kumar",
    "email": "ravi@streetspot.com",
    "role": "vendor"
  }
}
```

---

## 2. Hyperlocal Vendor & Discovery Endpoints (`/api/vendors`)

### `GET /api/vendors/nearby`
**Core Discovery Endpoint.** Finds stalls within a specified radius of coordinates.
- **Access:** Public
- **Query Parameters:**
  - `lng` (Required, float): Longitude of customer (e.g. `77.5946`)
  - `lat` (Required, float): Latitude of customer (e.g. `12.9716`)
  - `radius` (Optional, number in meters): Default `3000` (3 km)
  - `category` (Optional, string): Filter by category (e.g. `street-food`, `fruits-veg`)
- **Sample Request:** `GET /api/vendors/nearby?lng=77.5946&lat=12.9716&radius=2000&category=street-food`
- **Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65f13b4c...",
      "businessName": "Ravi's Pani Puri & Chaat",
      "category": "street-food",
      "description": "Authentic Mumbai style pani puri & sev puri with mineral water.",
      "bannerImage": "https://images.unsplash.com/photo-...",
      "contactPhone": "+919876543210",
      "whatsappNumber": "+919876543210",
      "addressLandmark": "Opposite Metro Gate 2, Indiranagar",
      "location": {
        "type": "Point",
        "coordinates": [77.5950, 12.9720]
      },
      "distanceMeters": 180,
      "isOpen": true,
      "rating": 4.8,
      "activeOffer": {
        "title": "10% off between 4 PM - 6 PM today!",
        "discountPercentage": 10
      }
    }
  ]
}
```

---

### `GET /api/vendors/:id`
Fetch single stall profile, full menu, and active flash offers.
- **Access:** Public
- **Response (200 OK):**
```json
{
  "success": true,
  "vendor": { ... },
  "products": [ ... ],
  "activeOffers": [ ... ]
}
```

---

### `PUT /api/vendors/location`
Vendor updates their real-time stall coordinates.
- **Access:** Private (Vendor only)
- **Headers:** `Authorization: Bearer <TOKEN>`
- **Request Body:**
```json
{
  "longitude": 77.5948,
  "latitude": 12.9718,
  "addressLandmark": "Moved 50m ahead, next to City Bakery"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Live stall location updated successfully",
  "location": {
    "type": "Point",
    "coordinates": [77.5948, 12.9718]
  }
}
```

---

### `PUT /api/vendors/status`
Toggle stall status (Open / Closed).
- **Access:** Private (Vendor only)
- **Request Body:**
```json
{
  "isOpen": true
}
```

---

## 3. Product / Menu Endpoints (`/api/products`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products/vendor/:vendorId` | Public | Get all menu items for a specific stall. |
| `POST` | `/api/products` | Private (Vendor) | Add a new dish/item to the stall's menu. |
| `PUT` | `/api/products/:id` | Private (Vendor) | Edit item name, price, availability, or image. |
| `DELETE` | `/api/products/:id` | Private (Vendor) | Delete an item from the menu. |

---

## 4. Flash Offers Endpoints (`/api/offers`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/offers/active` | Public | Fetch all active flash offers around current location. |
| `POST` | `/api/offers` | Private (Vendor) | Create a flash offer with expiry time & discount. |
| `DELETE` | `/api/offers/:id` | Private (Vendor) | Deactivate or remove an existing offer. |

---

## 5. WhatsApp & QR Utilities (`/api/vendors/:id/share`)

### `GET /api/vendors/:id/share-link`
Generates pre-formatted WhatsApp share text and Web Share payload.
- **Response (200 OK):**
```json
{
  "success": true,
  "whatsappUrl": "https://api.whatsapp.com/send?text=Hey!%20Check%20out%20Ravi%27s%20Pani%20Puri%20on%20StreetSpot...",
  "directChatUrl": "https://wa.me/919876543210?text=Hello%20Ravi,%20I%20am%20at%20your%20stall%20via%20StreetSpot!",
  "shareText": "Hey! Check out Ravi's Pani Puri on StreetSpot. Fresh chaat & exclusive offers! 📍 View location: http://localhost:5173/stall/65f13b4c"
}
```

