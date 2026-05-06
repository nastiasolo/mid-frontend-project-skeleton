import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);

      navigate("/events");
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-card">
      <h1 className="login-title">Login</h1>
      <p className="login-description">Please enter your details</p>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
          disabled={isSubmitting}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
          disabled={isSubmitting}
        />

        <button
          type="submit"
          className="login-submit-btn"
          disabled={isSubmitting}
        >
          Login
        </button>
      </form>

      <p className="register-description">
        Don't have an account?{" "}
        <a className="sign-up-link" href="/register">
          Register
        </a>
      </p>
    </div>
  );
}
