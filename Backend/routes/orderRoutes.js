const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  getOrders,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

// Naya order banane aur sabhi orders dekhne (Admin) ka route
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

// User ke khud ke orders dekhne ka route
router.route("/myorders").get(protect, getMyOrders);

module.exports = router;
