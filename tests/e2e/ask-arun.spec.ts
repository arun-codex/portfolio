import { test, expect } from "@playwright/test";
import { openAskArun, trackPageIssues, waitForAppReady } from "../helpers/browser";

async function mockAskArunApi(page: Parameters<typeof test>[0] extends never ? never : import("@playwright/test").Page) {
  await page.route("**/api/conversations", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ messages: [], conversationId: null }),
    });
  });

  await page.route("**/api/chat", async (route) => {
    const body = route.request().postDataJSON() as { message?: string };
    const message = String(body.message ?? "").toLowerCase();
    const answer = message.includes("who is arun")
      ? "Arun Kumar is a BCA student and Cybersecurity Enthusiast based in India."
      : message.includes("what cybersecurity projects")
      ? "Arun has built Linux Access Control Simulation, Personal Portfolio Website, System Programming Practice Toolkit, AI Workflow Exploration, and Weather — UI Dashboard."
      : "Ask Arun can help with projects, skills, certifications, resume, GitHub, and contact details.";

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ answer, conversationId: null }),
    });
  });
}

test("Ask Arun sends messages and clears history", async ({ page }) => {
  const issues = trackPageIssues(page);

  await mockAskArunApi(page);
  await page.goto("/");
  await waitForAppReady(page);
  await openAskArun(page);

  const input = page.getByLabel("Type your message");
  await input.fill("Who is Arun?");
  await page.locator(".ask-arun-send-btn").click();

  await expect(page.getByText(/Who is Arun\?/i)).toBeVisible();
  await expect(page.locator(".ask-arun-msg-row--assistant").last()).toContainText(/Cybersecurity Enthusiast/i, { timeout: 15000 });
  expect(await page.evaluate(() => sessionStorage.getItem("ask-arun-history"))).toContain("Who is Arun?");

  await page.getByRole("button", { name: /start a new chat/i }).click();
  await expect(page.getByText(/Hi! I'm Arun's portfolio assistant/i)).toBeVisible();
  expect(await page.evaluate(() => sessionStorage.getItem("ask-arun-history"))).toBeNull();

  await issues.expectClean();
});

test("Ask Arun handles Enter, quick prompts, and API failures", async ({ page }) => {
  const issues = trackPageIssues(page, {
    ignoreConsoleErrorPatterns: [/Failed to load resource: the server responded with a status of 500/i],
  });

  await mockAskArunApi(page);
  await page.goto("/");
  await waitForAppReady(page);
  await openAskArun(page);

  await page.getByText(/what cybersecurity projects has arun built/i).click();
  await expect(page.getByText(/What cybersecurity projects has Arun built\?/i)).toBeVisible();
  await expect(page.locator(".ask-arun-msg-row--assistant").last()).toContainText(/Linux Access Control Simulation/i, { timeout: 15000 });

  await page.getByRole("dialog", { name: /ask arun/i }).getByRole("button", { name: /close ask arun ai assistant/i }).click();
  await openAskArun(page);

  await page.unroute("**/api/chat");
  await page.route("**/api/chat", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Server failure" }),
    });
  });

  const input = page.getByLabel("Type your message");
  await input.fill("Who is Arun?");
  await page.keyboard.press("Enter");

  await expect(page.getByText(/having trouble right now/i)).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/Server failure/i)).toHaveCount(0);

  await issues.expectClean();
});