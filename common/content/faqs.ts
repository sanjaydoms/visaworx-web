export type FAQCategory =
  | "General"
  | "Tourist"
  | "Business"
  | "Student"
  | "Work"
  | "Family"
  | "Documentation"
  | "Interviews"
  | "Refusals"
  | "Readiness";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  relatedCountrySlugs?: string[];
  relatedServiceSlugs?: string[];
  relatedGuideSlugs?: string[];
};

export const faqsData: FAQItem[] = [
  {
    id: "gen-1",
    question: "Does Visaworx guarantee visa approval or embassy decision timelines?",
    answer: "No. Visa decisions and processing times are controlled solely by government and consular authorities. Visaworx provides information, document review, and preparation guidance.",
    category: "General",
    relatedGuideSlugs: ["how-to-check-current-official-visa-requirements"],
  },
  {
    id: "gen-2",
    question: "How is Visaworx different from a typical visa processing agency?",
    answer: "Visaworx focuses on visa intelligence and preparation before application. We evaluate readiness, identify document gaps, and provide access to human experts rather than functioning as a high-volume filing proxy.",
    category: "General",
  },
  {
    id: "tour-1",
    question: "How many months of bank statements are required for a tourist visa?",
    answer: "Most consulates require 3 to 6 consecutive months of personal bank statements showing regular income credits and genuine personal savings sufficient for your intended stay.",
    category: "Tourist",
    relatedServiceSlugs: ["tourist-visa"],
    relatedGuideSlugs: ["how-to-prepare-financial-evidence"],
  },
  {
    id: "bus-1",
    question: "Can I perform paid work for a local employer on a Business Visitor visa?",
    answer: "No. Business visitor visas strictly prohibit gainful local employment. They are limited to non-paid professional activities such as attending meetings, trade shows, or contract negotiations.",
    category: "Business",
    relatedServiceSlugs: ["business-visa"],
    relatedGuideSlugs: ["business-visa-document-preparation"],
  },
  {
    id: "stu-1",
    question: "What financial proof is accepted for student visa applications?",
    answer: "Consulates generally accept liquid bank balances, official education loan sanction letters, government or university scholarships, and fixed deposits owned by immediate family sponsors.",
    category: "Student",
    relatedServiceSlugs: ["student-visa"],
    relatedGuideSlugs: ["how-to-prepare-student-visa-documents"],
  },
  {
    id: "work-1",
    question: "Does Visaworx offer job recruitment or work permit sponsorship services?",
    answer: "No. Visaworx does not recruit or provide job placement. We assist professionals holding valid job offers in compiling and verifying employer-backed visa documents.",
    category: "Work",
    relatedServiceSlugs: ["work-visa"],
  },
  {
    id: "fam-1",
    question: "Do relationship certificates require official translations?",
    answer: "Yes. Civil certificates (marriage, birth) issued in regional languages generally require certified English translations that conform to consular submission standards.",
    category: "Family",
    relatedServiceSlugs: ["family-dependent-visa"],
    relatedGuideSlugs: ["family-visit-visa-preparation"],
  },
  {
    id: "doc-1",
    question: "What happens if there is a name mismatch between my passport and supporting documents?",
    answer: "Name mismatches frequently trigger consular queries. You should obtain an official name correction, submit an official affidavit, or ensure official gazette notifications are attached.",
    category: "Documentation",
    relatedServiceSlugs: ["documentation-review"],
    relatedGuideSlugs: ["common-visa-application-mistakes"],
  },
  {
    id: "int-1",
    question: "How should I answer questions during a US visa consular interview?",
    answer: "Answer questions concisely, directly, and truthfully in your own words. Never recite memorized scripts or volunteer unsolicited information.",
    category: "Interviews",
    relatedServiceSlugs: ["interview-preparation"],
    relatedGuideSlugs: ["visa-interview-preparation-guide"],
  },
  {
    id: "ref-1",
    question: "Should I re-apply immediately after a visa refusal?",
    answer: "Rushing to re-apply without changed circumstances or missing evidence usually results in a second refusal. Evaluate refusal grounds objectively and address document gaps first.",
    category: "Refusals",
    relatedServiceSlugs: ["refusal-review"],
    relatedGuideSlugs: ["understanding-visa-refusal-reasons", "when-to-consider-reapplying-after-refusal"],
  },
  {
    id: "read-1",
    question: "Does a 'Good Foundation' readiness result mean my visa is guaranteed?",
    answer: "No. 'Good Foundation' indicates that your document assembly aligns well with typical requirements. Final decisions rest solely with government consular officers.",
    category: "Readiness",
    relatedServiceSlugs: ["visa-readiness-review"],
    relatedGuideSlugs: ["visa-readiness-before-you-apply"],
  },
  {
    id: "schengen-in-1",
    question: "What documents are required for a Schengen visa from India?",
    answer: "Consulates in India generally ask for a passport issued within the last ten years with at least two blank pages, a completed application form, travel medical insurance covering all Schengen states, proof of accommodation and travel, and financial evidence such as stamped bank statements, payslips and income tax records. The exact list is published by the consulate deciding your application, so check that mission's own checklist.",
    category: "Documentation",
    relatedCountrySlugs: ["schengen"],
    relatedServiceSlugs: ["documentation-review", "tourist-visa"],
    relatedGuideSlugs: ["schengen-visa-from-india"],
  },
  {
    id: "schengen-in-2",
    question: "How long does a Schengen visa take to process?",
    answer: "Under the EU Visa Code an application should be decided within 15 calendar days of being lodged. That period can be extended to 45 days where a case needs closer examination or further documents. The clock starts when the application is lodged, not when you book the appointment, so appointment waiting time sits on top of it.",
    category: "Tourist",
    relatedCountrySlugs: ["schengen"],
    relatedGuideSlugs: ["schengen-visa-from-india"],
  },
  {
    id: "schengen-in-3",
    question: "How early can I apply for a Schengen visa?",
    answer: "You may lodge a short-stay application up to six months before your intended travel date. Consulates advise applying no later than 15 calendar days before departure. Applying early is usually the single cheapest way to protect a trip, because it leaves room for an extended examination without threatening your travel dates.",
    category: "Tourist",
    relatedCountrySlugs: ["schengen"],
    relatedGuideSlugs: ["schengen-visa-from-india"],
  },
  {
    id: "schengen-in-4",
    question: "Do Indian passport holders need ETIAS?",
    answer: "No. ETIAS is a travel authorisation for nationals who can enter the Schengen Area without a visa. Indian passport holders require a Schengen visa, so ETIAS does not apply to them. ETIAS is also not yet in operation. If you hold a valid Schengen visa, that visa is your authorisation to travel.",
    category: "General",
    relatedCountrySlugs: ["schengen"],
    relatedGuideSlugs: ["schengen-visa-from-india"],
  },
  {
    id: "schengen-in-5",
    question: "Which Schengen country should I apply to for a multi-country trip?",
    answer: "Apply to the country that is your main destination, judged by the length and purpose of your stay. Where you are spending equal time in more than one country, apply to the country you will enter first. This is a rule, not a preference, and applying to the wrong consulate is a common cause of delay.",
    category: "Tourist",
    relatedCountrySlugs: ["schengen"],
    relatedServiceSlugs: ["tourist-visa"],
    relatedGuideSlugs: ["schengen-visa-from-india"],
  },
  {
    id: "schengen-in-6",
    question: "How much travel insurance do I need for a Schengen visa?",
    answer: "Travel medical insurance must cover a minimum of EUR 30,000 in medical expenses, be valid in every Schengen state, and cover the full duration of your stay. Cover that stops before your return date, or that names only one country, is a frequent reason for a file being treated as incomplete.",
    category: "Documentation",
    relatedCountrySlugs: ["schengen"],
    relatedServiceSlugs: ["documentation-review"],
    relatedGuideSlugs: ["schengen-visa-from-india"],
  },
];
