import { beforeEach, describe, expect, it, vi } from "vitest";

const originalEnv = {
  NODE_ENV: process.env.NODE_ENV,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  AI_RATE_LIMIT_MAX_REQUESTS: process.env.AI_RATE_LIMIT_MAX_REQUESTS,
  AI_RATE_LIMIT_WINDOW_SECONDS: process.env.AI_RATE_LIMIT_WINDOW_SECONDS,
  AI_SESSION_RATE_LIMIT_MAX: process.env.AI_SESSION_RATE_LIMIT_MAX,
  AI_SESSION_RATE_LIMIT_WINDOW_SECONDS: process.env.AI_SESSION_RATE_LIMIT_WINDOW_SECONDS,
};

describe("rate limiting", () => {
  beforeEach(() => {
    vi.resetModules();
    const env = process.env as Record<string, string | undefined>;
    env.NODE_ENV = originalEnv.NODE_ENV ?? "test";
    env.UPSTASH_REDIS_REST_URL = "";
    env.UPSTASH_REDIS_REST_TOKEN = "";
    env.AI_RATE_LIMIT_MAX_REQUESTS = originalEnv.AI_RATE_LIMIT_MAX_REQUESTS ?? "";
    env.AI_RATE_LIMIT_WINDOW_SECONDS = originalEnv.AI_RATE_LIMIT_WINDOW_SECONDS ?? "";
    env.AI_SESSION_RATE_LIMIT_MAX = originalEnv.AI_SESSION_RATE_LIMIT_MAX ?? "";
    env.AI_SESSION_RATE_LIMIT_WINDOW_SECONDS = originalEnv.AI_SESSION_RATE_LIMIT_WINDOW_SECONDS ?? "";
  });

  it("falls back to deterministic in-memory limits in non-production", async () => {
    const env = process.env as Record<string, string | undefined>;
    env.NODE_ENV = "test";
    env.AI_RATE_LIMIT_MAX_REQUESTS = "2";
    env.AI_RATE_LIMIT_WINDOW_SECONDS = "60";
    env.AI_SESSION_RATE_LIMIT_MAX = "2";
    env.AI_SESSION_RATE_LIMIT_WINDOW_SECONDS = "60";

    const { checkRateLimit } = await import("@/lib/rate-limit");

    const first = await checkRateLimit("127.0.0.1", "session-1");
    const second = await checkRateLimit("127.0.0.1", "session-1");
    const third = await checkRateLimit("127.0.0.1", "session-1");

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(third.allowed).toBe(false);
  });

  it("fails closed in production when Upstash is unavailable", async () => {
    const env = process.env as Record<string, string | undefined>;
    env.NODE_ENV = "production";

    const { checkRateLimit } = await import("@/lib/rate-limit");
    const result = await checkRateLimit("127.0.0.1", "session-1");

    expect(result.allowed).toBe(false);
    expect(result.failClosedError).toBe(true);
  });
});