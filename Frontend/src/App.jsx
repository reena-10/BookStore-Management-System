import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Checkout from "./Checkout";
import "./App.css";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-column">
        <div className="footer-logo">
          BookBliss<span>.</span>
        </div>
        <p>Your one-stop destination for the best books across all genres.</p>
      </div>
      <div className="footer-column">
        <h4>Categories</h4>
        <ul>
          <li>Science</li>
          <li>Psychology</li>
          <li>Drama</li>
          <li>Fiction</li>
          <li>Non-Fiction</li>
          <li>Philosophy</li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Contact</h4>
        <ul>
          <li>Email: support@bookbliss.com</li>
          <li>Bhopal, Madhya Pradesh</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2026 BookBliss Bookstore | All Rights Reserved.</p>
    </div>
  </footer>
);

function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")),
  );

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    navigate("/login");
    window.location.reload();
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const addToCart = (book) => {
    if (!userInfo) {
      alert("Please Login to add books! 🔐");
      navigate("/login");
      return;
    }
    if (!cart.find((item) => item._id === book._id)) {
      setCart([...cart, book]);
      alert(`${book.title} added to cart! 🛒`);
    } else {
      alert("Already in cart!");
    }
  };

  const handleBuyNow = (book) => {
    if (!userInfo) {
      alert("Please Login to buy! 🔐");
      navigate("/login");
      return;
    }
    if (!cart.find((item) => item._id === book._id)) {
      setCart([...cart, book]);
    }
    setShowCheckout(true);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <Link
          to="/"
          onClick={() => setSelectedCategory("All")}
          className="logo"
          style={{
            textDecoration: "none",
            fontWeight: "800",
            fontSize: "1.8rem",
            color: "inherit",
          }}
        >
          BookBliss<span style={{ color: "var(--primary)" }}>.</span>
        </Link>

        <div className="nav-right">
          <div className="nav-links">
            <div className="dropdown">
              <div className="dropbtn">Books ▾</div>
              <div className="dropdown-content">
                <Link to="/" onClick={() => setSelectedCategory("All")}>
                  All Books
                </Link>
                <Link to="/" onClick={() => setSelectedCategory("Fiction")}>
                  Fiction
                </Link>
                <Link to="/" onClick={() => setSelectedCategory("Non-Fiction")}>
                  Non-Fiction
                </Link>
                <Link to="/" onClick={() => setSelectedCategory("Science")}>
                  Science
                </Link>
                <Link to="/" onClick={() => setSelectedCategory("Psychology")}>
                  Psychology
                </Link>
                <Link to="/" onClick={() => setSelectedCategory("Biology")}>
                  Biology
                </Link>
                <Link to="/" onClick={() => setSelectedCategory("Philosophy")}>
                  Philosophy
                </Link>
                <Link
                  to="/"
                  onClick={() => setSelectedCategory("Self Development")}
                >
                  Self Development
                </Link>
                <Link to="/" onClick={() => setSelectedCategory("Drama")}>
                  Drama
                </Link>
                <Link to="/" onClick={() => setSelectedCategory("Story Book")}>
                  Story Book
                </Link>
              </div>
            </div>

            <div
              className="cart-icon"
              onClick={() => {
                userInfo ? setShowCheckout(true) : navigate("/login");
              }}
              style={{
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              Cart{" "}
              <span
                style={{
                  background: "var(--primary)",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "50%",
                  fontSize: "0.8rem",
                }}
              >
                {cart.length}
              </span>
            </div>
          </div>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="btn-primary"
            style={{ padding: "8px 15px" }}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {userInfo ? (
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <span style={{ fontWeight: "700" }}>
                {userInfo.name.split(" ")[0]}
              </span>
              <button
                onClick={logoutHandler}
                style={{
                  color: "red",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-primary"
              style={{ textDecoration: "none" }}
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                userInfo={userInfo}
                addToCart={addToCart}
                handleBuyNow={handleBuyNow}
                selectedCategory={selectedCategory}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {showCheckout && (
        <Checkout
          cart={cart}
          removeFromCart={removeFromCart}
          clearCart={() => setCart([])}
          closeCheckout={() => setShowCheckout(false)}
          userInfo={userInfo}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
