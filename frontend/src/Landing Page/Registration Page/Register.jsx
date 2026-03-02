import React from "react";
import "./register.css";

const Register = () => {
  return (
    <div className="register-container">
      <h2>Register</h2>
      <p className="subtitle">Create your account</p>

      <form action="/register" method="POST">

        {/* Role Selection */}
        <div className="role-selector">
          <label>
            <input type="radio" name="type" value="participant" required />
            <span>Participant</span>
          </label>

          <label>
            <input type="radio" name="type" value="organiser" />
            <span>Event Organiser</span>
          </label>
        </div>

        <div className="input-group">
          <input type="text" name="fullname" required />
          <label>Full Name</label>
        </div>

        <div className="input-group">
          <input type="text" name="userid" required />
          <label>User ID (Unique)</label>
        </div>

        <div className="input-group">
          <input type="email" name="email" required />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input type="tel" name="phone" required />
          <label>Phone Number</label>
        </div>

        <div className="input-group">
          <select name="gender" defaultValue="" required>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label>Gender</label>
        </div>


        <div className="input-group">
          <input type="password" name="password" required />
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
