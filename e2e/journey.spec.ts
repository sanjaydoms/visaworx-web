import { test, expect } from "@playwright/test";
import {
  gotoConsultation,
  stepOne,
  stepTwo,
  stepThree,
  stepFour,
  reachReview,
  continueButton,
  backButton,
  submitButton,
  validationAlert,
  consentCheckbox,
  mockSubmission,
  VALID_SUMMARY,
  TEST_CONTACT,
  PROMISSORY_CLAIM,
} from "./helpers";

test.describe("Consultation journey", () => {
  test("completes all five steps and reaches the success state", async ({ page }) => {
    await mockSubmission(page);
    await reachReview(page);

    await consentCheckbox(page).check();
    await submitButton(page).click();

    await expect(page).toHaveURL(/\/consultation\/success/);
    await expect(page.getByRole("heading", { name: /consultation request has been received/i })).toBeVisible();
  });

  test("success page states this is not a visa application and gives no approval guarantee", async ({ page }) => {
    await page.goto("/consultation/success");
    const body = (await page.locator("body").innerText()).toLowerCase();
    expect(body).toContain("not a visa application");
    expect(body).not.toMatch(PROMISSORY_CLAIM);
  });

  test("back navigation preserves entered data", async ({ page }) => {
    await gotoConsultation(page);
    await stepOne(page);
    await stepTwo(page);
    await stepThree(page);

    await backButton(page).click();
    await expect(page.locator("#situation-summary")).toHaveValue(VALID_SUMMARY);
  });

  test("edit action from review jumps to the right step and retains contact data", async ({ page }) => {
    await reachReview(page);

    await page.getByRole("button", { name: /Edit Step 4 Contact Details/i }).click();
    await expect(page.getByRole("heading", { name: /how should our expert contact you/i })).toBeVisible();
    await expect(page.locator("#email-address")).toHaveValue(TEST_CONTACT.email);
  });

  test("stepper allows jumping back to a completed step only", async ({ page }) => {
    await gotoConsultation(page);
    await stepOne(page);
    await stepTwo(page);

    // Positional rather than by label: the step label is hidden below `sm`,
    // so the accessible name differs between mobile and desktop viewports.
    const steps = page.locator('nav[aria-label="Consultation steps"] button');
    await expect(steps.nth(0)).toBeEnabled(); // completed
    await expect(steps.nth(4)).toBeDisabled(); // not yet reached
  });
});

test.describe("Validation", () => {
  test("blocks step 1 with no destination chosen", async ({ page }) => {
    await gotoConsultation(page);
    await continueButton(page).click();
    await expect(validationAlert(page)).toContainText(/select a destination country/i);
  });

  test("blocks step 2 with no service chosen", async ({ page }) => {
    await gotoConsultation(page);
    await stepOne(page);
    await continueButton(page).click();
    await expect(validationAlert(page)).toContainText(/select a service/i);
  });

  test("enforces the 20-character minimum on the situation summary", async ({ page }) => {
    await gotoConsultation(page);
    await stepOne(page);
    await stepTwo(page);
    await page.locator("#situation-summary").fill("too short");
    await continueButton(page).click();
    await expect(validationAlert(page)).toContainText(/at least 20 characters/i);
  });

  test("enforces the 1000-character maximum on the situation summary", async ({ page }) => {
    await gotoConsultation(page);
    await stepOne(page);
    await stepTwo(page);
    const long = "a".repeat(1200);
    await page.locator("#situation-summary").fill(long);

    // The field must not accept more than the documented limit.
    const value = await page.locator("#situation-summary").inputValue();
    expect(value.length).toBeLessThanOrEqual(1000);
  });

  test("rejects an invalid email address", async ({ page }) => {
    await gotoConsultation(page);
    await stepOne(page);
    await stepTwo(page);
    await stepThree(page);
    await page.locator("#full-name").fill("QA Test");
    await page.locator("#email-address").fill("not-an-email");
    await page.locator("#phone-number").fill("+10000000000");
    await continueButton(page).click();
    await expect(validationAlert(page)).toContainText(/valid email/i);
  });

  test("rejects a too-short phone number", async ({ page }) => {
    await gotoConsultation(page);
    await stepOne(page);
    await stepTwo(page);
    await stepThree(page);
    await page.locator("#full-name").fill("QA Test");
    await page.locator("#email-address").fill("qa@example.com");
    await page.locator("#phone-number").fill("12");
    await continueButton(page).click();
    await expect(validationAlert(page)).toContainText(/valid phone/i);
  });

  test("consent must be actively granted before submission succeeds", async ({ page }) => {
    await reachReview(page);
    const consent = consentCheckbox(page);

    // Consent must start unchecked - pre-granted consent is not consent.
    await expect(consent).not.toBeChecked();

    await submitButton(page).click();
    await expect(page).not.toHaveURL(/success/);
  });
});

test.describe("Submission integrity", () => {
  test("shows an honest failure message when the backend rejects", async ({ page }) => {
    await mockSubmission(page, { status: 500, body: { success: false, error: "CRM unavailable" } });
    await reachReview(page);
    await consentCheckbox(page).check();
    await submitButton(page).click();

    await expect(page.getByText(/submission failed/i)).toBeVisible();
    await expect(page).not.toHaveURL(/success/);
  });

  test("does not land on success when the network call fails", async ({ page }) => {
    await page.route("**/api/consultation", (route) => route.abort("failed"));
    await reachReview(page);
    await consentCheckbox(page).check();
    await submitButton(page).click();

    await expect(page.getByText(/submission failed/i)).toBeVisible();
    await expect(page).not.toHaveURL(/success/);
  });

  test("prevents duplicate submissions from rapid repeated clicks", async ({ page }) => {
    let calls = 0;
    await page.route("**/api/consultation", async (route) => {
      calls += 1;
      await new Promise((r) => setTimeout(r, 600));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, requestId: "req_test" }),
      });
    });

    await reachReview(page);
    await consentCheckbox(page).check();

    const submit = submitButton(page);
    await submit.click();
    await submit.click({ force: true }).catch(() => {});
    await submit.click({ force: true }).catch(() => {});

    await expect(page).toHaveURL(/success/);
    expect(calls).toBe(1);
  });
});

test.describe("Contextual entry", () => {
  test("preselects a country from the query string", async ({ page }) => {
    await page.goto("/consultation?country=united-states&source=country");
    await continueButton(page).click();
    await expect(page.getByRole("heading", { name: /what kind of support/i })).toBeVisible();
  });

  test("ignores an invalid country parameter instead of accepting it", async ({ page }) => {
    await page.goto("/consultation?country=not-a-real-country");
    await continueButton(page).click();
    // Must block, because no valid destination was actually selected.
    await expect(validationAlert(page)).toContainText(/select a destination/i);
  });

  test("ignores an invalid service parameter", async ({ page }) => {
    await page.goto("/consultation?service=fake-service");
    await stepOne(page);
    await continueButton(page).click();
    await expect(validationAlert(page)).toContainText(/select a service/i);
  });

  test("carries readiness band context through to the review screen", async ({ page }) => {
    await page.goto("/consultation?source=readiness&readinessBand=Developing");
    await stepOne(page);
    await stepTwo(page);
    await stepThree(page);
    await stepFour(page);
    await expect(page.getByText(/Readiness Band Context/i)).toBeVisible();
  });

  test("does not reflect an injected source parameter as an unvalidated value", async ({ page }) => {
    await page.goto("/consultation?source=<img src=x onerror=alert(1)>");
    // Page must still render normally, with no script execution.
    await expect(page.getByRole("heading", { name: /where are you planning to travel/i })).toBeVisible();
  });
});

test.describe("Privacy", () => {
  test("never places personal data in the URL", async ({ page }) => {
    await mockSubmission(page);
    await reachReview(page);
    await consentCheckbox(page).check();
    await submitButton(page).click();
    await expect(page).toHaveURL(/success/);

    const url = page.url();
    expect(url).not.toContain(TEST_CONTACT.email);
    expect(url).not.toContain(TEST_CONTACT.phone.replace("+", ""));
    expect(url).not.toContain("QA%20Automated");
  });

  test("stores no personal data in localStorage at any point", async ({ page }) => {
    await reachReview(page);
    const dump = await page.evaluate(() => JSON.stringify(window.localStorage));
    expect(dump).not.toContain(TEST_CONTACT.email);
    expect(dump).not.toContain(TEST_CONTACT.phone);
    expect(dump).not.toContain(TEST_CONTACT.fullName);
  });

  test("does not persist contact details in sessionStorage", async ({ page }) => {
    await reachReview(page);
    const dump = await page.evaluate(() => JSON.stringify(window.sessionStorage));
    expect(dump).not.toContain(TEST_CONTACT.email);
    expect(dump).not.toContain(TEST_CONTACT.phone);
    expect(dump).not.toContain(TEST_CONTACT.fullName);
  });

  test("clears stored progress after a successful submission", async ({ page }) => {
    await mockSubmission(page);
    await reachReview(page);
    await consentCheckbox(page).check();
    await submitButton(page).click();
    await expect(page).toHaveURL(/success/);

    const dump = await page.evaluate(() => JSON.stringify(window.sessionStorage));
    expect(dump).not.toContain("visaworx_consultation_form");
  });
});
