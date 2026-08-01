import { test, expect } from "@playwright/test";
import { gotoConsultation, reachReview, PROMISSORY_CLAIM } from "./helpers";

test.describe("Branding and claims", () => {
  test("renders the supplied Visaworx logo, not a broken image", async ({ page }) => {
    await gotoConsultation(page);
    const logo = page.getByAltText("Visaworx").first();
    await expect(logo).toBeVisible();

    const ok = await logo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
    expect(ok).toBe(true);
  });

  test("no image on the page fails to load", async ({ page }) => {
    const failed: string[] = [];
    page.on("response", (res) => {
      if (res.request().resourceType() === "image" && res.status() >= 400) failed.push(`${res.status()} ${res.url()}`);
    });
    await gotoConsultation(page);
    await page.waitForLoadState("networkidle");
    expect(failed.join("\n")).toBe("");
  });

  test("states plainly that this is a consultation request, not a visa application", async ({ page }) => {
    await gotoConsultation(page);
    const body = (await page.locator("body").innerText()).toLowerCase();
    expect(body).toContain("not a visa application");
  });

  test("makes no visa approval guarantee anywhere in the flow", async ({ page }) => {
    await reachReview(page);
    const body = (await page.locator("body").innerText()).toLowerCase();

    // Explicitly disclaims guarantees.
    expect(body).toContain("does not guarantee");
    // And never promises one.
    expect(body).not.toMatch(PROMISSORY_CLAIM);
  });
});

test.describe("Responsive layout", () => {
  test("does not scroll horizontally at this viewport", async ({ page }) => {
    await gotoConsultation(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("review screen does not overflow horizontally", async ({ page }) => {
    await reachReview(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("navigation controls remain reachable and on-screen", async ({ page }) => {
    await gotoConsultation(page);
    const btn = page.getByRole("button", { name: /^Continue$/ });
    const box = await btn.boundingBox();
    const width = page.viewportSize()!.width;
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
  });
});
