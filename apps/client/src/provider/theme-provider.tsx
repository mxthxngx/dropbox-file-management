import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ThemeContext } from "../context/theme-context";


interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

   useEffect(() => {
     const savedMode = localStorage.getItem('darkMode');
     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
     
     const initialMode = savedMode !== null 
       ? JSON.parse(savedMode) 
       : prefersDark;
     
       setIsDarkMode(initialMode);
   }, []);

   const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};