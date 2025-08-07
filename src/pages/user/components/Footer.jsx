import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";

import GoogleTranslateDropdown from "../GoogleTranslateDropdown";

import { Link } from "react-router-dom";

const Footer = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 768);
    checkWidth(); // initial
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);



  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#fff",
      color: "#333",
      fontSize: "14px",
      lineHeight: "1.6",
      borderTop: "1px solid #eee",
    },
    topBar: {
      backgroundColor: "#42526E",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 20px",
    },
    rating: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    languageBox: {
      padding: "16px 20px",
      borderBottom: "1px solid #ddd",
    },
    languageSelector: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      padding: "8px 12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "13px",
    },
    mainGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      padding: "40px 20px",
      gap: "40px",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    columnTitle: {
      fontWeight: "bold",
      marginBottom: "10px",
    },
    link: {
      color: "#00754a",
      cursor: "pointer",
      textDecoration: "none",
    },
    bottomStrip: {
      borderTop: "1px solid #eee",
      fontSize: "12px",
      color: "#555",
      padding: "20px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
    },
    legalLinks: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
    },


     socialIcons: {
      display: "flex",
      gap: "16px",
      fontSize: "20px",
    },

    mainRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '40px 20px',
    backgroundColor: '#f4f4f4',
    flexWrap: 'wrap', // for responsiveness
  },
  column: {
    flex: '1 1 30%',
    margin: '10px',
    minWidth: '200px',
  },
  columnTitle: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '10px',
    color: '#222',
  },
  link: {
    display: 'block',
    color: '#333',
    textDecoration: 'none',
    margin: '5px 0',
    fontSize: '15px',
  },
  };


 
  return (
    <footer style={styles.container}>
      {/* Top bar */}
     <div style={styles.topBar} className="footer-topbar">

        <div style={styles.rating}>
        <span style={{ fontWeight: "bold", color: "#F37934" }}>🟧 TRUSTPILOT</span>
          <span style={{ color: "#00B67A" }}>★★★★☆</span>
          <span>4.6/5</span>
        </div>
    
<div style={styles.socialIcons} className="footer-social">
  <a href="https://www.facebook.com/YourPage" target="_blank" rel="noopener noreferrer" style={{ color: "#4267B2" }}>
    <FaFacebookF />
  </a>
  <a href="https://www.instagram.com/YourPage" target="_blank" rel="noopener noreferrer" style={{ color: "#C13584" }}>
    <FaInstagram />
  </a>
  <a href="https://twitter.com/YourPage" target="_blank" rel="noopener noreferrer" style={{ color: "#1DA1F2" }}>
    <FaTwitter />
  </a>
  <a href="https://www.youtube.com/YourChannel" target="_blank" rel="noopener noreferrer" style={{ color: "#FF0000" }}>
    <FaYoutube />
  </a>
  <a href="https://wa.me/YourNumber" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366" }}>
    <FaWhatsapp />
  </a>
</div>

      </div>

      {/* Language selector */}
      {/* <div style={styles.languageBox}>
        <div style={styles.languageSelector}>
          <span>United States (English)</span>
          <img src="https://flagcdn.com/us.svg" alt="US" width="20" />
          <span>▾</span>
        </div>
      </div> */}
      <GoogleTranslateDropdown/>

      {/* Main link grid */}
<div style={styles.mainRow}>
  {/* Column 1: Products */}
  <div style={styles.column}>
    <div style={styles.columnTitle}>Products</div>
    {[
      { label: "All Products", path: "/" },
      { label: "Business Cards", path: "/businessCard" },
      { label: "Flyers", path: "/flyers" },
      { label: "Postcards", path: "/postcards" },
      { label: "Stickers and Labels", path: "/stickers" },
      { label: "Personalized Gift", path: "/personalized-gift" },
      { label: "Stationery", path: "/stationery" },
       { label: "Button Badges", path: "/buttonbadges" },
      

    ].map((item) => (
      <a href={item.path} key={item.label} style={styles.link}>
        {item.label}
      </a>
    ))}
  </div>

  {/* Column 2: About Us */}
  <div style={styles.column}>
    <div style={styles.columnTitle}>About Us</div>
    {[
      { label: "About Blue Link", path: "/about" },
    ].map((item) => (
      <a href={item.path} key={item.label} style={styles.link}>
        {item.label}
      </a>
    ))}
  </div>

  {/* Column 3: Help */}
  <div style={styles.column}>
    <div style={styles.columnTitle}>Help</div>
    {[
      { label: "Contact us", path: "/contact" },
      // { label: "Next Day Delivery", path: "/delivery" },
      { label: "FAQs", path: "/help" },
    ].map((item) => (
      <a href={item.path} key={item.label} style={styles.link}>
        {item.label}
      </a>
    ))}
  </div>
</div>

 

      {/* Legal strip */}
    <div style={styles.legalLinks}>
  {[
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
    // { label: "Fonts", path: "/fonts" },
    // { label: "Company information", path: "/company" },
    // { label: "Cookie Preferences", path: "/cookies" },
  ].map((item) => (
    <Link key={item.label} to={item.path} style={styles.link}>
      {item.label}
    </Link>
  ))}
</div>

       <style>
  {`
    @media (max-width: 768px) {
      .footer-topbar {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .footer-social {
        justify-content: flex-start;
        padding-left: 2px;
      }
    }
  `}
</style>

    </footer>
  );
};

export default Footer;
