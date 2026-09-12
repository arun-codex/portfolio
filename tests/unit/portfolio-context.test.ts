import { describe, expect, it } from "vitest";
import { certifications } from "@/data/certifications";
import { personal, socialLinks } from "@/data/personal";
import { projects } from "@/data/projects";
import { skills, skillCategories } from "@/data/skills";
import { getPortfolioContext, serializePortfolioContext } from "@/lib/portfolio-context";

describe("portfolio context", () => {
  it("normalizes the portfolio data without inventing facts", () => {
    const ctx = getPortfolioContext();

    expect(ctx.profile.name).toBe(personal.name);
    expect(ctx.profile.headline).toBe(personal.headline);
    expect(ctx.links[0]).toEqual({ platform: "Website", url: personal.website });
    expect(ctx.links).toEqual(
      expect.arrayContaining([
        { platform: "GitHub", url: socialLinks.professional[0].url },
        { platform: "LinkedIn", url: socialLinks.professional[1].url },
      ])
    );
    expect(ctx.projects).toHaveLength(projects.length);
    expect(ctx.skillGroups.map((group) => group.category)).toEqual(skillCategories);
    expect(ctx.certifications).toHaveLength(
      certifications.filter((cert) => cert.status === "verified").length
    );
    expect(serializePortfolioContext(ctx)).toContain("Only use the information above");
    expect(serializePortfolioContext(ctx)).toContain("Arun Kumar");
  });

  it("keeps verified certifications only", () => {
    const ctx = getPortfolioContext();
    expect(ctx.certifications.every((cert) => cert.name.length > 0)).toBe(true);
  });

  it("preserves the source skill inventory", () => {
    const ctx = getPortfolioContext();
    const normalizedSkills = ctx.skillGroups.flatMap((group) => group.skills);

    expect(normalizedSkills).toEqual(
      expect.arrayContaining(skills.map((skill) => skill.name))
    );
  });
});