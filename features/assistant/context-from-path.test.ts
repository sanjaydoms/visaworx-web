import { describe, expect, it } from "vitest";
import { contextFromPath } from "./context-from-path";

describe("assistant context from route", () => {
  it("identifies the subject of a detail page", () => {
    expect(contextFromPath("/countries/canada")).toEqual({
      pageType: "country",
      countrySlug: "canada",
    });
    expect(contextFromPath("/services/refusal-review")).toEqual({
      pageType: "service",
      serviceSlug: "refusal-review",
    });
    expect(contextFromPath("/resources/guides/how-to-prepare-financial-evidence")).toEqual({
      pageType: "guide",
      guideSlug: "how-to-prepare-financial-evidence",
    });
  });

  it("identifies flows without a subject slug", () => {
    expect(contextFromPath("/readiness")).toEqual({ pageType: "readiness" });
    expect(contextFromPath("/readiness/result")).toEqual({ pageType: "readiness" });
    expect(contextFromPath("/consultation")).toEqual({ pageType: "consultation" });
    expect(contextFromPath("/")).toEqual({ pageType: "homepage" });
  });

  it("tolerates a trailing slash", () => {
    expect(contextFromPath("/countries/canada/")).toEqual({
      pageType: "country",
      countrySlug: "canada",
    });
  });

  // A listing page has no specific subject, so sending a pageType with nothing
  // attached would add noise to retrieval without adding signal.
  it("returns nothing for listing and index pages", () => {
    expect(contextFromPath("/countries")).toBeUndefined();
    expect(contextFromPath("/services")).toBeUndefined();
    expect(contextFromPath("/resources/guides")).toBeUndefined();
    expect(contextFromPath("/resources/faqs")).toBeUndefined();
    expect(contextFromPath("/resources")).toBeUndefined();
  });
});
