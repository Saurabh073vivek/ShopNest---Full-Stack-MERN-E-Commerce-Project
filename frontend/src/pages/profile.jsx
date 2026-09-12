import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH USER ORDERS
  // =====================================================
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/orders/myorders",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await res.json();

        console.log("MY ORDERS:", data);

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
            logout();
            navigate("/login");
            return;
          }

          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate, logout]);

  // =====================================================
  // LOGOUT
  // =====================================================
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // =====================================================
  // STYLES
  // =====================================================

  const containerStyle = {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "30px",
    background: "#18181b",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
    color: "#fafafa",
  };

  const badgeStyle = {
    background: "rgba(249,115,22,0.1)",
    color: "#f97316",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "bold",
    display: "inline-block",
  };

  const sectionTitleStyle = {
    color: "#f97316",
    marginBottom: "20px",
    fontSize: "1.5rem",
  };

  // =====================================================
  // STATUS COLOR
  // =====================================================

  const getStatusStyle = (status) => {
    const currentStatus = String(status || "Pending").toLowerCase();

    if (currentStatus === "delivered") {
      return {
        background: "rgba(16,185,129,0.12)",
        color: "#10b981",
      };
    }

    if (currentStatus === "shipped") {
      return {
        background: "rgba(59,130,246,0.12)",
        color: "#3b82f6",
      };
    }

    if (
      currentStatus === "cancelled" ||
      currentStatus === "canceled"
    ) {
      return {
        background: "rgba(239,68,68,0.12)",
        color: "#ef4444",
      };
    }

    if (currentStatus === "processing") {
      return {
        background: "rgba(168,85,247,0.12)",
        color: "#a855f7",
      };
    }

    return {
      background: "rgba(245,158,11,0.12)",
      color: "#f59e0b",
    };
  };

  // =====================================================
  // PAYMENT STATUS COLOR
  // =====================================================

  const getPaymentStyle = (status) => {
    const paymentStatus = String(
      status || "Pending"
    ).toLowerCase();

    if (
      paymentStatus === "paid" ||
      paymentStatus === "completed" ||
      paymentStatus === "success"
    ) {
      return {
        background: "rgba(16,185,129,0.12)",
        color: "#10b981",
      };
    }

    if (
      paymentStatus === "failed" ||
      paymentStatus === "failure"
    ) {
      return {
        background: "rgba(239,68,68,0.12)",
        color: "#ef4444",
      };
    }

    return {
      background: "rgba(245,158,11,0.12)",
      color: "#f59e0b",
    };
  };

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (amount) => {
    const value = Number(amount || 0);

    return value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // =====================================================
  // GET ORDER ITEMS
  // Supports common backend field names
  // =====================================================

  const getOrderItems = (order) => {
    if (Array.isArray(order.items)) {
      return order.items;
    }

    if (Array.isArray(order.orderItems)) {
      return order.orderItems;
    }

    if (Array.isArray(order.products)) {
      return order.products;
    }

    return [];
  };

  // =====================================================
  // GET PRODUCT NAME
  // =====================================================

  const getProductName = (item) => {
    return (
      item.productName ||
      item.name ||
      item.product?.name ||
      item.product?.title ||
      "Product"
    );
  };

  // =====================================================
  // GET PRODUCT IMAGE
  // =====================================================

  const getProductImage = (item) => {
    return (
      item.image ||
      item.productImage ||
      item.product?.image ||
      item.product?.images?.[0] ||
      "/OnlineStore.png"
    );
  };

  // =====================================================
  // GET QUANTITY
  // =====================================================

  const getQuantity = (item) => {
    return Number(
      item.quantity ||
      item.qty ||
      1
    );
  };

  // =====================================================
  // GET ITEM PRICE
  // =====================================================

  const getItemPrice = (item) => {
    return Number(
      item.price ||
      item.product?.price ||
      0
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div style={containerStyle}>
        <p
          style={{
            color: "#a1a1aa",
            textAlign: "center",
            padding: "40px",
          }}
        >
          Fetching your orders...
        </p>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div style={containerStyle}>

      {/* =================================================
          PROFILE HEADER
      ================================================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom:
            "1px solid rgba(255,255,255,0.1)",
          paddingBottom: "30px",
          marginBottom: "30px",
          gap: "20px",
        }}
      >
        <div>
          <h2
            style={{
              color: "#fff",
              fontSize: "2.2rem",
              marginBottom: "10px",
            }}
          >
            My Profile
          </h2>

          <p
            style={{
              color: "#a1a1aa",
              fontSize: "1.2rem",
              marginBottom: "5px",
            }}
          >
            <strong>Name:</strong> {user.name}
          </p>

          <p
            style={{
              color: "#a1a1aa",
              fontSize: "1.2rem",
              marginBottom: "15px",
            }}
          >
            <strong>Email:</strong> {user.email}
          </p>

          <span style={badgeStyle}>
            Account Type:{" "}
            {String(user.role || "user").toUpperCase()}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="btn"
          style={{
            background: "#ef4444",
            boxShadow: "none",
          }}
        >
          Logout
        </button>
      </div>

      {/* =================================================
          ORDER HISTORY
      ================================================= */}

      <h3 style={sectionTitleStyle}>
        Order History
      </h3>

      {/* =================================================
          NO ORDERS
      ================================================= */}

      {orders.length === 0 ? (
        <div
          style={{
            background: "#09090b",
            padding: "40px 30px",
            borderRadius: "8px",
            textAlign: "center",
            border: "1px solid #27272a",
          }}
        >
          <div
            style={{
              fontSize: "45px",
              marginBottom: "15px",
            }}
          >
            🛍️
          </div>

          <h4
            style={{
              color: "#fff",
              fontSize: "1.2rem",
              marginBottom: "10px",
            }}
          >
            No Orders Yet
          </h4>

          <p
            style={{
              color: "#a1a1aa",
              marginBottom: "20px",
            }}
          >
            You haven't placed any orders yet.
          </p>

          <Link
            to="/shop"
            className="btn"
          >
            Start Shopping
          </Link>
        </div>
      ) : (

        /* =================================================
           ORDERS LIST
        ================================================= */

        <div
          style={{
            display: "grid",
            gap: "25px",
          }}
        >
          {orders.map((order, index) => {

            const items = getOrderItems(order);

            const orderStatus =
              order.status || "Pending";

            const paymentStatus =
              order.paymentStatus ||
              order.payment?.status ||
              "Pending";

            const totalAmount = Number(
              order.totalAmount ||
              order.total ||
              order.amount ||
              0
            );

            return (
              <div
                key={order._id || index}
                style={{
                  background: "#09090b",
                  borderRadius: "12px",
                  border: "1px solid #27272a",
                  overflow: "hidden",
                }}
              >

                {/* ========================================
                    ORDER HEADER
                ======================================== */}

                <div
                  style={{
                    padding: "20px",
                    borderBottom:
                      "1px solid #27272a",
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "15px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#a1a1aa",
                        fontSize: "0.85rem",
                        marginBottom: "6px",
                      }}
                    >
                      Order ID
                    </p>

                    <p
                      style={{
                        color: "#fff",
                        fontWeight: "600",
                        wordBreak: "break-all",
                      }}
                    >
                      #{order._id || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        color: "#a1a1aa",
                        fontSize: "0.85rem",
                        marginBottom: "6px",
                      }}
                    >
                      Placed On
                    </p>

                    <p
                      style={{
                        color: "#fff",
                      }}
                    >
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        ...getStatusStyle(
                          orderStatus
                        ),
                        padding:
                          "8px 14px",
                        borderRadius:
                          "20px",
                        fontWeight: "bold",
                        fontSize:
                          "0.85rem",
                      }}
                    >
                      {String(
                        orderStatus
                      ).toUpperCase()}
                    </span>

                    <span
                      style={{
                        ...getPaymentStyle(
                          paymentStatus
                        ),
                        padding:
                          "8px 14px",
                        borderRadius:
                          "20px",
                        fontWeight: "bold",
                        fontSize:
                          "0.85rem",
                      }}
                    >
                      Payment:{" "}
                      {String(
                        paymentStatus
                      ).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* ========================================
                    PRODUCTS
                ======================================== */}

                <div
                  style={{
                    padding: "20px",
                  }}
                >
                  <h4
                    style={{
                      color: "#fff",
                      marginBottom: "15px",
                      fontSize: "1.1rem",
                    }}
                  >
                    Ordered Products
                  </h4>

                  {items.length === 0 ? (
                    <p
                      style={{
                        color: "#71717a",
                      }}
                    >
                      Product details are not
                      available.
                    </p>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gap: "12px",
                      }}
                    >
                      {items.map(
                        (item, itemIndex) => {
                          const quantity =
                            getQuantity(
                              item
                            );

                          const price =
                            getItemPrice(
                              item
                            );

                          return (
                            <div
                              key={
                                item._id ||
                                item.product?._id ||
                                itemIndex
                              }
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: "15px",
                                padding:
                                  "12px",
                                background:
                                  "#18181b",
                                borderRadius:
                                  "8px",
                                border:
                                  "1px solid #27272a",
                              }}
                            >

                              {/* Product Image */}
                              <img
                                src={getProductImage(
                                  item
                                )}
                                alt={getProductName(
                                  item
                                )}
                                style={{
                                  width:
                                    "60px",
                                  height:
                                    "60px",
                                  objectFit:
                                    "cover",
                                  borderRadius:
                                    "8px",
                                  border:
                                    "1px solid #3f3f46",
                                }}
                                onError={(
                                  e
                                ) => {
                                  e.target.src =
                                    "/OnlineStore.png";
                                }}
                              />

                              {/* Product Details */}
                              <div
                                style={{
                                  flex: 1,
                                }}
                              >
                                <p
                                  style={{
                                    color:
                                      "#fff",
                                    fontWeight:
                                      "600",
                                    marginBottom:
                                      "5px",
                                  }}
                                >
                                  {getProductName(
                                    item
                                  )}
                                </p>

                                <p
                                  style={{
                                    color:
                                      "#a1a1aa",
                                    fontSize:
                                      "0.9rem",
                                  }}
                                >
                                  Quantity:{" "}
                                  {quantity}
                                </p>
                              </div>

                              {/* Price */}
                              <div
                                style={{
                                  textAlign:
                                    "right",
                                }}
                              >
                                <p
                                  style={{
                                    color:
                                      "#f97316",
                                    fontWeight:
                                      "bold",
                                  }}
                                >
                                  ₹
                                  {formatPrice(
                                    price *
                                      quantity
                                  )}
                                </p>

                                <p
                                  style={{
                                    color:
                                      "#71717a",
                                    fontSize:
                                      "0.8rem",
                                  }}
                                >
                                  ₹
                                  {formatPrice(
                                    price
                                  )}{" "}
                                  each
                                </p>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>

                {/* ========================================
                    SHIPPING ADDRESS
                ======================================== */}

                {order.shippingAddress && (
                  <div
                    style={{
                      margin:
                        "0 20px 20px",
                      padding: "15px",
                      background:
                        "#18181b",
                      borderRadius: "8px",
                      border:
                        "1px solid #27272a",
                    }}
                  >
                    <h4
                      style={{
                        color: "#fff",
                        marginBottom:
                          "10px",
                      }}
                    >
                      Shipping Address
                    </h4>

                    <p
                      style={{
                        color:
                          "#a1a1aa",
                        lineHeight:
                          "1.6",
                      }}
                    >
                      {order.shippingAddress
                        .fullName && (
                        <>
                          <strong
                            style={{
                              color:
                                "#fff",
                            }}
                          >
                            {
                              order
                                .shippingAddress
                                .fullName
                            }
                          </strong>
                          <br />
                        </>
                      )}

                      {order.shippingAddress
                        .street && (
                        <>
                          {
                            order
                              .shippingAddress
                              .street
                          }
                          <br />
                        </>
                      )}

                      {order.shippingAddress
                        .city && (
                        <>
                          {
                            order
                              .shippingAddress
                              .city
                          }
                          ,{" "}
                        </>
                      )}

                      {order.shippingAddress
                        .postalCode && (
                        <>
                          {
                            order
                              .shippingAddress
                              .postalCode
                          }
                          <br />
                        </>
                      )}

                      {order.shippingAddress
                        .country}
                    </p>
                  </div>
                )}

                {/* ========================================
                    ORDER TOTAL
                ======================================== */}

                <div
                  style={{
                    padding: "20px",
                    borderTop:
                      "1px solid #27272a",
                    display: "flex",
                    justifyContent:
                      "flex-end",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <span
                    style={{
                      color: "#a1a1aa",
                      fontSize:
                        "1rem",
                    }}
                  >
                    Total Amount:
                  </span>

                  <strong
                    style={{
                      color: "#10b981",
                      fontSize:
                        "1.4rem",
                    }}
                  >
                    ₹
                    {formatPrice(
                      totalAmount
                    )}
                  </strong>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;