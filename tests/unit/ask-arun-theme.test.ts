import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { askArunThemes, DEFAULT_ASK_ARUN_THEME, type AskArunThemeId } from "@/data/ask-arun-themes";
import { useAskArunTheme } from "@/hooks/useAskArunTheme";

describe("Ask Arun Theme Registry & Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("contains all 6 required Ask Arun themes with complete tokens", () => {
    const requiredThemes: AskArunThemeId[] = [
      "arun-dark",
      "liquid-purple",
      "liquid-blue",
      "aurora",
      "frosted-light",
      "cyber-glass",
    ];

    expect(Object.keys(askArunThemes)).toHaveLength(6);

    for (const themeId of requiredThemes) {
      const theme = askArunThemes[themeId];
      expect(theme).toBeDefined();
      expect(theme.id).toBe(themeId);
      expect(theme.name).toBeTruthy();
      expect(theme.description).toBeTruthy();
      expect(theme.previewColors).toHaveLength(3);
      expect(theme.vars["--panel-bg"]).toBeTruthy();
      expect(theme.vars["--accent-primary"]).toBeTruthy();
      expect(theme.vars["--text-primary"]).toBeTruthy();
    }
  });

  it("defaults to arun-dark on initial hook load when localStorage is empty", () => {
    const { result } = renderHook(() => useAskArunTheme());

    expect(result.current.themeId).toBe(DEFAULT_ASK_ARUN_THEME);
    expect(result.current.themeDef.name).toBe("Arun Dark");
  });

  it("allows switching theme and persists choice to localStorage", () => {
    const { result } = renderHook(() => useAskArunTheme());

    act(() => {
      result.current.setThemeId("liquid-purple");
    });

    expect(result.current.themeId).toBe("liquid-purple");
    expect(result.current.themeDef.name).toBe("Liquid Purple");
    expect(localStorage.getItem("ask-arun-theme")).toBe("liquid-purple");
  });

  it("falls back gracefully if stored theme ID is invalid", () => {
    localStorage.setItem("ask-arun-theme", "invalid-theme-id");

    const { result } = renderHook(() => useAskArunTheme());

    expect(result.current.themeId).toBe(DEFAULT_ASK_ARUN_THEME);
  });
});
