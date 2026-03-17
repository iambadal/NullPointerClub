import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/Navbar.css";

const Navbar = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  const [hide, setHide] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  /* Load user from localStorage */

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    updateUser();

    window.addEventListener("storage", updateUser);

    return () => window.removeEventListener("storage", updateUser);

  }, []);

  /* Navbar hide on scroll */

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setHide(true);
      } else {
        setHide(false);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, [lastScrollY]);

  /* Avatar logic */
  const getAvatar = () => {

  if (
    user?.profilePicture &&
    user.profilePicture.startsWith("/uploads/") &&
    !user.profilePicture.toLowerCase().includes("default")
  ) {
    return `http://localhost:5500${user.profilePicture}`;
  }

  if (user?.gender === "female") {
    return "/images/Default_women_avatar.png";
  }

  return "/images/Default_men_avatar.png";
};

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

        {token ? (
          <img src={getAvatar()}
               className="nav-avatar"
               alt="profile"
               onClick={() => navigate("/profile")}
          />
        ):(
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </div>

    </nav>
  );
};

export default Navbar;