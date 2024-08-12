import express from "express";

import {
  addCategory,
  deleteCategory,
  editCategory,
  listCategories,
} from "../controller/categoriesController";
import validateUser from "../middleware/auth";

const router = express.Router();

router.get("/", listCategories);
router.post("/", validateUser, addCategory);
router.put("/:id", validateUser, editCategory);
router.delete("/:id", validateUser, deleteCategory);

export default router;
