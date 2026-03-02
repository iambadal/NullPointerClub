import "./styles/AboutSection.css";
import "./styles/AboutFeatures.css";

const AboutFeatures = () => {
  const features = [
    "CTF Event Creation & Management",
    "Multi-category Challenges (Web, Crypto, Forensics, OSINT etc.)",
    "Real-time Leaderboards",
    "Secure Flag Submission System",
    "Practice Mode",
    "Role-based Access (Both Organizer and Participant)"
  ];

  return (
    <section className="about-section">
      <h2> Platform Features</h2>
      <ul className="feature-list">
        {features.map((feature, index) => (
          <li key={index}>✔ {feature}</li>
        ))}
      </ul>
    </section>
  );
};

export default AboutFeatures;