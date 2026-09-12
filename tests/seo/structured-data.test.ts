import { describe, expect, it } from "vitest";
import React from "react";
import RootLayout from "@/app/layout";
import { renderToString } from "react-dom/server";

describe("SEO Structured Data (JSON-LD)", () => {
  it("renders valid JSON-LD with WebSite, ProfilePage, and Person entities", () => {
    const html = renderToString(
      React.createElement(RootLayout, null, React.createElement("div", null, "child"))
    );

    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    const rawJson = match![1];

    let parsed: { "@context"?: string; "@graph"?: Array<Record<string, unknown>> } = {};
    expect(() => {
      parsed = JSON.parse(rawJson);
    }).not.toThrow();

    expect(parsed["@context"]).toBe("https://schema.org");
    expect(Array.isArray(parsed["@graph"])).toBe(true);

    const graph = parsed["@graph"] ?? [];
    const website = graph.find((item) => item["@type"] === "WebSite");
    const profilePage = graph.find((item) => item["@type"] === "ProfilePage");
    const person = graph.find((item) => item["@type"] === "Person");

    // WebSite validation
    expect(website).toBeDefined();
    expect(website?.url).toBe("https://arunx.xyz/");
    expect(website?.name).toBe("Arun Kumar Portfolio");

    // ProfilePage validation
    expect(profilePage).toBeDefined();
    expect(profilePage?.url).toBe("https://arunx.xyz/");
    const mainEntity = profilePage?.mainEntity as Record<string, unknown> | undefined;
    expect(mainEntity?.["@id"]).toBe("https://arunx.xyz/#person");

    // Person validation
    expect(person).toBeDefined();
    expect(person?.name).toBe("Arun Kumar");
    expect(person?.alternateName).toBe("arun-codex");
    expect(person?.url).toBe("https://arunx.xyz/");
    expect(person?.image).toBe("https://arunx.xyz/images/profile.png");
    const sameAs = (person?.sameAs as string[]) ?? [];
    expect(sameAs).toContain("https://github.com/arun-codex");
    expect(sameAs).toContain("https://www.linkedin.com/in/arun-codex/");
    expect(sameAs).toContain("https://x.com/itz_arun_1806");
  });

  it("does not expose private secrets or fake credentials in structured data", () => {
    const html = renderToString(React.createElement(RootLayout, null, null));
    expect(html).not.toContain("GEMINI");
    expect(html).not.toContain("SECRET");
    expect(html).not.toContain("TOKEN");
    expect(html).not.toContain("localhost");
    expect(html).not.toContain("arunsingh.xyz");
  });
});
