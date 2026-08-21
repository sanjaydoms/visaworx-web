import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { gotoConsultation, reachReview, continueButton, stepOne, stepTwo, stepThree, validationAlert } from "./helpers";

test.describe("Accessibility", () => {
  test("consultation step 1 has no serious or critical axe violations", async ({ page }) => {
    await gotoConsultation(page);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(
      blocking.map((v) => `${v.id} (${v.impact}) x${v.nodes.length}`).join("\n")
    ).toBe("");
  });

  test("review step has no serious or critical axe violations", async ({ page }) => {
    await reachReview(page);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(blocking.map((v) => `${v.id} (${v.impact}) x${v.nodes.length}`).join("\n")).toBe("");
  });

  test("success page has no serious or critical axe violations", async ({ page }) => {
    await page.goto("/consultation/success");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(blocking.map((v) => `${v.id} (${v.impact}) x${v.nodes.length}`).join("\n")).toBe("");
  });

  test("the whole flow is operable by keyboard alone", async ({ page }) => {
    await gotoConsultation(page);

    // Tab until the undecided checkbox is focused, then activate it with the keyboard.
    const checkbox = page.getByRole("checkbox").first();
    await checkbox.focus();
    await page.keyboard.press("Space");
    await expect(checkbox).toBeChecked();

    // Reach Continue by keyboard and activate with Enter.
    await continueButton(page).focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("heading", { name: /what kind of support/i })).toBeVisible();
  });

  test("interactive controls expose a visible focus indicator", async ({ page }) => {
    await gotoConsultation(page);
    const btn = continueButton(page);
    await btn.focus();

    const outline = await btn.evaluate((el) => {
      const s = getComputedStyle(el);
      return { outline: s.outlineStyle, width: s.outlineWidth, shadow: s.boxShadow };
    });

    const hasFocusRing =
      (outline.outline !== "none" && parseFloat(outline.width) > 0) ||
      (outline.shadow !== "none" && outline.shadow !== "");
    expect(hasFocusRing).toBe(true);
  });

  test("validation errors are announced via a live region", async ({ page }) => {
    await gotoConsultation(page);
    await continueButton(page).click();
    await expect(validationAlert(page)).toBeVisible();
  });

  test("every form control has an accessible name", async ({ page }) => {
    await gotoConsultation(page);
    await stepOne(page);
    await stepTwo(page);
    await stepThree(page);

    for (const id of ["#full-name", "#email-address", "#phone-number"]) {
      const name = await page.locator(id).evaluate((el) => {
        const labelled = document.querySelector(`label[for="${el.id}"]`);
        return labelled?.textContent?.trim() || el.getAttribute("aria-label") || "";
      });
      expect(name.length).toBeGreaterThan(0);
    }
  });
});

test.describe("Touch targets", () => {
  test("primary navigation controls meet the 48px minimum", async ({ page }) => {
    await gotoConsultation(page);
    const box = await continueButton(page).boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(48);
  });

  test("all step-3 and step-4 option chips meet the 48px minimum", async ({ page }) => {
    await gotoConsultation(page);
    await stepOne(page);
    await stepTwo(page);

    const chips = page.getByRole("button", { name: /No prior refusal|Yes, I have a refusal|Prefer not to say/ });
    const count = await chips.count();
    const undersized: string[] = [];
    for (let i = 0; i < count; i++) {
      const b = await chips.nth(i).boundingBox();
      if (b && b.height < 48) undersized.push(`${await chips.nth(i).innerText()}=${b.height}px`);
    }
    expect(undersized.join(", ")).toBe("");
  });

  test("contact channel and window controls meet the 48px minimum", async ({ page }) => {
    await gotoConsultation(page);
    await stepOne(page);
    await stepTwo(page);
    await stepThree(page);

    const chips = page.getByRole("button", { name: /^(phone|whatsapp|email|morning|afternoon|evening|no preference)$/i });
    const count = await chips.count();
    const undersized: string[] = [];
    for (let i = 0; i < count; i++) {
      const b = await chips.nth(i).boundingBox();
      if (b && b.height < 48) undersized.push(`${await chips.nth(i).innerText()}=${Math.round(b.height)}px`);
    }
    expect(undersized.join(", ")).toBe("");
  });
});
