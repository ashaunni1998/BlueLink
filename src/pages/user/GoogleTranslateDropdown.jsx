import React, { useEffect, useState, useRef } from "react";

const languages = [
  { code: "en", label: "New Zealand", flag: "https://flagcdn.com/w40/nz.png" },
  { code: "fr", label: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
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

  // Force default language to New Zealand English on first load
  useEffect(() => {
    document.cookie = "googtrans=/en/en; path=/; domain=" + window.location.hostname;

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

    if (!document.querySelector("script[src*='translate_a/element.js']")) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Translate on language change
  useEffect(() => {
    const translate = () => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = selectedLang.code;
        select.dispatchEvent(new Event("change"));
      } else {
        setTimeout(translate, 300);
      }
    };
    translate();
  }, [selectedLang]);

  // Handle user language selection
 const handleSelect = (lang) => {
  // Set language cookie for translation
  document.cookie = `googtrans=/en/${lang.code}; path=/; domain=${window.location.hostname}`;

  // Store user choice to avoid defaulting back
  localStorage.setItem("bluelink_selected_lang", lang.code);

  setSelectedLang(lang);
  setOpen(false);
};
 

  // Handle dropdown outside click
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
      {/* Dropdown trigger */}
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

      {/* Dropdown menu */}
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

      {/* Hidden Translate Element */}
      <div id="hidden_translate_container" style={{ display: "none" }}></div>
    </div>
  );
};

export default GoogleTranslateDropdown;
