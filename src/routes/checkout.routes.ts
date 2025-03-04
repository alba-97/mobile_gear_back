import express from "express";
import { createPaymentIntent } from "../controllers/checkout.controller";
import authenticateToken from "../middleware/authenticateToken";

const router = express.Router();

router.post("/create-payment-intent", authenticateToken, createPaymentIntent);

export default router;
