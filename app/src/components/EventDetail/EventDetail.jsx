import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import "./EventDetail.css";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/events/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Event not found.</p>;

  const handleAddToCart = () => {
    addToCart(event, quantity);
  };

  return (
    <>
      <div className="event-detail" key={event.id}>
        <p className="event-category">{event.category}</p>
        <h2 className="event-title">{event.name}</h2>
        <div className="event-description">
          <p>
            <span className="event-emoji">⏱️ </span>
            {event.date} at {event.time}
          </p>
          <p>
            <span className="event-emoji">📍 </span>
            {event.venue}, {event.city}
          </p>
          <p>
            <span className="event-emoji">💵 </span>
            {event.price === 0 ? "Free" : `€${event.price}`}
          </p>
          <p className="event-tickets">
            {event.ticketsAvailable === 0
              ? "Sold out"
              : `${event.ticketsAvailable} tickets left`}
          </p>
        </div>
        <div className="event-about">{event.description}</div>

        <div className="purchase-controls">
          <div className="quantity-buttons-container">
            <button
              className="quantity-btn"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <div style={{ height: "40px" }}></div>
    </>
  );
}
