import { Router } from "express";
import isAdmin from "../middleware/isAdmin";
import authenticateToken from "../middleware/authenticateToken";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/order.controller";

const router = Router();

router.post("/", authenticateToken, createOrder);
router.get("/", authenticateToken, isAdmin, getAllOrders);
router.get("/my-orders", authenticateToken, getUserOrders);
router.get("/:id", authenticateToken, getOrderById);
router.patch("/:id/status", authenticateToken, isAdmin, updateOrderStatus);

export default router;
