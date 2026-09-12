import { test, expect } from "@playwright/test";
import { trackPageIssues, waitForAppReady } from "../helpers/browser";

test("homepage renders the portfolio shell", async ({ page }) => {
  const issues = trackPageIssues(page);

  await page.goto("/");
  await waitForAppReady(page);

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Arun Kumar/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Cybersecurity Enthusiast & Developer/i })).toBeVisible();
  await expect(page.locator("section#projects")).toBeVisible();
  await expect(page.locator("section#skills")).toBeVisible();
  await expect(page.locator("section#certifications")).toBeVisible();
  await expect(page.locator("section#contact")).toBeVisible();
  await expect(page.getByRole("button", { name: /open ask arun ai assistant/i })).toBeVisible();
  await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();

  await issues.expectClean();
});