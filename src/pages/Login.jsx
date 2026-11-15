import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LockKeyhole,
  UserRound,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function Login({ onLogin }) {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!studentId.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (
      studentId === "20240001" &&
      password === "liu123"
    ) {
      onLogin();
      navigate("/");
    } else {
      setError("Invalid Student ID or Password.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-brand">
          <div className="login-logo">
            <GraduationCap size={32} />
          </div>

          <h1>LIU Student Portal</h1>
          <p>Lebanese International University</p>
        </div>

        <div className="login-card">
          <div className="login-heading">
            <span>WELCOME BACK</span>
            <h2>Sign in to your account</h2>
            <p>Enter your student information to continue.</p>
          </div>

          <form onSubmit={handleLogin}>

            <label htmlFor="studentId">
              Student ID
            </label>

            <div className="login-input">
              <UserRound size={19} />

              <input
                id="studentId"
                type="text"
                placeholder="Enter your Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>

            <label htmlFor="password">
              Password
            </label>

            <div className="login-input">
              <LockKeyhole size={19} />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword
                  ? <EyeOff size={19} />
                  : <Eye size={19} />
                }
              </button>
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button type="submit" className="login-submit">
              Sign In
              <ArrowRight size={19} />
            </button>

          </form>

          <div className="login-footer">
            <GraduationCap size={17} />
            <span>Student Portal · Academic Year 2026</span>
          </div>
        </div>

        <p className="login-copyright">
          © 2026 LIU Student Portal. Academic Project.
        </p>

      </div>
    </div>
  );
}

export default Login;