import { useNavigate } from "react-router-dom";
import eventIcon from "../../assets/event.png";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <img src={eventIcon} alt="event icon" className="event-icon" />
      <h1 className="home-title">Discover Events</h1>
      <p className="home-description">
        Join the vibrant Copenhagen tech community. From React 19 conferences
        and AI hackathons to professional JavaScript workshops. Secure your spot
        and stay ahead in the evolving frontend ecosystem.
      </p>
      <button onClick={() => navigate("/events")} className="styled-btn">
        Browse Events
      </button>
    </div>
  );
}

export default HomePage;
