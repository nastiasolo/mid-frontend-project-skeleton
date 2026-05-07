import { useCart } from "../../context/CartContext.jsx";
import { Link } from "react-router-dom";
import cartIcon from "../../assets/shopping-bag.png";
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-container">
        <img src={cartIcon} alt="shopping cart" className="cart-icon" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any tickets yet.</p>
        <Link to="/events" className="back-to-events-btn">
          Explore Events
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
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
          <button className="styled-btn clear-btn" c onClick={clearCart}>
            Clear All
          </button>
          <button className="styled-btn checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
}
