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
import createProductSchema from "../schemas/product/create.schema";
import editProductSchema from "../schemas/product/edit.schema";

const router = express.Router();

router.get("/", listProducts);
router.get("/discounted", discountedProducts);
router.get("/:id", getProduct);

router.post("/", createProductSchema, validateUser, validateAdmin, addProduct);
router.put("/:id", editProductSchema, validateUser, validateAdmin, editProduct);
router.delete("/:id", validateUser, validateAdmin, deleteProduct);

export default router;
