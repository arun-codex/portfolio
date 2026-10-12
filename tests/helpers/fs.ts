import fs from "node:fs";
import path from "node:path";

export function readText(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

export function walkFiles(rootDir: string, extensions: string[]): string[] {
  const results: string[] = [];

  function visit(currentDir: string) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "coverage") {
          continue;
        }
        visit(fullPath);
        continue;
      }

      if (extensions.includes(path.extname(entry.name))) {
        results.push(fullPath);
      }
    }
  }

  visit(rootDir);
  return results;
}

export function isClientFile(content: string): boolean {
  return /^\s*["']use client["'];?/m.test(content);
}