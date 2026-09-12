const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");

dotenv.config();


// ========================================
// Dummy Users
// ========================================
const usersData = [
  {
    name: "Admin User",
    email: "admin@shopnest.com",
    password: "admin123",
    role: "admin",
    verified: true,
  },

  {
    name: "Rahul Kumar",
    email: "rahul@shopnest.com",
    password: "user123",
    role: "user",
    verified: true,
  },

  {
    name: "Priya Sharma",
    email: "priya@shopnest.com",
    password: "user123",
    role: "user",
    verified: true,
  },

  {
    name: "Amit Singh",
    email: "amit@shopnest.com",
    password: "user123",
    role: "user",
    verified: true,
  },

  {
    name: "Neha Verma",
    email: "neha@shopnest.com",
    password: "user123",
    role: "user",
    verified: true,
  },

  {
    name: "Vikas Kumar",
    email: "vikas@shopnest.com",
    password: "user123",
    role: "user",
    verified: true,
  },
];


// ========================================
// Dummy Products
// ========================================
const productsData = [
  {
    name: "Samsung Galaxy S25",
    description:
      "Latest Samsung Galaxy smartphone with powerful performance and premium display.",
    price: 79999,
    category: "Electronics",
    stock: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    rating: 4.5,
    numReviews: 120,
  },

  {
    name: "iPhone 16",
    description:
      "Apple iPhone 16 with advanced camera system and powerful processor.",
    price: 69999,
    category: "Electronics",
    stock: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a",
    rating: 4.7,
    numReviews: 210,
  },

  {
    name: "MacBook Air M3",
    description:
      "Apple MacBook Air powered by M3 chip with lightweight premium design.",
    price: 99999,
    category: "Laptops",
    stock: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    rating: 4.8,
    numReviews: 175,
  },

  {
    name: "Dell Inspiron 15",
    description:
      "Reliable laptop for students, professionals and everyday computing.",
    price: 54999,
    category: "Laptops",
    stock: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    rating: 4.3,
    numReviews: 98,
  },

  {
    name: "Sony WH-1000XM5",
    description:
      "Premium wireless headphones with industry-leading noise cancellation.",
    price: 29999,
    category: "Accessories",
    stock: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
    rating: 4.6,
    numReviews: 145,
  },

  {
    name: "Apple AirPods Pro",
    description:
      "Wireless earbuds with active noise cancellation and spatial audio.",
    price: 24999,
    category: "Accessories",
    stock: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434",
    rating: 4.5,
    numReviews: 190,
  },

  {
    name: "Samsung 55 Inch 4K TV",
    description:
      "Smart 4K television with vibrant colors and modern smart features.",
    price: 64999,
    category: "Television",
    stock: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
    rating: 4.4,
    numReviews: 85,
  },

  {
    name: "Nike Air Max",
    description:
      "Comfortable and stylish running shoes designed for everyday use.",
    price: 8999,
    category: "Fashion",
    stock: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    rating: 4.2,
    numReviews: 76,
  },

  {
    name: "Levi's Denim Jacket",
    description:
      "Classic denim jacket with premium fabric and comfortable fit.",
    price: 4999,
    category: "Fashion",
    stock: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    rating: 4.1,
    numReviews: 54,
  },

  {
    name: "Canon EOS Camera",
    description:
      "Professional DSLR camera suitable for photography and video recording.",
    price: 74999,
    category: "Cameras",
    stock: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    rating: 4.7,
    numReviews: 110,
  },
];


// ========================================
// Seed Database
// ========================================
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Connected to MongoDB");


    // ------------------------------------
    // Clear existing seed data
    // ------------------------------------
    await User.deleteMany({
      email: {
        $in: usersData.map((user) => user.email),
      },
    });

    await Product.deleteMany({
      name: {
        $in: productsData.map((product) => product.name),
      },
    });

    console.log("Old dummy data removed");


    // ------------------------------------
    // Hash User Passwords
    // ------------------------------------
    const hashedUsers = [];

    for (const user of usersData) {
      const hashedPassword = await bcrypt.hash(
        user.password,
        10
      );

      hashedUsers.push({
        ...user,
        password: hashedPassword,
      });
    }


    // ------------------------------------
    // Create Users
    // ------------------------------------
    const users = await User.insertMany(
      hashedUsers
    );

    console.log(
      `${users.length} users created`
    );


    // ------------------------------------
    // Create Products
    // ------------------------------------
    const products = await Product.insertMany(
      productsData
    );

    console.log(
      `${products.length} products created`
    );


    // ------------------------------------
    // Create Orders
    // ------------------------------------

    const normalUsers = users.filter(
      (user) => user.role === "user"
    );


    const ordersData = [
      {
        user: normalUsers[0]._id,

        items: [
          {
            productId: products[0]._id,
            qty: 1,
            price: products[0].price,
          },
        ],

        totalAmount: products[0].price,

        address: {
          fullName: "Rahul Kumar",
          street: "Main Road",
          city: "Patna",
          postalCode: "800001",
          country: "India",
        },

        paymentId: "PAY_TEST_001",

        status: "delivered",
      },


      {
        user: normalUsers[1]._id,

        items: [
          {
            productId: products[1]._id,
            qty: 1,
            price: products[1].price,
          },

          {
            productId: products[5]._id,
            qty: 2,
            price: products[5].price,
          },
        ],

        totalAmount:
          products[1].price +
          products[5].price * 2,

        address: {
          fullName: "Priya Sharma",
          street: "Station Road",
          city: "Delhi",
          postalCode: "110001",
          country: "India",
        },

        paymentId: "PAY_TEST_002",

        status: "shipped",
      },


      {
        user: normalUsers[2]._id,

        items: [
          {
            productId: products[2]._id,
            qty: 1,
            price: products[2].price,
          },
        ],

        totalAmount: products[2].price,

        address: {
          fullName: "Amit Singh",
          street: "MG Road",
          city: "Mumbai",
          postalCode: "400001",
          country: "India",
        },

        paymentId: "PAY_TEST_003",

        status: "pending",
      },


      {
        user: normalUsers[3]._id,

        items: [
          {
            productId: products[4]._id,
            qty: 1,
            price: products[4].price,
          },

          {
            productId: products[7]._id,
            qty: 2,
            price: products[7].price,
          },
        ],

        totalAmount:
          products[4].price +
          products[7].price * 2,

        address: {
          fullName: "Neha Verma",
          street: "Civil Lines",
          city: "Lucknow",
          postalCode: "226001",
          country: "India",
        },

        paymentId: "PAY_TEST_004",

        status: "delivered",
      },


      {
        user: normalUsers[4]._id,

        items: [
          {
            productId: products[9]._id,
            qty: 1,
            price: products[9].price,
          },
        ],

        totalAmount: products[9].price,

        address: {
          fullName: "Vikas Kumar",
          street: "Gandhi Chowk",
          city: "Chapra",
          postalCode: "841301",
          country: "India",
        },

        paymentId: "PAY_TEST_005",

        status: "shipped",
      },
    ];


    const orders = await Order.insertMany(
      ordersData
    );

    console.log(
      `${orders.length} orders created`
    );


    // ------------------------------------
    // Final Result
    // ------------------------------------
    console.log("\n================================");
    console.log("DATABASE SEEDED SUCCESSFULLY");
    console.log("================================");

    console.log("\nAdmin Login:");
    console.log("Email: admin@shopnest.com");
    console.log("Password: admin123");

    console.log("\nUser Login:");
    console.log("Email: rahul@shopnest.com");
    console.log("Password: user123");

    console.log("\nCreated:");
    console.log(`Users: ${users.length}`);
    console.log(`Products: ${products.length}`);
    console.log(`Orders: ${orders.length}`);

    console.log("\n================================\n");

    process.exit(0);

  } catch (error) {
    console.error(
      "SEED ERROR:",
      error
    );

    process.exit(1);
  }
};


seedDatabase();