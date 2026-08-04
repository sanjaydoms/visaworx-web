import { describe, expect, it } from "vitest";
import { contextFromPath } from "./context-from-path";

describe("assistant context from route", () => {
  it("identifies the subject of a detail page", () => {
    expect(contextFromPath("/visaworx/countries/canada")).toEqual({
      pageType: "country",
      countrySlug: "canada",
    });
    expect(contextFromPath("/visaworx/services/refusal-review")).toEqual({
      pageType: "service",
      serviceSlug: "refusal-review",
    });
    expect(contextFromPath("/visaworx/resources/guides/how-to-prepare-financial-evidence")).toEqual({
      pageType: "guide",
      guideSlug: "how-to-prepare-financial-evidence",
    });
  });

  it("identifies flows without a subject slug", () => {
    expect(contextFromPath("/visaworx/readiness")).toEqual({ pageType: "readiness" });
    expect(contextFromPath("/visaworx/readiness/result")).toEqual({ pageType: "readiness" });
    expect(contextFromPath("/visaworx/consultation")).toEqual({ pageType: "consultation" });
    expect(contextFromPath("/visaworx")).toEqual({ pageType: "homepage" });
  });

  it("tolerates a trailing slash", () => {
    expect(contextFromPath("/visaworx/countries/canada/")).toEqual({
      pageType: "country",
      countrySlug: "canada",
    });
  });

  // A listing page has no specific subject, so sending a pageType with nothing
  // attached would add noise to retrieval without adding signal.
  it("returns nothing for listing and index pages", () => {
    expect(contextFromPath("/visaworx/countries")).toBeUndefined();
    expect(contextFromPath("/visaworx/services")).toBeUndefined();
    expect(contextFromPath("/visaworx/resources/guides")).toBeUndefined();
    expect(contextFromPath("/visaworx/resources/faqs")).toBeUndefined();
    expect(contextFromPath("/")).toBeUndefined();
  });
});
