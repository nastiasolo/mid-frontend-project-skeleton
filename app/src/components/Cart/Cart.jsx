import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import cartIcon from "../../assets/shopping-bag.png";
import ticketIcon from "../../assets/ticket.png";
import "./Cart.css";

export default function Cart() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } =
    useCart();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user && token) {
      fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [user, token]);

  return (
    <>
      <div className="cart-page">
        {cartItems.length === 0 ? (
          <>
            {" "}
            <img src={cartIcon} alt="shopping cart" className="cart-icon" />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any tickets yet.</p>
            <Link to="/events" className="back-to-events-btn">
              Explore Events
            </Link>
          </>
        ) : (
          <>
            <img src={cartIcon} alt="shopping cart" className="cart-icon" />
            <h2 className="cart-title">Your cart</h2>
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-info">
                    <h3 className="cart-item-title">{item.name}</h3>
                    <p>€{item.price} per ticket</p>
                  </div>
                  <div className="quantity-buttons-container">
                    <button
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                    <button
                      className="styled-btn remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <h3>Total: €{totalAmount}</h3>
              <div className="summary-btn-container">
                <button className="styled-btn clear-btn" onClick={clearCart}>
                  Clear All
                </button>
                <button
                  className="styled-btn checkout-btn"
                  onClick={() => navigate("/checkout")}
                  disabled={!user}
                >
                  Checkout
                </button>
              </div>
              {!user && (
                <p className="auth-reminder">
                  Please <Link to="/login">login</Link> to proceed to checkout.
                </p>
              )}
            </div>
          </>
        )}
      </div>
      <div className="cart-page">
        {user && (
          <div className="order-history">
            <img src={ticketIcon} alt="shopping cart" className="cart-icon" />
            <h2 className="cart-title">Order History</h2>
            {orders.length > 0 ? (
              <ul className="cart-list">
                {orders.map((order) => (
                  <li key={order.id} className="order-item">
                    <div className="item-info">
                      <h3 className="cart-item-title">Order #{order.id}</h3>
                      <p>
                        {new Date(
                          order.date || order.createdAt,
                        ).toLocaleDateString()}
                      </p>
                      <p>{order.items.length} events</p>
                    </div>
                    <div className="item-price">
                      <strong>€{order.total}</strong>
                      <div>Paid</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You don't have any past orders yet.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
