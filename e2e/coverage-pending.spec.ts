import { test, expect } from "@playwright/test";
import { countriesData, isPublished } from "../common/content/countries";
import { PROMISSORY_CLAIM } from "./helpers";

/**
 * The 40 destinations without published guidance.
 *
 * Unit tests already prove the *data* carries no invented requirements. This
 * file covers what the data cannot: that the page actually renders the honest
 * "not published yet" state, routes to a human, and shows none of the
 * requirement sections. An empty checklist heading with nothing under it reads
 * as "nothing is required", which is the more dangerous failure and would pass
 * every generic route check.
 */

const awaiting = countriesData.filter((c) => !isPublished(c));

// A sample rather than all 40: the state is identical across them, and every
// case here runs on six viewports. Spread across the list so a regression
// confined to one part of the registry still surfaces.
const SAMPLE = [awaiting[0], awaiting[Math.floor(awaiting.length / 2)], awaiting[awaiting.length - 1]];

// Headings that only ever appear where reviewed guidance exists.
const GUIDANCE_HEADINGS = [
  /Core Preparation Checklist/i,
  /Typical Application Stages/i,
  /Common Avoidable Mistakes/i,
  /Destination FAQs/i,
];

test.describe("destinations awaiting verified guidance", () => {
  test("the sample is actually unpublished", () => {
    expect(awaiting.length).toBeGreaterThan(0);
    for (const country of SAMPLE) {
      expect(country, "sample country exists").toBeTruthy();
      expect(isPublished(country)).toBe(false);
    }
  });

  for (const country of SAMPLE) {
    test.describe(`${country.name}`, () => {
      const path = `/countries/${country.slug}`;

      test("renders the not-published state instead of empty requirement sections", async ({
        page,
      }) => {
        const res = await page.goto(path, { waitUntil: "networkidle" });
        expect(res?.status(), `${path} must be a live page, not a 404`).toBe(200);

        await expect(
          page.getByRole("heading", { name: new RegExp(`${country.name} guidance is not published yet`, "i") })
        ).toBeVisible();

        // The dangerous failure mode: a requirements heading with nothing
        // under it, which reads as "nothing is required".
        for (const heading of GUIDANCE_HEADINGS) {
          await expect(
            page.getByRole("heading", { name: heading }),
            `${path} must not render ${heading} without verified content`
          ).toHaveCount(0);
        }
      });

      test("points at the official authority and offers a human expert", async ({ page }) => {
        await page.goto(path, { waitUntil: "networkidle" });

        const body = await page.locator("body").innerText();
        expect(body, `${path} must name the official source`).toContain(
          country.officialSourceLabel
        );

        const consultationLink = page.getByRole("link", { name: /request a consultation/i });
        await expect(consultationLink).toBeVisible();
        await expect(consultationLink).toHaveAttribute("href", /\/consultation\?source=country/);
      });

      test("promises nothing in its title or on the page", async ({ page }) => {
        await page.goto(path, { waitUntil: "networkidle" });

        // "Visa Guidance" is reserved for destinations that actually have it.
        await expect(page).toHaveTitle(/Visa Consultation \| Visaworx/);

        const body = (await page.locator("body").innerText()).toLowerCase();
        expect(body).not.toMatch(PROMISSORY_CLAIM);
      });
    });
  }
});

test.describe("published destinations still render full guidance", () => {
  // The contrast case: without this, deleting the guidance sections outright
  // would leave the suite above entirely green.
  const published = countriesData.find(isPublished)!;

  test("shows the requirement sections and no pending notice", async ({ page }) => {
    await page.goto(`/countries/${published.slug}`, { waitUntil: "networkidle" });

    for (const heading of GUIDANCE_HEADINGS) {
      await expect(page.getByRole("heading", { name: heading })).toHaveCount(1);
    }

    await expect(
      page.getByRole("heading", { name: /guidance is not published yet/i })
    ).toHaveCount(0);
  });
});
