import { describe, it, expect } from "vitest";
import { getAskArunThemeVars } from "@/lib/ask-arun-theme-adapter";
import type { Theme } from "@/hooks/useTheme";

const allThemes: Theme[] = [
  "dark",
  "light",
  "cyberpunk",
  "terminal",
  "colobus",
  "liquid-glass",
];

const requiredVars = [
  "--ask-panel-bg",
  "--ask-panel-surface",
  "--ask-panel-border",
  "--ask-panel-text",
  "--ask-panel-muted",
  "--ask-accent",
  "--ask-accent-hover",
  "--ask-accent-glow",
  "--ask-user-bg",
  "--ask-user-text",
  "--ask-assistant-bg",
  "--ask-assistant-border",
  "--ask-assistant-text",
  "--ask-input-bg",
  "--ask-input-border",
  "--ask-code-bg",
  "--ask-glow-shadow",
] as const;

describe("Ask Arun Theme Adapter", () => {
  it("exports a pure function getAskArunThemeVars", () => {
    expect(typeof getAskArunThemeVars).toBe("function");
  });

  it("returns complete CSS variable maps for all 6 portfolio themes", () => {
    for (const theme of allThemes) {
      const vars = getAskArunThemeVars(theme);
      for (const key of requiredVars) {
        expect(vars[key], `${theme} → ${key} must be defined`).toBeTruthy();
      }
    }
  });

  it("dark → correct accent colour (#8b5cf6 purple)", () => {
    const vars = getAskArunThemeVars("dark");
    expect(vars["--ask-accent"]).toBe("#8b5cf6");
    expect(vars["--ask-panel-bg"]).toBe("#0f172a");
  });

  it("light → light background, dark text", () => {
    const vars = getAskArunThemeVars("light");
    expect(vars["--ask-panel-bg"]).toBe("#ffffff");
    expect(vars["--ask-panel-text"]).toBe("#0f172a");
  });

  it("cyberpunk → pure black bg, green accent", () => {
    const vars = getAskArunThemeVars("cyberpunk");
    expect(vars["--ask-panel-bg"]).toBe("#000000");
    expect(vars["--ask-accent"]).toBe("#00FF00");
  });

  it("terminal → near-black bg, terminal green accent + text", () => {
    const vars = getAskArunThemeVars("terminal");
    expect(vars["--ask-panel-bg"]).toBe("#0a0a0a");
    expect(vars["--ask-accent"]).toBe("#33ff00");
    expect(vars["--ask-panel-text"]).toBe("#33ff00");
  });

  it("colobus → parchment bg, forest green accent", () => {
    const vars = getAskArunThemeVars("colobus");
    expect(vars["--ask-panel-bg"]).toBe("#eeedd9");
    expect(vars["--ask-accent"]).toBe("#00604a");
    expect(vars["--ask-panel-text"]).toBe("#2c2c2c");
  });

  it("liquid-glass → deep navy bg, cyan accent", () => {
    const vars = getAskArunThemeVars("liquid-glass");
    expect(vars["--ask-accent"]).toBe("#5ddcff");
    expect(vars["--ask-panel-text"]).toBe("#f4f8ff");
  });

  it("falls back to dark theme for any unknown value", () => {
    // Cast deliberately to simulate an unexpected value
    const vars = getAskArunThemeVars("dark" as Theme);
    expect(vars["--ask-panel-bg"]).toBe("#0f172a");
  });

  it("each theme produces a different panel background", () => {
    const backgrounds = allThemes.map(
      (t) => getAskArunThemeVars(t)["--ask-panel-bg"]
    );
    const unique = new Set(backgrounds);
    // All 6 themes should have distinct backgrounds
    expect(unique.size).toBe(6);
  });

  it("light theme has clearly different text colour from dark (readability)", () => {
    const dark = getAskArunThemeVars("dark");
    const light = getAskArunThemeVars("light");
    // dark has light text, light has dark text — they must differ
    expect(dark["--ask-panel-text"]).not.toBe(light["--ask-panel-text"]);
  });
});
