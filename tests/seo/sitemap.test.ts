import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("SEO Sitemap Configuration", () => {
  it("includes canonical root URL with HTTPS", () => {
    const entries = sitemap();
    const rootEntry = entries.find((e) => e.url === "https://arunx.xyz");

    expect(rootEntry).toBeDefined();
    expect(rootEntry?.priority).toBe(1.0);
    expect(rootEntry?.changeFrequency).toBe("weekly");
    expect(rootEntry?.lastModified).toBeInstanceOf(Date);
  });

  it("contains only secure HTTPS URLs without preview or localhost", () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.url.startsWith("https://arunx.xyz")).toBe(true);
      expect(entry.url).not.toContain("localhost");
      expect(entry.url).not.toContain("127.0.0.1");
      expect(entry.url).not.toContain("vercel.app");
    }
  });
});
