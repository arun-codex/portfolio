/**
 * normalize.ts — Data normalization and sanitization layer.
 *
 * Ensures all external content is treated as untrusted data, not system instructions.
 * Protects against prompt injection by removing common LLM instruction keywords
 * from external content before it is passed to the AI context.
 */

import type { LiveActivity, LiveSourceSnapshot } from "./types";

const MAX_STRING_LENGTH = 500;

/**
 * Removes characters that could be used for markdown/prompt injection,
 * and neutralizes common instruction phrases.
 */
export function sanitizeUntrustedContent(text: string | null | undefined): string | null {
  if (!text) return null;

  let sanitized = text.slice(0, MAX_STRING_LENGTH);

  // Neutralize common prompt injection phrases by replacing them
  const injectionPatterns = [
    /ignore previous/gi,
    /forget previous/gi,
    /disregard/gi,
    /system prompt/gi,
    /you are now/gi,
    /act as/gi,
    /new rules/gi,
    /bypass/gi,
    /reveal/gi,
  ];

  for (const pattern of injectionPatterns) {
    sanitized = sanitized.replace(pattern, "[REDACTED]");
  }

  // Remove some markdown syntax that could cause formatting issues in the prompt
  sanitized = sanitized.replace(/```/g, "'''");
  
  return sanitized.trim();
}

/**
 * Validates and normalizes URLs to ensure they only use http/https
 */
export function normalizeUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Normalizes an activity to ensure it conforms to safety limits
 */
export function normalizeActivity(activity: LiveActivity): LiveActivity {
  return {
    ...activity,
    title: sanitizeUntrustedContent(activity.title) ?? "Untitled",
    description: sanitizeUntrustedContent(activity.description),
    url: normalizeUrl(activity.url),
    timestamp: activity.timestamp || new Date().toISOString(),
  };
}

/**
 * Normalizes a full snapshot, ensuring all activities and profiles are safe.
 * Also deduplicates activities by URL and timestamp.
 */
export function normalizeSnapshot<T extends LiveSourceSnapshot>(snapshot: T): T {
  // Deduplicate activities (e.g. if multiple events point to same URL on same day)
  const uniqueActivities: LiveActivity[] = [];
  const seenKeys = new Set<string>();

  for (const activity of snapshot.activities) {
    const normActivity = normalizeActivity(activity);
    
    // Create a deduplication key (type + url + date)
    const dateOnly = normActivity.timestamp.split("T")[0];
    const key = `${normActivity.type}:${normActivity.url || normActivity.title}:${dateOnly}`;
    
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueActivities.push(normActivity);
    }
  }

  return {
    ...snapshot,
    activities: uniqueActivities,
  };
}
