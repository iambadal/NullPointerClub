import Footer from "../components/Footer";
import EventsHero from "./EventsHero";
import EventsList from "./EventsList";
import "./styles/EventsWrapper.css";

const Events = () => {
  return (
    <div className="events-wrapper">
      <EventsHero />
      <EventsList />
      <Footer />
    </div>
  );
};

export default Events;