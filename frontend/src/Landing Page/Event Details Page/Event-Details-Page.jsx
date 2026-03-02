import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import EventHeader from "./EventHeader";
import EventSchedule from "./EventSchedule";
import EventGallery from "./EventGallery";
import EventDetailCTA from "./EventDetailCTA";
import "./styles/EventDetailsWrapper.css";

/* 🔹 Dummy Events */
const dummyEvents = [
  {
    _id: "dummy1",
    title: "NullPointerClub Beginner CTF",
    description: "Beginner friendly CTF with Web, Crypto, OSINT challenges.",
    startDate: "2026-02-20T10:00:00",
    endDate: "2026-02-20T18:00:00",
    features: ["Web", "Crypto", "OSINT"],
    gallery: [],
  },
  {
    _id: "dummy2",
    title: "Web Exploitation Challenge",
    description: "Practice real-world web vulnerabilities.",
    startDate: "2026-03-05T10:00:00",
    endDate: "2026-03-05T17:00:00",
    features: ["XSS", "SQLi", "CSRF"],
    gallery: [],
  }
];

export default function EventDetailsPage() {

  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = dummyEvents.find(e => e._id === id);
    setEvent(foundEvent);
  }, [id]);

  if (!event) return <h2 style={{textAlign:"center", color:"#f1f5f9"}}>Event Not Found</h2>;

  return (
    <div className="event-details-wrapper">
      <EventHeader event={event} />
      <EventSchedule event={event} />
      <EventGallery event={event} />
      <EventDetailCTA event={event} />
    </div>
  );
}