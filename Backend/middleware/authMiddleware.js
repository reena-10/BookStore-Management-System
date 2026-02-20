const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1. Protect Route (Check karega ki user logged in hai ya nahi)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Header se token nikalna
      token = req.headers.authorization.split(" ")[1];

      // Token verify karna
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User ka data database se nikal kar req.user mein dalna (password chhod kar)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Sab theek hai, aage badho
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// 2. Admin Check (Check karega ki user Admin hai ya nahi)
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User admin hai, aage badho
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, admin };
