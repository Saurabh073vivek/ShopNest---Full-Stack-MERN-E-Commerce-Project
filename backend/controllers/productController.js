const Product = require('../model/Product');
const cloudinary = require("../config/cloudinary");


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            res.json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const createProduct = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const {
            name,
            description,
            price,
            category,
            stock,
            imageUrl: bodyImageUrl
        } = req.body;

        let imageUrl = bodyImageUrl || "";

        // If image file is uploaded, upload it to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path
            );

            console.log("CLOUDINARY RESULT:", result);

            imageUrl = result.secure_url;
        }

        // Required field validation
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            stock === undefined ||
            !imageUrl
        ) {
            return res.status(400).json({
                message:
                    "Please provide name, description, price, category, stock and imageUrl"
            });
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);

    } catch (error) {
        console.error("CREATE PRODUCT ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const updateProduct = async (req, res) => {
    try {
        console.log("REQ.BODY:", req.body);

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        console.log("OLD NAME:", product.name);

        const {
            name,
            description,
            price,
            category,
            stock
        } = req.body;

        if (name !== undefined) {
            product.name = name;
        }

        if (description !== undefined) {
            product.description = description;
        }

        if (price !== undefined) {
            product.price = price;
        }

        if (category !== undefined) {
            product.category = category;
        }

        if (stock !== undefined) {
            product.stock = stock;
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            product.imageUrl = result.secure_url;
        }

        console.log("NEW NAME:", product.name);

        const updatedProduct = await product.save();

        console.log("SAVED NAME:", updatedProduct.name);

        res.status(200).json(updatedProduct);

    } catch (error) {
        console.error("UPDATE PRODUCT ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        } 
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};