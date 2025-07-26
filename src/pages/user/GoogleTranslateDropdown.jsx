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

    const existingScript = document.getElementById("google-translate-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => {
        console.error("Google Translate script failed to load.");
      };
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const checkTranslateLoaded = setInterval(() => {
      const select = document.querySelector("select.goog-te-combo");
      if (select) {
        triggerTranslate(selectedLang.code);
        clearInterval(checkTranslateLoaded);
      }
    }, 500);
    return () => clearInterval(checkTranslateLoaded);
  }, []);

  const triggerTranslate = (langCode) => {
    const select = document.querySelector("select.goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
  };

  const handleSelect = (lang) => {
    setSelectedLang(lang);
    setOpen(false);
    triggerTranslate(lang.code);
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
    <div
      ref={dropdownRef}
      style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
          padding: "4px 0",
        }}
      >
        <img
          src={selectedLang.flag}
          alt={selectedLang.label}
          style={{ width: "20px", height: "15px", objectFit: "cover", borderRadius: "2px" }}
        />
        <span>{selectedLang.label}</span>
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 1000,
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
                fontSize: "14px",
              }}
            >
              <img
                src={lang.flag}
                alt={lang.label}
                style={{
                  width: "20px",
                  height: "15px",
                  marginRight: "10px",
                  objectFit: "cover",
                  borderRadius: "2px",
                }}
              />
              <span style={{ flex: 1 }}>{lang.label}</span>
              {lang.code === selectedLang.code && lang.label === selectedLang.label && (
                <span style={{ color: "green", fontWeight: "bold" }}>✓</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div id="hidden_translate_container" style={{ display: "none" }}></div>
    </div>
  );
};

export default GoogleTranslateDropdown;
