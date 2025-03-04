import express from "express";
import { getProfile, login, register } from "../controllers/auth.controller";
import authenticateToken from "../middleware/authenticateToken";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateToken, getProfile);

export default router;
