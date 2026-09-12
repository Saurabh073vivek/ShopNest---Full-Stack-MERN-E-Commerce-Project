const express = require("express");

const {
  createOrder,
  getOrders,
  myOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();


// ========================================
// Create Order
// POST /api/orders
// ========================================
router
  .route("/")
  .post(protect, createOrder);


// ========================================
// Get All Orders - Admin
// GET /api/orders
// ========================================
router
  .route("/")
  .get(protect, admin, getOrders);


// ========================================
// Get My Orders
// GET /api/orders/myorders
// ========================================
router
  .route("/myorders")
  .get(protect, myOrders);


// ========================================
// Get Single Order
// GET /api/orders/:id
// ========================================
router
  .route("/:id")
  .get(protect, getOrderById);


// ========================================
// Update Order Status - Admin
// PUT /api/orders/:id/status
// ========================================
router
  .route("/:id/status")
  .put(protect, admin, updateOrderStatus);


module.exports = router;