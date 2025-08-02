const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  // For development, temporarily bypass token verification
  req.user = { role: 'user' };
  next();
};

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  // For development, temporarily allow admin access
  next();
};

module.exports = { verifyToken, verifyAdmin };