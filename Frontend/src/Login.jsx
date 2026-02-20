import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://bookstore-backend-5pnb.onrender.com",
        { email, password },
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("Welcome back! ✨");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>
          Welcome back<span>.</span>
        </h2>
        <p>Enter your details to access your bookstore.</p>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-auth">
            Sign In
          </button>
        </form>
        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one for free</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
