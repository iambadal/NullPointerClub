import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-brand">
          <h2>NullPointerClub</h2>
          <p>Hack. Learn. Compete.</p>
        </div>

        {/* CENTER */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <div className="footer-links-list">
            <a href="/">Home</a>
            <a href="/practice">Practice</a>
            <a href="/events">Events</a>
            <a href="/leaderboard">Leaderboard</a>
            <a href="/about">About</a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="footer-socials">
          <h4>Connect</h4>
          <a href="#">Discord</a>
          <a href="#">GitHub</a>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} NullPointerClub | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;