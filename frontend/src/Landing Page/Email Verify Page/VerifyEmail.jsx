import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/verifyEmail.css";

const VerifyEmail = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const storedEmail = localStorage.getItem("verifyEmail");
    console.log("EMAIL FROM STORAGE:", storedEmail);

    if (!storedEmail) {
      alert("No email found. Please register again.");
      navigate("/register");
    } else {
      setEmail(storedEmail);
    }

  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {

      const res = await fetch("http://localhost:5500/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          otp
        })
      });

      const data = await res.json();

      if (res.ok) {

        alert("Registration completed successfully");

        localStorage.removeItem("verifyEmail");

        navigate("/login");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);
      alert("Verification failed");

    }

    setLoading(false);
  };

  return (
    <div className="verify-container">

      <h2>Verify Email</h2>

      <p className="subtitle">
        Enter the OTP sent to {email}
      </p>

      <form onSubmit={handleSubmit}>

        <div className="input-group">
          <input
            type="text"
            required
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <label>OTP</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Email"}
        </button>

      </form>

    </div>
  );
};

export default VerifyEmail;