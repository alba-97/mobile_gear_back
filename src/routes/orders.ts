import express from "express";

import {
  addToCheckout,
  confirmPurchase,
  listAllOrders,
  listCheckout,
  purchaseHistory,
} from "../controllers/order.controller";
import validateUser from "../middleware/validateUser";
import validateAdmin from "../middleware/validateAdmin";

const router = express.Router();

router.post("/checkout", validateUser, addToCheckout);
router.get("/checkout", validateUser, listCheckout);
router.post("/confirm", validateUser, confirmPurchase);
router.get("/history", validateUser, purchaseHistory);

router.get("/", validateUser, validateAdmin, listAllOrders);

export default router;
