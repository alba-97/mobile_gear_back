const express = require("express");
const router = express.Router();
const validateUser = require("../middleware/auth");
const { usersController } = require("../controller");

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.get("/me", validateUser, usersController.me);

module.exports = router;
