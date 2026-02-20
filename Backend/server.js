const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Database Connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/bookstore";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected successfully!"))
  .catch((err) => console.log("Database connection error:", err));

app.use("/api/users", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
