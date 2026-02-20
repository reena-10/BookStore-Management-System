const Book = require("../models/Book");

// 1. Get All Books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 2. Create a Book
const createBook = async (req, res) => {
  try {
    const { title, author, description, price, genre, stock, imageUrl } =
      req.body;
    const book = new Book({
      title,
      author,
      description,
      price,
      genre,
      stock,
      imageUrl,
    });
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Book create karne mein error", error: error.message });
  }
};

// 3. Update a Book
const updateBook = async (req, res) => {
  try {
    const { title, author, description, price, genre, stock, imageUrl } =
      req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, price, genre, stock, imageUrl },
      { new: true },
    );
    if (!book) return res.status(404).json({ message: "Book nahi mili" });
    res.json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Update karne mein error", error: error.message });
  }
};

// 4. Delete a Book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book nahi mili" });
    res.json({ message: "Book successfully delete ho gayi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Delete karne mein error", error: error.message });
  }
};

module.exports = { getBooks, createBook, updateBook, deleteBook };
