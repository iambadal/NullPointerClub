import "./styles/MissionCard.css";

const MissionCard = ({ title, description, icon }) => {
  return (
    <div className="mission-card">
      <div className="mission-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default MissionCard;
