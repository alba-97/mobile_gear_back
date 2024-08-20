import express from "express";
import {
  discountedProducts,
  getProduct,
  listProducts,
} from "../controller/productsController";

const router = express.Router();

router.get("/", listProducts);
router.get("/discounted", discountedProducts);
router.get("/:id", getProduct);

export default router;
