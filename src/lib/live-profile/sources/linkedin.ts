/**
 * linkedin.ts — LinkedIn live source adapter.
 *
 * Uses the official LinkedIn API ONLY.
 * Does NOT implement unofficial scraping.
 *
 * LinkedIn API access requires:
 *   1. A LinkedIn Developer Application (https://www.linkedin.com/developers/)
 *   2. OAuth 2.0 authorization with appropriate scopes (r_liteprofile, r_emailaddress, etc.)
 *   3. A valid access token obtained through the OAuth flow
 *
 * Required environment variables:
 *   LINKEDIN_ACCESS_TOKEN — A valid LinkedIn OAuth2 access token
 *
 * Note: LinkedIn API access is restrictive. Most data requires explicit
 * user authorization and specific product permissions. The Sign In with LinkedIn
 * product provides basic profile access; the Marketing APIs or Community
 * Management APIs are needed for posts/activity.
 *
 * When not configured, this adapter reports status: "not_configured"
 * and Ask Arun continues working with other sources.
 */

import type {
  LiveSourceAdapter,
  LiveSourceFetchResult,
  LinkedInSourceSnapshot,
  LinkedInProfile,
} from "../types";

/* ── Config ──────────────────────────────────────────────────────────────── */

const VERIFIED_PROFILE_URL = "https://www.linkedin.com/in/arun-codex/";

function getAccessToken(): string | null {
  return process.env.LINKEDIN_ACCESS_TOKEN ?? null;
}

function isEnabled(): boolean {
  const flag = process.env.LIVE_LINKEDIN_ENABLED;
  if (flag === "false" || flag === "0") return false;
  return process.env.LIVE_PROFILE_ENABLED !== "false";
}

function isConfigured(): boolean {
  return Boolean(getAccessToken());
}

/* ── Adapter ─────────────────────────────────────────────────────────────── */

export const linkedinAdapter: LiveSourceAdapter<LinkedInSourceSnapshot> = {
  name: "linkedin",

  isEnabled,
  isConfigured,

  async fetch(): Promise<LiveSourceFetchResult<LinkedInSourceSnapshot>> {
    if (!isConfigured()) {
      return {
        snapshot: {
          source: "linkedin",
          status: "not_configured",
          lastSyncedAt: null,
          nextSyncAt: null,
          error:
            "LinkedIn API credentials not configured. Requires LINKEDIN_ACCESS_TOKEN from OAuth2 flow.",
          profile: {
            profileUrl: VERIFIED_PROFILE_URL,
            headline: null,
          },
          activities: [],
          metadata: {
            note: "LinkedIn API requires a Developer Application and OAuth2 user consent. See https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2",
          },
        },
        etag: null,
        notModified: false,
      };
    }

    const startMs = Date.now();
    const token = getAccessToken()!;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      // LinkedIn v2 API — userinfo endpoint (OpenID Connect)
      const res = await fetch("https://api.linkedin.com/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`LinkedIn API ${res.status}: ${res.statusText}`);
      }

      const data = (await res.json()) as Record<string, unknown>;

      const profile: LinkedInProfile = {
        profileUrl: VERIFIED_PROFILE_URL,
        headline: typeof data.headline === "string" ? data.headline : null,
      };

      const durationMs = Date.now() - startMs;
      console.log(
        `[LIVE_PROFILE] source=linkedin status=healthy duration=${durationMs}ms`
      );

      return {
        snapshot: {
          source: "linkedin",
          status: "healthy",
          lastSyncedAt: new Date().toISOString(),
          nextSyncAt: null,
          error: null,
          profile,
          activities: [], // LinkedIn API does not easily expose activity feed
          metadata: {},
        },
        etag: null,
        notModified: false,
      };
    } catch (err) {
      const durationMs = Date.now() - startMs;
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(
        `[LIVE_PROFILE] source=linkedin status=error error="${message}" duration=${durationMs}ms`
      );

      return {
        snapshot: {
          source: "linkedin",
          status: "error",
          lastSyncedAt: null,
          nextSyncAt: null,
          error: message,
          profile: {
            profileUrl: VERIFIED_PROFILE_URL,
            headline: null,
          },
          activities: [],
          metadata: {},
        },
        etag: null,
        notModified: false,
      };
    }
  },
};
