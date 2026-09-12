import fs from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { loadMemoryContext } from "@/lib/ai/memory-context";

describe("memory context loader", () => {
  it("strips comments and normalizes whitespace", () => {
    const readSpy = vi.spyOn(fs, "readFileSync").mockReturnValue(
      "\n<!-- developer note -->\n## Test Memory\nARUN_MEMORY_TEST_MARKER_2026\n\n\nKeep this.\n"
    );

    const result = loadMemoryContext();

    expect(result.loaded).toBe(true);
    expect(result.content).toContain("ARUN_MEMORY_TEST_MARKER_2026");
    expect(result.content).not.toContain("developer note");
    expect(result.content).not.toContain("\n\n\n");
    expect(readSpy).toHaveBeenCalled();
  });

  it("handles a missing file without throwing", () => {
    vi.spyOn(fs, "readFileSync").mockImplementation(() => {
      const error = new Error("missing") as NodeJS.ErrnoException;
      error.code = "ENOENT";
      throw error;
    });

    const result = loadMemoryContext();

    expect(result).toEqual({ content: "", loaded: false, truncated: false, charCount: 0 });
  });

  it("truncates oversized memory safely", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(fs, "readFileSync").mockReturnValue("A".repeat(13000));

    const result = loadMemoryContext();

    expect(result.loaded).toBe(true);
    expect(result.truncated).toBe(true);
    expect(result.charCount).toBeLessThanOrEqual(12000);
    expect(warnSpy).toHaveBeenCalled();
  });
});