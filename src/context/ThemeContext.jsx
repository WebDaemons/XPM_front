import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const getSystemTheme = () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const setNewTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e) => {
      if (theme === "system") {
        setTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener("change", handleChange);                         
           
    if (theme === "system") {
      setTheme(getSystemTheme());
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setNewTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
