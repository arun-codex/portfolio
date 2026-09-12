import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { openAskArun, trackPageIssues, waitForAppReady } from "../helpers/browser";

test("homepage has no critical accessibility violations", async ({ page }) => {
  const issues = trackPageIssues(page);

  await page.goto("/");
  await waitForAppReady(page);

  const results = await new AxeBuilder({ page }).include("main").analyze();
  expect(results.violations.filter((violation) => violation.impact === "critical")).toEqual([]);

  await expect(page.getByRole("button", { name: /open ask arun ai assistant/i })).toBeVisible();
  await issues.expectClean();
});

test("Ask Arun and mobile navigation remain accessible", async ({ page }) => {
  const issues = trackPageIssues(page);

  await page.goto("/");
  await waitForAppReady(page);
  await openAskArun(page);

  let results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
  expect(results.violations.filter((violation) => violation.impact === "critical")).toEqual([]);

  await page.getByRole("dialog", { name: /ask arun/i }).getByRole("button", { name: /close ask arun ai assistant/i }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: /open menu/i }).click();

  results = await new AxeBuilder({ page }).include('[role="navigation"]').analyze();
  expect(results.violations.filter((violation) => violation.impact === "critical")).toEqual([]);

  await issues.expectClean();
});