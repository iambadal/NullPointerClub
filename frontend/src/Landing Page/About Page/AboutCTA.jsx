import "./styles/AboutCTA.css";
import { Link } from "react-router-dom";

const AboutCTA = () => {
  return (
    <section className="about-cta">
      <h3>Join the NullPointerClub Community</h3>
      <p>
        Whether you're a beginner exploring cybersecurity or an advanced hacker
        sharpening your skills, this platform helps you grow and compete.
      </p>
      
      <Link to="/practice">
        <button className="cta-btn">Start Practicing</button>
      </Link>
    </section>
  );
};

export default AboutCTA;