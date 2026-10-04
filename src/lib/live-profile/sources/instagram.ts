/**
 * instagram.ts — Instagram live source adapter.
 *
 * Uses the official Meta/Instagram Graph API ONLY.
 * Does NOT implement unofficial scraping.
 *
 * Required environment variables for operation:
 *   INSTAGRAM_ACCESS_TOKEN — A valid long-lived Instagram Graph API token
 *   INSTAGRAM_USER_ID      — The Instagram Business/Creator account ID
 *
 * These require a Meta Developer App with instagram_basic permission and
 * a Business or Creator Instagram account linked to a Facebook Page.
 *
 * When not configured, this adapter reports status: "not_configured"
 * and Ask Arun continues working with other sources.
 */

import type {
  LiveSourceAdapter,
  LiveSourceFetchResult,
  InstagramSourceSnapshot,
  InstagramProfile,
  LiveActivity,
} from "../types";

/* ── Config ──────────────────────────────────────────────────────────────── */

const INSTAGRAM_GRAPH_API = "https://graph.instagram.com";
const MAX_POSTS = 10;
const MAX_CAPTION_LENGTH = 500;
const REQUEST_TIMEOUT_MS = 8000;

const VERIFIED_USERNAME = "arunx.xyz";
const VERIFIED_PROFILE_URL = "https://www.instagram.com/arunx.xyz/";

function getAccessToken(): string | null {
  return process.env.INSTAGRAM_ACCESS_TOKEN ?? null;
}

function getUserId(): string | null {
  return process.env.INSTAGRAM_USER_ID ?? null;
}

function isEnabled(): boolean {
  const flag = process.env.LIVE_INSTAGRAM_ENABLED;
  if (flag === "false" || flag === "0") return false;
  return process.env.LIVE_PROFILE_ENABLED !== "false";
}

function isConfigured(): boolean {
  return Boolean(getAccessToken() && getUserId());
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function truncate(text: string | null | undefined, max: number): string | null {
  if (!text) return null;
  return text.length > max ? text.slice(0, max) + "…" : text;
}

function safeISO(date: string | null | undefined): string {
  if (!date) return new Date(0).toISOString();
  try {
    return new Date(date).toISOString();
  } catch {
    return new Date(0).toISOString();
  }
}

/* ── API types (from Meta Graph API) ─────────────────────────────────────── */

interface IGMediaNode {
  id?: string;
  caption?: string;
  timestamp?: string;
  permalink?: string;
  media_type?: string;
  media_url?: string;
}

interface IGMediaResponse {
  data?: IGMediaNode[];
}

/* ── Adapter ─────────────────────────────────────────────────────────────── */

export const instagramAdapter: LiveSourceAdapter<InstagramSourceSnapshot> = {
  name: "instagram",

  isEnabled,
  isConfigured,

  async fetch(): Promise<LiveSourceFetchResult<InstagramSourceSnapshot>> {
    if (!isConfigured()) {
      return {
        snapshot: {
          source: "instagram",
          status: "not_configured",
          lastSyncedAt: null,
          nextSyncAt: null,
          error: "Instagram Graph API credentials not configured. Requires INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID.",
          profile: {
            username: VERIFIED_USERNAME,
            profileUrl: VERIFIED_PROFILE_URL,
          },
          activities: [],
          metadata: {},
        },
        etag: null,
        notModified: false,
      };
    }

    const startMs = Date.now();
    const token = getAccessToken()!;
    const userId = getUserId()!;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const url = `${INSTAGRAM_GRAPH_API}/${userId}/media?fields=id,caption,timestamp,permalink,media_type&limit=${MAX_POSTS}&access_token=${token}`;

      const res = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: 0 },
      });
      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`Instagram API ${res.status}: ${res.statusText}`);
      }

      const data = (await res.json()) as IGMediaResponse;
      const posts = data.data ?? [];

      const profile: InstagramProfile = {
        username: VERIFIED_USERNAME,
        profileUrl: VERIFIED_PROFILE_URL,
      };

      const activities: LiveActivity[] = posts.slice(0, MAX_POSTS).map((post) => ({
        source: "instagram" as const,
        type: "post" as const,
        title: `Instagram post`,
        description: truncate(post.caption, MAX_CAPTION_LENGTH),
        url: post.permalink ?? null,
        timestamp: safeISO(post.timestamp),
        metadata: {
          mediaType: post.media_type ?? "unknown",
        },
      }));

      const durationMs = Date.now() - startMs;
      console.log(
        `[LIVE_PROFILE] source=instagram status=healthy items=${activities.length} duration=${durationMs}ms`
      );

      return {
        snapshot: {
          source: "instagram",
          status: "healthy",
          lastSyncedAt: new Date().toISOString(),
          nextSyncAt: null,
          error: null,
          profile,
          activities,
          metadata: { postCount: activities.length },
        },
        etag: null,
        notModified: false,
      };
    } catch (err) {
      const durationMs = Date.now() - startMs;
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(
        `[LIVE_PROFILE] source=instagram status=error error="${message}" duration=${durationMs}ms`
      );

      return {
        snapshot: {
          source: "instagram",
          status: "error",
          lastSyncedAt: null,
          nextSyncAt: null,
          error: message,
          profile: {
            username: VERIFIED_USERNAME,
            profileUrl: VERIFIED_PROFILE_URL,
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
