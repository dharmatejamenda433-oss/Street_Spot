import { Router } from "express";
import {
  getProductsByVendor,
  addProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = Router();

router.get("/vendor/:vendorId", getProductsByVendor);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);

export default router;

