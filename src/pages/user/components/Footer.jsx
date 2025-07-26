import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
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
  };

  return (
    <footer style={styles.container}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <div style={styles.rating}>
          <span>🟧 TRUSTPILOT</span>
          <span style={{ color: "#00B67A" }}>★★★★☆</span>
          <span>4.6/5</span>
        </div>
        <div style={{ display: "flex", gap: "16px", fontSize: "18px" }}>
          <FaFacebookF />
          <FaInstagram />
          <FaTwitter />
        </div>
      </div>

      {/* Language selector */}
      <div style={styles.languageBox}>
        <div style={styles.languageSelector}>
          <span>United States (English)</span>
          <img src="https://flagcdn.com/us.svg" alt="US" width="20" />
          <span>▾</span>
        </div>
      </div>

      {/* Main link grid */}
      <div style={styles.mainGrid}>
        {/* Column 1: Products */}
        <div style={styles.column}>
          <div style={styles.columnTitle}>Products</div>
          {[
            "All Products",
            "Business Cards",
            "Square Business Cards",
            "Letterpress Business Cards",
            "Luxe by MOO",
            "MOO Water Bottle",
            "MiniCards",
            "Flyers",
            "Postcards",
            "Notecards",
            "Gift Cards",
            "Greeting Cards",
            "Stickers and Labels",
            "Letterheads",
            "Accessories",
            "Branded Merchandise",
          ].map((item) => (
            <a key={item} style={styles.link}>{item}</a>
          ))}
        </div>

        {/* Column 2: Paper Stocks */}
        <div style={styles.column}>
          <div style={styles.columnTitle}>Paper Stocks</div>
          {[
            "Paper Stocks",
            "MOO Eco",
            "MOO Luxe",
            "MOO Super",
            "MOO Cotton",
            "MOO Original",
            "MOO Letterpress",
            "Sample Packs",
          ].map((item) => (
            <a key={item} style={styles.link}>{item}</a>
          ))}
        </div>

        {/* Column 3: About Us */}
        <div style={styles.column}>
          <div style={styles.columnTitle}>About Us</div>
          {[
            "About MOO",
            "Media resources",
            "People, products and the planet",
            "Who we are",
            "Careers",
            "The Drop",
            "Business Services",
            "Reseller",
            "Printfinity",
            "The MOO Promise",
            "Packaging",
            "Partner with MOO",
          ].map((item) => (
            <a key={item} style={styles.link}>{item}</a>
          ))}
        </div>

        {/* Column 4: Help */}
        <div style={styles.column}>
          <div style={styles.columnTitle}>Help</div>
          {[
            "Contact us",
            "Pricing",
            "Next Day Delivery",
            "FAQs",
            "Artwork guidelines",
            "Affiliates",
            "Refer and Earn",
            "Do not sell or share my personal information",
            "Vulnerability Disclosure",
          ].map((item) => (
            <a key={item} style={styles.link}>{item}</a>
          ))}
        </div>
      </div>

      {/* Legal strip */}
      <div style={styles.bottomStrip}>
        <p>
          © MOO Inc., 25 Fairmount Ave, East Providence, RI 02914, USA –
          Registered in the United States of America.
        </p>
        <div style={styles.legalLinks}>
          <span style={styles.link}>Terms & Conditions</span>
          <span style={styles.link}>Privacy Policy</span>
          <span style={styles.link}>Fonts</span>
          <span style={styles.link}>Sitemap</span>
          <span style={styles.link}>Company information</span>
          <span style={styles.link}>Cookie Preferences</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
