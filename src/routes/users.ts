import express from "express";

import { login, logout, me, signup } from "../controller/usersController";
import validateUser from "../middleware/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", validateUser, me);

export default router;
