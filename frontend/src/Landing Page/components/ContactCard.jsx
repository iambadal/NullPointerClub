import "./styles/ContactCard.css";

const ContactCard = ({ title, details, icon }) => {
  return (
    <div className="contact-card">
      <div className="contact-icon">{icon}</div>
      <h3>{title}</h3>
      <ul>
        {details.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContactCard;
