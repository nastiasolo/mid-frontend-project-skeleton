import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const emailError =
    email.length > 0 && !email.includes("@")
      ? "Please enter a valid email address."
      : null;

  const passwordError =
    password.length > 0 && password.length < 6
      ? "Password must be at least 6 characters long."
      : null;

  const isFormInvalid =
    !!emailError || !!passwordError || !email || !password || isSubmitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormInvalid) return;

    setServerError(null);
    setIsSubmitting(true);

    try {
      await register(email, password);
      console.log("Registered!");
      navigate("/events");
    } catch (err) {
      setServerError(err.message || "Something went wrong with registration");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>

      {serverError && <div className="error-banner">{serverError}</div>}

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="email"
          name="email"
          autocomplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className={`register-input ${emailError ? "input-error" : ""}`}
        />
        {emailError && <span className="validation-text">{emailError}</span>}
        <input
          type="password"
          name="password"
          autocomplete="new-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
          className={`register-input ${passwordError ? "input-error" : ""}`}
        />
        {passwordError && (
          <span className="validation-text">{passwordError}</span>
        )}
        <button
          type="submit"
          className="register-submit-btn"
          disabled={isFormInvalid}
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
