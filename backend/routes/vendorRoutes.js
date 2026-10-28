import { Router } from "express";
import {
  getNearbyVendors,
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendorLocation,
  toggleVendorStatus,
  getWhatsAppShare
} from "../controllers/vendorController.js";

const router = Router();

router.get("/nearby", getNearbyVendors);
router.get("/:id", getVendorById);
router.get("/:id/whatsapp-share", getWhatsAppShare);
router.post("/", createVendor);
router.put("/:id/location", updateVendorLocation);
router.put("/:id/status", toggleVendorStatus);
router.get("/", getAllVendors);

export default router;

