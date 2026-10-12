import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { isClientFile, readText, walkFiles } from "../helpers/fs";

const secretNames = [
  "GEMINI_API_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_SECRET_KEY",
  "UPSTASH_REDIS_REST_TOKEN",
];

describe("security scans", () => {
  it("does not write to the production memory file at runtime", () => {
    const files = walkFiles(path.join(process.cwd(), "src"), [".ts", ".tsx", ".mjs", ".md"]);
    const offenders = files.filter((filePath) => {
      const content = readText(filePath);
      return (
        content.includes("arun-memory.md") &&
        /\b(writeFile|writeFileSync|appendFile|appendFileSync|fs\.promises\.writeFile)\b/.test(content)
      );
    });

    expect(offenders).toEqual([]);
  });

  it("keeps sensitive env names out of client files", () => {
    const files = walkFiles(path.join(process.cwd(), "src"), [".ts", ".tsx"]);
    const clientFiles = files.filter((filePath) => isClientFile(readText(filePath)));

    for (const filePath of clientFiles) {
      const content = readText(filePath);
      for (const secretName of secretNames) {
        expect(content).not.toContain(secretName);
      }
      expect(content).not.toMatch(/process\.env\.[A-Z0-9_]+/);
    }
  });

  it("scans built client assets for secret names when a build is available", () => {
    const buildDir = path.join(process.cwd(), ".next");
    const clientAssetsDir = path.join(buildDir, "static");
    if (!fs.existsSync(clientAssetsDir)) {
      expect(true).toBe(true);
      return;
    }

    const builtFiles = walkFiles(clientAssetsDir, [".js", ".mjs", ".html", ".json"]);
    for (const filePath of builtFiles) {
      const content = readText(filePath);
      for (const secretName of secretNames) {
        expect(content).not.toContain(secretName);
      }
    }
  });
});