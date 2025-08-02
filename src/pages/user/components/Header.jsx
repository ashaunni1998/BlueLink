import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GoogleTranslateDropdown from "../GoogleTranslateDropdown.jsx";



// const languages = [
//   { code: "us", label: "United States" },
//   { code: "fr", label: "France" },
//   { code: "de", label: "Germany" },
//   { code: "es", label: "Spain" },
//   { code: "it", label: "Italy" },
//   { code: "pt", label: "Portugal" },
//   { code: "nl", label: "Netherlands" },
//   { code: "ru", label: "Russia" },
//   { code: "jp", label: "Japan" },
//   { code: "cn", label: "China" },
//   { code: "in", label: "India" },
//   { code: "br", label: "Brazil" },
//   { code: "kr", label: "South Korea" },
//   { code: "ca", label: "Canada" },
//   { code: "au", label: "Australia" },
//   { code: "mx", label: "Mexico" },
//   { code: "ae", label: "UAE" },
//   { code: "tr", label: "Turkey" },
//   { code: "sa", label: "Saudi Arabia" },
//   { code: "sg", label: "Singapore" },
// ];

const menuItems = [
  {
    title: "Business Cards",
    subItems: [
      { label: "All Business Cards", link: "/businessCard" },
      { label: "Business Cards", link: "/BusinessCardDetails" },
      { label: "Special Business Cards", link: "/BusinessCardDetails" },
      { label: "Ice White Pearl Business Cards", link: "/BusinessCardDetails" },
      { label: "Folded Business Cards", link: "/BusinessCardDetails" },

    ],
  },
  {
    title: "Postcards",
    subItems: [
      { label: "All Postcards", link: "/postcards/" },
      { label: "Original PostCards", link: "/postcarddetails/" },
      { label: "Super PostCards", link: "/postcards/" },
      { label: "Pearlescent PostCards", link: "/postcards/" },

    ],
  },
  {
    title: "Flyers & Leaflets",
    subItems: [
      { label: "All Flyers", link: "/flyers" },
      { label: "US Letter Flyers", link: "/flyerdetails" },
      { label: "Half Page Flyers", link: "/flyers-leaflets/option-b" },
      { label: "Long Flyers", link: "/flyers-leaflets/option-b" },
      { label: "Square Flyers", link: "/flyers-leaflets/option-b" },
      { label: "Small Flyers", link: "/flyers-leaflets/option-b" },
      { label: "Premium Flyers", link: "/flyers-leaflets/option-b" },
      { label: "Pearlescent Flyers", link: "/flyers-leaflets/option-b" },
      { label: "Eco Flyers", link: "/flyers-leaflets/option-b" },
      { label: "Custom Flyers", link: "/flyers-leaflets/option-b" },
      { label: "Design a Flyer", link: "/flyers-leaflets/option-b" },
    ],
  },

  //  {
  //   title: "Stationery",
  //   subItems: [
  //     { label: "Stationery", link: "/stationery" },
  //     { label: "Stickers And Labels", link: "/flyers-leaflets/option-b" },
  //   ],
  // },

  {
    title: "Stationery",
    subItems: [
      {
        label: "Stationery",
        link: "/stationery",
        subItems: [
          { label: "Letterhead", link: "/stationery/letterhead" },
          { label: "Envelopes Orange & Purple", link: "/stationery/envelopes" },
          { label: "Greeting Cards", link: "/greetingcardDetails" },
          { label: "Invitation Cards", link: "/stationery/invitation-cards" }
        ]
      },
      {
        label: "Stickers And Labels",
        link: "/stickers",
        subItems: [
           { label: "All Stickers", link: "/stickers" },
          { label: "Metallic Round Stickers", link: "/stickerdetails" },
          { label: "Metallic Rectangular Stickers", link: "/stickers-labels/rect-metallic" },
          { label: "Coated Paper Round Stickers", link: "/stickers-labels/coated-paper" },
          { label: "Coated Paper Rectangular Stickers", link: "/stickers-labels/coated-paper" },
          { label: "Mate Paper Round Stickers", link: "/stickers-labels/coated-paper" },
          { label: "Mate Paper Rectangular Stickers", link: "/stickers-labels/coated-paper" },
          { label: "Vinyl Round Stickers", link: "/stickers-labels/coated-paper" },
          { label: " Vinyl Rectangular Stickers", link: "/stickers-labels/coated-paper" },
          { label: "Vinyl Sticker Books", link: "/stickers-labels/coated-paper" },
          { label: "Waterproof & non-tearable High Temperature Resistant Sticker", link: "/stickers-labels/coated-paper" }

        ]
      }
    ]
  },

  {
    title: "Personalized Gift",
    subItems: [
      { label: "Personalized Gift", link: "/personalized-gift" },
      { label: "Option B", link: "/personalized-gift/option-b" },
    ],
  },
  {
    title: "T-shirt Printing",
    subItems: [
      { label: "T-Shirt Printing", link: "/tshirtprinting" },
     
    ],
  },

  {
    title: "Button Badgets",
    subItems: [
      
      { label: "Button Badgets", link: "/buttonbadges" },
     
    ],
  },


  //  {
  //   title: "Stickers and Labels",
  //   subItems: [
  //     { label: "Option A", link: "/stickers-labels/option-a" },
  //     { label: "Option B", link: "/stickers-labels/option-b" },
  //   ],
  // },

  {
    title: "The Blog",
    link: "/blog",
  },
  {
    title: "Help & FAQs",
    link: "/help",
  },



];

export default function Header() {


  const { t, i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [langDropdown, setLangDropdown] = useState(false);
  // const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeSubItem, setActiveSubItem] = useState(null);





  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy search data
  const dummyResults = [
    "Business Card Templates",
    "Premium Business Cards",
    "Business Card Designs",
    "Business Card Printing",
    "Modern Business Cards",
  ];

  // Filter results based on query
  const filteredResults = dummyResults.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );








  const accountTimeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const toggleSubMenu = (title) => {
  //   setExpandedMenus((prev) => ({
  //     ...prev,
  //     [title]: !prev[title],
  //   }));
  // };

//   const toggleSubMenu = (key) => {

//   setExpandedMenus((prev) => ({
//     ...prev,
//     [key]: !prev[key],
//   }));
// };



const toggleSubMenu = (key) => {
  setExpandedMenus((prev) => {
    const newExpanded = { ...prev };
    const isExpanding = !prev[key];

    // Collapse children if parent is collapsing
    if (!isExpanding) {
      Object.keys(newExpanded).forEach(k => {
        if (k.startsWith(`${key} >`) || k === key) {
          delete newExpanded[k];
        }
      });
    } else {
      newExpanded[key] = true;
    }

    return newExpanded;
  });
};





  const handleAccountMouseEnter = () => {
    clearTimeout(accountTimeoutRef.current);
    setAccountDropdown(true);
  };

  const handleAccountMouseLeave = () => {
    accountTimeoutRef.current = setTimeout(() => {
      setAccountDropdown(false);
    }, 200);
  };
  const handleCloseMobileMenu = () => {
    setMenuOpen(false);
  };


  return (
    <header style={headerWrapper}>
      {/* Top Section */}
      <div style={topBar} className="top-bar">
        <div style={logoWrapper}>
          <a href="/">
            <img
              src="/assets/logo/logo2.jpg"
              alt="Logo"
              style={{ height: "50px", objectFit: "contain",width:"115px" }}
            />
          </a>
        </div>

        {!isMobile && (
          <div className="topRightRow" style={topRightRow}>
            <GoogleTranslateDropdown />

            {/* Language */}
            {/* {!isMobile && (
  <div className="lang-selector" style={{ position: "relative" }}>
    <span onClick={() => setLangDropdown(!langDropdown)} style={topLink}>
      <img
        src={`https://flagcdn.com/w20/${selectedLang.code}.png`}
        alt={selectedLang.label}
        style={{
          width: "20px",
          height: "14px",
          marginRight: "6px",
          verticalAlign: "middle",
        }}
      />
      {selectedLang.label}
    </span>
    {langDropdown && (
      <div style={dropdownStyle}>
        {languages.map((lang) => (
          <div
            key={lang.code}
            onClick={() => {
              setSelectedLang(lang);
              i18n.changeLanguage(lang.code);
              setLangDropdown(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              cursor: "pointer",
              backgroundColor:
                lang.code === selectedLang.code ? "#f0f0f0" : "white",
            }}
          >
            <img
              src={`https://flagcdn.com/w20/${lang.code}.png`}
              alt={lang.label}
              style={{ width: "20px", height: "14px", marginRight: "8px" }}
            />
            {lang.label}
          </div>
        ))}
      </div>
    )}
  </div>
)} */}




            {/* Account / Sign In */}
            <div
              style={{ position: "relative", display: "inline-block" }}
              onMouseEnter={!isMobile ? handleAccountMouseEnter : undefined}
              onMouseLeave={!isMobile ? handleAccountMouseLeave : undefined}
            >
              <div style={{ cursor: "pointer" }}>
                <span style={topLink}>{t("account") || "Account"}</span>
              </div>
              {accountDropdown && (
                <div style={accountDropdownStyle} className="accountDropdownStyle">
                  <Link to="/sign-in" style={{ ...accountItem, textDecoration: "none", color: "inherit" }}>
                    Sign up
                  </Link>
                  <div style={dropdownDivider}></div>
                  <div style={accountItem}>Overview</div>

                  <div style={accountItem}>Re-order</div>
                  <div style={accountItem}>Order History</div>
                  <div style={accountItem}>Saved Projects</div>
                  <div style={accountItem}>Refer and Earn</div>
                  <div style={accountItem}>Redeem Gift Cards</div>
                </div>
              )}
            </div>

            <span style={topLink}>
              <Link to="/sign-in" style={{ color: "#333", textDecoration: "none" }}>
                {t("sign_in") || "Sign In"}
              </Link>
            </span>

            <span style={topLink}>
              <Link to="/cart" style={{ color: "#333", textDecoration: "none" }}>
                <i className="fa-solid fa-cart-shopping" style={{ marginRight: "5px" }}></i>
                {t("cart") || "Cart"}
              </Link>
            </span>

            <div className="search-wrapper" style={searchWrapper}>
              <input type="text" placeholder={t("search") || "Search"} style={searchInput} />
              <span style={searchIcon}>🔍</span>
            </div>
          </div>
        )}

        {/* Hamburger for Mobile */}
        {isMobile && (
          <div onClick={() => setMenuOpen(!menuOpen)} style={hamburgerStyle}>
            ☰
          </div>

        )}
      </div>

      {/* Navigation Bar (Desktop only) */}
      <div style={navBar}>
        {!isMobile && (
          <nav style={navLinksContainer}>
            <div style={navLinks}>
              {menuItems.map((item) => (
                <div key={item.title} style={{ position: "relative" }}
                  onMouseEnter={() => setHoveredMenu(item.title)}
                  onMouseLeave={() => setHoveredMenu(null)}>
                  {item.link ? (
                    <Link to={item.link} style={navLink}>{item.title}</Link>
                  ) : (
                    <span style={navLink}>{item.title}</span>
                  )}
              {item.subItems && hoveredMenu === item.title && (
  <div style={dropdownMenu}>
    {item.subItems.map((subItem, i) => {
      const hasNested = subItem.subItems && subItem.subItems.length > 0;
      return (
        <div
          key={i}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
          onMouseEnter={() => setActiveSubItem(subItem.label)}
          onMouseLeave={() => setActiveSubItem(null)}
        >
          <Link
            to={subItem.link}
            style={{
              ...dropdownItem,
              fontWeight: hasNested ? "bold" : "normal",
              display: "block",
              whiteSpace: "nowrap",
            }}
          >
            {subItem.label}
          </Link>

          {hasNested && activeSubItem === subItem.label && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "100%",
                background: "#fff",
                border: "1px solid #ddd",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                whiteSpace: "nowrap",
                zIndex: 300,
                minWidth: "220px",
              }}
            >
              {subItem.subItems.map((nestedItem, j) => (
                <Link
                  key={j}
                  to={nestedItem.link}
                  style={{
                    ...dropdownItem,
                    padding: "10px 16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {nestedItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    })}
  </div>
)}

                </div>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* Mobile Hamburger Menu Expanded */}
      {isMobile && menuOpen && (
        <div style={mobileMenu}>
          {/* Close Icon */}
          {/* <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
  <button
    onClick={() => setMenuOpen(false)}
    style={{
      background: "none",
      border: "none",
      fontSize: "28px",
      cursor: "pointer",
      color: "#333",
    }}
    aria-label="Close menu"
  >
    &times;
  </button>
</div>

          <div className="search-wrapper" style={{ ...searchWrapper, marginBottom: "10px" }}>
            <input type="text" placeholder={t("search") || "Search"} style={searchInput} />
            <span style={searchIcon}>🔍</span>
          </div> */}

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
            borderBottom: "1px solid #eee",
            backgroundColor: "#fff"
          }}>
            <input
              type="text"
              placeholder="Search"
              style={{
                flex: 1,
                marginRight: "10px",
                padding: "8px 12px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }}
            />
            <i
              className="fas fa-times"
              onClick={handleCloseMobileMenu}
              style={{
                fontSize: "22px",
                cursor: "pointer",
                color: "#333"
              }}
            ></i>
          </div>


          {/* Language Selector */}
          {/* <div style={{ marginBottom: "10px" }}>
            <div onClick={() => setLangDropdown(!langDropdown)} style={{ ...topLink, display: "flex", alignItems: "center" }}>
              <img
                src={`https://flagcdn.com/w20/${selectedLang.code}.png`}
                alt={selectedLang.label}
                style={{ width: "20px", height: "14px", marginRight: "8px" }}
              />
              {selectedLang.label}
            </div>
            {langDropdown && (
              <div style={dropdownStyle}>
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang);
                      i18n.changeLanguage(lang.code);
                      setLangDropdown(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      cursor: "pointer",
                      backgroundColor: lang.code === selectedLang.code ? "#f0f0f0" : "white",
                    }}
                  >
                    <img
                      src={`https://flagcdn.com/w20/${lang.code}.png`}
                      alt={lang.label}
                      style={{ width: "20px", height: "14px", marginRight: "8px" }}
                    />
                    {lang.label}
                  </div>
                ))}
              </div>
            )}
          </div> */}



          {/* Navigation Items */}
         


{menuItems.map((item) => (
  <div key={item.title}>
    <div
     onClick={() => toggleSubMenu(item.title)}


      style={{
        ...mobileNavLink,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{item.title}</span>
      {item.subItems && (
        <span>
          {expandedMenus[item.title] ? (
            <i className="fa-solid fa-angle-up"></i>
          ) : (
            <i className="fa-solid fa-angle-down"></i>
          )}
        </span>
      )}
    </div>

    {/* Show subItems in column style */}
    {expandedMenus[item.title] && item.subItems && (
      <div style={{ paddingLeft: "16px" }}>
        {item.subItems.map((subItem, i) => (
          <div key={i}>
          {subItem.subItems ? (
            <div>
  <div
   onClick={() => toggleSubMenu(`${item.title} > ${subItem.label}`)}

    style={{
      ...mobileSubItem,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    <span>{subItem.label}</span>
    <span>
      {expandedMenus[subItem.label] ? (
        <i className="fa-solid fa-angle-up"></i>
      ) : (
        <i className="fa-solid fa-angle-down"></i>
      )}
    </span>
  </div>

     {/* {expandedMenus[subItem.label] && (
                  <div style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                    {subItem.subItems.map((child, j) => (
                      <Link
                        key={j}
                        to={child.link}
                        style={mobileSubItem}
                        onClick={handleCloseMobileMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )} */}
              </div>


) : (
  <Link
    to={subItem.link}
    style={{
      ...mobileSubItem,
      fontWeight: "bold",
      display: "block",
      padding: "10px 12px",
      textDecoration: "none",
      color: "#000"
    }}
    onClick={handleCloseMobileMenu}
  >
    {subItem.label}
  </Link>
)}
 

          {expandedMenus[`${item.title} > ${subItem.label}`] && subItem.subItems && (

            <div style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>

                {subItem.subItems.map((child, j) => (
                  <Link key={j} to={child.link} style={mobileSubItem}>
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
))}


          {/* ✅ Account & Cart at the bottom */}
          <div style={{
            marginTop: "auto",
            backgroundColor: "#374151",
            color: "white",
            padding: "10px 15px",
            borderTop: "1px solid #555"
          }}>
            {/* Account Dropdown */}
            <div style={{ marginBottom: "10px" }}>
              <div
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "bold",
                  padding: "12px",
                  backgroundColor: "#4B5563",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Account
                <span>
                  {showAccountDropdown ? (
                    <i className="fa-solid fa-angle-up"></i>
                  ) : (
                    <i className="fa-solid fa-angle-down"></i>
                  )}
                </span>

              </div>

              {showAccountDropdown && (
                <div style={{
                  marginTop: "10px",
                  backgroundColor: "#1F2937",
                  borderRadius: "6px",
                  padding: "10px"
                }}>
                  <Link to="/sign-in" style={accountItem}>Sign up</Link>
                  <div style={dropdownDivider}></div>
                  <div style={accountItem}>Overview</div>
                  <div style={accountItem}>Re-order</div>
                  <div style={accountItem}>Order History</div>
                  <div style={accountItem}>Saved Projects</div>
                  <div style={accountItem}>Refer and Earn</div>
                  <div style={accountItem}>Redeem Gift Cards</div>
                </div>
              )}
            </div>

            {/* Cart */}
            <div style={{
              padding: "12px",
              backgroundColor: "#10B981",
              textAlign: "center",
              borderRadius: "6px",
              fontWeight: "bold",
              color: "white"
            }}>
              <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
                <i className="fas fa-shopping-cart" style={{ marginRight: "8px" }}></i>
                Cart
              </Link>
            </div>
          </div>


          {/* Account Section */}
          {/* <div style={{ marginBottom: "10px" }}>
            <div onClick={() => setAccountDropdown(!accountDropdown)} style={topLink}>
              {t("account") || "Account"}
            </div>
            {accountDropdown && (
              <div style={accountDropdownStyle} className="accountDropdownStyle">
                <Link to="/sign-in" style={accountItem}>Sign up</Link>
                <div style={dropdownDivider}></div>
                <div style={accountItem}>Overview</div>
                <div style={accountItem}>Re-order</div>
                <div style={accountItem}>Order History</div>
                <div style={accountItem}>Saved Projects</div>
                <div style={accountItem}>Refer and Earn</div>
                <div style={accountItem}>Redeem Gift Cards</div>
              </div>
            )}
          </div> */}

          {/* Cart Link */}
          {/* <Link to="/cart" style={{ ...topLink, marginBottom: "10px", display: "inline-block" }}>
            <i className="fa-solid fa-cart-shopping" style={{ marginRight: "5px" }}></i>
            {t("cart") || "Cart"}
          </Link> */}
        </div>
      )}
      {/* Offer Bar */}
      <div style={offerBarStyle}>
        🎉 New members get <strong>$5</strong> off their first order! <a href="/sign-in" className="text-white" >Sign up now.</a>
      </div>





      <style>{responsiveStyle}</style>
    </header>
  );
}

// Inside Header component
// const getMobileMenuStyle = (menuOpen) => ({
//   position: "fixed",
//   top: 0,
//   right: 0,
//   height: "100vh",
//   width: "80%",
//   backgroundColor: "#fff",
//   zIndex: 999,
//   transform: menuOpen ? "translateX(0)" : "translateX(100%)",
//   transition: "transform 0.3s ease-in-out",
//   boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
//   overflowY: "auto",
//   padding: "20px",
// });


const topRightRow = {

  display: "flex",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  flex: 1,
};


const navLinksContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "nowrap",
  overflowY: "visible",
};

const navIcons = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};



const headerWrapper = {
  fontFamily: "'Segoe UI', sans-serif",
  borderBottom: "1px solid #eee",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  backgroundColor: "white",
  width: "100%",
  position: "sticky",
  top: "0",
  zIndex: "100 ", /* Optional: ensures header is above other content */
  /* Add other styling for your header */

};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 0px ",
};

const logoWrapper = {
  display: "flex",
  alignItems: "center",

};


const topLink = {
  cursor: "pointer",
  color: "#333",
  fontSize: "14px",
};

const searchWrapper = {
  position: "relative",
  width: "160px",
};

const searchInput = {
  width: "100%",
  padding: "8px 36px 8px 12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const searchIcon = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "16px",
  color: "#333",
  pointerEvents: "none",
};

const hamburgerStyle = {
  fontSize: "24px",
  cursor: "pointer",
  textDecoration: "none",
};

const mobileRow1 = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "15px",
  flexWrap: "wrap",
  width: "100%",
};

const mobileRow2 = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "15px",
  flexWrap: "wrap",
  width: "100%",
  marginTop: "10px",
};

const accountDropdownStyle = {
  position: "absolute",
  top: "35px",
  left: "0px",
  zIndex: 9999,
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  width: "220px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  padding: "10px 0",
};

const accountItem = {
  padding: "8px 0",
  fontSize: "14px",
  cursor: "pointer",
  //  color: "#fff",
  textDecoration: "none",
  display: "block"
};

const dropdownDivider = {
  // height: "1px",
  // backgroundColor: "#eee",
  margin: "8px 0",
  borderTop: "1px solid #444",
};

const dropdownStyle = {
  position: "absolute",
  top: "100%",
  right: 0,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  width: "220px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  zIndex: 1000,
};

const navBar = {
  padding: "10px 0px",

  display: "flex",
};

const navLinks = {
  display: "flex",
  gap: "25px",
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
  position: "relative",
  zIndex: 1,
};

const navLink = {
  fontSize: "14px",
  color: "#111",
  fontWeight: "500",
  textDecoration: "none",
};

const dropdownMenu = {
  position: "absolute",
  top: "100%",
  left: 0,
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  zIndex: 200,
  padding: "8px 0",
  minWidth: "180px",
  borderRadius: "6px",
  whiteSpace: "nowrap",
};

const dropdownItem = {
  padding: "10px 16px",
  fontSize: "14px",
  color: "#333",
  cursor: "pointer",
  whiteSpace: "nowrap",
  textDecoration: "none",
  display: "block",
  transition: "background-color 0.2s",
};

const mobileMenu = {
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  width: "80%",
  backgroundColor: "#fff",
  zIndex: 999,
  // transform: menuOpen ? "translateX(0)" : "translateX(100%)",
  transition: "transform 0.3s ease-in-out",
  boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
  overflowY: "auto",
  padding: "20px",
};


const mobileNavLink = {
  padding: "12px 16px",
  fontSize: "16px",
  fontWeight: "500",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  marginBottom: "10px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
  cursor: "pointer",
};


const mobileSubItem = {
  padding: "6px 10px",
  fontSize: "14px",
  borderBottom: "1px solid #eee",
  textDecoration: "none",
  color: "black",
};

const offerBarStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  textAlign: "center",
  padding: "10px 20px",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "1.4",
  wordWrap: "break-word",
};


const responsiveStyle = `
  @media (min-width: 768px) {
    .top-bar {
      flex-direction: row !important;
      justify-content: space-between !important;
      padding: 10px 30px;
      align-items: center;
    }

    .mobileRow1,
    .mobileRow2 {
      flex-direction: row !important;
      justify-content: flex-end !important;
    }
  }

  @media (max-width: 768px) {
    .mobileRow1,
    .mobileRow2 {
      flex-direction: row !important;
      justify-content: center;
      align-items: center;
    }

    .accountDropdownStyle {
      position: relative !important;
      top: unset !important;
      box-shadow: none !important;
      width: 100% !important;
    }

    .search-wrapper {
      width: 100% !important;
    }

    .search-wrapper input {
      width: 100% !important;
    }
  }
`;