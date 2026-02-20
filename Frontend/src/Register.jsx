import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        },
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("Account Created! 😍");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Registration Error:", err);
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>
          Join Cranbery<span>✦</span>
        </h2>
        <p>Start your journey with the best book community.</p>
        <form className="auth-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Create Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-auth">
            Create Account
          </button>
        </form>
        <div className="auth-footer">
          Already a member? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
