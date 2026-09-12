const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const Router = express.Router();

// All products
Router.route("/")
    .get(getProducts)
    .post(
        protect,
        admin,
        upload.single("image"),
        createProduct
    );

// Specific product
Router.route("/:id")
    .get(getProductById)
    .put(
        protect,
        admin,
        upload.single("image"),
        updateProduct
    )
    .delete(
        protect,
        admin,
        deleteProduct
    );

module.exports = Router;