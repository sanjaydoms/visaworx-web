import { expect, type Page } from "@playwright/test";

export const CONSULTATION_PATH = "/visaworx/consultation";

/**
 * Promissory approval claims. Deliberately narrow: the flow legitimately says
 * "does not guarantee ... visa approval", so only affirmative promises count.
 */
export const PROMISSORY_CLAIM =
  /(we|visaworx|klar)\s+guarantee|guaranteed\s+(visa\s+)?approval|approval\s+guaranteed|100%\s+(success|approval)|assured\s+visa/;

/** Marked so any lead that reaches a real destination is obviously a test record. */
export const TEST_CONTACT = {
  fullName: "QA Automated Test",
  email: "qa-automation@example.com",
  phone: "+10000000000",
};

export const VALID_SUMMARY =
  "AUTOMATED QA TEST SUBMISSION - PLEASE IGNORE. Auditing the consultation submission path end to end.";

export async function gotoConsultation(page: Page, query = "") {
  await page.goto(`${CONSULTATION_PATH}${query}`);
  await expect(page.getByRole("heading", { name: /where are you planning to travel/i })).toBeVisible();
}

/**
 * The form's own validation alert. Scoped away from Next's route announcer,
 * which also carries role="alert" but is always empty.
 */
export function validationAlert(page: Page) {
  return page.locator('[role="alert"]:not(#__next-route-announcer__)');
}

export function continueButton(page: Page) {
  return page.getByRole("button", { name: /^Continue$/ });
}

export function backButton(page: Page) {
  return page.getByRole("button", { name: /^Back$/ });
}

export function submitButton(page: Page) {
  return page.getByRole("button", { name: /Request Consultation|Submitting/ });
}

export async function stepOne(page: Page, country?: string) {
  if (country) {
    await page.getByRole("button", { name: new RegExp(country, "i") }).first().click();
  } else {
    await page.getByRole("checkbox").first().check();
  }
  await continueButton(page).click();
}

export async function stepTwo(page: Page, service?: string) {
  await expect(page.getByRole("heading", { name: /what kind of support/i })).toBeVisible();
  if (service) {
    await page.getByRole("button", { name: new RegExp(service, "i") }).first().click();
  } else {
    await page.getByRole("checkbox").first().check();
  }
  await continueButton(page).click();
}

export async function stepThree(page: Page, summary = VALID_SUMMARY) {
  await expect(page.getByRole("heading", { name: /tell us briefly about your situation/i })).toBeVisible();
  await page.locator("#situation-summary").fill(summary);
  await continueButton(page).click();
}

export async function stepFour(page: Page, contact = TEST_CONTACT) {
  await expect(page.getByRole("heading", { name: /how should our expert contact you/i })).toBeVisible();
  await page.locator("#full-name").fill(contact.fullName);
  await page.locator("#email-address").fill(contact.email);
  await page.locator("#phone-number").fill(contact.phone);
  await continueButton(page).click();
}

export async function reachReview(page: Page) {
  await gotoConsultation(page);
  await stepOne(page);
  await stepTwo(page);
  await stepThree(page);
  await stepFour(page);
  await expect(page.getByRole("heading", { name: /review your consultation request/i })).toBeVisible();
}

/** The single consent checkbox on the review step. */
export function consentCheckbox(page: Page) {
  return page.getByRole("checkbox").last();
}

/** Intercept the submission API so tests never depend on a live backend. */
export async function mockSubmission(
  page: Page,
  result: { status: number; body: unknown } = {
    status: 200,
    body: { success: true, requestId: "req_test" },
  }
) {
  await page.route("**/api/consultation", async (route) => {
    await route.fulfill({
      status: result.status,
      contentType: "application/json",
      body: JSON.stringify(result.body),
    });
  });
}
