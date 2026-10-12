import { test, expect } from "@playwright/test";
import { openAskArun, trackPageIssues, waitForAppReady } from "../helpers/browser";

const viewports = [
  { width: 375, height: 667 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
  { width: 768, height: 1024 },
  { width: 1280, height: 720 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  test(`responsive layout fits ${viewport.width}x${viewport.height}`, async ({ page }) => {
    const issues = trackPageIssues(page);

    await page.setViewportSize(viewport);
    await page.goto("/");
    await waitForAppReady(page);

    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("button", { name: /open ask arun ai assistant/i })).toBeVisible();

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 2);

    if (viewport.width < 768) {
      await page.evaluate(() => {
        (document.querySelector('button[aria-label="Open menu"]') as HTMLButtonElement | null)?.click();
      });
      await expect(page.locator("header > div a[href='#projects']")).toBeVisible();
    }

    await openAskArun(page);
    await expect(page.getByRole("dialog", { name: /ask arun/i })).toBeVisible();

    const panelBox = await page.getByRole("dialog", { name: /ask arun/i }).boundingBox();
    expect(panelBox).not.toBeNull();
    if (panelBox) {
      expect(panelBox.x).toBeGreaterThanOrEqual(-2);
      expect(panelBox.y).toBeGreaterThanOrEqual(-2);
      expect(panelBox.x + panelBox.width).toBeLessThanOrEqual(viewport.width + 2);
      expect(panelBox.y + panelBox.height).toBeLessThanOrEqual(viewport.height + 2);
    }

    await issues.expectClean();
  });
}