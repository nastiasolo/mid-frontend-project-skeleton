import { useState } from "react";
import events from "../../data/events.js";
import EventCard from "../EventCard/EventCard.jsx";
import "./EventList.css";
import EventDetail from "../EventDetail/EventDetail.jsx";
import CategoryFilter from "../CategoryFilter/CategoryFilter.jsx";

// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [];

  events.forEach((event) => {
    if (!categories.includes(event.category)) {
      categories.push(event.category);
    }
  });

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <>
      <div className="event-page-container">
        <div className="list-toolbar">
          <span className="results-count">
            {filteredEvents.length}
            {filteredEvents.length === 1 ? " event" : " events"}
          </span>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        <ul className="event-list">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>

        {filteredEvents.length === 0 && (
          <p>No events found in this category.</p>
        )}
      </div>
    </>
  );
}
