/**
 * GET /api/profile/health
 *
 * Exposes a safe diagnostic endpoint for live profile source health.
 * Does not expose sensitive payloads or secrets.
 */

import { NextResponse } from "next/server";
import { getLiveProfileSnapshot, getLiveProfileConfig } from "@/lib/live-profile";
import type { LiveSourceName } from "@/lib/live-profile";

export async function GET() {
  const config = getLiveProfileConfig();
  
  if (!config.enabled) {
    return NextResponse.json({
      enabled: false,
      note: "Live profile feature is globally disabled.",
    });
  }

  try {
    const snapshot = await getLiveProfileSnapshot();

    const sourcesHealth: Record<string, any> = {};

    for (const [name, sourceData] of Object.entries(snapshot.sources)) {
      const sourceName = name as LiveSourceName;
      sourcesHealth[sourceName] = {
        enabled: config.sources[sourceName].enabled,
        status: sourceData.status,
        lastSyncedAt: sourceData.lastSyncedAt,
        itemCount: sourceData.activities.length,
        error: sourceData.error,
        // Include any safe metadata
        metadata: sourceData.metadata,
      };
    }

    return NextResponse.json({
      enabled: true,
      generatedAt: snapshot.generatedAt,
      overallFreshness: snapshot.freshness.overallStatus,
      totalRecentActivities: snapshot.recentActivity.length,
      sources: sourcesHealth,
    });
  } catch (err) {
    console.error("[LIVE_PROFILE] Health endpoint error:", err);
    return NextResponse.json(
      { error: "Failed to generate health report" },
      { status: 500 }
    );
  }
}
