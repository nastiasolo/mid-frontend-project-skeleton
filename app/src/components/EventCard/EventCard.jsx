import { useState } from "react";
import "./EventCard.css";

export default function EventCard({ event }) {
  const [activeTab, setActiveTab] = useState("info");
  const isSoldOut = event.ticketsAvailable === 0;

  return (
    <li className="event-card" key={event.id}>
      <span className="event-category">{event.category}</span>

      <div className="tabs-menu">
        <button
          type="button"
          className={`tab-button ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Info
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
      </div>

      <h2 className="event-title">{event.name}</h2>

      <div className="event-content">
        {activeTab === "info" && (
          <div className="event-details">
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
            <p
              className={
                isSoldOut
                  ? "event-tickets status-sold-out"
                  : "event-tickets status-available"
              }
            >
              {isSoldOut
                ? "Sold out"
                : `${event.ticketsAvailable} tickets left`}
            </p>
          </div>
        )}

        {activeTab === "description" && (
          <div className="event-description-tab">
            <p className="description-text">{event.description}</p>
            <div className="ticket-stats">
              <p>Total capacity: {event.totalTickets} seats</p>
              <p
                className={
                  isSoldOut
                    ? "event-tickets status-sold-out"
                    : "event-tickets status-available"
                }
              >
                {isSoldOut
                  ? "Sold out"
                  : `${event.ticketsAvailable} tickets left`}
              </p>
            </div>
          </div>
        )}
      </div>

      <button className="event-buy-button" type="button" disabled={isSoldOut}>
        {isSoldOut ? "Not available" : "Get ticket"}
      </button>
    </li>
  );
}
