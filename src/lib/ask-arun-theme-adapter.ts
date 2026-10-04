/**
 * ask-arun-theme-adapter.ts
 *
 * Maps the active portfolio website theme → Ask Arun CSS custom properties.
 * This is a pure function with no state. The website theme (from useTheme / ThemeProvider)
 * is the single source of truth; Ask Arun has NO independent theme preference.
 */

import type { Theme } from "@/hooks/useTheme";

export interface AskArunThemeVars {
  "--ask-panel-bg": string;
  "--ask-panel-surface": string;
  "--ask-panel-border": string;
  "--ask-panel-text": string;
  "--ask-panel-muted": string;
  "--ask-accent": string;
  "--ask-accent-hover": string;
  "--ask-accent-glow": string;
  "--ask-user-bg": string;
  "--ask-user-text": string;
  "--ask-assistant-bg": string;
  "--ask-assistant-border": string;
  "--ask-assistant-text": string;
  "--ask-input-bg": string;
  "--ask-input-border": string;
  "--ask-code-bg": string;
  "--ask-glow-shadow": string;
}

const themes: Record<Theme, AskArunThemeVars> = {
  /* ── Dark (default) ─────────────────────────────────────────────────── */
  dark: {
    "--ask-panel-bg": "#0f172a",
    "--ask-panel-surface": "rgba(15, 23, 42, 0.95)",
    "--ask-panel-border": "rgba(139, 92, 246, 0.25)",
    "--ask-panel-text": "#f8fafc",
    "--ask-panel-muted": "#94a3b8",
    "--ask-accent": "#8b5cf6",
    "--ask-accent-hover": "#7c3aed",
    "--ask-accent-glow": "rgba(139, 92, 246, 0.15)",
    "--ask-user-bg": "linear-gradient(135deg, #7c3aed, #6366f1)",
    "--ask-user-text": "#ffffff",
    "--ask-assistant-bg": "rgba(30, 41, 59, 0.8)",
    "--ask-assistant-border": "rgba(148, 163, 184, 0.15)",
    "--ask-assistant-text": "#e2e8f0",
    "--ask-input-bg": "rgba(30, 41, 59, 0.7)",
    "--ask-input-border": "rgba(148, 163, 184, 0.2)",
    "--ask-code-bg": "rgba(30, 41, 59, 0.9)",
    "--ask-glow-shadow": "0 20px 40px -15px rgba(139, 92, 246, 0.3)",
  },

  /* ── Light ──────────────────────────────────────────────────────────── */
  light: {
    "--ask-panel-bg": "#ffffff",
    "--ask-panel-surface": "rgba(255, 255, 255, 0.96)",
    "--ask-panel-border": "rgba(124, 58, 237, 0.18)",
    "--ask-panel-text": "#0f172a",
    "--ask-panel-muted": "#64748b",
    "--ask-accent": "#7c3aed",
    "--ask-accent-hover": "#6d28d9",
    "--ask-accent-glow": "rgba(124, 58, 237, 0.1)",
    "--ask-user-bg": "linear-gradient(135deg, #7c3aed, #6366f1)",
    "--ask-user-text": "#ffffff",
    "--ask-assistant-bg": "#f1f5f9",
    "--ask-assistant-border": "rgba(203, 213, 225, 0.8)",
    "--ask-assistant-text": "#1e293b",
    "--ask-input-bg": "#ffffff",
    "--ask-input-border": "rgba(203, 213, 225, 0.9)",
    "--ask-code-bg": "#f1f5f9",
    "--ask-glow-shadow": "0 20px 40px -15px rgba(124, 58, 237, 0.12)",
  },

  /* ── Cyberpunk ──────────────────────────────────────────────────────── */
  cyberpunk: {
    "--ask-panel-bg": "#000000",
    "--ask-panel-surface": "rgba(0, 0, 0, 0.98)",
    "--ask-panel-border": "#00FF00",
    "--ask-panel-text": "#FFFFFF",
    "--ask-panel-muted": "#555555",
    "--ask-accent": "#00FF00",
    "--ask-accent-hover": "#00CC00",
    "--ask-accent-glow": "rgba(0, 255, 0, 0.12)",
    "--ask-user-bg": "linear-gradient(135deg, #00CC00, #009900)",
    "--ask-user-text": "#000000",
    "--ask-assistant-bg": "rgba(0, 0, 0, 0.95)",
    "--ask-assistant-border": "rgba(0, 255, 0, 0.3)",
    "--ask-assistant-text": "#FFFFFF",
    "--ask-input-bg": "#000000",
    "--ask-input-border": "rgba(0, 255, 0, 0.4)",
    "--ask-code-bg": "rgba(0, 0, 0, 0.9)",
    "--ask-glow-shadow": "0 0 30px rgba(0, 255, 0, 0.15)",
  },

  /* ── Terminal ───────────────────────────────────────────────────────── */
  terminal: {
    "--ask-panel-bg": "#0a0a0a",
    "--ask-panel-surface": "rgba(10, 10, 10, 0.95)",
    "--ask-panel-border": "rgba(51, 255, 0, 0.35)",
    "--ask-panel-text": "#33ff00",
    "--ask-panel-muted": "#1f521f",
    "--ask-accent": "#33ff00",
    "--ask-accent-hover": "#2de600",
    "--ask-accent-glow": "rgba(51, 255, 0, 0.2)",
    "--ask-user-bg": "linear-gradient(135deg, #1a7a00, #0d5200)",
    "--ask-user-text": "#33ff00",
    "--ask-assistant-bg": "rgba(13, 13, 13, 0.9)",
    "--ask-assistant-border": "rgba(51, 255, 0, 0.2)",
    "--ask-assistant-text": "#8fd98a",
    "--ask-input-bg": "rgba(10, 10, 10, 0.9)",
    "--ask-input-border": "rgba(51, 255, 0, 0.3)",
    "--ask-code-bg": "rgba(10, 10, 10, 0.95)",
    "--ask-glow-shadow": "0 0 30px rgba(51, 255, 0, 0.15)",
  },

  /* ── Colobus Curio ──────────────────────────────────────────────────── */
  colobus: {
    "--ask-panel-bg": "#eeedd9",
    "--ask-panel-surface": "#fefdef",
    "--ask-panel-border": "rgba(0, 96, 74, 0.18)",
    "--ask-panel-text": "#2c2c2c",
    "--ask-panel-muted": "#8a8a8a",
    "--ask-accent": "#00604a",
    "--ask-accent-hover": "#004a38",
    "--ask-accent-glow": "rgba(0, 96, 74, 0.15)",
    "--ask-user-bg": "linear-gradient(135deg, #00604a, #004a38)",
    "--ask-user-text": "#fefdef",
    "--ask-assistant-bg": "#fefdef",
    "--ask-assistant-border": "rgba(0, 96, 74, 0.12)",
    "--ask-assistant-text": "#2c2c2c",
    "--ask-input-bg": "#fefdef",
    "--ask-input-border": "rgba(0, 96, 74, 0.15)",
    "--ask-code-bg": "rgba(0, 96, 74, 0.06)",
    "--ask-glow-shadow": "0 8px 24px rgba(0, 96, 74, 0.1)",
  },

  /* ── Liquid Glass ───────────────────────────────────────────────────── */
  "liquid-glass": {
    "--ask-panel-bg": "rgba(7, 17, 31, 0.85)",
    "--ask-panel-surface": "rgba(255, 255, 255, 0.06)",
    "--ask-panel-border": "rgba(93, 220, 255, 0.25)",
    "--ask-panel-text": "#f4f8ff",
    "--ask-panel-muted": "#849ab8",
    "--ask-accent": "#5ddcff",
    "--ask-accent-hover": "#38bdf8",
    "--ask-accent-glow": "rgba(93, 220, 255, 0.22)",
    "--ask-user-bg": "linear-gradient(135deg, rgba(93, 220, 255, 0.35), rgba(155, 124, 255, 0.35))",
    "--ask-user-text": "#f4f8ff",
    "--ask-assistant-bg": "rgba(255, 255, 255, 0.06)",
    "--ask-assistant-border": "rgba(255, 255, 255, 0.12)",
    "--ask-assistant-text": "#afc2d8",
    "--ask-input-bg": "rgba(255, 255, 255, 0.06)",
    "--ask-input-border": "rgba(255, 255, 255, 0.14)",
    "--ask-code-bg": "rgba(0, 0, 0, 0.3)",
    "--ask-glow-shadow": "0 20px 40px -15px rgba(93, 220, 255, 0.2)",
  },
};

/**
 * Returns the Ask Arun CSS custom-property map for the given portfolio theme.
 * Pure function — no side effects, no state.
 */
export function getAskArunThemeVars(theme: Theme): AskArunThemeVars {
  return themes[theme] ?? themes.dark;
}
