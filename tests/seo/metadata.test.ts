import { describe, expect, it } from "vitest";
import { metadata } from "@/app/layout";

describe("SEO Metadata Configuration", () => {
  it("defines metadataBase pointing to production domain https://arunx.xyz", () => {
    const origin =
      metadata.metadataBase instanceof URL
        ? metadata.metadataBase.origin
        : String(metadata.metadataBase);
    expect(origin).toBe("https://arunx.xyz");
  });

  it("configures a clear, brand-focused title with template", () => {
    expect(metadata.title).toBeDefined();
    if (typeof metadata.title === "object" && metadata.title !== null) {
      expect("default" in metadata.title && metadata.title.default).toContain("Arun Kumar");
      expect("default" in metadata.title && metadata.title.default).toContain("Cybersecurity");
    }
  });

  it("contains an accurate, informative meta description within good SEO length", () => {
    expect(metadata.description).toBeDefined();
    expect(typeof metadata.description).toBe("string");
    const desc = metadata.description as string;
    expect(desc.length).toBeGreaterThan(50);
    expect(desc.length).toBeLessThan(250);
    expect(desc).toContain("Arun Kumar");
    expect(desc).toContain("BCA");
    expect(desc).toContain("cybersecurity");
    expect(desc).toContain("India");
  });

  it("configures canonical URL without preview or local hostnames", () => {
    expect(metadata.alternates).toBeDefined();
    expect(metadata.alternates?.canonical).toBe("/");
  });

  it("configures Open Graph metadata matching 1200x630 standards", () => {
    const og = metadata.openGraph as Record<string, unknown> | undefined;
    expect(og).toBeDefined();
    expect(og?.type).toBe("website");
    expect(og?.locale).toBe("en_US");
    expect(og?.siteName).toBe("Arun Kumar Portfolio");
    expect(og?.url).toBe("https://arunx.xyz/");
    expect(og?.images).toBeDefined();

    if (Array.isArray(og?.images)) {
      const primaryImage = og.images[0];
      if (typeof primaryImage === "object" && primaryImage !== null && "url" in primaryImage) {
        expect(primaryImage.url).toBe("/images/og-image.png");
        expect(primaryImage.width).toBe(1200);
        expect(primaryImage.height).toBe(630);
      }
    }
  });

  it("configures Twitter Card with summary_large_image and verified creator", () => {
    const tw = metadata.twitter as Record<string, unknown> | undefined;
    expect(tw).toBeDefined();
    expect(tw?.card).toBe("summary_large_image");
    expect(tw?.creator).toBe("@itz_arun_1806");
  });

  it("points to web app manifest", () => {
    expect(metadata.manifest).toBe("/manifest.webmanifest");
  });
});
