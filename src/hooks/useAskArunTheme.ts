"use client";

import { useState, useCallback } from "react";
import {
  askArunThemes,
  DEFAULT_ASK_ARUN_THEME,
  type AskArunThemeId,
  type AskArunThemeDefinition,
} from "@/data/ask-arun-themes";

const STORAGE_KEY = "ask-arun-theme";

export function useAskArunTheme() {
  const [themeId, setThemeIdState] = useState<AskArunThemeId>(() => {
    if (typeof window === "undefined") return DEFAULT_ASK_ARUN_THEME;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as AskArunThemeId | null;
      if (stored && stored in askArunThemes) {
        return stored;
      }
    } catch {
      // ignore localStorage errors (e.g. private mode)
    }
    return DEFAULT_ASK_ARUN_THEME;
  });

  const setThemeId = useCallback((newThemeId: AskArunThemeId) => {
    if (!(newThemeId in askArunThemes)) return;
    setThemeIdState(newThemeId);
    try {
      localStorage.setItem(STORAGE_KEY, newThemeId);
    } catch {
      // ignore
    }
  }, []);

  const themeDef: AskArunThemeDefinition =
    askArunThemes[themeId] || askArunThemes[DEFAULT_ASK_ARUN_THEME];

  return {
    themeId,
    setThemeId,
    themeDef,
    availableThemes: Object.values(askArunThemes),
  };
}
