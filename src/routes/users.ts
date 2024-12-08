import express from "express";

import {
  listUsers,
  login,
  me,
  removeUser,
  signup,
  switchPrivileges,
} from "../controllers/user.controller";
import validateUser from "../middleware/validateUser";
import validateAdmin from "../middleware/validateAdmin";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", validateUser, me);

router.get("/", validateUser, validateAdmin, listUsers);
router.put("/:id", validateUser, validateAdmin, switchPrivileges);
router.delete("/:id", validateUser, validateAdmin, removeUser);

export default router;
