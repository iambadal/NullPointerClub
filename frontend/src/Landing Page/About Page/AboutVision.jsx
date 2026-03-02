import "./styles/AboutSection.css";
import "./styles/AboutVision.css";

const AboutVision = () => {
  return (
    <section className="about-section vision-section">
      <h2>Our Vision</h2>

      <div className="vision-container">
        <p className="vision-text">
          NullPointerClub aims to become a leading cybersecurity learning 
          ecosystem that empowers students, professionals, and organizations 
          to master practical security skills through competitive learning.
        </p>

        <p className="vision-text">
          We envision a future where cybersecurity education is accessible, 
          hands-on, and community-driven — transforming beginners into 
          industry-ready security professionals.
        </p>

        <p className="vision-text">
          Our long-term goal is to expand into enterprise security training, 
          university partnerships, and global competitive cybersecurity events.
        </p>
      </div>
    </section>
  );
};

export default AboutVision;