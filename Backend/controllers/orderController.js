const Order = require("../models/Order");

// @desc    Naya order create karna
// @route   POST /api/orders
// @access  Private (Sirf logged-in user)
const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id, // Token se aayega
        shippingAddress,
        paymentMethod,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Order create karne mein error", error: error.message });
  }
};

// @desc    Logged-in user ke khud ke orders get karna
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Orders fetch karne mein error" });
  }
};

// @desc    Sari users ke orders get karna (Admin ke liye)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    // .populate() se hume user ka naam aur email bhi mil jayega
    const orders = await Order.find({}).populate("user", "id name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Orders fetch karne mein error" });
  }
};

module.exports = { addOrderItems, getMyOrders, getOrders };
