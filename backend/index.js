const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
connectDB();



const app = express();


// Set CORS for frontend URL / allow single-node deploy
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL],
  credentials: true
}));


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


// Home Route
app.get("/", (req, res) => {
  res.send(
    "ShopNest Backend is working properly!"
  );
});


// Auth Routes
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);


// Product Routes
app.use(
  "/api/products",
  require("./routes/productRoutes")
);


// Order Routes
app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);


// Payment Routes
app.use(
  "/api/payment",
  require("./routes/paymentRoutes")
);


// Analytics Routes
app.use(
  "/api/analytics",
  require("./routes/analyticsRoutes")
);


// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('ShopNest API is running in Development mode...');
  });
}

// Server
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  );
});