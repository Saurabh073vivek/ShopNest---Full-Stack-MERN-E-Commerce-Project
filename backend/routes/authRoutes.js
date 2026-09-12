const express = require("express");

const {
  registerUser,
  verifyOTP,
  loginUser,
  getUsers,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  admin,
} = require("../middleware/adminMiddleware");

const routes = express.Router();


// Register
routes.post(
  "/register",
  registerUser
);


// Verify OTP
routes.post(
  "/verify-otp",
  verifyOTP
);


// Login
routes.post(
  "/login",
  loginUser
);


// Get all users - Admin only
routes.get(
  "/users",
  protect,
  admin,
  getUsers
);


module.exports = routes;