import { Link, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Layout.css";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="layout-container">
      <header>
        <nav className="navigation">
          <a
            href="https://www.hackyourfuture.dk/"
            target="_blank"
            className="link"
          >
            <img
              src={hyfLogo}
              alt="HackYourFuture logo"
              className="logo"
              width={60}
            />
          </a>
          <Link to="/events" className="event-link link">
            Events
          </Link>

          {user ? (
            <>
              <span>{user.email}</span>
              <button onClick={logout}>Sign out</button>
            </>
          ) : (
            <div className="login-container">
              <Link to="/login" className="link">
                Login
              </Link>
              <Link to="/register" className="link">
                Register
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>2026 © Events Startup Project</p>
      </footer>
    </div>
  );
}
