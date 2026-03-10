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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.role) newErrors.role = "Please select a role";
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.userId) newErrors.userId = "User ID is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const res = await fetch("http://localhost:5500/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
       body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("verifyEmail", formData.email);
      alert("OTP sent to your email");
      navigate("/verify-email");
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
            <input type="radio" name="role" value="participant" onChange={handleChange} />
            <span>Participant</span>
          </label>

          <label>
            <input type="radio" name="role" value="organiser" onChange={handleChange} />
            <span>Event Organiser</span>
          </label>
        </div>
        {errors.role && <p className="error">{errors.role}</p>}

        <div className="input-group">
          <input type="text" name="fullName" onChange={handleChange} required />
          <label>Full Name</label>
        </div>
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <div className="input-group">
          <input type="text" name="userId" onChange={handleChange} required />
          <label>User ID</label>
        </div>
        {errors.userId && <p className="error">{errors.userId}</p>}

        <div className="input-group">
          <input type="email" name="email" onChange={handleChange} required />
          <label>Email</label>
        </div>
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="input-group">
          <input type="tel" name="phoneNumber" onChange={handleChange} required />
          <label>Phone Number</label>
        </div>
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

        <div className="input-group">
          <select name="gender" defaultValue="" onChange={handleChange} required>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label>Gender</label>
        </div>
        {errors.gender && <p className="error">{errors.gender}</p>}

        <div className="input-group">
          <input type="password" name="password" onChange={handleChange} required />
          <label>Password</label>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}

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