/**
 * aggregator.ts — Coordinates sources, normalization, and caching.
 *
 * Implements a stale-while-revalidate pattern to ensure Ask Arun remains
 * fast even if social APIs are slow or failing.
 */

import type {
  LiveSourceName,
  LiveSourceSnapshot,
  LiveProfileSnapshot,
  LiveActivity,
  LiveProfileCacheEntry,
  LiveProfileFreshness,
  LiveSourceStatus,
} from "./types";
import { adapters } from "./sources";
import { getCacheEntry, setCacheEntry } from "./cache";
import { getTTLSeconds, isStale, computeExpiresAt, getLiveProfileConfig } from "./freshness";
import { normalizeSnapshot } from "./normalize";

const SOURCE_ORDER: LiveSourceName[] = ["github", "website", "instagram", "linkedin"];
const MAX_TOTAL_ACTIVITIES = 15;

/**
 * Fetches a single source, using cache if fresh, returning stale cache if stale,
 * and triggering a background revalidate.
 */
export async function getSourceData(sourceName: LiveSourceName): Promise<LiveSourceSnapshot> {
  const adapter = adapters[sourceName];

  // 1. Check if enabled/configured
  if (!adapter.isEnabled()) {
    return createEmptySnapshot(sourceName, "disabled");
  }
  if (!adapter.isConfigured()) {
    return createEmptySnapshot(sourceName, "not_configured");
  }

  // 2. Read from cache
  const cached = await getCacheEntry(sourceName);
  
  if (cached && cached.payload.status === "healthy" && !isStale(cached.expiresAt)) {
    // Cache is fresh, return immediately
    return cached.payload;
  }

  // 3. Stale-while-revalidate logic
  if (cached && cached.payload.status === "healthy") {
    // We have stale data. Return it immediately, but trigger background fetch
    // Use setTimeout so we don't block the caller (the Next.js runtime will allow
    // this background promise to finish if the server is long-lived, though on
    // Vercel serverless it might get paused. Cron is the primary revalidator).
    setTimeout(() => {
      revalidateSource(sourceName, cached.etag).catch((err) => {
        console.error(`[LIVE_PROFILE] Background revalidate failed for ${sourceName}:`, err);
      });
    }, 0);
    
    return {
      ...cached.payload,
      status: "stale" as LiveSourceStatus, // Mark as stale for the snapshot UI
    };
  }

  // 4. No healthy cache at all. We must block and fetch now.
  const result = await revalidateSource(sourceName, cached?.etag ?? null);
  return result;
}

/**
 * Forces a revalidation of a source and updates the cache.
 */
export async function revalidateSource(
  sourceName: LiveSourceName,
  etag: string | null = null
): Promise<LiveSourceSnapshot> {
  const adapter = adapters[sourceName];
  if (!adapter.isEnabled() || !adapter.isConfigured()) {
    return createEmptySnapshot(sourceName, !adapter.isEnabled() ? "disabled" : "not_configured");
  }

  const fetchResult = await adapter.fetch(etag);
  
  if (fetchResult.notModified) {
    // Server returned 304 Not Modified. Update cache expiration only.
    const cached = await getCacheEntry(sourceName);
    if (cached) {
      const ttl = getTTLSeconds(sourceName);
      const updatedEntry: LiveProfileCacheEntry = {
        ...cached,
        expiresAt: computeExpiresAt(ttl),
        updatedAt: new Date().toISOString(),
        lastSyncedAt: new Date().toISOString(),
        etag: fetchResult.etag ?? cached.etag,
      };
      await setCacheEntry(sourceName, updatedEntry);
      return cached.payload;
    }
  }

  // Normalize the fresh snapshot
  const normalized = normalizeSnapshot(fetchResult.snapshot);
  
  // Save to cache
  const ttl = getTTLSeconds(sourceName);
  const newEntry: LiveProfileCacheEntry = {
    source: sourceName,
    payload: normalized,
    lastSyncedAt: new Date().toISOString(),
    expiresAt: computeExpiresAt(ttl),
    status: normalized.status,
    error: normalized.error,
    etag: fetchResult.etag,
    updatedAt: new Date().toISOString(),
  };
  await setCacheEntry(sourceName, newEntry);
  
  return normalized;
}

/**
 * Builds the complete live profile snapshot by aggregating all sources.
 */
export async function getLiveProfileSnapshot(): Promise<LiveProfileSnapshot> {
  const config = getLiveProfileConfig();
  
  if (!config.enabled) {
    return createEmptyProfileSnapshot();
  }

  // Fetch all sources concurrently
  const promises = SOURCE_ORDER.map((source) => getSourceData(source));
  const results = await Promise.all(promises);
  
  const sources: Record<LiveSourceName, LiveSourceSnapshot> = {} as any;
  let allActivities: LiveActivity[] = [];
  
  for (let i = 0; i < SOURCE_ORDER.length; i++) {
    const sourceName = SOURCE_ORDER[i];
    const snapshot = results[i];
    sources[sourceName] = snapshot;
    allActivities.push(...snapshot.activities);
  }

  // Sort activities by timestamp descending
  allActivities.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  
  // Limit total activities
  const recentActivity = allActivities.slice(0, MAX_TOTAL_ACTIVITIES);

  return {
    generatedAt: new Date().toISOString(),
    sources,
    recentActivity,
    summary: buildSummary(recentActivity),
    freshness: buildFreshness(sources),
  };
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function createEmptySnapshot(
  source: LiveSourceName,
  status: LiveSourceStatus
): LiveSourceSnapshot {
  return {
    source,
    status,
    lastSyncedAt: null,
    nextSyncAt: null,
    error: null,
    profile: null,
    activities: [],
    metadata: {},
  };
}

function createEmptyProfileSnapshot(): LiveProfileSnapshot {
  return {
    generatedAt: new Date().toISOString(),
    sources: {} as any,
    recentActivity: [],
    summary: "Live profile data is disabled.",
    freshness: {
      overallStatus: "disabled",
      sources: {} as any,
    },
  };
}

function buildSummary(activities: LiveActivity[]): string {
  if (activities.length === 0) return "No recent public activity detected.";
  return `Aggregated ${activities.length} recent public activities from authorized sources.`;
}

function buildFreshness(sources: Record<LiveSourceName, LiveSourceSnapshot>): LiveProfileFreshness {
  const freshness: LiveProfileFreshness = {
    overallStatus: "healthy",
    sources: {} as any,
  };

  let hasError = false;
  let hasStale = false;

  for (const [sourceName, snapshot] of Object.entries(sources)) {
    const sName = sourceName as LiveSourceName;
    let ageSeconds: number | null = null;
    
    if (snapshot.lastSyncedAt) {
      ageSeconds = Math.floor((Date.now() - new Date(snapshot.lastSyncedAt).getTime()) / 1000);
    }
    
    freshness.sources[sName] = {
      status: snapshot.status,
      lastSyncedAt: snapshot.lastSyncedAt,
      ageSeconds,
    };
    
    if (snapshot.status === "error") hasError = true;
    if (snapshot.status === "stale") hasStale = true;
  }
  
  if (hasError) freshness.overallStatus = "error";
  else if (hasStale) freshness.overallStatus = "stale";
  
  return freshness;
}
