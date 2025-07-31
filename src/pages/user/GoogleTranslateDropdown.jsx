import React, { useEffect, useState, useRef } from "react";

const languages = [
  { code: "en", label: "New Zealand", flag: "https://flagcdn.com/w40/nz.png" },
  { code: "fr", label: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
  { code: "en", label: "Europe", flag: "https://flagcdn.com/w40/eu.png" },
  { code: "fr", label: "France", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "de", label: "Germany | Deutschland", flag: "https://flagcdn.com/w40/de.png" },
  { code: "it", label: "Italy | Italia", flag: "https://flagcdn.com/w40/it.png" },
  { code: "nl", label: "Netherlands | Nederland", flag: "https://flagcdn.com/w40/nl.png" },
  { code: "es", label: "Spain | España", flag: "https://flagcdn.com/w40/es.png" },
  { code: "en", label: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "en", label: "United States (English)", flag: "https://flagcdn.com/w40/us.png" },
  { code: "es", label: "United States (Español)", flag: "https://flagcdn.com/w40/us.png" },
  { code: "fr", label: "United States (Français)", flag: "https://flagcdn.com/w40/us.png" },
];

const GoogleTranslateDropdown = () => {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Load Google Translate script
  useEffect(() => {
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,fr,de,it,nl,es",
        autoDisplay: false,
      },
      "hidden_translate_container"
    );
  };

  const script = document.createElement("script");
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  script.crossOrigin = "anonymous";
  document.body.appendChild(script);
}, []);


  // Change language when dropdown item is selected
  useEffect(() => {
  const tryTranslate = () => {
    const select = document.querySelector("select.goog-te-combo");
    if (select) {
      select.value = selectedLang.code;
      const event = new Event("change", { bubbles: true });
      select.dispatchEvent(event);
    } else {
      setTimeout(tryTranslate, 500); // Keep checking until ready
    }
  };

  tryTranslate();
}, [selectedLang]);


  const handleSelect = (lang) => {
    setSelectedLang(lang);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
      {/* Selected */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        <img src={selectedLang.flag} alt="" style={{ width: "20px" }} />
        <span>{selectedLang.label}</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 1000,
            borderRadius: "6px",
            padding: "8px 0",
            minWidth: "250px",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {languages.map((lang, index) => (
            <div
              key={index}
              onClick={() => handleSelect(lang)}
              style={{
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor:
                  lang.code === selectedLang.code && lang.label === selectedLang.label
                    ? "#f0f0f0"
                    : "transparent",
              }}
            >
              <img src={lang.flag} alt={lang.label} style={{ width: "20px", marginRight: "10px" }} />
              <span>{lang.label}</span>
              {lang.code === selectedLang.code && lang.label === selectedLang.label && (
                <span style={{ marginLeft: "auto", color: "green" }}>✓</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Hidden translate container */}
      <div id="hidden_translate_container" style={{ display: "none" }}></div>
    </div>
  );
};

export default GoogleTranslateDropdown;
