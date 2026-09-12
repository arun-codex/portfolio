import path from "node:path";
import { describe, expect, it } from "vitest";
import { isClientFile, readText, walkFiles } from "../helpers/fs";

describe("server/client boundary", () => {
  it("keeps memory-context server-only", () => {
    const memoryContext = readText(path.join(process.cwd(), "src/lib/ai/memory-context.ts"));

    expect(memoryContext).toContain('import "server-only";');
    expect(memoryContext).toContain("readFileSync");
  });

  it("does not import memory-context into client components", () => {
    const sourceFiles = walkFiles(path.join(process.cwd(), "src"), [".ts", ".tsx"]);
    const offenders = sourceFiles.filter((filePath) => {
      const content = readText(filePath);
      return isClientFile(content) && content.includes("memory-context");
    });

    expect(offenders).toEqual([]);
  });
});