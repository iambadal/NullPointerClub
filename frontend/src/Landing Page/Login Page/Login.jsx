import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5500/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {

      localStorage.setItem("token", data.token);

      alert("Login successful");

      navigate("/");

    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">

      <h2>Login</h2>
      <p className="subtitle">Choose your role</p>

      <form onSubmit={handleSubmit}>

        <div className="role-selector">
          <label>
            <input type="radio" name="role" value="participant" onChange={handleChange} required />
            <span>Participant</span>
          </label>

          <label>
            <input type="radio" name="role" value="organiser" onChange={handleChange} />
            <span>Event Organiser</span>
          </label>
        </div>

        <div className="input-group">
          <input type="text" name="userId" onChange={handleChange} required />
          <label>User ID</label>
        </div>

        <div className="input-group">
          <input type="password" name="password" onChange={handleChange} required />
          <label>Password</label>
        </div>

        <button type="submit">Login</button>

      </form>

      <p className="signup-text">
        Don't have an account?
        <a href="/register"> Register here</a>
      </p>

    </div>
  );
};

export default Login; 