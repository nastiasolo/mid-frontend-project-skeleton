import { useState, useEffect } from "react";
// import events from "../../data/events.js";
import EventCard from "../EventCard/EventCard.jsx";
import "./EventList.css";
import EventDetail from "../EventDetail/EventDetail.jsx";
import CategoryFilter from "../CategoryFilter/CategoryFilter.jsx";

// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const url = `http://localhost:3001/api/events?q=${searchTerm}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchTerm]);

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
          <div className="search-filter-container">
            <input
              type="text"
              placeholder="Search events..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
        <div className="content-area">
          {events.length === 0 ? (
            <div className="no-data">
              <p>No events found for "{searchTerm}".</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="no-data">
              <p>No events found in the "{selectedCategory}" category.</p>
            </div>
          ) : (
            <ul className="event-list">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
