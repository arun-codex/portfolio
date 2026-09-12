import { describe, expect, it } from "vitest";
import { certifications } from "@/data/certifications";
import { navLinks, personal, socialLinks, stats } from "@/data/personal";
import { projectCategories, projects } from "@/data/projects";
import { skillCategories, skills } from "@/data/skills";

function isSafeUrl(value: string): boolean {
  if (value.startsWith("/") || value.startsWith("mailto:")) {
    return true;
  }

  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol);
  } catch {
    return false;
  }
}

describe("portfolio source data", () => {
  it("contains the required personal fields and safe links", () => {
    expect(personal.name).toBeTruthy();
    expect(personal.headline).toBeTruthy();
    expect(personal.email).toContain("@");
    expect(isSafeUrl(personal.website)).toBe(true);
    expect(isSafeUrl(personal.resumeUrl)).toBe(true);
    expect(navLinks.length).toBeGreaterThan(0);
    expect(stats.every((stat) => typeof stat.value === "number")).toBe(true);
    expect(socialLinks.professional.every((link) => isSafeUrl(link.url))).toBe(true);
  });

  it("keeps project identities unique and uses valid categories", () => {
    const ids = new Set(projects.map((project) => project.id));
    const titles = new Set(projects.map((project) => project.title));

    expect(ids.size).toBe(projects.length);
    expect(titles.size).toBe(projects.length);
    expect(projects.every((project) => projectCategories.includes(project.category))).toBe(true);
    expect(projects.every((project) => isSafeUrl(project.github ?? project.liveDemo ?? "/"))).toBe(true);
  });

  it("keeps skill categories aligned and links safe", () => {
    const categories = new Set(skills.map((skill) => skill.category));

    expect(skillCategories.every((category) => categories.has(category))).toBe(true);
    expect(skills.every((skill) => typeof skill.name === "string" && skill.name.length > 0)).toBe(true);
    expect(skills.every((skill) => isSafeUrl(skill.url ?? "/"))).toBe(true);
  });

  it("exposes only valid certification statuses", () => {
    expect(certifications.every((cert) => cert.status === "verified" || cert.status === "pending")).toBe(true);
  });

  it("keeps verified certifications discoverable", () => {
    const verified = certifications.filter((cert) => cert.status === "verified");
    expect(verified.length).toBeGreaterThan(0);
    expect(verified.every((cert) => cert.name && cert.issuer)).toBe(true);
  });
});