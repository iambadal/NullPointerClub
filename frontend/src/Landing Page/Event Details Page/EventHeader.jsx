import "./styles/EventHeader.css";

export default function EventHeader({ event }) {
  return (
    <section className="event-header">

      <h1 className="event-title">{event.title}</h1>

      <div className="event-description-card">
        <p className="event-description">
          {event.description}
        </p>

        <div className="domain-section">
          <h4>Domains Covered</h4>
          <div className="domain-tags">
            {event.features.map((domain, index) => (
              <span key={index} className="domain-tag">
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}