import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); 
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    role: ""
  });

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.role) newErrors.role = "Please select a role";
    if (!formData.userId) newErrors.userId = "User ID is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const res = await fetch("http://localhost:5500/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if(res.ok){
      localStorage.setItem("token", data.token);

      alert("Login successful");

      navigate("/");
    } else {
      alert(data.message);
    }
  };

  // SEND RESET OTP
  const handleForgot = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5500/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (res.ok) {
      alert("OTP sent to email");
      setMode("reset");
    } else {
      alert(data.message);
    }
  };

  // RESET PASSWORD
  const handleReset = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5500/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp, newPassword })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Password reset successful");
      setMode("login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">

      <h2>
        {mode === "login" && "Login"}
        {mode === "forgot" && "Forgot Password"}
        {mode === "reset" && "Reset Password"}
      </h2>

      <p className="subtitle">
        {mode === "login" && "Choose your role"}
        {mode === "forgot" && "Enter your email"}
        {mode === "reset" && "Enter OTP and new password"}
      </p>

      {/* LOGIN FORM */}
      {mode === "login" && (
        <form onSubmit={handleSubmit}>

          <div className="role-selector">
            <label>
              <input type="radio" name="role" value="participant" onChange={handleChange}/>
              <span>Participant</span>
            </label>

            <label>
              <input type="radio" name="role" value="organiser" onChange={handleChange} />
              <span>Event Organiser</span>
            </label>
          </div>
          {errors.role && <p className="error">{errors.role}</p>}

          <div className="input-group">
            <input type="text" name="userId" onChange={handleChange} required />
            <label>User ID</label>
          </div>
          {errors.userId && <p className="error">{errors.userId}</p>}

          <div className="input-group">
            <input type="password" name="password" onChange={handleChange} required />
            <label>Password</label>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Login</button>

          <p className="forgot-password">
            <span onClick={() => setMode("forgot")}>
              Forgot Password?
            </span>
          </p>

        </form>
      )}

      {/* FORGOT PASSWORD */}
      {mode === "forgot" && (
        <form onSubmit={handleForgot}>

          <div className="input-group">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <button type="submit">Send OTP</button>

          <p className="forgot-password">
            <span onClick={() => setMode("login")}>
              Back to Login
            </span>
          </p>

        </form>
      )}

      {/* RESET PASSWORD */}
      {mode === "reset" && (
        <form onSubmit={handleReset}>

          <div className="input-group">
            <input
              type="text"
              required
              onChange={(e) => setOtp(e.target.value)}
            />
            <label>OTP</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>New Password</label>
          </div>

          <button type="submit">Reset Password</button>

        </form>
      )}

      <p className="signup-text">
        Don't have an account?
        <a href="/register"> Register here</a>
      </p>

    </div>
  );
};

export default Login;