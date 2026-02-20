import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

function Home({ userInfo, addToCart, handleBuyNow, selectedCategory }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    genre: "Fiction",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(
          "https://bookstore-backend-5pnb.onrender.com/api/books",
        );
        setBooks(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post(
        "https://bookstore-backend-5pnb.onrender.com/api/books",
        newBook,
        config,
      );
      alert("Book Added Successfully! 🎉");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error adding book!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.delete(
        `https://bookstore-backend-5pnb.onrender.com/api/books/${id}`,
        config,
      );
      setBooks(books.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book) => book.genre === selectedCategory);

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-content">
          <h1>
            All your book <br /> collection in one <br /> platform<span>✦</span>
          </h1>
        </div>
        <div className="hero-emoji">📚</div>
      </section>

      {userInfo?.isAdmin && (
        <section className="admin-card">
          <h3>Add New Inventory</h3>
          <form className="admin-form" onSubmit={handleAdd}>
            <input
              className="form-input"
              type="text"
              placeholder="Title"
              required
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
            />
            <input
              className="form-input"
              type="text"
              placeholder="Author"
              required
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
            />

            <select
              className="form-input"
              value={newBook.genre}
              onChange={(e) =>
                setNewBook({ ...newBook, genre: e.target.value })
              }
            >
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="Psychology">Psychology</option>
              <option value="Biology">Biology</option>
              <option value="Philosophy">Philosophy</option>
              <option value="Drama">Drama</option>
              <option value="Self-Development">Self-Development</option>
              <option value="Story Book">Story Book</option>
            </select>

            <input
              className="form-input"
              type="text"
              placeholder="Description"
              required
              onChange={(e) =>
                setNewBook({ ...newBook, description: e.target.value })
              }
            />
            <input
              className="form-input"
              type="text"
              placeholder="Image URL (Link)"
              required
              onChange={(e) =>
                setNewBook({ ...newBook, imageUrl: e.target.value })
              }
            />
            <input
              className="form-input"
              type="number"
              placeholder="Price"
              required
              onChange={(e) =>
                setNewBook({ ...newBook, price: e.target.value })
              }
            />
            <button type="submit" className="btn-primary">
              Add Book
            </button>
          </form>
        </section>
      )}

      <h2>
        {selectedCategory === "All"
          ? "Latest Arrivals"
          : `${selectedCategory} Books`}
      </h2>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="book-grid">
          {filteredBooks.length === 0 ? (
            <p>No books found in this category.</p>
          ) : (
            filteredBooks.map((book) => (
              <div key={book._id} className="book-card">
                <img
                  src={book.imageUrl || "https://via.placeholder.com/150"}
                  alt={book.title}
                  className="book-image"
                />
                <span className="genre-badge">{book.genre}</span>
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <div className="book-footer">
                  <span className="book-price">₹{book.price}</span>
                  <div className="book-actions">
                    {userInfo?.isAdmin && (
                      <button
                        className="btn-icon"
                        onClick={() => handleDelete(book._id)}
                      >
                        🗑️
                      </button>
                    )}
                    <button
                      className="btn-icon cart-btn"
                      onClick={() => addToCart(book)}
                    >
                      🛒
                    </button>
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => handleBuyNow(book)}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
