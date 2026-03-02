import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/Navbar.css";

const Navbar = () => {

  const [hide, setHide] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setHide(true);  // scrolling down → hide
      } else {
        setHide(false); // scrolling up → show
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, [lastScrollY]);

  return (
    <nav className={`navbar ${hide ? "hide" : ""}`}>
      <div className="nav-left">
        <img src="/images/logo.png" alt="Logo" className="nav-logo" />
      </div>

      <div className="nav-right">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Home
        </NavLink>

        <NavLink to="/events" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Events
        </NavLink>

        <NavLink to="/practice" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Practice
        </NavLink>

        <NavLink to="/leaderboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Leaderboard
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          About
        </NavLink>

        <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;