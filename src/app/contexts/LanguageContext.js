import React, { useState, useContext } from "react";

const LanguageContext = React.createContext();
export const useLanguageContext = () => useContext(LanguageContext);

const {
  REACT_APP_LANGUAGE: lang,
} = process.env;

export default function LanguageContextProvider({ children }) {
  const [language, changeLanguage] = useState(lang);
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}