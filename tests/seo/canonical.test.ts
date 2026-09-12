import { describe, expect, it } from "vitest";
import { metadata } from "@/app/layout";
import { personal } from "@/data/personal";
import { projects } from "@/data/projects";

describe("SEO Canonical & URL Integrity", () => {
  it("ensures metadata canonical points cleanly to root", () => {
    expect(metadata.alternates?.canonical).toBe("/");
  });

  it("ensures personal.website matches production canonical URL", () => {
    expect(personal.website).toBe("https://arunx.xyz");
  });

  it("ensures portfolio project liveDemo matches production canonical URL", () => {
    const portfolioProject = projects.find((p) => p.id === "portfolio-website");
    expect(portfolioProject?.liveDemo).toBe("https://arunx.xyz");
  });

  it("ensures no legacy or staging domains exist in active project URLs", () => {
    for (const project of projects) {
      if (project.liveDemo) {
        expect(project.liveDemo).not.toContain("arunsingh.xyz");
        expect(project.liveDemo).not.toContain("localhost");
      }
    }
  });
});
