const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Admin login
router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set the JWT token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    return res.status(200).json({
      message: "Authentication successful",
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
  // Clear the JWT cookie
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  // Also clear the session if it exists
  if (req.session) {
    req.session.destroy((err) => {
      if (err) console.error('Session destruction error:', err);
    });
  }

  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
