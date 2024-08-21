const express = require("express");
// const register = require("../controllers/userController.js");
// const login = require("../controllers/userController.js");
// const logout = require("../controllers/userController.js");
// const getOtherUsers = require("../controllers/userController.js");
const isAuthenticated = require("../middleware/isAuthenticated.js");

const {
  register,
  login,
  logout,
  getOtherUsers,
} = require("../controllers/userController.js");

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/").get(isAuthenticated, getOtherUsers);

module.exports = router;
