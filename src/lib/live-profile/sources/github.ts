/**
 * github.ts — GitHub live source adapter.
 *
 * Fetches public profile, repositories, and recent events for arun-codex.
 * Uses the public GitHub REST API. Supports ETag conditional requests.
 * Server-side GITHUB_TOKEN used when available for higher rate limits.
 *
 * Security: All fetched content is treated as UNTRUSTED external data.
 */

import type {
  LiveSourceAdapter,
  LiveSourceFetchResult,
  GitHubSourceSnapshot,
  GitHubProfile,
  GitHubRepository,
  LiveActivity,
} from "../types";

/* ── Config ──────────────────────────────────────────────────────────────── */

const GITHUB_USERNAME = "arun-codex";
const GITHUB_API = "https://api.github.com";
const MAX_REPOS = 20;
const MAX_EVENTS = 30; // fetch more, then filter/limit
const MAX_ACTIVITIES = 15;
const MAX_DESCRIPTION_LENGTH = 500;
const REQUEST_TIMEOUT_MS = 8000;

function getToken(): string | null {
  return process.env.GITHUB_TOKEN ?? null;
}

function isEnabled(): boolean {
  const flag = process.env.LIVE_GITHUB_ENABLED;
  if (flag === "false" || flag === "0") return false;
  // enabled by default if the live profile system is on
  return process.env.LIVE_PROFILE_ENABLED !== "false";
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function headers(etag?: string | null): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ArunX-Portfolio/1.0",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = getToken();
  if (token) h["Authorization"] = `Bearer ${token}`;
  if (etag) h["If-None-Match"] = etag;
  return h;
}

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

/* ── API fetchers ────────────────────────────────────────────────────────── */

interface GitHubAPIUser {
  login?: string;
  name?: string;
  bio?: string;
  html_url?: string;
  public_repos?: number;
  followers?: number;
}

interface GitHubAPIRepo {
  name?: string;
  description?: string;
  html_url?: string;
  homepage?: string;
  language?: string;
  stargazers_count?: number;
  forks_count?: number;
  created_at?: string;
  updated_at?: string;
  pushed_at?: string;
  fork?: boolean;
  private?: boolean;
}

interface GitHubAPIEvent {
  type?: string;
  repo?: { name?: string; url?: string };
  payload?: {
    commits?: Array<{ message?: string; sha?: string; url?: string }>;
    ref?: string;
    ref_type?: string;
    action?: string;
  };
  created_at?: string;
}

async function fetchJSON<T>(url: string, etag?: string | null): Promise<{
  data: T | null;
  etag: string | null;
  notModified: boolean;
}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: headers(etag),
      signal: controller.signal,
      next: { revalidate: 0 },
    });

    const newEtag = res.headers.get("etag");

    if (res.status === 304) {
      return { data: null, etag: newEtag ?? etag ?? null, notModified: true };
    }
    if (!res.ok) {
      const msg = `GitHub API ${res.status}: ${res.statusText}`;
      console.warn(`[LIVE_PROFILE] source=github ${msg}`);
      throw new Error(msg);
    }

    const data = (await res.json()) as T;
    return { data, etag: newEtag, notModified: false };
  } finally {
    clearTimeout(timeout);
  }
}

/* ── Normalizers ─────────────────────────────────────────────────────────── */

function normalizeProfile(user: GitHubAPIUser): GitHubProfile {
  return {
    username: String(user.login ?? GITHUB_USERNAME),
    name: truncate(user.name, 100),
    bio: truncate(user.bio, MAX_DESCRIPTION_LENGTH),
    profileUrl: String(user.html_url ?? `https://github.com/${GITHUB_USERNAME}`),
    publicRepos: Number(user.public_repos ?? 0),
    followers: Number(user.followers ?? 0),
  };
}

function normalizeRepos(repos: GitHubAPIRepo[]): GitHubRepository[] {
  return repos
    .filter((r) => !r.fork && !r.private)
    .sort((a, b) => new Date(b.pushed_at ?? 0).getTime() - new Date(a.pushed_at ?? 0).getTime())
    .slice(0, MAX_REPOS)
    .map((r) => ({
      name: String(r.name ?? "unknown"),
      description: truncate(r.description, MAX_DESCRIPTION_LENGTH),
      url: String(r.html_url ?? ""),
      homepage: truncate(r.homepage, 200),
      language: r.language ? String(r.language) : null,
      stars: Number(r.stargazers_count ?? 0),
      forks: Number(r.forks_count ?? 0),
      createdAt: safeISO(r.created_at),
      updatedAt: safeISO(r.updated_at),
      pushedAt: safeISO(r.pushed_at),
    }));
}

function normalizeEvents(events: GitHubAPIEvent[]): LiveActivity[] {
  const activities: LiveActivity[] = [];

  for (const event of events) {
    if (activities.length >= MAX_ACTIVITIES) break;

    const repoName = event.repo?.name?.replace(`${GITHUB_USERNAME}/`, "") ?? "unknown";
    const repoUrl = `https://github.com/${event.repo?.name ?? ""}`;
    const ts = safeISO(event.created_at);

    switch (event.type) {
      case "PushEvent": {
        const commits = event.payload?.commits ?? [];
        const count = commits.length;
        const firstMsg = truncate(commits[0]?.message, 200) ?? "code changes";
        activities.push({
          source: "github",
          type: "push",
          title: `Pushed ${count} commit${count !== 1 ? "s" : ""} to ${repoName}`,
          description: firstMsg,
          url: repoUrl,
          timestamp: ts,
          metadata: { commitCount: count },
        });
        break;
      }
      case "CreateEvent": {
        const refType = event.payload?.ref_type ?? "repository";
        activities.push({
          source: "github",
          type: "create_repo",
          title: `Created ${refType}: ${repoName}`,
          description: null,
          url: repoUrl,
          timestamp: ts,
          metadata: { refType },
        });
        break;
      }
      case "WatchEvent":
        activities.push({
          source: "github",
          type: "star",
          title: `Starred ${repoName}`,
          description: null,
          url: repoUrl,
          timestamp: ts,
          metadata: {},
        });
        break;
      case "ForkEvent":
        activities.push({
          source: "github",
          type: "fork",
          title: `Forked ${repoName}`,
          description: null,
          url: repoUrl,
          timestamp: ts,
          metadata: {},
        });
        break;
      case "PullRequestEvent": {
        const action = event.payload?.action ?? "updated";
        activities.push({
          source: "github",
          type: "pull_request",
          title: `${action} pull request in ${repoName}`,
          description: null,
          url: repoUrl,
          timestamp: ts,
          metadata: { action },
        });
        break;
      }
      case "IssuesEvent": {
        const action = event.payload?.action ?? "updated";
        activities.push({
          source: "github",
          type: "issue",
          title: `${action} issue in ${repoName}`,
          description: null,
          url: repoUrl,
          timestamp: ts,
          metadata: { action },
        });
        break;
      }
      case "ReleaseEvent":
        activities.push({
          source: "github",
          type: "release",
          title: `Published release in ${repoName}`,
          description: null,
          url: repoUrl,
          timestamp: ts,
          metadata: {},
        });
        break;
      // Skip lesser event types to keep context compact
      default:
        break;
    }
  }

  return activities;
}

/* ── Adapter ─────────────────────────────────────────────────────────────── */

export const githubAdapter: LiveSourceAdapter<GitHubSourceSnapshot> = {
  name: "github",

  isEnabled,

  isConfigured(): boolean {
    // GitHub public API works without a token (lower rate limits)
    return true;
  },

  async fetch(etag?: string | null): Promise<LiveSourceFetchResult<GitHubSourceSnapshot>> {
    const startMs = Date.now();

    try {
      // Fetch user profile, repos, and events in parallel
      const [userResult, reposResult, eventsResult] = await Promise.all([
        fetchJSON<GitHubAPIUser>(`${GITHUB_API}/users/${GITHUB_USERNAME}`, etag),
        fetchJSON<GitHubAPIRepo[]>(
          `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=${MAX_REPOS}&sort=pushed&direction=desc`
        ),
        fetchJSON<GitHubAPIEvent[]>(
          `${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=${MAX_EVENTS}`
        ),
      ]);

      // If user profile returned 304, nothing changed
      if (userResult.notModified) {
        const durationMs = Date.now() - startMs;
        console.log(
          `[LIVE_PROFILE] source=github status=not_modified duration=${durationMs}ms`
        );
        return {
          snapshot: {
            source: "github",
            status: "healthy",
            lastSyncedAt: new Date().toISOString(),
            nextSyncAt: null,
            error: null,
            profile: null,
            activities: [],
            metadata: { notModified: true },
          },
          etag: userResult.etag,
          notModified: true,
        };
      }

      const profile = userResult.data ? normalizeProfile(userResult.data) : null;
      const repositories = reposResult.data ? normalizeRepos(reposResult.data) : [];
      const activities = eventsResult.data ? normalizeEvents(eventsResult.data) : [];

      const durationMs = Date.now() - startMs;
      console.log(
        `[LIVE_PROFILE] source=github status=healthy items=${repositories.length} activities=${activities.length} duration=${durationMs}ms`
      );

      return {
        snapshot: {
          source: "github",
          status: "healthy",
          lastSyncedAt: new Date().toISOString(),
          nextSyncAt: null,
          error: null,
          profile,
          activities,
          repositories,
          metadata: {
            repoCount: repositories.length,
            activityCount: activities.length,
          },
        },
        etag: userResult.etag,
        notModified: false,
      };
    } catch (err) {
      const durationMs = Date.now() - startMs;
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(
        `[LIVE_PROFILE] source=github status=error error="${message}" duration=${durationMs}ms`
      );

      return {
        snapshot: {
          source: "github",
          status: "error",
          lastSyncedAt: null,
          nextSyncAt: null,
          error: message,
          profile: null,
          activities: [],
          metadata: {},
        },
        etag: null,
        notModified: false,
      };
    }
  },
};
