import { describe, expect, it, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  checkRateLimit: vi.fn(),
  pruneMemoryEntries: vi.fn(),
  buildSystemPrompt: vi.fn(),
  chat: vi.fn(),
  getAIProvider: vi.fn(),
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mocks.checkRateLimit,
  pruneMemoryEntries: mocks.pruneMemoryEntries,
}));

vi.mock("@/lib/ai/prompts", () => ({
  buildSystemPrompt: mocks.buildSystemPrompt,
}));

vi.mock("@/lib/ai/provider", () => ({
  getAIProvider: mocks.getAIProvider,
}));

import { GET, POST } from "@/app/api/chat/route";
import { createJsonRequest } from "../helpers/http";

beforeEach(() => {
  mocks.checkRateLimit.mockResolvedValue({ allowed: true, remaining: 9, resetInMs: 60000 });
  mocks.buildSystemPrompt.mockReturnValue("SYSTEM PROMPT");
  mocks.chat.mockResolvedValue({ answer: "Arun Kumar is a BCA student focused on cybersecurity." });
  mocks.getAIProvider.mockResolvedValue({ chat: mocks.chat });
  vi.spyOn(Math, "random").mockReturnValue(0.99);
});

describe("/api/chat", () => {
  it("returns a grounded answer for valid requests", async () => {
    const response = await POST(
      createJsonRequest(
        {
          message: "Who is Arun?",
          history: [{ role: "user", content: "Hello" }],
        },
        { origin: "http://localhost:3000" }
      ) as never
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");

    const payload = (await response.json()) as { answer: string; conversationId: string | null };
    expect(payload.answer).toContain("Arun Kumar");
    expect(payload.conversationId).toBeNull();
    expect(mocks.chat).toHaveBeenCalledWith(
      "SYSTEM PROMPT",
      [
        { role: "user", content: "Hello" },
        { role: "user", content: "Who is Arun?" },
      ],
      expect.objectContaining({ maxOutputTokens: expect.any(Number), timeoutMs: expect.any(Number) })
    );
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { origin: "http://localhost:3000", "content-type": "application/json" },
        body: "{",
      }) as never
    );

    expect(response.status).toBe(400);
    expect((await response.json()).error).toMatch(/invalid json/i);
  });

  it.each([
    [{}, /missing required field/i],
    [{ message: null }, /must be a string/i],
    [{ message: 123 }, /must be a string/i],
    [{ message: "   " }, /cannot be empty/i],
    [{ message: "Hello", history: "bad" }, /history.*must be an array/i],
    [{ message: "Hello", history: [null] }, /history entry must be an object/i],
    [{ message: "Hello", history: [{ role: "system", content: "x" }] }, /roles: user, assistant/i],
  ])("validates bad input %j", async (body, pattern) => {
    const response = await POST(
      createJsonRequest(body, { origin: "http://localhost:3000" }) as never
    );

    expect(response.status).toBe(400);
    expect((await response.json()).error).toMatch(pattern as RegExp);
  });

  it("rejects malicious origins", async () => {
    const response = await POST(
      createJsonRequest({ message: "Who is Arun?" }, { origin: "https://attacker.com" }) as never
    );

    expect(response.status).toBe(403);
    expect((await response.json()).error).toMatch(/cross-origin/i);
  });

  it("returns 429 when the rate limiter denies the request", async () => {
    mocks.checkRateLimit.mockResolvedValueOnce({ allowed: false, remaining: 0, resetInMs: 3000 });

    const response = await POST(
      createJsonRequest({ message: "Who is Arun?" }, { origin: "http://localhost:3000" }) as never
    );

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("3");
  });

  it("returns 504 on provider timeout and 500 on provider failure", async () => {
    mocks.chat.mockRejectedValueOnce(Object.assign(new Error("timed out"), { name: "TimeoutError" }));
    let response = await POST(
      createJsonRequest({ message: "Who is Arun?" }, { origin: "http://localhost:3000" }) as never
    );
    expect(response.status).toBe(504);
    expect((await response.json()).error).toMatch(/took too long/i);

    mocks.chat.mockRejectedValueOnce(new Error("Gemini unavailable"));
    response = await POST(
      createJsonRequest({ message: "Who is Arun?" }, { origin: "http://localhost:3000" }) as never
    );
    expect(response.status).toBe(500);
    expect((await response.json()).error).toMatch(/having trouble reaching the ai/i);
  });

  it("keeps working without Supabase configuration", async () => {
    const response = await POST(
      createJsonRequest({ message: "Who is Arun?" }, { origin: "http://localhost:3000" }) as never
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("X-RateLimit-Remaining")).toBe("9");
  });

  it("exposes a method-not-allowed response for GET", async () => {
    const response = await GET();
    expect(response.status).toBe(405);
  });
});