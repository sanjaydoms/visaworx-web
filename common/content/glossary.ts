export type GlossaryTermItem = {
  term: string;
  definition: string;
  relatedGuideSlugs?: string[];
  relatedCountrySlugs?: string[];
  relatedServiceSlugs?: string[];
};

export const glossaryData: GlossaryTermItem[] = [
  {
    term: "Biometrics",
    definition: "Physical identification data, such as fingerprints and digital facial photos, collected at an authorized application center for identity verification.",
    relatedServiceSlugs: ["documentation-review"],
  },
  {
    term: "Consular Authority",
    definition: "The official government embassy, consulate, or high commission responsible for reviewing visa applications and making entry decisions under national immigration law.",
  },
  {
    term: "Dependent Visa",
    definition: "A visa category permitting immediate family members (spouse, minor children) to accompany or join a primary visa holder residing abroad.",
    relatedServiceSlugs: ["family-dependent-visa"],
    relatedGuideSlugs: ["family-visit-visa-preparation"],
  },
  {
    term: "Document Checklist",
    definition: "A structured inventory of required identity, financial, purpose, and employment documents specified for a given visa application.",
    relatedGuideSlugs: ["common-visa-application-mistakes"],
  },
  {
    term: "Financial Evidence",
    definition: "Official documentation, such as bank statements, income tax returns, or education loan sanctions, proving an applicant's ability to fund travel and living expenses.",
    relatedGuideSlugs: ["how-to-prepare-financial-evidence"],
  },
  {
    term: "Invitation Letter",
    definition: "A formal document issued by an overseas host (company, university, or resident family member) explaining the purpose and duration of an applicant's visit.",
    relatedGuideSlugs: ["business-visa-document-preparation", "family-visit-visa-preparation"],
  },
  {
    term: "Proof of Purpose",
    definition: "Supporting evidence (flight reservations, hotel bookings, conference badges, admission letters) establishing the exact activity intended during travel.",
    relatedGuideSlugs: ["how-to-choose-the-right-visa-category"],
  },
  {
    term: "Refusal Letter",
    definition: "An official written notification issued by a consulate explaining the legal clause and administrative grounds under which a visa application was refused.",
    relatedGuideSlugs: ["understanding-visa-refusal-reasons", "when-to-consider-reapplying-after-refusal"],
    relatedServiceSlugs: ["refusal-review"],
  },
  {
    term: "Sponsorship",
    definition: "A formal financial or host commitment provided by an employer, university, host relative, or government body covering trip expenses or maintenance.",
  },
  {
    term: "Supporting Documents",
    definition: "Secondary evidence provided alongside primary application forms to demonstrate financial capacity, employment status, civil ties, and travel plans.",
  },
  {
    term: "Travel History",
    definition: "An applicant's record of previous international travel, past visa grants, and timely compliance with immigration entry/exit conditions.",
  },
  {
    term: "Visa Category",
    definition: "The specific classification or subclass under immigration regulations defining permissible travel activities (e.g., Tourist, Business, Student).",
    relatedGuideSlugs: ["how-to-choose-the-right-visa-category"],
  },
  {
    term: "Visa Interview",
    definition: "An in-person or virtual interview conducted by a consular officer to verify applicant intent, truthfulness, and eligibility.",
    relatedGuideSlugs: ["visa-interview-preparation-guide"],
    relatedServiceSlugs: ["interview-preparation"],
  },
  {
    term: "Visa Readiness",
    definition: "An objective evaluation of an applicant's document completeness, financial proof, and home-country commitments prior to lodging a visa file.",
    relatedGuideSlugs: ["visa-readiness-before-you-apply"],
    relatedServiceSlugs: ["visa-readiness-review"],
  },
];
