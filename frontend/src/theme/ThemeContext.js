import React, { createContext, useContext, useState, useEffect } from "react";

export const light = {
  dark: false,
  bg: "#f0f2f5",
  cardBg: "#ffffff",
  headerBg: "#ffffff",
  text: "#1a1a2e",
  textSecondary: "#6b7280",
  border: "#e5e7eb",
  inputBg: "#f9fafb",
  shadow: "0 2px 8px rgba(0,0,0,0.08)",
  toggleBg: "#e5e7eb",
  toggleKnob: "#ffffff",
  mutedText: "#9ca3af",
};

export const dark = {
  dark: true,
  bg: "#0f172a",
  cardBg: "#1e293b",
  headerBg: "#1e293b",
  text: "#f1f5f9",
  textSecondary: "#94a3b8",
  border: "#334155",
  inputBg: "#0f172a",
  shadow: "0 2px 8px rgba(0,0,0,0.4)",
  toggleBg: "#4f46e5",
  toggleKnob: "#ffffff",
  mutedText: "#64748b",
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? dark : light;

  useEffect(() => {
    document.documentElement.style.background = theme.bg;
    document.body.style.background = theme.bg;
    document.body.style.margin = "0";
  }, [theme.bg]);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggle: () => setIsDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
