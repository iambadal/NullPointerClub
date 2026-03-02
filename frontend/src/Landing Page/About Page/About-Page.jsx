import AboutHero from "./AboutHero";
import AboutMission from "./AboutMission";
import AboutFeatures from "./AboutFeatures";
import AboutPlatform from "./AboutPlatform";
import AboutVision from "./AboutVision";
import AboutCTA from "./AboutCTA";
import "./styles/AboutWrapper.css";

const About = () => {
  return (
    <div className="about-wrapper">
      <AboutHero />
      <AboutMission />
      <AboutFeatures />
      <AboutPlatform />
      <AboutVision />
      <AboutCTA />
    </div>
  );
};

export default About;