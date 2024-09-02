import express from "express";

import {
  listUsers,
  login,
  logout,
  me,
  removeUser,
  signup,
  switchPrivileges,
} from "../controller/usersController";
import validateUser from "../middleware/validateUser";
import validateAdmin from "../middleware/validateAdmin";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", validateUser, me);

router.get("/users", validateUser, validateAdmin, listUsers);
router.put("/users/:id", validateUser, validateAdmin, switchPrivileges);
router.delete("/users/:id", validateUser, validateAdmin, removeUser);

export default router;
