import { test, expect } from "@playwright/test";
import { trackPageIssues, waitForAppReady } from "../helpers/browser";

test("desktop navigation and anchors work", async ({ page }) => {
  const issues = trackPageIssues(page);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await waitForAppReady(page);

  await page.evaluate(() => {
    (document.querySelector('a[href="#projects"]:not([download])') as HTMLAnchorElement | null)?.click();
  });
  await expect(page).toHaveURL(/#projects$/);

  await page.evaluate(() => {
    (document.querySelector('a[href="#contact"]:not([download])') as HTMLAnchorElement | null)?.click();
  });
  await expect(page).toHaveURL(/#contact$/);

  const socialLinks = page.getByRole("contentinfo").getByRole("link");
  const hrefs = await socialLinks.evaluateAll((nodes) => nodes.map((node) => (node as HTMLAnchorElement).href));
  expect(hrefs.every((href) => href.startsWith("https://") || href.startsWith("mailto:"))).toBe(true);

  await issues.expectClean();
});

test("mobile menu opens and closes", async ({ page }) => {
  const issues = trackPageIssues(page);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await waitForAppReady(page);

  await page.evaluate(() => {
    (document.querySelector('button[aria-label="Open menu"]') as HTMLButtonElement | null)?.click();
  });
  await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();
  await expect(page.locator("header > div a[href='#projects']")).toBeVisible();

  await page.evaluate(() => {
    (document.querySelector('button[aria-label="Close menu"]') as HTMLButtonElement | null)?.click();
  });
  await expect(page.getByRole("button", { name: /open menu/i })).toBeVisible();

  await issues.expectClean();
});