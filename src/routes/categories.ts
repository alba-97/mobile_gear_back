import express from "express";

import {
  addCategory,
  deleteCategory,
  editCategory,
  listCategories,
} from "../controllers/category.controller";
import validateUser from "../middleware/validateUser";
import validateAdmin from "../middleware/validateAdmin";

const router = express.Router();

router.get("/", listCategories);
router.post("/", validateUser, validateAdmin, addCategory);
router.put("/:id", validateUser, validateAdmin, editCategory);
router.delete("/:id", validateUser, validateAdmin, deleteCategory);

export default router;
