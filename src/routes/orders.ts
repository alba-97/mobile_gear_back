import express from "express";

import {
  addToCheckout,
  confirmPurchase,
  listCheckout,
  purchaseHistory,
} from "../controller/ordersController";
import validateUser from "../middleware/auth";

const router = express.Router();

router.post("/checkout", validateUser, addToCheckout);
router.get("/checkout", validateUser, listCheckout);
router.post("/confirm", validateUser, confirmPurchase);
router.get("/history", validateUser, purchaseHistory);

export default router;
