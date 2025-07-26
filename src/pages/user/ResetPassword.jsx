import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically call your backend endpoint
    alert(`Password reset link sent to: ${email}`);
  };

  return (
    <div style={{width:"90%"}} className="mx-auto">
        <Header/>
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Reset your password<span style={{ color: "#007f4f" }}>?</span></h2>
      <p style={styles.subText}>
        Forgotten your password? No problem, just enter your email address below, click 
        <strong> "Reset my password"</strong> and we'll email you a link to a page where you can change it.
      </p>

      <form onSubmit={handleSubmit} style={styles.formBox}>
        <label htmlFor="email" style={styles.label}>Email address</label>
        <input
          type="email"
          id="email"
          required
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" style={styles.button}>
          Reset my password
        </button>
      </form>
</div>   
<Footer/>
 </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: "700px",
    margin: "60px auto",
    textAlign: "center",
    padding: "0 20px",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "10px",
    color: "#222",
  },
  subText: {
    fontSize: "16px",
    marginBottom: "30px",
    color: "#444",
    lineHeight: "1.6",
  },
  formBox: {
    margin: "0 auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    maxWidth: "460px",
    textAlign: "left",
    backgroundColor: "#fff",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#00965e",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
  },
};

export default ResetPassword;
