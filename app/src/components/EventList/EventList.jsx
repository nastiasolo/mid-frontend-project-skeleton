import { useState, useEffect } from "react";
import EventCard from "../EventCard/EventCard.jsx";
import "./EventList.css";
import CategoryFilter from "../CategoryFilter/CategoryFilter.jsx";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const url = `${baseUrl}/events?q=${searchTerm}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch events.");

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchEvents();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const categories = [];

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  events.forEach((event) => {
    if (!categories.includes(event.category)) {
      categories.push(event.category);
    }
  });

  return (
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
            onChange={handleSearchChange}
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <div className="content-area">
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>Oops! Something went wrong: {error}</p>
            <button onClick={fetchEvents} className="retry-btn">
              Try Again
            </button>
          </div>
        )}

        {!error && loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching events...</p>
          </div>
        )}

        {!error && !loading && (
          <>
            {events.length === 0 ? (
              <div className="no-data">
                <p>No events found for "{searchTerm}".</p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="no-data">
                <p>No events found in the "{selectedCategory}" category.</p>
              </div>
            ) : (
              <>
                <ul className="event-list">
                  {currentItems.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </ul>
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Prev
                    </button>
                    <span className="page-info">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      className="pagination-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
