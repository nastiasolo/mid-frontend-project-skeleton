import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);

    const orderData = {
      userId: user.id,
      items: cartItems,
      total: totalAmount,
      date: new Date().toISOString(),
      status: "completed",
    };

    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to place order");

      setOrderSuccess(true);
      clearCart();

      setTimeout(() => navigate("/cart"), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="checkout-container success">
        <h2>🚀 Order Successful!</h2>
        <p>Thank you for your purchase. Redirecting to your orders...</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Confirm Your Order</h2>
      <div className="order-summary">
        {cartItems.map((item) => (
          <li key={item.id} className="checkout-item">
            <div key={item.id} className="summary-item">
              <span className="item-name">{item.name}</span>
              <span className="item-qty"> x {item.quantity}</span>
            </div>
            <span>€{item.price * item.quantity}</span>
          </li>
        ))}
        <hr />
        <p className="summary-total">Total: €{totalAmount}</p>
      </div>
      <div className="checkout-btn-container">
        <button
          className="styled-btn back-btn"
          onClick={() => navigate("/cart")}
          disabled={isSubmitting}
        >
          Back to Cart
        </button>
        <button
          className="styled-btn checkout-btn"
          onClick={handleConfirmOrder}
          disabled={isSubmitting || cartItems.length === 0}
        >
          {isSubmitting ? "Processing..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
