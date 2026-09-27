/**
 * ask-arun-themes.ts — Data-driven theme registry for Ask Arun AI assistant.
 *
 * Each theme defines colors, gradients, preview swatches, and styling tokens
 * used by the Ask Arun chat interface.
 */

export type AskArunThemeId =
  | "arun-dark"
  | "liquid-purple"
  | "liquid-blue"
  | "aurora"
  | "frosted-light"
  | "cyber-glass";

export interface AskArunThemeDefinition {
  id: AskArunThemeId;
  name: string;
  description: string;
  previewColors: [string, string, string]; // [primary, secondary, background]
  vars: {
    "--panel-bg": string;
    "--panel-border": string;
    "--header-bg": string;
    "--text-primary": string;
    "--text-muted": string;
    "--accent-primary": string;
    "--accent-secondary": string;
    "--user-bubble-bg": string;
    "--user-bubble-text": string;
    "--assistant-bubble-bg": string;
    "--assistant-bubble-border": string;
    "--assistant-bubble-text": string;
    "--input-bg": string;
    "--input-border": string;
    "--glow-shadow": string;
  };
}

export const askArunThemes: Record<AskArunThemeId, AskArunThemeDefinition> = {
  "arun-dark": {
    id: "arun-dark",
    name: "Arun Dark",
    description: "Default dark portfolio aesthetic with purple and cyan accents",
    previewColors: ["#8b5cf6", "#06b6d4", "#0f172a"],
    vars: {
      "--panel-bg": "#0f172a",
      "--panel-border": "rgba(139, 92, 246, 0.25)",
      "--header-bg": "rgba(15, 23, 42, 0.95)",
      "--text-primary": "#f8fafc",
      "--text-muted": "#94a3b8",
      "--accent-primary": "#8b5cf6",
      "--accent-secondary": "#06b6d4",
      "--user-bubble-bg": "linear-gradient(135deg, #7c3aed, #6366f1)",
      "--user-bubble-text": "#ffffff",
      "--assistant-bubble-bg": "rgba(30, 41, 59, 0.8)",
      "--assistant-bubble-border": "rgba(148, 163, 184, 0.15)",
      "--assistant-bubble-text": "#e2e8f0",
      "--input-bg": "rgba(30, 41, 59, 0.7)",
      "--input-border": "rgba(148, 163, 184, 0.2)",
      "--glow-shadow": "0 20px 40px -15px rgba(139, 92, 246, 0.3)",
    },
  },

  "liquid-purple": {
    id: "liquid-purple",
    name: "Liquid Purple",
    description: "Frosted glass aesthetic with pink/purple ambient glow",
    previewColors: ["#ec4899", "#a855f7", "#1e1035"],
    vars: {
      "--panel-bg": "linear-gradient(145deg, rgba(30, 16, 53, 0.92), rgba(20, 10, 36, 0.96))",
      "--panel-border": "rgba(236, 72, 153, 0.35)",
      "--header-bg": "rgba(30, 16, 53, 0.85)",
      "--text-primary": "#fdf4ff",
      "--text-muted": "#d8b4fe",
      "--accent-primary": "#ec4899",
      "--accent-secondary": "#c084fc",
      "--user-bubble-bg": "linear-gradient(135deg, #db2777, #9333ea)",
      "--user-bubble-text": "#ffffff",
      "--assistant-bubble-bg": "rgba(59, 29, 99, 0.5)",
      "--assistant-bubble-border": "rgba(236, 72, 153, 0.25)",
      "--assistant-bubble-text": "#f5d0fe",
      "--input-bg": "rgba(59, 29, 99, 0.4)",
      "--input-border": "rgba(236, 72, 153, 0.3)",
      "--glow-shadow": "0 20px 40px -15px rgba(236, 72, 153, 0.35)",
    },
  },

  "liquid-blue": {
    id: "liquid-blue",
    name: "Liquid Blue",
    description: "Frosted cyan & blue glass layout with calm atmosphere",
    previewColors: ["#38bdf8", "#3b82f6", "#0b192c"],
    vars: {
      "--panel-bg": "linear-gradient(145deg, rgba(11, 25, 44, 0.94), rgba(15, 32, 56, 0.97))",
      "--panel-border": "rgba(56, 189, 248, 0.3)",
      "--header-bg": "rgba(11, 25, 44, 0.88)",
      "--text-primary": "#f0f9ff",
      "--text-muted": "#93c5fd",
      "--accent-primary": "#38bdf8",
      "--accent-secondary": "#60a5fa",
      "--user-bubble-bg": "linear-gradient(135deg, #0284c7, #2563eb)",
      "--user-bubble-text": "#ffffff",
      "--assistant-bubble-bg": "rgba(30, 58, 95, 0.5)",
      "--assistant-bubble-border": "rgba(56, 189, 248, 0.2)",
      "--assistant-bubble-text": "#e0f2fe",
      "--input-bg": "rgba(30, 58, 95, 0.4)",
      "--input-border": "rgba(56, 189, 248, 0.25)",
      "--glow-shadow": "0 20px 40px -15px rgba(56, 189, 248, 0.3)",
    },
  },

  aurora: {
    id: "aurora",
    name: "Aurora",
    description: "Atmospheric teal, emerald, and purple light gradients",
    previewColors: ["#10b981", "#8b5cf6", "#051923"],
    vars: {
      "--panel-bg": "linear-gradient(145deg, rgba(5, 25, 35, 0.95), rgba(13, 43, 58, 0.97))",
      "--panel-border": "rgba(16, 185, 129, 0.35)",
      "--header-bg": "rgba(5, 25, 35, 0.9)",
      "--text-primary": "#f0fdf4",
      "--text-muted": "#a7f3d0",
      "--accent-primary": "#10b981",
      "--accent-secondary": "#a855f7",
      "--user-bubble-bg": "linear-gradient(135deg, #059669, #7c3aed)",
      "--user-bubble-text": "#ffffff",
      "--assistant-bubble-bg": "rgba(20, 55, 65, 0.5)",
      "--assistant-bubble-border": "rgba(16, 185, 129, 0.25)",
      "--assistant-bubble-text": "#d1fae5",
      "--input-bg": "rgba(20, 55, 65, 0.4)",
      "--input-border": "rgba(16, 185, 129, 0.3)",
      "--glow-shadow": "0 20px 40px -15px rgba(16, 185, 129, 0.3)",
    },
  },

  "frosted-light": {
    id: "frosted-light",
    name: "Frosted Light",
    description: "Airy light glassmorphism with high contrast readability",
    previewColors: ["#2563eb", "#eab308", "#ffffff"],
    vars: {
      "--panel-bg": "linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(241, 245, 249, 0.98))",
      "--panel-border": "rgba(37, 99, 235, 0.25)",
      "--header-bg": "rgba(255, 255, 255, 0.92)",
      "--text-primary": "#0f172a",
      "--text-muted": "#475569",
      "--accent-primary": "#2563eb",
      "--accent-secondary": "#ca8a04",
      "--user-bubble-bg": "linear-gradient(135deg, #2563eb, #1d4ed8)",
      "--user-bubble-text": "#ffffff",
      "--assistant-bubble-bg": "rgba(241, 245, 249, 0.9)",
      "--assistant-bubble-border": "rgba(203, 213, 225, 0.8)",
      "--assistant-bubble-text": "#1e293b",
      "--input-bg": "#ffffff",
      "--input-border": "rgba(203, 213, 225, 0.9)",
      "--glow-shadow": "0 20px 40px -15px rgba(37, 99, 235, 0.15)",
    },
  },

  "cyber-glass": {
    id: "cyber-glass",
    name: "Cyber Glass",
    description: "Futuristic dark technical glass with green and cyan glow",
    previewColors: ["#22c55e", "#06b6d4", "#030712"],
    vars: {
      "--panel-bg": "linear-gradient(145deg, rgba(3, 7, 18, 0.96), rgba(17, 24, 39, 0.98))",
      "--panel-border": "rgba(34, 197, 94, 0.35)",
      "--header-bg": "rgba(3, 7, 18, 0.92)",
      "--text-primary": "#f9fafb",
      "--text-muted": "#9ca3af",
      "--accent-primary": "#22c55e",
      "--accent-secondary": "#06b6d4",
      "--user-bubble-bg": "linear-gradient(135deg, #16a34a, #0891b2)",
      "--user-bubble-text": "#ffffff",
      "--assistant-bubble-bg": "rgba(17, 24, 39, 0.8)",
      "--assistant-bubble-border": "rgba(34, 197, 94, 0.25)",
      "--assistant-bubble-text": "#f3f4f6",
      "--input-bg": "rgba(17, 24, 39, 0.7)",
      "--input-border": "rgba(34, 197, 94, 0.3)",
      "--glow-shadow": "0 20px 40px -15px rgba(34, 197, 94, 0.3)",
    },
  },
};

export const DEFAULT_ASK_ARUN_THEME: AskArunThemeId = "arun-dark";
