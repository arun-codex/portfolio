import { beforeEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs";
import { MockProvider } from "@/lib/ai/mock-provider";
import { buildSystemPrompt } from "@/lib/ai/prompts";
import { makeSetTimeoutImmediate } from "../helpers/fast-timeouts";

describe("AI grounding", () => {
  beforeEach(() => {
    makeSetTimeoutImmediate();
  });

  it("includes approved memory in the system prompt", () => {
    vi.spyOn(fs, "readFileSync").mockReturnValue(
      "## Test Memory\nARUN_MEMORY_TEST_MARKER_2026\n<!-- hidden note -->\n"
    );

    const prompt = buildSystemPrompt();

    expect(prompt).toContain("ARUN_MEMORY_TEST_MARKER_2026");
    expect(prompt).not.toContain("hidden note");
    expect(prompt).toContain("Only use the information above");
  });

  it("answers identity and career questions using portfolio facts", async () => {
    const provider = new MockProvider();
    const answer = await provider.chat("SYSTEM", [{ role: "user", content: "Who is Arun?" }]);

    expect(answer.answer).toMatch(/Arun Kumar/i);
    expect(answer.answer).toMatch(/BCA/i);
    expect(answer.answer).toMatch(/cybersecurity/i);
    expect(answer.answer).not.toMatch(/salary|award|employee|manager/i);
  });

  it("answers skill questions from the approved portfolio surface", async () => {
    const provider = new MockProvider();
    const answer = await provider.chat("SYSTEM", [{ role: "user", content: "What technologies does Arun use?" }]);

    expect(answer.answer).toMatch(/Linux|JavaScript|Python|Git/i);
  });
});