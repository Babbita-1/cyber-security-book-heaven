const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "https://book-store-frontend-git-main-magartejs-projects.vercel.app"
    ];
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
  credentials: true,
  maxAge: 600, // 10 minutes
  exposedHeaders: ['*', 'Authorization']
}));

//  SESSION MIDDLEWARE (Insert Before Routes)
app.use(
  session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      ttl: 60 * 60, // 1 hour
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    },
  })
);

// routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const adminAuthRoutes = require("./src/admin/admin.route");
const adminStatsRoutes = require("./src/stats/admin.stats");
const userRoutes = require("./src/users/user.route");

// API routes
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", adminAuthRoutes);
app.use("/api/admin", adminStatsRoutes);
app.use("/api/auth", userRoutes);

// test route
app.get("/test", (req, res) => {
  res.send("Test route working!");
});

// MongoDB connect + start server
async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

startServer();

module.exports = app;
