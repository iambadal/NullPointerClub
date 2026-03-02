import ContactCard from "../components/ContactCard";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <section className="contact-section">
      <h2 className="contact-title">Contact Us</h2>

      <p className="contact-subtitle">
        Have questions? Want to collaborate? Reach out to us.
      </p>

      <div className="contact-grid">
        <ContactCard
          icon="📧"
          title="Email"
          details={[
            "nullpointerclub@gmail.com",
            "support@nullpointerclub.org",
          ]}
        />
      </div>
    </section>
  );
};

export default Contact;
