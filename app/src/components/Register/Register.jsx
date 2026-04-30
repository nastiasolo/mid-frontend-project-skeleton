import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./Register.css";
// TODO: build a register form with relevant fields
// TODO: call register(email, password) from useAuth() on submit
// TODO: show a clear error message if registration fails
// TODO: redirect to the event list on success

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState(null);

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

  const isFormInvalid = !!emailError || !!passwordError || !email || !password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormInvalid) return;

    setServerError(null);

    try {
      await register(email, password);
      console.log("Registered!");
      navigate("/events");
    } catch (err) {
      setServerError(err.message || "Something went wrong with registration");
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>

      {serverError && <div className="error-banner">{serverError}</div>}

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={`register-input ${passwordError ? "input-error" : ""}`}
        />
        {emailError && <span className="validation-text">{emailError}</span>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
          Create Account
        </button>
      </form>
    </div>
  );
}
