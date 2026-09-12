const Order = require("../model/Order");
const Product = require("../model/Product");
const User = require("../model/User");

// ========================================
// Get Admin Statistics
// ========================================
const getAdminStats = async (req, res) => {
    try {
        // ========================================
        // Total Users
        // Count ALL registered users
        // ========================================
        const totalUsers = await User.countDocuments({});

        // ========================================
        // Total Orders
        // ========================================
        const totalOrders = await Order.countDocuments({});

        // ========================================
        // Total Products
        // ========================================
        const totalProducts = await Product.countDocuments({});

        // ========================================
        // Get all orders
        // ========================================
        const orders = await Order.find({});

        // ========================================
        // Calculate Total Revenue
        // ========================================
        const totalRevenue = orders.reduce(
            (total, order) => {
                return total + Number(order.totalAmount || 0);
            },
            0
        );

        // ========================================
        // Send Statistics
        // ========================================
        res.status(200).json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue,
        });

    } catch (error) {
        console.error(
            "GET ADMIN STATS ERROR:",
            error
        );

        res.status(500).json({
            message: "Error fetching stats",
            error: error.message,
        });
    }
};

// ========================================
// Export
// ========================================
module.exports = {
    getAdminStats,
};