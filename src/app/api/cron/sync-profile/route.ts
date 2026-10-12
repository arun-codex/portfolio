/**
 * GET /api/cron/sync-profile
 *
 * Vercel Cron endpoint to synchronize live profile sources in the background.
 * Prevents Ask Arun from blocking on slow API calls.
 */

import { NextResponse } from "next/server";
import { getLiveProfileConfig, revalidateSource } from "@/lib/live-profile";
import type { LiveSourceName } from "@/lib/live-profile";

export async function GET(request: Request) {
  // 1. Authenticate cron request
  // Vercel sends a specific header for cron jobs if CRON_SECRET is configured
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // In production with a secret, require it
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const config = getLiveProfileConfig();
  if (!config.enabled) {
    return NextResponse.json({ status: "skipped", reason: "live_profile_disabled" });
  }

  const results: Record<string, any> = {};
  let hasErrors = false;

  // 2. Revalidate all configured sources
  const sourcesToSync = Object.entries(config.sources)
    .filter(([_, s]) => s.enabled)
    .map(([name]) => name as LiveSourceName);

  if (sourcesToSync.length === 0) {
    return NextResponse.json({ status: "skipped", reason: "no_sources_enabled" });
  }

  const promises = sourcesToSync.map(async (sourceName) => {
    try {
      const startMs = Date.now();
      const snapshot = await revalidateSource(sourceName, null);
      
      results[sourceName] = {
        status: snapshot.status,
        activitiesCount: snapshot.activities.length,
        durationMs: Date.now() - startMs,
      };

      if (snapshot.status === "error") {
        hasErrors = true;
      }
    } catch (err) {
      hasErrors = true;
      results[sourceName] = {
        status: "error",
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });

  await Promise.allSettled(promises);

  // 3. Return summary
  return NextResponse.json({
    status: hasErrors ? "completed_with_errors" : "success",
    syncedAt: new Date().toISOString(),
    results,
  });
}
