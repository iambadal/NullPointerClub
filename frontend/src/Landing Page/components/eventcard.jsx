import "./styles/EventCard.css";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <Link to={`/events/${event._id}`} className="event-link">

      <div className="event-card">

        <h3>{event.title}</h3>

        <p className="desc">
          {event.description.slice(0, 80)}...
        </p>

        <p>Start: {new Date(event.startDate).toLocaleString()}</p>
        <p>End: {new Date(event.endDate).toLocaleString()}</p>

        <button className="join-btn">
          View Details
        </button>

      </div>

    </Link>
  );
}
