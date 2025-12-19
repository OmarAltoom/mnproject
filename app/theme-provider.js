"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";

const STORAGE_KEY = "app-theme";

// Create context FIRST before using it
const ThemeContext = createContext({ theme: "light", setTheme: () => {} });

export function ThemeProvider({ children, defaultTheme = "light" }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    // Sync explicit theme classes to override prefers-color-scheme media queries
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    
    // Keep data-theme attribute for compatibility
    root.setAttribute("data-theme", theme);
    
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
