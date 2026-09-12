import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// User Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import ReturnPolicy from "./pages/ReturnPolicy";
import Disclaimer from "./pages/Disclaimer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/profile";
import OrderSuccess from "./pages/OrderSuccess";

// Admin Pages
import AddProduct from "./admin/AddProduct";
import AdminDashboard from "./admin/AdminDashboard";
import AdminOrders from "./admin/AdminOrders";
import AdminProducts from "./admin/AdminProducts";
import AdminUsers from "./admin/AdminUsers";
import EditProduct from "./admin/EditProduct";

function App() {
  return (
    <Router>
      <div className="app">

        {/* ================= NAVBAR ================= */}
        <Navbar />

        {/* ================= MAIN CONTENT ================= */}
        <main className="main-content">
          <Routes>

            {/* ================= USER ROUTES ================= */}

            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Shop */}
            <Route path="/shop" element={<Shop />} />

            {/* About */}
            <Route path="/about" element={<About />} />

            {/* Return Policy */}
            <Route path="/return" element={<ReturnPolicy />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />

            {/* Disclaimer */}
            <Route path="/disclaimer" element={<Disclaimer />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Product Details */}
            <Route
              path="/products/:id"
              element={<ProductDetail />}
            />

            {/* Cart */}
            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* Checkout */}
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            {/* Order Success */}
            <Route
              path="/order-success"
              element={<OrderSuccess />}
            />

            {/* Profile */}
            <Route
              path="/profile"
              element={<Profile />}
            />


            {/* ================= ADMIN ROUTES ================= */}

            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            {/* Add Product */}
            <Route
              path="/admin/add-product"
              element={<AddProduct />}
            />

            {/* Admin Products */}
            <Route
              path="/admin/products"
              element={<AdminProducts />}
            />

            {/* Edit Product */}
           <Route
              path="/admin/edit-product/:id"
              element={<EditProduct />}
            />

            {/* Admin Orders */}
            <Route
              path="/admin/orders"
              element={<AdminOrders />}
            />

            {/* Admin Users */}
            <Route
              path="/admin/users"
              element={<AdminUsers />}
            />

          </Routes>
        </main>

        {/* ================= FOOTER ================= */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;