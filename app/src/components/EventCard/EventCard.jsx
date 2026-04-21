import "./EventCard.css";

export default function EventCard({ event }) {
  return (
    <li className="event-card" key={event.id}>
      <span className="event-category">{event.category}</span>
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
      <button className="event-buy-button" type="button">
        Buy ticket
      </button>
    </li>
  );
}
