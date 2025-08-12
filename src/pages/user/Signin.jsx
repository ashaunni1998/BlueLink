import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import GoogleLogin from "./GoogleLogin";
import Swal from "sweetalert2";
import './Home.css';
import { AuthContext } from "../../context/AuthContext";


const SignIn = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    window.handleGoogleResponse = (response) => {
      const userObject = jwtDecode(response.credential);
      localStorage.setItem("user", JSON.stringify(userObject));
      setIsLoggedIn(true);
      navigate("/");
    };
  }, [navigate, setIsLoggedIn]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsSubmitting(true);

  try {
    const response = await fetch(
      "https://kerala-digital-park-server.vercel.app/api/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok && data.data) {
      // ✅ Save token & user immediately
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("user", JSON.stringify(data.data));

      // ✅ Update AuthContext so Header updates instantly
      setIsLoggedIn(true);

      // ✅ Navigate to home immediately (same as OTP flow)
      navigate("/");

      // ✅ Show success alert (does not block navigation)
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      setError(data.message || "Login failed. Please check your credentials.");
    }

  } catch (err) {
    console.error("Login error:", err);
    setError("Something went wrong. Please try again later.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="responsive-container" style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Sign in</h2>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="account"
                checked={hasAccount}
                onChange={() => {
                  setHasAccount(true);
                  navigate("/signin");
                }}
              />
              <span style={styles.radioLabel}>I have an account</span>
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="account"
                checked={!hasAccount}
                onChange={() => {
                  setHasAccount(false);
                  navigate("/signup");
                }}
              />
              <span style={styles.radioLabel}>I don't have an account</span>
            </label>
          </div>

          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

          <div style={styles.inputGroup}>
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <a href="/forgotpassword" style={styles.forgotPassword}>
            Forgotten your password?
          </a>

          <GoogleLogin />

          <button type="submit" disabled={isSubmitting} style={styles.button}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <p style={styles.disclaimer}>
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="#">Privacy Policy</a> and{" "}
            <a href="#">Terms of Service</a> apply.
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px"
  },
  formContainer: {
    border: "1px solid #ddd",
    padding: "30px",
    width: "420px",
    borderRadius: "5px"
  },
  heading: { marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column" },
  radioGroup: { marginBottom: "20px" },
  radioLabel: { marginLeft: "8px" },
  inputGroup: { marginBottom: "15px" },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginTop: "5px"
  },
  forgotPassword: {
    fontSize: "13px",
    color: "green",
    textDecoration: "none",
    marginBottom: "20px"
  },
  button: {
    backgroundColor: "#007f4f",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    marginBottom: "20px"
  },
  disclaimer: { fontSize: "12px", color: "#555" }
};

export default SignIn;
