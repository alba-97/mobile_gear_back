import express from "express";
import {
  addProduct,
  deleteProduct,
  discountedProducts,
  editProduct,
  getProduct,
  listProducts,
} from "../controllers/product.controller";
import validateUser from "../middleware/validateUser";
import validateAdmin from "../middleware/validateAdmin";

const router = express.Router();

router.get("/", listProducts);
router.get("/discounted", discountedProducts);
router.get("/:id", getProduct);

router.post("/", validateUser, validateAdmin, addProduct);
router.put("/:id", validateUser, validateAdmin, editProduct);
router.delete("/:id", validateUser, validateAdmin, deleteProduct);

export default router;
