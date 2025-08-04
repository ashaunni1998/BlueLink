
import React, { createContext, useEffect, useState } from "react";

export const TranslateContext = createContext();

export const TranslateProvider = ({ children }) => {
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("bluelink_selected_lang") || "en";
    setSelectedLang(savedLang);

    document.cookie = `googtrans=/en/${savedLang}; path=/; domain=${window.location.hostname}`;

    if (!window.googleTranslateElementInit) {
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
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = selectedLang;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [selectedLang]);

  return (
    <TranslateContext.Provider value={{ selectedLang, setSelectedLang }}>
      <div id="hidden_translate_container" style={{ display: "none" }}></div>
      {children}
    </TranslateContext.Provider>
  );
};
