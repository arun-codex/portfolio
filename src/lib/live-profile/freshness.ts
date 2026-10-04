/**
 * freshness.ts — Defines freshness limits (TTL) and evaluates source staleness.
 */

import type { LiveSourceName, LiveProfileConfig } from "./types";
import { adapters } from "./sources";

const DEFAULT_GITHUB_TTL = 15 * 60; // 15 minutes
const DEFAULT_INSTAGRAM_TTL = 60 * 60; // 1 hour
const DEFAULT_LINKEDIN_TTL = 6 * 60 * 60; // 6 hours
const DEFAULT_WEBSITE_TTL = 15 * 60; // 15 minutes

export function getTTLSeconds(source: LiveSourceName): number {
  switch (source) {
    case "github":
      return parseInt(process.env.LIVE_GITHUB_TTL_SECONDS ?? String(DEFAULT_GITHUB_TTL), 10);
    case "instagram":
      return parseInt(process.env.LIVE_INSTAGRAM_TTL_SECONDS ?? String(DEFAULT_INSTAGRAM_TTL), 10);
    case "linkedin":
      return parseInt(process.env.LIVE_LINKEDIN_TTL_SECONDS ?? String(DEFAULT_LINKEDIN_TTL), 10);
    case "website":
      return parseInt(process.env.LIVE_WEBSITE_TTL_SECONDS ?? String(DEFAULT_WEBSITE_TTL), 10);
    default:
      return 3600;
  }
}

export function isStale(expiresAt: string | null): boolean {
  if (!expiresAt) return true;
  return new Date().getTime() > new Date(expiresAt).getTime();
}

export function computeExpiresAt(ttlSeconds: number): string {
  return new Date(Date.now() + ttlSeconds * 1000).toISOString();
}

export function getLiveProfileConfig(): LiveProfileConfig {
  const isGlobalEnabled = process.env.LIVE_PROFILE_ENABLED !== "false";

  const config: LiveProfileConfig = {
    enabled: isGlobalEnabled,
    sources: {
      github: { enabled: false, ttlSeconds: getTTLSeconds("github") },
      instagram: { enabled: false, ttlSeconds: getTTLSeconds("instagram") },
      linkedin: { enabled: false, ttlSeconds: getTTLSeconds("linkedin") },
      website: { enabled: false, ttlSeconds: getTTLSeconds("website") },
    },
  };

  for (const [name, adapter] of Object.entries(adapters)) {
    const sourceName = name as LiveSourceName;
    config.sources[sourceName].enabled = adapter.isEnabled();
  }

  return config;
}
