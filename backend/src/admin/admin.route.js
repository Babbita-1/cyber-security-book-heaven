const express = require("express");
const User = require("./admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const router = express.Router();

// Check for JWT secret on startup
const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) {
  console.error("WARNING: JWT_SECRET_KEY is not set in environment variables");
}

// Admin registration
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      details: {
        username: !username ? "Username is required" : null,
        email: !email ? "Email is required" : null,
        password: !password ? "Password is required" : null
      }
    });
  }

  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({
      $or: [{ username }, { email }]
    });
    if (existingAdmin) {
      return res.status(400).json({
        message: existingAdmin.username === username
          ? "Username already exists"
          : "Email already exists"
      });
    }

    // Create new admin
    const newAdmin = new User({
      username,
      email,
      password,
      role: 'admin'
    });

    // Save admin to database
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Failed to register admin" });
  }
});

// Admin login
router.post("/auth/admin", async (req, res) => {
  console.log('Admin login attempt:', req.body);
  const { username, password } = req.body;

  try {
    console.log('Login attempt with:', { username });

    // Input validation
    if (!username || !password) {
      console.log('Missing fields:', { username: !username, password: !password });
      return res.status(400).json({
        message: "All fields are required",
        details: {
          username: !username ? "Username is required" : null,
          password: !password ? "Password is required" : null
        }
      });
    }

    // Find admin by username and role
    const admin = await User.findOne({ username, role: 'admin' });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password using bcrypt
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      console.log('Invalid password for admin:', username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if JWT_SECRET is set
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not set");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Create JWT token with admin role
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Authentication successful",
      token: token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Failed to login as admin", error);
    res.status(401).send({ message: "Failed to login as admin" });
  }
});

// Verify admin token
router.get("/verify-admin", verifyToken, async (req, res) => {
  try {
    // The verifyToken middleware already checked the token validity
    // Now check if the user is an admin
    if (req.user && req.user.role === "admin") {
      return res.status(200).json({ isAdmin: true });
    } else {
      return res.status(403).json({ isAdmin: false });
    }
  } catch (error) {
    console.error("Error verifying admin token", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔐 LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.regenerate((err) => {
    if (err) return res.status(500).send("Session regeneration failed");

    req.session.userId = user._id;
    res
      .status(200)
      .json({ message: "Logged in successfully", user: { email: user.email } });
  });
});

// 🚪 LOGOUT ROUTE
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Logout failed");
    res.clearCookie("sessionId");
    res.status(200).send("Logged out");
  });
});

module.exports = router;
