import { Link, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="layout-container">
      <header>
        <nav
          style={{
            backgroundColor: "white",
            width: "100%",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          <a
            href="https://www.hackyourfuture.dk/"
            target="_blank"
            className="link"
          >
            <img
              src={hyfLogo}
              alt="HackYourFuture logo"
              className="logo"
              width={120}
              style={{ padding: "20px" }}
            />
          </a>
          {/* Navigation links go here — e.g. link to event list, cart, login */}
          <Link to="/events" className="link">
            Events
          </Link>

          {user && (
            <>
              <span>{user.email}</span>
              <button onClick={logout}>Sign out</button>
            </>
          )}

          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
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
