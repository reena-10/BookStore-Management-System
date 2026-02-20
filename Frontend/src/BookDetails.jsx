import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/books/${id}`,
        );
        setBook(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <div className="container">Loading details...</div>;

  return (
    <div className="container" style={{ paddingTop: "60px" }}>
      <div className="hero" style={{ alignItems: "flex-start" }}>
        <div
          className="hero-image"
          style={{ flex: 1, justifyContent: "center" }}
        >
          <div
            style={{
              fontSize: "15rem",
              background: "#f1f5f9",
              padding: "40px",
              borderRadius: "30px",
            }}
          >
            📖
          </div>
        </div>
        <div className="hero-content" style={{ flex: 1.5 }}>
          <span
            className="genre-tag"
            style={{
              background: "var(--secondary)",
              color: "var(--primary)",
              padding: "5px 15px",
              borderRadius: "8px",
            }}
          >
            {book.genre}
          </span>
          <h1 style={{ marginTop: "20px" }}>{book.title}</h1>
          <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
            by {book.author}
          </p>
          <p
            className="price-tag"
            style={{ fontSize: "2.5rem", margin: "30px 0" }}
          >
            ₹{book.price}
          </p>
          <button className="btn-primary" style={{ width: "250px" }}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
