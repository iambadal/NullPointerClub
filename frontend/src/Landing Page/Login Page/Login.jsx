import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <p className="subtitle">Choose your role</p>

      <form action="/login" method="POST">
        {/* Role Selection */}
        <div className="role-selector">
          <label>
            <input type="radio" name="role" value="participant" required />
            <span>Participant</span>
          </label>

          <label>
            <input type="radio" name="role" value="organiser" />
            <span>Event Organiser</span>
          </label>
        </div>

        <div className="input-group">
          <input type="text" name="username" required />
          <label>Username</label>
        </div>

        <div className="input-group">
          <input type="password" name="password" required />
          <label>Password</label>
        </div>

        <button type="submit">Login</button>
      </form>

      <p className="signup-text">
        Don't have an account?
        <a href="./register"> Register here</a>
      </p>
    </div>
  );
};

export default Login;
