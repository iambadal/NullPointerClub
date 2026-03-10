import { Routes, Route } from "react-router-dom";

import Home from "./Landing Page/Home Page/Home-Page";
import Events from "./Landing Page/Events Page/Events-Page";
import EventDetailsPage from "./Landing Page/Event Details Page/Event-Details-Page";
import Leaderboard from "./Landing Page/Leaderboard Page/Leaderboard";
import Practice from "./Landing Page/Practice Page/Practice";
import About from "./Landing Page/About Page/About-Page";
import Navbar from "./Landing Page/components/Navbar";
import Login from "./Landing Page/Login Page/Login";
import Register from "./Landing Page/Registration Page/Register";
import VerifyEmail from "./Landing Page/Email Verify Page/VerifyEmail";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </>
  );
}


export default App;