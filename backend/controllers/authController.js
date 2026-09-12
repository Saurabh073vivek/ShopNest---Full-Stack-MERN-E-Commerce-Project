const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");


// ========================================
// Generate JWT
// ========================================
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};


// ========================================
// Register User
// ========================================
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Please provide name, email and password",
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const otpExpires = new Date(
      Date.now() + 10 * 60 * 1000
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verified: false,
      otp,
      otpExpires,
    });

    const message = `
Hello ${name},

Welcome to ShopNest!

Your OTP for email verification is:

${otp}

This OTP is valid for 10 minutes.

Please do not share this OTP with anyone.

Thank you,
ShopNest Team
`;

    await sendEmail(
      email,
      "ShopNest - Email Verification OTP",
      message
    );

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      message:
        "Registration successful. OTP sent to your email.",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ========================================
// Verify OTP
// ========================================
const verifyOTP = async (req, res) => {
  const {
    email,
    otp,
  } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }

    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({
        message:
          "OTP not found. Please request a new OTP.",
      });
    }

    if (new Date() > user.otpExpires) {
      return res.status(400).json({
        message:
          "OTP has expired. Please request a new OTP.",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.verified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.json({
      message:
        "Email verified successfully",
    });
  } catch (error) {
    console.error(
      "VERIFY OTP ERROR:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ========================================
// Login
// ========================================
const loginUser = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid email or password",
      });
    }

    if (!user.verified) {
      return res.status(401).json({
        message:
          "Please verify your email before logging in",
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(400).json({
        message:
          "Invalid email or password",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ========================================
// Get All Users - Admin
// ========================================
const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password -otp -otpExpires");

    res.json(users);
  } catch (error) {
    console.error(
      "GET USERS ERROR:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = {
  registerUser,
  verifyOTP,
  loginUser,
  getUsers,
};