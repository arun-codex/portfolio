import { beforeEach, describe, expect, it } from "vitest";
import { MockProvider } from "@/lib/ai/mock-provider";
import { aiRegressionCases } from "../fixtures/ai-regression-cases";
import { makeSetTimeoutImmediate } from "../helpers/fast-timeouts";

describe("AI regression set", () => {
  beforeEach(() => {
    makeSetTimeoutImmediate();
  });

  it.each(aiRegressionCases)(
    "covers %s",
    async ({ question, mustContain, mustNotContain, expectedSource }) => {
      const provider = new MockProvider();
      const result = await provider.chat("SYSTEM", [{ role: "user", content: question }]);

      expect(result.answer).toEqual(expect.any(String));
      expect(result.answer.toLowerCase()).not.toContain("gemini_api_key");
      expect(result.answer.toLowerCase()).not.toContain("supabase_service_role_key");

      for (const token of mustContain) {
        expect(result.answer.toLowerCase()).toContain(token.toLowerCase());
      }

      for (const token of mustNotContain) {
        expect(result.answer.toLowerCase()).not.toContain(token.toLowerCase());
      }

      expect(expectedSource).toEqual(expect.any(String));
    }
  );
});