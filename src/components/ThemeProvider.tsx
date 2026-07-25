"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "light", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("fairmed-theme");
    const preferred = window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";
    const actual = saved === "dark" || saved === "light" ? saved : preferred;
    setTheme(actual); // eslint-disable-line react-hooks/set-state-in-effect
    document.documentElement.setAttribute("data-theme", actual);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fairmed-theme", theme);
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (link) {
      link.href = theme === "dark" ? "/images/fairmed_FM_clean.png" : "/images/fairmed_FM_clean_white.png";
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
