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

function isEnabled(): boolean {
  const flag = process.env.LIVE_LINKEDIN_ENABLED;
  if (flag === "false" || flag === "0") return false;
  return process.env.LIVE_PROFILE_ENABLED !== "false";
}

function isConfigured(): boolean {
  // LinkedIn is intentionally unavailable because the OpenID Connect API
  // does not provide the recent activity or full profile data required.
  return false;
}

/* ── Adapter ─────────────────────────────────────────────────────────────── */

export const linkedinAdapter: LiveSourceAdapter<LinkedInSourceSnapshot> = {
  name: "linkedin",

  isEnabled,
  isConfigured,

  async fetch(): Promise<LiveSourceFetchResult<LinkedInSourceSnapshot>> {
    return {
      snapshot: {
        source: "linkedin",
        status: "not_configured",
        lastSyncedAt: null,
        nextSyncAt: null,
        error: "LinkedIn live data is intentionally unavailable due to platform API restrictions.",
        profile: {
          profileUrl: VERIFIED_PROFILE_URL,
          headline: null,
        },
        activities: [],
        metadata: {
          note: "LinkedIn live data is not currently available. Arun's LinkedIn profile link is available as static portfolio information.",
        },
      },
      etag: null,
      notModified: false,
    };
  },
};

