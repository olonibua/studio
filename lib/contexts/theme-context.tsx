"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "black" | "white";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("black");

  useEffect(() => {
    // Load theme from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("mosé-theme") as Theme;
      if (savedTheme && (savedTheme === "black" || savedTheme === "white")) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage and update document class
    localStorage.setItem("mosé-theme", theme);
    
    // Remove existing theme classes
    document.documentElement.classList.remove("theme-black", "theme-white");
    document.body.classList.remove("theme-black", "theme-white");
    
    // Add current theme class to both html and body
    document.documentElement.classList.add(`theme-${theme}`);
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "black" ? "white" : "black");
  };

  const changeTheme = (theme: Theme) => {
    setTheme(theme);
    
    if (typeof window !== 'undefined') {
      // Save theme to localStorage and update document class
      localStorage.setItem("mosé-theme", theme);

      // Remove existing theme classes
      document.documentElement.classList.remove("theme-black", "theme-white");
      document.body.classList.remove("theme-black", "theme-white");

      // Add new theme class
      document.documentElement.classList.add(`theme-${theme}`);
      document.body.classList.add(`theme-${theme}`);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 