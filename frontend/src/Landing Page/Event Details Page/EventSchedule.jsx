import "./styles/EventSchedule.css";

export default function EventSchedule({ event }) {
  return (
    <section className="schedule-section">

      <div className="schedule-card">
        <h3>Event Schedule</h3>

        <div className="schedule-item">
          <span className="label">Start</span>
          <span>{new Date(event.startDate).toLocaleString()}</span>
        </div>

        <div className="schedule-item">
          <span className="label">End</span>
          <span>{new Date(event.endDate).toLocaleString()}</span>
        </div>

      </div>

    </section>
  );
}