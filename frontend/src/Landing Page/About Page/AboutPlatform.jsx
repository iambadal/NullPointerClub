import "./styles/AboutSection.css";
import "./styles/AboutPlatform.css";

const AboutPlatform = () => {
  return (
    <section className="about-section">
      <h2>Our Platform Architecture</h2>

      <div className="platform-grid">
        <div className="platform-card">
          <h3>Scalable Infrastructure</h3>
          <p>
            NullPointerClub is built with a modular and scalable architecture 
            designed to support thousands of concurrent participants, 
            real-time competitions, and high-performance leaderboards.
          </p>
        </div>

        <div className="platform-card">
          <h3>Security-First Design</h3>
          <p>
            Every component is developed with secure authentication, 
            role-based access control, and protected challenge environments 
            to ensure fair and safe competitions.
          </p>
        </div>

        <div className="platform-card">
          <h3>Extensible Ecosystem</h3>
          <p>
            The system is designed to integrate future modules such as 
            virtual labs, enterprise training programs, academic partnerships, 
            and community-driven challenge contributions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPlatform;