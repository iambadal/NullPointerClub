import "./styles/EventsList.css";
import { useState } from "react";
import EventCard from "../components/EventCard";

export default function EventsList() {

  const [events] = useState([
    {
      _id: "dummy1",
      title: "NullPointerClub Beginner CTF",
      description: "Beginner friendly CTF with Web, Crypto, OSINT challenges.",
      startDate: "2026-02-20T10:00:00",
      endDate: "2026-02-20T18:00:00"
    },
    {
      _id: "dummy2",
      title: "Web Exploitation Challenge",
      description: "Practice real-world web vulnerabilities.",
      startDate: "2026-03-05T10:00:00",
      endDate: "2026-03-05T17:00:00"
    }
  ]);

  return (
    <section className="events-list">
      <h2>Available Events</h2>

      <div className="events-grid">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
}
