"use client";

import { useState, useEffect, useCallback } from "react";
import { getStoredTheme, setStoredTheme } from "@/lib/utils";

export type Theme = "dark" | "light" | "cyberpunk" | "sketchbook";

const THEME_ORDER: Theme[] = ["dark", "light", "cyberpunk", "sketchbook"];

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "cyberpunk", "sketchbook");
  if (theme === "light") root.classList.add("light");
  if (theme === "cyberpunk") root.classList.add("cyberpunk");
  if (theme === "sketchbook") root.classList.add("sketchbook");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial: Theme = prefersDark ? "dark" : "light";
      setTheme(initial);
      applyTheme(initial);
    }
  }, []);

  const cycleTheme = useCallback(() => {
    setTheme((prev) => {
      const currentIndex = THEME_ORDER.indexOf(prev);
      const next = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
      setStoredTheme(next);
      applyTheme(next);
      return next;
    });
  }, []);

  // Keep backward compat: toggleTheme still cycles
  const toggleTheme = cycleTheme;

  return { theme, cycleTheme, toggleTheme, mounted };
}
