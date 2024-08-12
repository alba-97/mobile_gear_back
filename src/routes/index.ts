import express from "express";

import users from "./users";
import products from "./products";
import admin from "./admin";
import orders from "./orders";
import categories from "./categories";

const router = express.Router();

router.use("/users", users);
router.use("/products", products);
router.use("/admin", admin);
router.use("/orders", orders);
router.use("/categories", categories);

export default router;
