import { expect, type Page } from "@playwright/test";

export function trackPageIssues(
  page: Page,
  options?: {
    ignoreConsoleErrorPatterns?: RegExp[];
    ignoreRequestFailurePatterns?: RegExp[];
  }
) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      const text = message.text();
      if (/webpack-hmr|ERR_INVALID_HTTP_RESPONSE/i.test(text)) {
        return;
      }
      if (options?.ignoreConsoleErrorPatterns?.some((pattern) => pattern.test(text))) {
        return;
      }
      consoleErrors.push(text);
    }
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  page.on("requestfailed", (request) => {
    const url = request.url();
    const failureText = request.failure()?.errorText ?? "unknown";
    if (/webpack-hmr/i.test(url)) {
      return;
    }
    if (options?.ignoreRequestFailurePatterns?.some((pattern) => pattern.test(`${request.method()} ${url} ${failureText}`))) {
      return;
    }
    failedRequests.push(`${request.method()} ${url} ${failureText}`);
  });

  return {
    async expectClean() {
      expect(consoleErrors, `Unexpected console errors:\n${consoleErrors.join("\n")}`).toEqual([]);
      expect(pageErrors, `Unexpected page errors:\n${pageErrors.join("\n")}`).toEqual([]);
      expect(failedRequests, `Unexpected failed requests:\n${failedRequests.join("\n")}`).toEqual([]);
    },
  };
}

export async function waitForAppReady(page: Page) {
  await page.locator(".loading-screen").waitFor({ state: "hidden", timeout: 20000 }).catch(() => {});
}

export async function openAskArun(page: Page) {
  await waitForAppReady(page);
  await page.waitForSelector('button[aria-label="Open Ask Arun AI assistant"]', { state: "visible", timeout: 20000 });
  await page.evaluate(() => {
    const trigger = document.querySelector('button[aria-label="Open Ask Arun AI assistant"]') as HTMLButtonElement | null;
    trigger?.click();
  });
  await expect(page.getByRole("dialog", { name: /ask arun/i })).toBeVisible();
}