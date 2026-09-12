
import React from "react";
import { Link } from "react-router-dom";
import "../styles/product.css";

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                />
            </div>

            <div className="product-info">
                <div>
                    <h3 className="product-name" title={product.name}>
                        {product.name}
                    </h3>

                    <p className="product-price">
                        ${Number(product.price).toFixed(2)}
                    </p>
                </div>

                <Link
                    to={`/products/${product._id}`}
                    className="view-details-button"
                >
                    View Details
                    <span>→</span>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;

