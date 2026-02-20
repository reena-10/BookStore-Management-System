const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    genre: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/150",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", bookSchema);
