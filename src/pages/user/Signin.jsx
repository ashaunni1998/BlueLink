import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const SignIn = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const navigate = useNavigate();

  return (
    <div  style={{width:"90%"}} className="mx-auto">  
        <Header/>
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Sign in</h2>

        <form style={styles.form}>
          {/* Radio Buttons */}
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="account"
                checked={hasAccount}
                onChange={() => {
                  setHasAccount(true);
                  navigate("/signin"); // 👈 Navigate back to SignIn
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
                  navigate("/signup"); // 👈 Navigate to SignUp
                }}
              />
              <span style={styles.radioLabel}>I don't have an account</span>
            </label>
          </div>

          {/* Email/Password */}
          <div style={styles.inputGroup}>
            <label>Email address</label>
            <input type="email" style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label>Password</label>
            <input type="password" style={styles.input} />
          </div>
          <a href="/reset-password" style={styles.forgotPassword}>
            Forgotten your password?
          </a>

          {/* Remember Me */}
          <div style={styles.checkboxGroup}>
            <label>
              <input type="checkbox" defaultChecked />
              <span style={styles.checkboxLabel}>Remember me on this computer</span>
            </label>
            <p style={styles.helperText}>
              This feature requires cookies. <a href="#">What's this?</a>
            </p>
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.button}>
            Sign in
          </button>

          {/* reCAPTCHA disclaimer */}
          <p style={styles.disclaimer}>
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="#">Privacy Policy</a> and{" "}
            <a href="#">Terms of Service</a> apply.
          </p>

          {/* Divider */}
          <div style={styles.divider}>
            <span>OR</span>
          </div>

          {/* Facebook login */}
          <p style={styles.facebookText}>Trying to sign in with Facebook?</p>
          <p>
            Please update your details <a href="#">here</a>
          </p>
        </form>
      </div>

      {/* FAQ Section */}
      <div style={styles.faqContainer}>
        <h3>FAQ's</h3>
        <hr />
        <p>Can I still sign in with Facebook? <b>+</b></p>
        <hr />
        <p>Why do I need to sign in? <b>+</b></p>
        <hr />
        <p>I'm having problems logging in <b>+</b></p>
      </div>
</div>
<Footer/>
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
    flexWrap: "wrap"
  },
  formContainer: {
    border: "1px solid #ddd",
    padding: "30px",
    width: "420px",
    borderRadius: "5px"
  },
  heading: {
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  radioGroup: {
    marginBottom: "20px"
  },
  radioLabel: {
    marginLeft: "8px"
  },
  inputGroup: {
    marginBottom: "15px"
  },
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
  checkboxGroup: {
    marginBottom: "20px"
  },
  checkboxLabel: {
    marginLeft: "8px"
  },
  helperText: {
    fontSize: "12px",
    marginTop: "5px"
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
  disclaimer: {
    fontSize: "12px",
    color: "#555"
  },
  divider: {
    textAlign: "center",
    margin: "20px 0",
    borderTop: "1px solid #ccc",
    position: "relative"
  },
  facebookText: {
    fontWeight: "bold"
  },
  faqContainer: {
    border: "1px solid #ddd",
    padding: "20px",
    width: "280px",
    borderRadius: "5px"
  }
};



export default SignIn;
