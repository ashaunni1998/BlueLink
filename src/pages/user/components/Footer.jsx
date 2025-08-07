import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";
import GoogleTranslateDropdown from "../GoogleTranslateDropdown";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 768);
    checkWidth();
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
      backgroundColor: "#2c3e50",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      flexWrap: "wrap",
    },
    rating: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
    },
    socialIcons: {
      display: "flex",
      gap: "16px",
      fontSize: "20px",
    },
    mainRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "40px 20px",
      backgroundColor: "#f9f9f9",
      flexWrap: "wrap",
      gap: '20px',
    },
    column: {
      flex: "1 1 200px",
      margin: "10px",
    },
    columnTitle: {
      fontWeight: "bold",
      fontSize: "16px",
      marginBottom: "12px",
      color: "#222",
    },
    link: {
      display: "block",
      color: "#555",
      textDecoration: "none",
      margin: "6px 0",
      fontSize: "15px",
      transition: "color 0.3s",
    },
    legalLinks: {
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
      padding: "20px",
      fontSize: "13px",
      color: "#666",
      borderTop: "1px solid #eee",
    },
  };

  const hoverLinkStyle = {
    textDecoration: "underline",
    color: "#00754a",
  };

  const socialColors = {
    facebook: "#4267B2",
    instagram: "#C13584",
    twitter: "#1DA1F2",
    youtube: "#FF0000",
    whatsapp: "#25D366",
  };

  return (
    <footer style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar} className="footer-topbar">
        <div style={styles.rating}>
          <span style={{ fontWeight: "bold", color: "#F37934" }}>🟧 TRUSTPILOT</span>
          <span style={{ color: "#00B67A" }}>★★★★☆</span>
          <span>4.6/5</span>
        </div>

        <div style={styles.socialIcons} className="footer-social">
          <a href="https://www.facebook.com/YourPage" target="_blank" rel="noopener noreferrer" style={{ color: socialColors.facebook }}>
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/YourPage" target="_blank" rel="noopener noreferrer" style={{ color: socialColors.instagram }}>
            <FaInstagram />
          </a>
          <a href="https://twitter.com/YourPage" target="_blank" rel="noopener noreferrer" style={{ color: socialColors.twitter }}>
            <FaTwitter />
          </a>
          <a href="https://www.youtube.com/YourChannel" target="_blank" rel="noopener noreferrer" style={{ color: socialColors.youtube }}>
            <FaYoutube />
          </a>
          <a href="https://wa.me/YourNumber" target="_blank" rel="noopener noreferrer" style={{ color: socialColors.whatsapp }}>
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Google Translate Dropdown */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #ddd" }}>
        <GoogleTranslateDropdown />
      </div>

      {/* Main Link Grid */}
      <div style={styles.mainRow} className="footer-columns">
        {/* Products */}
        <div style={styles.column} className="footer-column">
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
            <Link to={item.path} key={item.label} style={styles.link} onMouseOver={(e) => (e.target.style.color = "#00754a")} onMouseOut={(e) => (e.target.style.color = "#555")}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* About */}
        <div style={styles.column} className="footer-column">
          <div style={styles.columnTitle}>About Us</div>
          {[
            { label: "About Blue Link", path: "/about" },
          ].map((item) => (
            <Link to={item.path} key={item.label} style={styles.link} onMouseOver={(e) => (e.target.style.color = "#00754a")} onMouseOut={(e) => (e.target.style.color = "#555")}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Help */}
        <div style={styles.column} className="footer-column">
          <div style={styles.columnTitle}>Help</div>
          {[
            { label: "Contact us", path: "/contact" },
            { label: "FAQs", path: "/help" },
          ].map((item) => (
            <Link to={item.path} key={item.label} style={styles.link} onMouseOver={(e) => (e.target.style.color = "#00754a")} onMouseOut={(e) => (e.target.style.color = "#555")}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Legal Links */}
     <div style={styles.legalLinks} className="footer-legal">
  {[
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
  ].map((item) => (
    <Link
      key={item.label}
      to={item.path}
      style={styles.link}
      onMouseOver={(e) => (e.target.style.color = "#00754a")}
      onMouseOut={(e) => (e.target.style.color = "#555")}
    >
      {item.label}
    </Link>
  ))}
</div>


      {/* Mobile CSS */}
      <style>{`
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

          .footer-legal {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
    margin-top: 20px;
  }


  .footer-columns {
      flex-direction: column !important;
    }

    .footer-column {
      width: 100%;
      padding: 0;
    }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
