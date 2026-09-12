import { describe, expect, it, vi } from "vitest";
import { generateClientId } from "@/lib/utils";

describe("generateClientId", () => {
  it("generates a valid UUID when crypto.randomUUID is available", () => {
    const id = generateClientId();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it("falls back to crypto.getRandomValues when crypto.randomUUID is undefined (insecure LAN HTTP context)", () => {
    const originalCrypto = globalThis.crypto;

    // Simulate insecure context where crypto exists but randomUUID is not exposed
    const mockCrypto = {
      getRandomValues: originalCrypto.getRandomValues.bind(originalCrypto),
      randomUUID: undefined,
    } as unknown as Crypto;

    vi.stubGlobal("crypto", mockCrypto);

    try {
      const id = generateClientId();
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    } finally {
      vi.stubGlobal("crypto", originalCrypto);
    }
  });

  it("falls back to timestamp+random when Web Cryptography is entirely unavailable", () => {
    const originalCrypto = globalThis.crypto;

    // Simulate environment without Web Cryptography
    vi.stubGlobal("crypto", undefined);

    try {
      const id = generateClientId();
      expect(id).toMatch(/^client-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/i);
    } finally {
      vi.stubGlobal("crypto", originalCrypto);
    }
  });

  it("generates unique values across multiple calls", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 100; i++) {
      ids.add(generateClientId());
    }
    expect(ids.size).toBe(100);
  });
});
