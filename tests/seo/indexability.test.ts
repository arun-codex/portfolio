import { describe, expect, it } from "vitest";
import { metadata } from "@/app/layout";

describe("SEO Indexability & Crawl Directives", () => {
  it("ensures homepage has index: true and follow: true", () => {
    const robots = metadata.robots;
    expect(robots).toBeDefined();

    if (typeof robots === "object" && robots !== null && "index" in robots) {
      expect(robots.index).toBe(true);
      expect(robots.follow).toBe(true);
    }
  });

  it("configures GoogleBot directives with full snippets and large image previews", () => {
    const robots = metadata.robots;
    if (typeof robots === "object" && robots !== null && "googleBot" in robots) {
      const gb = robots.googleBot as Record<string, unknown>;
      expect(gb.index).toBe(true);
      expect(gb.follow).toBe(true);
      expect(gb["max-image-preview"]).toBe("large");
      expect(gb["max-snippet"]).toBe(-1);
    }
  });

  it("does not specify noindex, nofollow, or nosnippet on production homepage", () => {
    const serialized = JSON.stringify(metadata);
    expect(serialized).not.toContain('"index":false');
    expect(serialized).not.toContain('"follow":false');
    expect(serialized).not.toContain('noindex');
    expect(serialized).not.toContain('nofollow');
  });
});
