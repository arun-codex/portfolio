import { test, expect } from "@playwright/test";

test("POST /api/chat returns an answer", async ({ request }) => {
  const response = await request.post("/api/chat", {
    headers: { origin: "http://localhost:3000" },
    data: { message: "Who is Arun?" },
  });

  expect(response.status()).toBe(200);
  const payload = await response.json();
  expect(payload.answer).toEqual(expect.any(String));
  expect(payload.answer.toLowerCase()).toContain("arun");
});

test("POST /api/chat rejects malformed JSON", async ({ request }) => {
  const response = await request.fetch("/api/chat", {
    method: "POST",
    headers: {
      origin: "http://localhost:3000",
      "content-type": "application/json",
    },
    data: "{",
  });

  expect(response.status()).toBe(400);
});

test("POST /api/chat rejects malicious origins", async ({ request }) => {
  const response = await request.post("/api/chat", {
    headers: { origin: "https://attacker.com" },
    data: { message: "Who is Arun?" },
  });

  expect(response.status()).toBe(403);
});

test("unsupported methods return 405", async ({ request }) => {
  for (const method of ["GET", "PUT", "PATCH", "DELETE"] as const) {
    const response = await request.fetch("/api/chat", {
      method,
      headers: { origin: "http://localhost:3000" },
    });

    expect(response.status()).toBe(405);
  }
});