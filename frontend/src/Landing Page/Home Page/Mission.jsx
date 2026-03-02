import MissionCard from "../components/MissionCard";
import "./styles/Mission.css";

const Mission = () => {
  return (
    <section className="mission-section">
      <h2 className="mission-title">Our Mission</h2>

      <p className="mission-subtitle">
        Building a playground for hackers to learn, compete, and grow.
      </p>

      <div className="mission-grid">
        <MissionCard
          icon="🧠"
          title="Learn by Doing"
          description="Hands-on challenges based on real-world vulnerabilities."
        />

        <MissionCard
          icon="🏴‍☠️"
          title="Practice CTFs"
          description="Sharpen your skills with curated practice labs."
        />

        <MissionCard
          icon="⚔️"
          title="Compete Globally"
          description="Join CTF events and battle with hackers worldwide."
        />

        <MissionCard
          icon="🚀"
          title="Grow Together"
          description="Build community and share knowledge."
        />
      </div>
    </section>
  );
};

export default Mission;
