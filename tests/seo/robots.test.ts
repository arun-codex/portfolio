import { describe, expect, it } from "vitest";
import robots from "@/app/robots";

describe("SEO Robots Configuration", () => {
  it("allows search engines to crawl public pages", () => {
    const config = robots();
    expect(config.rules).toBeDefined();

    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const wildcardRule = rules.find((rule) => rule.userAgent === "*");

    expect(wildcardRule).toBeDefined();
    expect(wildcardRule?.allow).toBe("/");
    expect(wildcardRule?.disallow).toContain("/api/");
  });

  it("points to the production HTTPS sitemap", () => {
    const config = robots();
    expect(config.sitemap).toBe("https://arunx.xyz/sitemap.xml");
  });

  it("specifies production canonical host", () => {
    const config = robots();
    expect(config.host).toBe("https://arunx.xyz");
  });

  it("does not allow indexing preview or internal diagnostic paths", () => {
    const config = robots();
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const wildcardRule = rules.find((rule) => rule.userAgent === "*");

    const disallows = Array.isArray(wildcardRule?.disallow)
      ? wildcardRule?.disallow
      : [wildcardRule?.disallow];

    expect(disallows).toContain("/api/");
  });
});
