import { Router } from "express";
import {
  getActiveOffers,
  createOffer,
  deleteOffer
} from "../controllers/offerController.js";

const router = Router();

router.get("/active", getActiveOffers);
router.post("/", createOffer);
router.delete("/:id", deleteOffer);

export default router;

