import { Router } from "express";
import isAdmin from "../middleware/isAdmin";
import authenticateToken from "../middleware/authenticateToken";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authenticateToken, isAdmin, createProduct);
router.put("/:id", authenticateToken, isAdmin, updateProduct);
router.delete("/:id", authenticateToken, isAdmin, deleteProduct);

export default router;
