"use client";

import { useThemeContext } from "@/components/providers/ThemeProvider";

export function ScanlineOverlay() {
  const { theme } = useThemeContext();

  if (theme !== "cyberpunk") return null;

  return <div className="scanline-overlay" aria-hidden="true" />;
}
