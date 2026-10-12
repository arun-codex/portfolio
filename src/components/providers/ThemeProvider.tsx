"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useTheme, type Theme } from "@/hooks/useTheme";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
  toggleTheme: () => void; // kept for backward compat
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  cycleTheme: () => {},
  toggleTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
