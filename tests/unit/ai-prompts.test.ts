import { describe, it, expect } from "vitest";
import { buildSystemPrompt } from "@/lib/ai/prompts";
import type { LiveProfileSnapshot } from "@/lib/live-profile";

describe("AI Prompts", () => {
  const dummyLiveProfile: LiveProfileSnapshot = {
    generatedAt: new Date().toISOString(),
    sources: {
      github: {
        source: "github",
        status: "healthy",
        lastSyncedAt: new Date().toISOString(),
        nextSyncAt: null,
        error: null,
        profile: null,
        activities: [],
        metadata: {},
      },
      instagram: {
        source: "instagram",
        status: "healthy",
        lastSyncedAt: new Date().toISOString(),
        nextSyncAt: null,
        error: null,
        profile: null,
        activities: [
          {
            source: "instagram",
            id: "ig-123",
            title: "Recent post about cybersecurity",
            timestamp: new Date().toISOString(),
          }
        ],
        metadata: {},
      },
      linkedin: {
        source: "linkedin",
        status: "not_configured",
        lastSyncedAt: null,
        nextSyncAt: null,
        error: null,
        profile: null,
        activities: [],
        metadata: {},
      },
      website: {
        source: "website",
        status: "healthy",
        lastSyncedAt: new Date().toISOString(),
        nextSyncAt: null,
        error: null,
        profile: null,
        activities: [],
        metadata: {},
      },
    },
    recentActivity: [
      {
        source: "instagram",
        id: "ig-123",
        title: "Recent post about cybersecurity",
        timestamp: new Date().toISOString(),
      }
    ],
    summary: "Mock summary",
    freshness: {
      overallStatus: "healthy",
      sources: {
        github: { status: "healthy", lastSyncedAt: null, ageSeconds: null },
        instagram: { status: "healthy", lastSyncedAt: null, ageSeconds: null },
        linkedin: { status: "not_configured", lastSyncedAt: null, ageSeconds: null },
        website: { status: "healthy", lastSyncedAt: null, ageSeconds: null },
      },
    }
  };

  it("1. Live Profile available -> included in AI context", () => {
    const prompt = buildSystemPrompt(dummyLiveProfile);
    expect(prompt).toContain("LIVE PUBLIC PROFILE INFORMATION");
    expect(prompt).toContain("SOURCE FRESHNESS");
  });

  it("2. Live Profile unavailable -> AI correctly does not receive it", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).not.toContain("SOURCE FRESHNESS");
  });

  it("3. Instagram source healthy -> Instagram data appears in context", () => {
    const prompt = buildSystemPrompt(dummyLiveProfile);
    expect(prompt).toContain("Recent post about cybersecurity");
    expect(prompt).toContain("INSTAGRAM");
  });

  it("4. Credentials never appear in context", () => {
    const prompt = buildSystemPrompt(dummyLiveProfile);
    // Sanity check that environment variables are not dumped in the prompt
    expect(prompt).not.toContain("INSTAGRAM_ACCESS_TOKEN");
    expect(prompt).not.toContain("IGAAOZCYaiMjBBB");
  });

  it("5. Static verified data remains authoritative", () => {
    const prompt = buildSystemPrompt(dummyLiveProfile);
    expect(prompt).toContain("STATIC VERIFIED DATA (Highest Authority)");
  });

  it("6. LinkedIn shows as unconfigured/unavailable", () => {
    const prompt = buildSystemPrompt(dummyLiveProfile);
    expect(prompt).toContain("Linkedin: not configured");
  });
});
