import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Route imports
import vendorRoutes from "./routes/vendorRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import { vendors, offers } from "./data/mockVendors.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 7000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve Mobile-First Web Client from ../frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// API Routes Mount
app.use("/api/vendors", vendorRoutes);
app.use("/api/products", productRoutes);
app.use("/api/offers", offerRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "StreetSpot API Engine is running smoothly 🚀",
    activeStalls: vendors.length,
    activeOffers: offers.filter((o) => o.isActive).length,
    timestamp: new Date().toISOString()
  });
});

// Interactive API Documentation / Test Dashboard
app.get("/api/docs", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>StreetSpot 📍 API Dashboard</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        body { background: #0f172a; color: #f8fafc; padding: 30px 20px; }
        .container { max-width: 900px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 30px; }
        .badge { background: #10b981; color: #022c22; font-size: 13px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; display: inline-block; margin-bottom: 10px; }
        h1 { font-size: 32px; color: #f59e0b; margin-bottom: 8px; }
        p.tagline { color: #94a3b8; font-size: 16px; margin-bottom: 25px; }
        .nav-back { display: inline-block; margin-bottom: 20px; color: #38bdf8; text-decoration: none; font-size: 14px; font-weight: 600; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; transition: transform 0.2s; }
        .card:hover { transform: translateY(-3px); border-color: #f59e0b; }
        .card h3 { color: #38bdf8; font-size: 18px; margin-bottom: 8px; }
        .card p { color: #cbd5e1; font-size: 13px; margin-bottom: 12px; }
        .btn { display: inline-block; background: #f59e0b; color: #0f172a; font-weight: 600; text-decoration: none; padding: 8px 14px; border-radius: 6px; font-size: 13px; }
        .btn:hover { background: #fbbf24; }
        .routes-section { background: #1e293b; border-radius: 12px; padding: 25px; border: 1px solid #334155; }
        .routes-section h2 { font-size: 20px; color: #f8fafc; margin-bottom: 15px; border-bottom: 1px solid #334155; padding-bottom: 10px; }
        .route-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #1e293b; font-size: 14px; }
        .method { font-weight: 700; font-size: 11px; padding: 3px 8px; border-radius: 4px; margin-right: 10px; }
        .get { background: #065f46; color: #34d399; }
        .post { background: #1e3a8a; color: #60a5fa; }
        .put { background: #78350f; color: #fbbf24; }
        .delete { background: #7f1d1d; color: #f87171; }
        .route-link { color: #38bdf8; text-decoration: none; font-family: monospace; }
        .route-desc { color: #94a3b8; font-size: 12px; margin-left: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="/" class="nav-back">← Open Mobile App View</a>
        <div class="header">
          <span class="badge">● SERVER ACTIVE (PORT ${PORT})</span>
          <h1>📍 StreetSpot API Hub</h1>
          <p class="tagline">Hyperlocal Street Vendor Discovery Engine</p>
        </div>

        <div class="grid">
          <div class="card">
            <h3>🍜 Live Stalls</h3>
            <p>${vendors.length} demo vendors active in system</p>
            <a href="/api/vendors" class="btn" target="_blank">View All Stalls</a>
          </div>
          <div class="card">
            <h3>📍 Nearby Discovery</h3>
            <p>Haversine GPS distance calculation test.</p>
            <a href="/api/vendors/nearby?lat=12.9716&lng=77.5946&radius=3000" class="btn" target="_blank">Test Nearby Stalls</a>
          </div>
          <div class="card">
            <h3>⚡ Flash Offers</h3>
            <p>Active clearance deals with auto-expiry.</p>
            <a href="/api/offers/active" class="btn" target="_blank">View Active Deals</a>
          </div>
        </div>

        <div class="routes-section">
          <h2>🌐 StreetSpot API Routes</h2>
          
          <div class="route-item">
            <div>
              <span class="method get">GET</span>
              <a href="/api/vendors/nearby?lat=12.9716&lng=77.5946&radius=3000" class="route-link" target="_blank">/api/vendors/nearby</a>
              <span class="route-desc">Customer: Discover nearby stalls with distance & active offers</span>
            </div>
          </div>

          <div class="route-item">
            <div>
              <span class="method get">GET</span>
              <a href="/api/vendors/vend_01" class="route-link" target="_blank">/api/vendors/:id</a>
              <span class="route-desc">Customer: Full stall menu, details, and WhatsApp link</span>
            </div>
          </div>

          <div class="route-item">
            <div>
              <span class="method get">GET</span>
              <a href="/api/vendors/vend_01/whatsapp-share" class="route-link" target="_blank">/api/vendors/:id/whatsapp-share</a>
              <span class="route-desc">Customer/Vendor: Generate viral WhatsApp share & click-to-chat links</span>
            </div>
          </div>

          <div class="route-item">
            <div>
              <span class="method get">GET</span>
              <a href="/api/products/vendor/vend_01" class="route-link" target="_blank">/api/products/vendor/:vendorId</a>
              <span class="route-desc">Customer: View full menu for a specific stall</span>
            </div>
          </div>

          <div class="route-item">
            <div>
              <span class="method get">GET</span>
              <a href="/api/offers/active" class="route-link" target="_blank">/api/offers/active</a>
              <span class="route-desc">Customer: All ongoing flash clearance deals</span>
            </div>
          </div>

          <div class="route-item">
            <div>
              <span class="method put">PUT</span>
              <span class="route-link">/api/vendors/:id/location</span>
              <span class="route-desc">Vendor: 1-Tap update live GPS coordinates & landmark</span>
            </div>
          </div>

          <div class="route-item">
            <div>
              <span class="method put">PUT</span>
              <span class="route-link">/api/vendors/:id/status</span>
              <span class="route-desc">Vendor: Toggle stall status (Open / Closed)</span>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 StreetSpot App running at: http://localhost:${PORT}`);
  console.log(`📱 Mobile Web Interface:     http://localhost:${PORT}`);
  console.log(`📖 API Documentation:        http://localhost:${PORT}/api/docs`);
  console.log(`===============================================`);
});

