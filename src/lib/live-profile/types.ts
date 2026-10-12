/**
 * types.ts — Live profile data layer type system.
 *
 * These types define the contract between source adapters, the cache,
 * the aggregator, and the AI context builder.
 */

/* ── Source identification ────────────────────────────────────────────────── */

export type LiveSourceName = "github" | "instagram" | "linkedin" | "website";

export type LiveSourceStatus =
  | "healthy"
  | "stale"
  | "error"
  | "not_configured"
  | "disabled";

/* ── Activities ──────────────────────────────────────────────────────────── */

export type LiveActivityType =
  | "commit"
  | "push"
  | "create_repo"
  | "star"
  | "fork"
  | "pull_request"
  | "issue"
  | "release"
  | "post"
  | "article"
  | "update"
  | "other";

export interface LiveActivity {
  source: LiveSourceName;
  type: LiveActivityType;
  title: string;
  description: string | null;
  url: string | null;
  timestamp: string; // ISO 8601
  metadata: Record<string, unknown>;
}

/* ── Source profiles ─────────────────────────────────────────────────────── */

export interface GitHubProfile {
  username: string;
  name: string | null;
  bio: string | null;
  profileUrl: string;
  publicRepos: number;
  followers: number;
}

export interface GitHubRepository {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
}

export interface InstagramProfile {
  username: string;
  profileUrl: string;
}

export interface LinkedInProfile {
  profileUrl: string;
  headline: string | null;
}

export interface WebsiteProfile {
  url: string;
  name: string;
  version: string | null;
}

/* ── Source snapshot ──────────────────────────────────────────────────────── */

export interface LiveSourceSnapshot<TProfile = unknown> {
  source: LiveSourceName;
  status: LiveSourceStatus;
  lastSyncedAt: string | null; // ISO 8601
  nextSyncAt: string | null;   // ISO 8601
  error: string | null;
  profile: TProfile | null;
  activities: LiveActivity[];
  metadata: Record<string, unknown>;
}

export type GitHubSourceSnapshot = LiveSourceSnapshot<GitHubProfile> & {
  repositories?: GitHubRepository[];
};

export type InstagramSourceSnapshot = LiveSourceSnapshot<InstagramProfile>;
export type LinkedInSourceSnapshot = LiveSourceSnapshot<LinkedInProfile>;
export type WebsiteSourceSnapshot = LiveSourceSnapshot<WebsiteProfile>;

/* ── Aggregated snapshot ─────────────────────────────────────────────────── */

export interface LiveProfileSnapshot {
  generatedAt: string; // ISO 8601
  sources: Record<LiveSourceName, LiveSourceSnapshot>;
  recentActivity: LiveActivity[];
  summary: string;
  freshness: LiveProfileFreshness;
}

export interface LiveProfileFreshness {
  overallStatus: LiveSourceStatus;
  sources: Record<LiveSourceName, {
    status: LiveSourceStatus;
    lastSyncedAt: string | null;
    ageSeconds: number | null;
  }>;
}

/* ── Cache entry ─────────────────────────────────────────────────────────── */

export interface LiveProfileCacheEntry {
  source: LiveSourceName;
  payload: LiveSourceSnapshot;
  lastSyncedAt: string;
  expiresAt: string;
  status: LiveSourceStatus;
  error: string | null;
  etag: string | null;
  updatedAt: string;
}

/* ── Source adapter interface ─────────────────────────────────────────────── */

export interface LiveSourceAdapter<TSnapshot extends LiveSourceSnapshot = LiveSourceSnapshot> {
  readonly name: LiveSourceName;
  isEnabled(): boolean;
  isConfigured(): boolean;
  fetch(etag?: string | null): Promise<LiveSourceFetchResult<TSnapshot>>;
}

export interface LiveSourceFetchResult<TSnapshot extends LiveSourceSnapshot = LiveSourceSnapshot> {
  snapshot: TSnapshot;
  etag: string | null;
  notModified: boolean;
}

/* ── Configuration ───────────────────────────────────────────────────────── */

export interface LiveProfileConfig {
  enabled: boolean;
  sources: Record<LiveSourceName, {
    enabled: boolean;
    ttlSeconds: number;
  }>;
}
