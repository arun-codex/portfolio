/**
 * Merge class names, filtering out falsy values.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Detect if running in browser environment.
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Check if user has visited before (for loading screen skip).
 */
export function hasVisitedBefore(): boolean {
  if (!isBrowser()) return false;
  try {
    return localStorage.getItem("portfolio-visited") === "true";
  } catch {
    return false;
  }
}

/**
 * Mark the user as having visited.
 */
export function markVisited(): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem("portfolio-visited", "true");
  } catch {
    // Ignore storage errors
  }
}

/**
 * Get current theme from localStorage.
 */
export function getStoredTheme(): "dark" | "light" | "cyberpunk" | "terminal" | "colobus" | null {
  if (!isBrowser()) return null;
  try {
    const stored = localStorage.getItem("portfolio-theme");
    if (
      stored === "dark" ||
      stored === "light" ||
      stored === "cyberpunk" ||
      stored === "terminal" ||
      stored === "colobus"
    ) return stored;
    return null;
  } catch {
    return null;
  }
}

/**
 * Store theme preference.
 */
export function setStoredTheme(theme: "dark" | "light" | "cyberpunk" | "terminal" | "colobus"): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Generates a unique client-side identifier for UI chat messages and client session tokens.
 *
 * Safe across all execution contexts:
 * 1. crypto.randomUUID() if available (Standard in secure contexts: HTTPS, localhost, 127.0.0.1)
 * 2. RFC 4122 v4 UUID via crypto.getRandomValues() if available (Works in insecure contexts such as LAN HTTP)
 * 3. Math.random() + timestamp fallback (Absolute last resort if Web Cryptography API is unavailable)
 */
export function generateClientId(): string {
  if (typeof crypto !== "undefined") {
    if (typeof crypto.randomUUID === "function") {
      try {
        return crypto.randomUUID();
      } catch {
        // Fall through to getRandomValues
      }
    }

    if (typeof crypto.getRandomValues === "function") {
      try {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        // Set version (4) and variant (RFC 4122) bits
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
      } catch {
        // Fall through to non-cryptographic fallback
      }
    }
  }

  const timestamp = Date.now().toString(36);
  const rand1 = Math.random().toString(36).substring(2, 10);
  const rand2 = Math.random().toString(36).substring(2, 10);
  return `client-${timestamp}-${rand1}-${rand2}`;
}
