import express from "express";

import {
  listUsers,
  login,
  logout,
  me,
  removeUser,
  signup,
  switchPrivileges,
} from "../controllers/user.controller";
import validateUser from "../middleware/validateUser";
import validateAdmin from "../middleware/validateAdmin";
import editUserSchema from "../schemas/user/edit.schema";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", validateUser, me);

router.get("/", validateUser, validateAdmin, listUsers);
router.put(
  "/:id",
  editUserSchema,
  validateUser,
  validateAdmin,
  switchPrivileges
);
router.delete("/:id", validateUser, validateAdmin, removeUser);

export default router;
