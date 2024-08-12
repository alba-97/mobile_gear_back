import express from "express";

import { listAllOrders } from "../controller/ordersController";
import {
  addProduct,
  deleteProduct,
  editProduct,
} from "../controller/productsController";
import {
  listUsers,
  removeUser,
  switchPrivileges,
} from "../controller/usersController";
import validateUser from "../middleware/auth";

const router = express.Router();

router.post("/products/", validateUser, addProduct);
router.put("/products/:id", validateUser, editProduct);
router.delete("/products/:id", validateUser, deleteProduct);

router.get("/orders", validateUser, listAllOrders);

router.get("/users", validateUser, listUsers);
router.put("/users/:id", validateUser, switchPrivileges);
router.delete("/users/:id", validateUser, removeUser);

export default router;
