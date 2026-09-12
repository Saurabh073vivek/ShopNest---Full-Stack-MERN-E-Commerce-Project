const Order = require("../model/Order");
const sendEmail = require("../utils/sendEmail");

// ========================================
// Create Order
// ========================================
const createOrder = async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      address,
      paymentId,
    } = req.body;

    if (
      !items ||
      items.length === 0 ||
      !totalAmount ||
      !address
    ) {
      return res.status(400).json({
        message: "Invalid order data",
      });
    }

    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      address,
      paymentId,
    });

    await order.save();

    const message = `
Dear ${req.user.name},

Thank you for your order!

Your order has been successfully created.

Order ID: ${order._id}

Total Amount: $${totalAmount}

Shipping Address:
${address.fullName}
${address.street}
${address.city}
${address.postalCode}
${address.country}

We will notify you once your order is shipped.

Best regards,
ShopNest Team
`;

    await sendEmail(
      req.user.email,
      "ShopNest - Order Created",
      message
    );

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};


// ========================================
// Get My Orders
// ========================================
const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate(
      "items.productId",
      "name price"
    );

    res.json(orders);
  } catch (error) {
    console.error("MY ORDERS ERROR:", error);

    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};


// ========================================
// Get All Orders - Admin
// ========================================
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email");

    res.json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};


// ========================================
// Get Order By ID
// ========================================
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    )
      .populate("user", "name email")
      .populate(
        "items.productId",
        "name price"
      );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // User can only see own order
    // Admin can see any order
    if (
      req.user.role !== "admin" &&
      order.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.json(order);
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    res.status(500).json({
      message: "Error fetching order",
      error: error.message,
    });
  }
};


// ========================================
// Update Order Status - Admin
// ========================================
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "pending",
      "shipped",
      "delivered",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(
      "UPDATE ORDER STATUS ERROR:",
      error
    );

    res.status(500).json({
      message: "Error updating order status",
      error: error.message,
    });
  }
};


module.exports = {
  createOrder,
  myOrders,
  getOrders,
  getOrderById,
  updateOrderStatus,
};