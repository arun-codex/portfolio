/**
 * cache.ts — Live profile data caching layer.
 *
 * Uses Upstash Redis if available (production), gracefully falling back to
 * an in-memory Map for local development.
 * Stores normalized source snapshots.
 */

import { Redis } from "@upstash/redis";
import type { LiveSourceName, LiveProfileCacheEntry } from "./types";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const isUpstashConfigured = Boolean(redisUrl && redisToken);

const CACHE_PREFIX = "live_profile:";

let redisClient: Redis | null = null;
if (isUpstashConfigured) {
  try {
    redisClient = new Redis({
      url: redisUrl!,
      token: redisToken!,
    });
  } catch (err) {
    console.error("[LIVE_PROFILE] Failed to initialize Redis client:", err);
  }
}

// In-memory fallback for local development
const memoryCache = new Map<string, LiveProfileCacheEntry>();

export async function getCacheEntry(source: LiveSourceName): Promise<LiveProfileCacheEntry | null> {
  const key = `${CACHE_PREFIX}${source}`;

  if (redisClient) {
    try {
      const entry = await redisClient.get<LiveProfileCacheEntry>(key);
      return entry;
    } catch (err) {
      console.error(`[LIVE_PROFILE] Cache GET error for ${source}:`, err);
      // Fallback to memory on redis error
      return memoryCache.get(key) ?? null;
    }
  } else {
    return memoryCache.get(key) ?? null;
  }
}

export async function setCacheEntry(
  source: LiveSourceName,
  entry: LiveProfileCacheEntry
): Promise<void> {
  const key = `${CACHE_PREFIX}${source}`;

  if (redisClient) {
    try {
      // Set without expiration, as we manage stale-while-revalidate ourselves
      await redisClient.set(key, entry);
    } catch (err) {
      console.error(`[LIVE_PROFILE] Cache SET error for ${source}:`, err);
      // Fallback to memory on redis error
      memoryCache.set(key, entry);
    }
  } else {
    memoryCache.set(key, entry);
  }
}
