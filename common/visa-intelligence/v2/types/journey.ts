import type { CountryCode } from "./core";

/**
 * The journey being planned and how the application will be lodged.
 *
 * Submission channel matters as much as destination: the same visa can have
 * different photo formats and biometric steps depending on whether it is filed
 * online, at a visa application centre, or by post.
 */
export type Journey = {
  destination: CountryCode;
  purpose: TravelPurpose;
  /** Where the application is physically or digitally lodged. */
  applicationLocation: ApplicationLocation;
  submissionChannel: SubmissionChannel;
  funding: FundingArrangement;
  accommodation: AccommodationArrangement;
  previousRefusal: PreviousRefusal;
};

export type TravelPurpose =
  | "tourism"
  | "business"
  | "study"
  | "work"
  | "family-visit"
  | "transit"
  | "medical";

export type ApplicationLocation = {
  /** Country the application is lodged in — often not the destination. */
  country: CountryCode;
  /** Named centre or post, where the distinction matters. */
  centre?: string;
};

export type SubmissionChannel =
  | "online-portal"
  | "visa-application-centre"
  | "embassy-or-consulate-in-person"
  | "postal"
  | "visa-on-arrival"
  | "electronic-travel-authorisation";

export type FundingArrangement =
  | { type: "self-funded" }
  | { type: "sponsored"; sponsor: SponsorRelationship }
  | { type: "employer-funded" }
  | { type: "scholarship-or-institution" }
  | { type: "mixed"; sponsor?: SponsorRelationship };

export type SponsorRelationship =
  | "parent"
  | "spouse"
  | "child"
  | "sibling"
  | "other-relative"
  | "employer"
  | "institution"
  | "other";

export type AccommodationArrangement =
  | "hotel-booking"
  | "staying-with-host"
  | "employer-provided"
  | "institution-provided"
  | "own-property"
  | "not-yet-arranged";

export type PreviousRefusal =
  | { hasRefusal: false }
  | {
      hasRefusal: true;
      /** Destination that refused, which may differ from this journey's. */
      refusedBy?: CountryCode;
      /** Whether the applicant holds the refusal letter — affects next steps. */
      hasRefusalDocumentation: boolean;
    };
