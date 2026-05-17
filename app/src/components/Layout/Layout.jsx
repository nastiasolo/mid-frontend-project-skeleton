import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import cartIcon from "../../assets/shopping-bag.png";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import "./Layout.css";

export default function Layout() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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

          <button
            className={`burger-btn ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
          </button>

          <div className={`nav-menu-wrapper ${isMenuOpen ? "open" : ""}`}>
            <div className="nav-to-the-left">
              <Link
                to="/events"
                className="event-link link"
                onClick={closeMenu}
              >
                Events
              </Link>
            </div>
            <div className="nav-to-the-right">
              <Link to="/cart" className="link" onClick={closeMenu}>
                <div className="cart-icon-container">
                  <img
                    src={cartIcon}
                    alt="shopping cart"
                    className="cart-icon"
                  />
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </div>
              </Link>

              {user ? (
                <>
                  <div className="user-container">
                    <span className="user-nav">{user.email}</span>
                    <button
                      className="logout-btn"
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="login-container">
                  <Link to="/login" className="link" onClick={closeMenu}>
                    Login
                  </Link>
                  <Link to="/register" className="link" onClick={closeMenu}>
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
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
