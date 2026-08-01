import { test, expect } from "@playwright/test";
import { PROMISSORY_CLAIM } from "./helpers";

/**
 * Regression floor for the existing V1 application.
 *
 * This exists to protect the whole app during the V2 migration: every public
 * route must keep rendering, keep its header/footer/logos, stay free of
 * horizontal overflow, and raise no console errors. It deliberately asserts
 * structure and invariants rather than pixels, so it survives styling work
 * while still catching genuine breakage.
 */

const ROUTES = [
  ["home", "/visaworx"],
  ["countries list", "/visaworx/countries"],
  ["country detail", "/visaworx/countries/united-states"],
  ["services list", "/visaworx/services"],
  ["service detail", "/visaworx/services/tourist-visa"],
  ["readiness", "/visaworx/readiness"],
  ["resources hub", "/visaworx/resources"],
  ["faqs", "/visaworx/resources/faqs"],
  ["glossary", "/visaworx/resources/glossary"],
  ["guides list", "/visaworx/resources/guides"],
  ["guide detail", "/visaworx/resources/guides/common-visa-application-mistakes"],
  ["consultation", "/visaworx/consultation"],
  ["consultation success", "/visaworx/consultation/success"],
  ["assistant", "/visaworx/assistant"],
] as const;

for (const [name, path] of ROUTES) {
  test.describe(`route: ${name}`, () => {
    test("renders with header, footer and both logos, and no console errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      page.on("pageerror", (e) => errors.push(String(e)));

      const res = await page.goto(path, { waitUntil: "networkidle" });
      expect(res?.status(), `${path} must not error`).toBeLessThan(400);

      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();

      // Both official logos must render as real images, never broken boxes.
      const visaworx = page.getByAltText("Visaworx").first();
      await expect(visaworx).toBeVisible();
      expect(
        await visaworx.evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)
      ).toBe(true);

      const klar = page.getByAltText("Klar Travels").first();
      expect(await klar.evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)).toBe(true);

      expect(errors.join("\n")).toBe("");
    });

    test("has exactly one h1 and does not scroll horizontally", async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, `${path} overflows horizontally`).toBeLessThanOrEqual(1);

      expect(await page.locator("h1").count(), `${path} h1 count`).toBe(1);
    });

    test("makes no approval guarantee", async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });

      // Blocks marked data-negated-claims list things Visaworx explicitly does
      // NOT provide ("What Is Not Included"). Reading those as promises would
      // invert their meaning, so they are removed before asserting.
      const body = await page.evaluate(() => {
        document.querySelectorAll("[data-negated-claims]").forEach((el) => el.remove());
        return document.body.innerText.toLowerCase();
      });

      expect(body).not.toMatch(PROMISSORY_CLAIM);
    });

    test("the floating assistant launcher does not cover controls at rest", async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });

      // Standard enforced here:
      //  - at the bottom of the page, NO control may be covered (that is where
      //    the primary calls to action and the pinned wizard bar live);
      //  - at the top, no text entry control may be covered.
      // A floating launcher overlaying a link inside a scrollable content grid
      // is accepted, as it is for any floating support widget - the content
      // remains reachable by scrolling.
      const probe = async (selector: string) => page.evaluate((sel) => {
        const launcher = document.querySelector('[data-assistant-launcher="true"]');
        if (!launcher) return [];
        const lb = launcher.getBoundingClientRect();
        const hits: string[] = [];
        for (const el of document.querySelectorAll(sel)) {
          if (el === launcher || launcher.contains(el) || el.contains(launcher)) continue;
          const eb = el.getBoundingClientRect();
          if (eb.width === 0 || eb.height === 0) continue;
          const overlap = !(
            eb.right < lb.left || eb.left > lb.right || eb.bottom < lb.top || eb.top > lb.bottom
          );
          if (overlap) hits.push((el.textContent || el.tagName).trim().slice(0, 40));
        }
        return hits;
      }, selector);

      const inputsAtTop = await probe("input, textarea, select");
      expect(inputsAtTop.join(" | "), `${path}: launcher covers a text entry control`).toBe("");

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(400);

      const allAtBottom = await probe("button, a, input, textarea, select");
      expect(allAtBottom.join(" | "), `${path}: launcher covers controls at page bottom`).toBe("");
    });
  });
}

test.describe("in-page anchors", () => {
  test("guide table-of-contents links clear the sticky header", async ({ page }) => {
    await page.goto("/visaworx/resources/guides/common-visa-application-mistakes", {
      waitUntil: "networkidle",
    });

    await page.locator('nav[aria-label="Table of contents"] a').first().click();

    // The page scrolls smoothly, so wait for the scroll position to settle
    // rather than guessing at a fixed delay.
    await page.waitForFunction(
      () =>
        new Promise<boolean>((resolve) => {
          let last = window.scrollY;
          let stable = 0;
          const tick = () => {
            if (window.scrollY === last) stable += 1;
            else stable = 0;
            last = window.scrollY;
            if (stable >= 3) resolve(true);
            else requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
      undefined,
      { timeout: 5000 }
    );

    const { headingTop, headerBottom } = await page.evaluate(() => {
      const h = document.querySelector("#heading-0")!.getBoundingClientRect();
      const hd = document.querySelector("header")!.getBoundingClientRect();
      return { headingTop: h.top, headerBottom: hd.bottom };
    });

    // The target heading must land below the sticky header, not behind it.
    expect(headingTop).toBeGreaterThanOrEqual(headerBottom - 1);
  });
});

test.describe("navigation", () => {
  test("primary nav reaches every top-level section", async ({ page }) => {
    await page.goto("/visaworx", { waitUntil: "networkidle" });
    const nav = page.locator('nav[aria-label="Primary navigation"]');

    // Below lg the primary nav collapses into the mobile drawer.
    const width = page.viewportSize()!.width;
    if (width < 1024) {
      await expect(nav).toBeHidden();
      return;
    }

    for (const label of ["Services", "Countries", "Visa Readiness", "Resources", "FAQs"]) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("mobile drawer opens and closes below the lg breakpoint", async ({ page }) => {
    const width = page.viewportSize()!.width;
    test.skip(width >= 1024, "drawer only exists on small viewports");

    await page.goto("/visaworx", { waitUntil: "networkidle" });
    const toggle = page.getByRole("button", { name: /toggle navigation/i });
    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeVisible();

    await toggle.click();
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeHidden();
  });
});
