import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    userId: "",
    email: "",
    phoneNumber: "",
    gender: "",
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

    const res = await fetch("http://localhost:5500/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="register-container">

      <h2>Register</h2>
      <p className="subtitle">Create your account</p>

      <form onSubmit={handleSubmit}>

        {/* Role */}
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
          <input type="text" name="fullName" onChange={handleChange} required />
          <label>Full Name</label>
        </div>

        <div className="input-group">
          <input type="text" name="userId" onChange={handleChange} required />
          <label>User ID</label>
        </div>

        <div className="input-group">
          <input type="email" name="email" onChange={handleChange} required />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input type="tel" name="phoneNumber" onChange={handleChange} required />
          <label>Phone Number</label>
        </div>

        <div className="input-group">
          <select name="gender" defaultValue="" onChange={handleChange} required>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label>Gender</label>
        </div>

        <div className="input-group">
          <input type="password" name="password" onChange={handleChange} required />
          <label>Password</label>
        </div>

        <button type="submit">Register</button>

      </form>

      <p className="login-text">
        Already have an account?
        <a href="/login"> Login here</a>
      </p>

    </div>
  );
};

export default Register; 