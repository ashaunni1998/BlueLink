import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { jwtDecode } from "jwt-decode";
import GoogleLogin from "./GoogleLogin";
import './Home.css';
import { useContext } from "react";
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
      console.log("Google User:", userObject);
      localStorage.setItem("user", JSON.stringify(userObject));
      navigate("/dashboard");
    };
  }, [navigate]);

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
  localStorage.setItem("user", JSON.stringify(data.data));

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  setIsLoggedIn(true);
  navigate("/");
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


useEffect(() => {
  const handleAuthChange = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  window.addEventListener("authChange", handleAuthChange);
  return () => {
    window.removeEventListener("authChange", handleAuthChange);
  };
}, []);


  return (
    <div className="responsive-container">
      <Header />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Sign in</h2>

          <form style={styles.form} onSubmit={handleSubmit}>
            {/* Radio Buttons */}
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

            {/* Error Message */}
            {error && (
              <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
            )}

            {/* Email/Password */}
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


             {/* Google login */}
            <GoogleLogin />

            {/* Remember Me */}
            {/* <div style={styles.checkboxGroup}>
              <label>
                <input type="checkbox" defaultChecked />
                <span style={styles.checkboxLabel}>
                  Remember me on this computer
                </span>
              </label>
              <p style={styles.helperText}>
                This feature requires cookies. <a href="#">What's this?</a>
              </p>
            </div> */}

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting} style={styles.button}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>

            {/* reCAPTCHA disclaimer */}
            <p style={styles.disclaimer}>
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="#">Privacy Policy</a> and{" "}
              <a href="#">Terms of Service</a> apply.
            </p>

            {/* Divider */}
            {/* <div style={styles.divider}>
              <span>OR</span>
            </div> */}

           
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "40px",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "40px",
    flexWrap: "wrap",
  },
  formContainer: {
    border: "1px solid #ddd",
    padding: "30px",
    width: "420px",
    borderRadius: "5px",
  },
  heading: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  radioGroup: {
    marginBottom: "20px",
  },
  radioLabel: {
    marginLeft: "8px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  forgotPassword: {
    fontSize: "13px",
    color: "green",
    textDecoration: "none",
    marginBottom: "20px",
  },
  checkboxGroup: {
    marginBottom: "20px",
  },
  checkboxLabel: {
    marginLeft: "8px",
  },
  helperText: {
    fontSize: "12px",
    marginTop: "5px",
  },
  button: {
    backgroundColor: "#007f4f",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    marginBottom: "20px",
  },
  disclaimer: {
    fontSize: "12px",
    color: "#555",
  },
  divider: {
    textAlign: "center",
    margin: "20px 0",
    borderTop: "1px solid #ccc",
    position: "relative",
  },
};

export default SignIn;
