export type GuideCategory =
  | "Country Guides"
  | "Visa Preparation"
  | "Documentation"
  | "Interviews"
  | "Refusals"
  | "Business Travel"
  | "Student Travel"
  | "Family Travel"
  | "Official Updates";

export type ContentBlock =
  | {
      type: "heading";
      level: 2 | 3;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "callout";
      tone: "info" | "warning" | "expert";
      title: string;
      text: string;
    };

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  category: GuideCategory;
  readingTime: string;
  featured: boolean;
  content: ContentBlock[];
  relatedCountrySlugs: string[];
  relatedServiceSlugs: string[];
  faqIds: string[];
  officialReferences: Array<{
    label: string;
    url?: string;
  }>;
  lastReviewed?: string;
  authorLabel?: string;
  seo: {
    title: string;
    description: string;
  };
};

export const guidesData: Guide[] = [
  {
    slug: "how-to-choose-the-right-visa-category",
    title: "How to Choose the Right Visa Category for Your Travel",
    summary: "A practical guide to evaluating your primary travel purpose and selecting the appropriate visa subclass before beginning paperwork.",
    category: "Visa Preparation",
    readingTime: "5 min read",
    featured: true,
    content: [
      {
        type: "heading",
        level: 2,
        text: "Understanding Visa Category Alignment",
      },
      {
        type: "paragraph",
        text: "Applying under an incorrect visa category is a frequent cause of processing delays and consular refusal. Every visa subclass is designed around specific permissible activities.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Key Rule of Thumb",
        text: "Your visa category must reflect your primary objective. If travelling for meetings, select a Business Visitor category rather than a general Tourist visa.",
      },
      {
        type: "heading",
        level: 2,
        text: "Steps to Determine the Correct Pathway",
      },
      {
        type: "list",
        items: [
          "Define your primary activity (tourism, business meetings, formal education, or employment).",
          "Check whether the destination permits your intended activity under short-stay visitor rules.",
          "Verify whether your host organization or university requires specific endorsement codes (e.g. CAS for UK, I-20 for US).",
          "Ensure your supporting invitation letter matches the exact category selected.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Expert Insight",
        text: "If your itinerary combines tourism and business, disclose both but apply under the category governing your primary obligation or host invitation.",
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "schengen"],
    relatedServiceSlugs: ["visa-readiness-review", "tourist-visa"],
    faqIds: ["gen-1", "read-1"],
    officialReferences: [
      { label: "US Dept of State Visa Categories", url: "https://travel.state.gov/" },
      { label: "GOV.UK Standard Visitor Guidance", url: "https://www.gov.uk/standard-visitor" },
    ],
    lastReviewed: "2026-07-01",
    seo: {
      title: "How to Choose the Right Visa Category | Visaworx Intelligence",
      description: "Learn how to evaluate your primary travel purpose and select the correct visa category before preparing your application.",
    },
  },
  {
    slug: "visa-readiness-before-you-apply",
    title: "Understanding Visa Readiness Before You Submit",
    summary: "Learn how evaluating document completeness and home-country commitments reduces avoidable risks before lodging your application.",
    category: "Visa Preparation",
    readingTime: "6 min read",
    featured: true,
    content: [
      {
        type: "heading",
        level: 2,
        text: "What Is Visa Readiness?",
      },
      {
        type: "paragraph",
        text: "Visa readiness is an objective measure of how thoroughly your travel purpose, financial capacity, and home-country ties are documented prior to formal submission.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Four Pillars of Preparation",
      },
      {
        type: "list",
        items: [
          "Identity & Passport Readiness: Passport validity, blank pages, and civil status alignment.",
          "Purpose Evidence: Confirmed itineraries, admission letters, or host company invitations.",
          "Financial Sufficiency: Authentic bank statements showing consistent personal funds.",
          "Home-Country Ties: Employment contracts, business ownership, academic enrollment, or property proof.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Avoid Unnecessary Rushing",
        text: "Submitting an incomplete file to meet a tight travel date often leads to refusal. Ensure all 4 pillars are established first.",
      },
    ],
    relatedCountrySlugs: ["united-states", "canada", "australia"],
    relatedServiceSlugs: ["visa-readiness-review", "documentation-review"],
    faqIds: ["read-1", "doc-1"],
    officialReferences: [
      { label: "Australian Home Affairs Visa Guidance", url: "https://immi.homeaffairs.gov.au/" },
    ],
    lastReviewed: "2026-07-01",
    seo: {
      title: "Understanding Visa Readiness Before You Submit | Visaworx",
      description: "Explore the four pillars of visa readiness and learn how thorough preparation reduces submission risks.",
    },
  },
  {
    slug: "common-visa-application-mistakes",
    title: "10 Common Avoidable Visa Application Mistakes",
    summary: "An overview of frequent errors applicants make in forms, financial statements, and supporting documents.",
    category: "Documentation",
    readingTime: "7 min read",
    featured: true,
    content: [
      {
        type: "heading",
        level: 2,
        text: "Frequent Documentation Pitfalls",
      },
      {
        type: "paragraph",
        text: "Consular officers review thousands of files. Small discrepancies or unexplained financial entries frequently trigger scrutiny.",
      },
      {
        type: "list",
        items: [
          "Unexplained recent large cash deposits in personal bank accounts.",
          "Name or date of birth mismatches between passport and civil certificates.",
          "Discrepancies between leave sanction dates and flight itinerary.",
          "Failure to disclose previous international travel or prior visa refusals.",
          "Submitting unconfirmed or invalid accommodation bookings.",
          "Providing low-resolution or illegible document scans.",
        ],
      },
    ],
    relatedCountrySlugs: ["united-kingdom", "schengen", "japan"],
    relatedServiceSlugs: ["documentation-review", "refusal-review"],
    faqIds: ["doc-1", "ref-1"],
    officialReferences: [
      { label: "Schengen Visa Code (EU Commission)", url: "https://home-affairs.ec.europa.eu/" },
    ],
    lastReviewed: "2026-07-01",
    seo: {
      title: "Common Avoidable Visa Application Mistakes | Visaworx",
      description: "Discover 10 frequent documentation and form mistakes that trigger consular scrutiny and learn how to avoid them.",
    },
  },
  {
    slug: "how-to-prepare-financial-evidence",
    title: "How to Prepare Financial Evidence for a Visa Application",
    summary: "Guidelines for presenting authentic bank statements, tax records, and sponsorship evidence.",
    category: "Documentation",
    readingTime: "6 min read",
    featured: false,
    content: [
      {
        type: "heading",
        level: 2,
        text: "Demonstrating Genuine Financial Capacity",
      },
      {
        type: "paragraph",
        text: "Financial evidence proves that you can comfortably afford your travel, accommodation, and return journey without relying on illegal work or public funds abroad.",
      },
      {
        type: "heading",
        level: 2,
        text: "What Consulates Look For",
      },
      {
        type: "list",
        items: [
          "Consistent Income History: Salary credits or business revenue over 3 to 6 consecutive months.",
          "Authenticity: Bank statements issued directly by your financial institution with official stamps.",
          "Liquid Balance: Readily accessible funds rather than illiquid fixed assets.",
          "Source Verification: Explanations for any non-routine large deposits.",
        ],
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "canada", "schengen"],
    relatedServiceSlugs: ["documentation-review", "tourist-visa"],
    faqIds: ["doc-1"],
    officialReferences: [
      { label: "UKVI Financial Requirement Guidance", url: "https://www.gov.uk/" },
    ],
    lastReviewed: "2026-07-01",
    seo: {
      title: "How to Prepare Financial Evidence for Visas | Visaworx",
      description: "Learn how to present clear, authentic bank statements and financial proof for your visa application.",
    },
  },
  {
    slug: "how-to-prepare-employment-documents",
    title: "How to Prepare Employment & Ties Evidence",
    summary: "A breakdown of employer leave letters, business registration proof, and home-country commitment documentation.",
    category: "Documentation",
    readingTime: "5 min read",
    featured: false,
    content: [
      {
        type: "heading",
        level: 2,
        text: "Proving Strong Home-Country Ties",
      },
      {
        type: "paragraph",
        text: "Consular officers evaluate whether applicants have strong reasons to return to their home country after their temporary visit. Employment or business commitments form a core part of this proof.",
      },
      {
        type: "list",
        items: [
          "No Objection Certificate (NOC) / Leave Approval on official corporate letterhead.",
          "Recent payslips (3 to 6 months) matching bank statement salary credits.",
          "For business owners: Company registration certificate, GST/tax filings, and active business account statements.",
          "Academic enrollment proof for students.",
        ],
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "australia"],
    relatedServiceSlugs: ["documentation-review", "business-visa"],
    faqIds: ["doc-1"],
    officialReferences: [],
    lastReviewed: "2026-07-01",
    seo: {
      title: "How to Prepare Employment & Ties Evidence | Visaworx",
      description: "Understand how employer NOCs, payslips, and business proof demonstrate strong ties to your home country.",
    },
  },
  {
    slug: "how-to-prepare-student-visa-documents",
    title: "Essential Document Checklist for Student Visas",
    summary: "Step-by-step guidance on organizing academic transcripts, admission letters, SOPs, and financial funding files.",
    category: "Student Travel",
    readingTime: "6 min read",
    featured: false,
    content: [
      {
        type: "heading",
        level: 2,
        text: "Structuring a Student Visa File",
      },
      {
        type: "paragraph",
        text: "Student visas require demonstrating academic eligibility, genuine study intent, and clear financial support for tuition and living expenses.",
      },
      {
        type: "list",
        items: [
          "Official Acceptance Endorsement (Form I-20 for US, CAS for UK, COE for Australia).",
          "Attested academic transcripts, degree certificates, and English language test scorecards.",
          "Financial Funding Dossier: Education loan sanction, sponsor bank statements, and tax filings.",
          "Statement of Purpose (SOP) explaining chosen program and career goals.",
        ],
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "canada", "australia"],
    relatedServiceSlugs: ["student-visa", "interview-preparation"],
    faqIds: ["stu-1"],
    officialReferences: [
      { label: "US SEVP Student Guidance", url: "https://studyinthestates.dhs.gov/" },
    ],
    lastReviewed: "2026-07-01",
    seo: {
      title: "Essential Document Checklist for Student Visas | Visaworx",
      description: "Organize your academic acceptance, financial funding dossier, and Statement of Purpose for student visa applications.",
    },
  },
  {
    slug: "visa-interview-preparation-guide",
    title: "Consular Visa Interview Preparation Guide",
    summary: "How to articulate concise, truthful answers and build confidence for in-person consular interviews.",
    category: "Interviews",
    readingTime: "6 min read",
    featured: true,
    content: [
      {
        type: "heading",
        level: 2,
        text: "Understanding the Consular Interview",
      },
      {
        type: "paragraph",
        text: "Consular interviews (such as US B1/B2 or F-1 visa appointments) are concise evaluations designed to verify applicant intent, truthfulness, and ties.",
      },
      {
        type: "heading",
        level: 2,
        text: "Core Principles for Candidates",
      },
      {
        type: "list",
        items: [
          "Answer Concisely: Answer the exact question asked without reciting long memorized speeches.",
          "Absolute Truthfulness: Consular officers cross-check answers with your submitted application form.",
          "Know Your File: Be ready to explain your itinerary, funding source, and ties clearly.",
          "Maintain Calm Focus: Maintain polite eye contact and hand over documents only when requested.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Avoid Scripted Answers",
        text: "Never attempt to memorize generic interview scripts. Officers appreciate authentic, direct answers in your own words.",
      },
    ],
    relatedCountrySlugs: ["united-states"],
    relatedServiceSlugs: ["interview-preparation", "student-visa"],
    faqIds: ["int-1"],
    officialReferences: [
      { label: "US State Dept Consular Interview Info", url: "https://travel.state.gov/" },
    ],
    lastReviewed: "2026-07-01",
    seo: {
      title: "Consular Visa Interview Preparation Guide | Visaworx",
      description: "Learn how to communicate concisely, truthfully, and confidently during in-person visa interviews.",
    },
  },
  {
    slug: "understanding-visa-refusal-reasons",
    title: "Understanding Common Visa Refusal Reasons",
    summary: "An objective analysis of refusal letters, consular clauses, and underlying grounds such as 214(b).",
    category: "Refusals",
    readingTime: "5 min read",
    featured: false,
    content: [
      {
        type: "heading",
        level: 2,
        text: "Decoding Official Refusal Notices",
      },
      {
        type: "paragraph",
        text: "Receiving a visa refusal notice is disappointing, but understanding the specific clause cited is the essential first step toward evaluating re-application.",
      },
      {
        type: "list",
        items: [
          "US INA 214(b): Failure to demonstrate sufficient non-immigrant intent or home-country ties.",
          "Schengen Justification Clause: Purpose or conditions of intended stay not reliably established.",
          "Financial Insufficiency: Available funds failed to satisfy maintenance criteria.",
          "Inconsistent Information: Discrepancies between application forms and supporting documents.",
        ],
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "schengen"],
    relatedServiceSlugs: ["refusal-review", "visa-readiness-review"],
    faqIds: ["ref-1"],
    officialReferences: [],
    lastReviewed: "2026-07-01",
    seo: {
      title: "Understanding Common Visa Refusal Reasons | Visaworx",
      description: "Learn how to read official refusal notices, understand 214(b) clauses, and evaluate grounds objectively.",
    },
  },
  {
    slug: "when-to-consider-reapplying-after-refusal",
    title: "When to Consider Re-applying After a Visa Refusal",
    summary: "Why rushing to re-apply without changed circumstances fails, and how to evaluate appropriate timing.",
    category: "Refusals",
    readingTime: "5 min read",
    featured: false,
    content: [
      {
        type: "heading",
        level: 2,
        text: "The Importance of Changed Circumstances",
      },
      {
        type: "paragraph",
        text: "Re-applying immediately with the exact same application file and circumstances almost always leads to a second refusal. Consulates expect fresh evidence or changed circumstances.",
      },
      {
        type: "list",
        items: [
          "Assess Changed Circumstances: Has your employment, financial stability, or travel purpose evolved?",
          "Correct Document Gaps: Have you obtained the specific missing evidence that caused uncertainty?",
          "Seek Objective Human Review: Have an experienced consultant audit your previous file before lodging again.",
        ],
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "canada"],
    relatedServiceSlugs: ["refusal-review", "documentation-review"],
    faqIds: ["ref-1"],
    officialReferences: [],
    lastReviewed: "2026-07-01",
    seo: {
      title: "When to Consider Re-applying After a Refusal | Visaworx",
      description: "Evaluate when re-application is appropriate after a visa refusal and understand the necessity of changed circumstances.",
    },
  },
  {
    slug: "business-visa-document-preparation",
    title: "Corporate Guide to Business Visa Preparation",
    summary: "How corporate delegates and business travellers should align host invitation letters and company deputation proof.",
    category: "Business Travel",
    readingTime: "5 min read",
    featured: false,
    content: [
      {
        type: "heading",
        level: 2,
        text: "Aligning Corporate Letters",
      },
      {
        type: "paragraph",
        text: "Business visas require clear alignment between your employer's dispatch letter and the inviting overseas company's invitation.",
      },
      {
        type: "list",
        items: [
          "Invitation Letter: Must state host contact details, meeting purpose, duration, and financial responsibility.",
          "Employer Support Letter: Must confirm job title, salary, approved travel leave, and guarantee of return.",
          "Event Registration: Include trade show badges or conference ticket receipts when applicable.",
        ],
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "singapore", "japan"],
    relatedServiceSlugs: ["business-visa", "documentation-review"],
    faqIds: ["bus-1"],
    officialReferences: [],
    lastReviewed: "2026-07-01",
    seo: {
      title: "Corporate Guide to Business Visa Preparation | Visaworx",
      description: "Ensure business invitation letters, employer deputation letters, and event registrations align seamlessly.",
    },
  },
  {
    slug: "family-visit-visa-preparation",
    title: "Preparing Documents for Family Visit Visas",
    summary: "Guidelines on host residency proof, relationship evidence, and financial sponsorship for visiting relatives abroad.",
    category: "Family Travel",
    readingTime: "5 min read",
    featured: false,
    content: [
      {
        type: "heading",
        level: 2,
        text: "Documenting Family Visits",
      },
      {
        type: "paragraph",
        text: "Visiting family members abroad requires proving both your genuine relationship with the host and your own intent to return home.",
      },
      {
        type: "list",
        items: [
          "Host Document File: Passport scan, valid visa / residence permit copy, and utility bill / lease agreement.",
          "Relationship Proof: Government birth/marriage certificates establishing exact family relationship.",
          "Applicant Financial Capacity: Personal bank statements showing financial stability independently or alongside sponsor proof.",
        ],
      },
    ],
    relatedCountrySlugs: ["united-kingdom", "canada", "schengen", "united-states"],
    relatedServiceSlugs: ["family-dependent-visa", "tourist-visa"],
    faqIds: ["fam-1"],
    officialReferences: [],
    lastReviewed: "2026-07-01",
    seo: {
      title: "Preparing Documents for Family Visit Visas | Visaworx",
      description: "Learn how to gather relationship certificates, host residency proof, and financial evidence for family visit visas.",
    },
  },
  {
    slug: "how-to-check-current-official-visa-requirements",
    title: "How to Verify Current Official Visa Requirements",
    summary: "How to identify authentic government portals and avoid misinformation from unauthorized third-party blogs.",
    category: "Official Updates",
    readingTime: "4 min read",
    featured: true,
    content: [
      {
        type: "heading",
        level: 2,
        text: "Relying on Primary Official Sources",
      },
      {
        type: "paragraph",
        text: "Immigration policies, visa fees, and appointment procedures change frequently. Always confirm specific requirements directly on official government or embassy websites.",
      },
      {
        type: "list",
        items: [
          "Identify Official Domains: Look for official government TLDs such as .gov, .gov.uk, .gc.ca, or .gov.au.",
          "Check Consular Announcements: Review embassy news sections prior to submitting forms.",
          "Avoid Unverified Forums: Do not rely solely on forum posts or outdated blogs for fee rules or mandatory document lists.",
        ],
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "canada", "australia"],
    relatedServiceSlugs: ["visa-readiness-review"],
    faqIds: ["gen-1"],
    officialReferences: [
      { label: "US Embassy Portal", url: "https://usembassy.gov/" },
      { label: "GOV.UK Visas", url: "https://www.gov.uk/" },
    ],
    lastReviewed: "2026-07-01",
    seo: {
      title: "How to Verify Current Official Visa Requirements | Visaworx",
      description: "Learn how to locate official embassy portals and verify current visa rules from primary government sources.",
    },
  },
];
