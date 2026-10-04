/**
 * website.ts — Website live source adapter.
 *
 * Uses the existing verified local data from src/data/*.ts instead of
 * making HTTP calls to the production site. This avoids redundant network
 * calls since the portfolio data already lives in the same application.
 */

import type {
  LiveSourceAdapter,
  LiveSourceFetchResult,
  WebsiteSourceSnapshot,
  WebsiteProfile,
  LiveActivity,
} from "../types";
import { personal } from "@/data/personal";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { certifications } from "@/data/certifications";

/* ── Config ──────────────────────────────────────────────────────────────── */

function isEnabled(): boolean {
  const flag = process.env.LIVE_WEBSITE_ENABLED;
  if (flag === "false" || flag === "0") return false;
  return process.env.LIVE_PROFILE_ENABLED !== "false";
}

/* ── Adapter ─────────────────────────────────────────────────────────────── */

export const websiteAdapter: LiveSourceAdapter<WebsiteSourceSnapshot> = {
  name: "website",

  isEnabled,

  isConfigured(): boolean {
    return true; // Always available — data is local
  },

  async fetch(): Promise<LiveSourceFetchResult<WebsiteSourceSnapshot>> {
    const startMs = Date.now();

    try {
      const profile: WebsiteProfile = {
        url: personal.website,
        name: personal.name,
        version: null, // Could be derived from package.json if needed
      };

      // Generate activities from the most recently relevant data
      const activities: LiveActivity[] = [];

      // Add projects as recent items
      for (const project of projects.slice(0, 10)) {
        activities.push({
          source: "website",
          type: "update",
          title: project.title,
          description: project.description.slice(0, 300),
          url: project.github ?? project.liveDemo ?? null,
          timestamp: new Date().toISOString(), // Projects don't have individual timestamps
          metadata: {
            category: project.category,
            skills: project.skills,
          },
        });
      }

      const durationMs = Date.now() - startMs;
      console.log(
        `[LIVE_PROFILE] source=website status=healthy items=${activities.length} duration=${durationMs}ms`
      );

      return {
        snapshot: {
          source: "website",
          status: "healthy",
          lastSyncedAt: new Date().toISOString(),
          nextSyncAt: null,
          error: null,
          profile,
          activities,
          metadata: {
            projectCount: projects.length,
            skillCount: skills.length,
            certificationCount: certifications.filter((c) => c.status === "verified").length,
          },
        },
        etag: null,
        notModified: false,
      };
    } catch (err) {
      const durationMs = Date.now() - startMs;
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(
        `[LIVE_PROFILE] source=website status=error error="${message}" duration=${durationMs}ms`
      );

      return {
        snapshot: {
          source: "website",
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
