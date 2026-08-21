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
  {
    slug: "schengen-visa-from-india",
    title: "Schengen Visa from India: Requirements, Timelines and What Changed in 2026",
    summary: "A preparation guide for Indian passport holders applying for a Schengen short-stay visa, covering which consulate decides your application, what the documents are meant to prove, and the border changes that took effect in 2026.",
    category: "Country Guides",
    readingTime: "9 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Meera had the whole trip mapped out before she thought about the visa. Three nights in Amsterdam, seven in Italy, two in Paris to finish. Flights held, hotels reserved, leave approved. When she finally sat down to apply, she went looking for the French consulate, because Paris was the part of the trip she had been picturing for two years. That was the first thing she got wrong, and it would have cost her the trip.",
      },
      {
        type: "paragraph",
        text: "Meera is an illustration rather than a real applicant, but her mistake is one of the most common in Schengen applications from India. The Schengen visa is often described as a single document that opens twenty-nine countries, which is true once it is issued and misleading while you are applying. Almost everything that goes wrong at the preparation stage comes from treating the application as a form to fill rather than a case to evidence.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick answer",
        text: "Indian passport holders need a Schengen short-stay visa (Type C) for trips of up to 90 days in any 180-day period. The application goes to the consulate of your main destination, may be lodged up to six months before travel, and should normally be decided within 15 calendar days. The consular fee is EUR 90 for adults. ETIAS does not apply to travellers who need a visa.",
      },
      {
        type: "heading",
        level: 2,
        text: "What a Schengen Visa Actually Covers",
      },
      {
        type: "paragraph",
        text: "A Schengen short-stay visa lets you spend up to 90 days in any 180-day period inside the Schengen Area. It is a visit permission, not a residence or work permission, and the 90 days are counted across the whole area rather than per country.",
      },
      {
        type: "paragraph",
        text: "The rules are set out in the EU Visa Code, Regulation 810/2009, which every Schengen consulate applies. That shared legal basis is why the fee and the decision deadlines are the same whether you apply to Germany, Italy or Spain, and it is also why the differences that do exist between consulates catch people out. The law is common. The document checklists are local.",
      },
      {
        type: "heading",
        level: 2,
        text: "Which Consulate Decides Your Application",
      },
      {
        type: "paragraph",
        text: "You apply to the country that is your main destination. This is a rule, not a preference, and you do not get to choose the consulate whose appointments are easiest to find.",
      },
      {
        type: "paragraph",
        text: "Consulates work through the question in a fixed order:",
      },
      {
        type: "list",
        items: [
          "If you are visiting only one Schengen country, that country decides your application.",
          "If you are visiting several, the main destination is the one where you will spend the longest, judged together with the purpose of the visit.",
          "If you are splitting your time equally with no single main destination, you apply to the country you will enter first.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Where Meera went wrong",
        text: "Seven of her twelve nights were in Italy, so Italy was her main destination. Not France, where she most wanted to go, and not the Netherlands, where she happened to land first. Applying to the wrong consulate does not usually produce a quiet correction. It produces a returned application and a lost appointment slot.",
      },
      {
        type: "heading",
        level: 2,
        text: "Do Indian Travellers Need ETIAS?",
      },
      {
        type: "paragraph",
        text: "No. ETIAS is a travel authorisation for nationals who may enter the Schengen Area without a visa. Indian passport holders need a visa, so ETIAS does not apply to them, and it is not yet in operation for anyone.",
      },
      {
        type: "paragraph",
        text: "This is worth stating plainly because the 2026 coverage of ETIAS has been heavy, and a great deal of it does not make the distinction clear. If you hold a valid Schengen visa, that visa is your authorisation to travel. There is no second online authorisation for you to buy, and any service offering to sell you one is not describing a requirement that exists.",
      },
      {
        type: "heading",
        level: 2,
        text: "What Changed at the European Border in 2026",
      },
      {
        type: "paragraph",
        text: "The change that does affect Indian travellers is the Entry/Exit System. The EES began operating progressively on 12 October 2025 and reached full operation on 10 April 2026, replacing the physical passport stamp for non-EU nationals making short stays.",
      },
      {
        type: "paragraph",
        text: "In practice this means your entries and exits are now recorded biometrically rather than inked into your passport:",
      },
      {
        type: "list",
        items: [
          "Your fingerprints and facial image are registered at your first entry after the system took effect.",
          "Entry and exit dates and locations are held electronically, along with any refusal of entry.",
          "Your 90-day allowance is calculated from that record, so overstays are detected automatically rather than by an officer reading stamps.",
          "Your first crossing after the change may take longer than you are used to while the record is created.",
        ],
      },
      {
        type: "paragraph",
        text: "None of this changes what you submit with your application. It changes what happens at the border, and it makes the 90 in 90/180 a good deal less forgiving than it used to be.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Documents Indian Applicants Are Asked For",
      },
      {
        type: "paragraph",
        text: "The list below reflects what German missions in India publish for tourism applications. It is representative rather than universal, and this distinction matters more than it sounds. Every consulate publishes its own checklist under the same law, and the one that governs your application is the one belonging to the consulate deciding it. Read that checklist. Treat the list below as an understanding of what each document is for.",
      },
      {
        type: "heading",
        level: 3,
        text: "Passport and application form",
      },
      {
        type: "list",
        items: [
          "A passport issued within the last ten years, with at least two blank pages for the visa.",
          "Validity extending at least three months beyond your scheduled return from the Schengen Area.",
          "A completed and signed application form, with copies of the biometric and address pages.",
          "Biometrics given in person. Fingerprints from a previous Schengen application can generally be reused for up to five years.",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Travel medical insurance",
      },
      {
        type: "paragraph",
        text: "Cover must be at least EUR 30,000 for medical expenses, valid in every Schengen state, and must run for the entire duration of the trip. Policies that expire on the return flight date rather than after it, or that name a single country, are a recurring reason for a file being treated as incomplete.",
      },
      {
        type: "heading",
        level: 3,
        text: "Financial and employment evidence",
      },
      {
        type: "paragraph",
        text: "What you provide depends on how you earn, and the point is always the same: show that the trip is affordable from an income you can explain.",
      },
      {
        type: "list",
        items: [
          "Salaried applicants: payslips for the last three months, employment contract, leave sanction letter, stamped bank statements for the last three months, and income tax records such as ITR acknowledgements or Form 16.",
          "Self-employed and business owners: company registration with GST details, income tax acknowledgements, and stamped bank statements.",
          "Retired applicants: pension statements alongside bank statements.",
          "Students: enrolment certificate and a no-objection letter from the institution.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "There is no official minimum balance",
        text: "No Schengen-wide minimum bank balance exists, and any figure presented as the official threshold is invented. What a consular officer assesses is whether your funds are consistent with the trip you have described and whether their origin is explainable. A large deposit that appears a week before you apply raises the question it was meant to answer.",
      },
      {
        type: "heading",
        level: 3,
        text: "Accommodation and travel",
      },
      {
        type: "list",
        items: [
          "Hotel reservations, a rental agreement, or proof of private accommodation with the host's confirmation and identity documents.",
          "Flight reservation and a detailed day-by-day itinerary.",
          "Accommodation and travel dates that agree with each other and with the dates on your form.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "How Long It Takes and When to Apply",
      },
      {
        type: "paragraph",
        text: "An application should be decided within 15 calendar days of being lodged. That can extend to 45 days where a case needs closer examination or further documents are requested.",
      },
      {
        type: "paragraph",
        text: "The part that surprises people is where the clock starts. It runs from the day the application is lodged, not the day you begin looking for an appointment, so appointment availability sits on top of the decision period rather than inside it. The practical timeline looks like this:",
      },
      {
        type: "list",
        items: [
          "You may lodge an application up to six months before your intended travel date.",
          "Consulates advise lodging no later than 15 calendar days before departure.",
          "An application received inside that final window may be returned unprocessed.",
          "Applying early is the cheapest protection available to you, because it leaves room for an extended examination without threatening your dates.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "What It Costs",
      },
      {
        type: "paragraph",
        text: "The consular fee is set by the Visa Code and is the same across the Schengen Area:",
      },
      {
        type: "list",
        items: [
          "EUR 90 for adult applicants.",
          "EUR 45 for children aged six and above but under twelve.",
          "Visa application centres charge their own service fee in addition to the consular fee, and payment methods differ between missions in India.",
        ],
      },
      {
        type: "paragraph",
        text: "The consular fee is generally not refunded if an application is refused, which is a reason to submit when the file is complete rather than when the appointment happens to be available.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where Applications Usually Weaken",
      },
      {
        type: "paragraph",
        text: "Most files are not refused because a document is missing. They weaken because the documents disagree with each other. A consular officer is reading for a coherent account of one trip, and inconsistency reads as either carelessness or concealment.",
      },
      {
        type: "list",
        items: [
          "Applying to the wrong consulate because a destination felt more important than the nights actually booked there.",
          "Insurance that ends on the return date instead of after it, or that does not name all Schengen states.",
          "An itinerary that does not match the hotel bookings, or hotel dates that do not match the flights.",
          "Bank balances topped up shortly before applying, with no explanation of where the funds came from.",
          "A leave sanction letter with dates that contradict the travel dates on the form.",
          "A passport with fewer than two blank pages, or issued more than ten years ago.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "If Your Situation Does Not Fit the Checklist",
      },
      {
        type: "paragraph",
        text: "Checklists are written for the straightforward case, and a good number of genuine applicants are not the straightforward case. If any of the following describe you, the documents matter less than the explanation you attach to them:",
      },
      {
        type: "list",
        items: [
          "You are self-employed with income that varies month to month.",
          "Someone else is funding the trip, whether a relative, a spouse or an employer.",
          "You have no previous international travel history.",
          "You have a previous refusal from any country.",
          "You are recently between jobs, or your employment changed during the booking period.",
          "You are travelling with minors, or as part of a group with different circumstances.",
        ],
      },
      {
        type: "paragraph",
        text: "In each of these cases the answer is not to hide the complication. It is to document it, so the officer is not left to guess at the part of the story you left out.",
      },
      {
        type: "heading",
        level: 2,
        text: "How Visaworx Helps",
      },
      {
        type: "paragraph",
        text: "Visaworx is a visa intelligence and guidance service from KLAR Travels. We do not decide applications and we do not speak for any consulate; those decisions sit entirely with government authorities. What we can do is look at a file before it is submitted and tell you where it is thin. If you have the checklist but cannot tell whether your evidence actually holds together, the readiness assessment will identify the areas that deserve a closer look before you apply, and our team is available when a situation needs human judgement rather than a checklist.",
      },
      {
        type: "heading",
        level: 2,
        text: "Before You Apply",
      },
      {
        type: "paragraph",
        text: "Meera's trip was recoverable because she found the problem while she was still preparing. That is the whole argument for starting early: almost every serious Schengen problem is cheap to fix at the preparation stage and expensive to fix afterwards.",
      },
      {
        type: "list",
        items: [
          "Work out your main destination from the nights booked, before anything else.",
          "Read the deciding consulate's own checklist rather than a general one.",
          "Check that your dates agree across the form, the flights, the hotels and the leave letter.",
          "Buy insurance that covers the whole trip and every Schengen state.",
          "Lodge the application with time to absorb an extended examination.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Verify before you rely on this",
        text: "Fees, checklists and processing rules change, and consulates publish their own requirements. Every figure in this guide was verified against official sources on 21 August 2026. Before you apply, confirm the current position with the consulate deciding your application using the official references listed with this guide.",
      },
    ],
    relatedCountrySlugs: ["schengen"],
    relatedServiceSlugs: ["tourist-visa", "documentation-review", "visa-readiness-review"],
    faqIds: [
      "schengen-in-1",
      "schengen-in-2",
      "schengen-in-3",
      "schengen-in-4",
      "schengen-in-5",
      "schengen-in-6",
    ],
    officialReferences: [
      {
        label: "European Commission - Schengen visa policy",
        url: "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en",
      },
      {
        label: "European Commission - Entry/Exit System (EES)",
        url: "https://home-affairs.ec.europa.eu/policies/schengen/smart-borders/entry-exit-system_en",
      },
      {
        label: "ETIAS - official EU travel information",
        url: "https://travel-europe.europa.eu/etias_en",
      },
      {
        label: "German Federal Foreign Office - Schengen visa FAQs (India)",
        url: "https://india.diplo.de/in-en/service/schengen-visa-faq-2610538",
      },
      {
        label: "German Federal Foreign Office - tourism checklist (India)",
        url: "https://india.diplo.de/in-en/2674158-2674158",
      },
    ],
    lastReviewed: "2026-08-21",
    authorLabel: "Visaworx Visa Intelligence Team",
    seo: {
      title: "Schengen Visa from India: 2026 Requirements & Timeline",
      description:
        "Schengen visa from India explained - documents, fees, processing times and the 2026 EES border changes. Understand what to prepare before you apply.",
    },
  },
  {
    slug: "uk-visitor-visa-from-india",
    title: "UK Standard Visitor Visa from India: Requirements, Fees and Timelines",
    summary: "What Indian passport holders need for a UK Standard Visitor visa — why the ETA route is not open to you, what the visa allows and forbids, the fee, and when to apply.",
    category: "Country Guides",
    readingTime: "8 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Rahul spent an hour on the wrong page. A colleague had mentioned that Britain now runs a quick online travel authorisation, so he went looking for it, found the application, started filling it in, and only stopped when the nationality dropdown did not offer India. He assumed the site was broken. It was not. He simply was not eligible for the thing he was applying for.",
      },
      {
        type: "paragraph",
        text: "Rahul is an illustration, but the confusion is real and it is getting more common. The UK does run an Electronic Travel Authorisation, and a great deal of coverage describes it as the new way into Britain. For Indian passport holders it is not the way in at all.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick answer",
        text: "Indian nationals cannot use the UK Electronic Travel Authorisation. India is not on the ETA national list, so you need a Standard Visitor visa. It costs GBP 135 for a visa of up to six months, allows stays of up to six months, and the earliest you can apply is three months before you travel.",
      },
      {
        type: "heading",
        level: 2,
        text: "Why the ETA Route Is Not Open to Indian Travellers",
      },
      {
        type: "paragraph",
        text: "The ETA is for nationalities that do not need a visa to visit the UK. It is a light-touch authorisation layered on top of visa-free travel, not a replacement for a visa.",
      },
      {
        type: "paragraph",
        text: "India is not on the ETA national list. The UK guidance is direct about what that means for everyone else: other nationalities cannot get an ETA, and should check whether they need a visa instead. For an Indian passport holder the answer is that you do, and the Standard Visitor visa is the route.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "A practical consequence",
        text: "Because the ETA is quick and cheap, coverage of it tends to describe UK entry as having become easier. If you are applying from India, none of that applies to you, and planning a trip on the assumption of a same-week authorisation will leave you short of time.",
      },
      {
        type: "heading",
        level: 2,
        text: "What the Standard Visitor Visa Allows",
      },
      {
        type: "paragraph",
        text: "The Standard Visitor visa usually permits stays of up to six months per visit. It covers considerably more than sightseeing:",
      },
      {
        type: "list",
        items: [
          "Tourism, and visiting family or friends.",
          "Certain business activities, such as meetings, conferences and negotiations.",
          "Permitted paid engagements and school exchange visits.",
          "Recreational courses of up to 30 days, and some study.",
          "Volunteering for up to 30 days with a registered charity.",
          "Medical visits, and transit through the UK.",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "What it does not allow",
      },
      {
        type: "paragraph",
        text: "The prohibitions matter more than the permissions, because this is where genuine visitors get into difficulty without meaning to:",
      },
      {
        type: "list",
        items: [
          "Paid or unpaid work for a UK company, or as a self-employed person, outside a permitted paid engagement.",
          "Claiming public funds or benefits.",
          "Living in the UK for long periods through frequent or successive visits.",
          "Marrying or registering a civil partnership.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "The successive visits problem",
        text: "There is no fixed number of visits that triggers concern, which is exactly why it catches people. A visitor visa is for visiting. If your pattern of travel starts to look like residence assembled out of six-month stays, that is a question you should expect to be asked, and one worth being able to answer with your ties to India.",
      },
      {
        type: "heading",
        level: 2,
        text: "What It Costs and When to Apply",
      },
      {
        type: "paragraph",
        text: "A Standard Visitor visa costs GBP 135 for a visa of up to six months. Longer-validity visitor visas are available at higher fees, and separate charges apply for optional priority services and for the visa application centre.",
      },
      {
        type: "paragraph",
        text: "The timing rule is narrower than most travellers expect:",
      },
      {
        type: "list",
        items: [
          "The earliest you can apply is three months before you travel.",
          "That is a tighter window than the Schengen six months, so a Europe-plus-UK itinerary cannot be applied for on a single timetable.",
          "Biometrics are given in person at a visa application centre in India, and appointment availability sits on top of processing time.",
          "Applying at the start of your three-month window rather than the end is the cheapest protection you have.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "What a UK Visitor Application Has to Prove",
      },
      {
        type: "paragraph",
        text: "UK Visas and Immigration is assessing whether you are a genuine visitor who will leave at the end of the visit. Almost every document you submit is evidence for or against that single question.",
      },
      {
        type: "list",
        items: [
          "That the visit is genuine, with a purpose and a plan that make sense together.",
          "That you can meet the cost of the trip without working in the UK.",
          "That you have reasons to return to India — employment, business, study, property or family responsibilities.",
          "That what you say in the application agrees with what your documents show.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Do not send everything you own",
        text: "A common instinct is to submit every statement, certificate and letter available, on the theory that more is safer. It is not. A large, unexplained bundle makes the case harder to read and invites the caseworker to find the inconsistency themselves. A focused set of documents that tells one coherent story is stronger than an exhaustive one that does not.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where Applications from India Usually Weaken",
      },
      {
        type: "list",
        items: [
          "Applying for the ETA first, losing weeks, and then applying for the visa inside the three-month window with no slack.",
          "Funds that appear shortly before the application with no explanation of their source.",
          "A sponsor covering the trip without documents establishing who they are and why they are paying.",
          "Travel dates that contradict leave approval, hotel bookings or the stated purpose.",
          "Understating a previous refusal from the UK or any other country, which is treated far more seriously than the refusal itself.",
          "A visit history that reads as continuous residence rather than a series of visits.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "If Your Situation Is Not Straightforward",
      },
      {
        type: "paragraph",
        text: "Checklists assume a salaried applicant with a settled job and a short holiday. Plenty of genuine visitors do not fit that shape, and for them the explanation matters more than the paperwork:",
      },
      {
        type: "list",
        items: [
          "You are self-employed, or your income varies month to month.",
          "A relative in the UK is funding or hosting the visit.",
          "You are visiting for medical treatment.",
          "You have a previous UK refusal, or a refusal from another country.",
          "You have travelled to the UK several times recently.",
          "You are applying alongside family members whose circumstances differ from yours.",
        ],
      },
      {
        type: "paragraph",
        text: "In each case the answer is to document the complication rather than hope it goes unnoticed. A caseworker who has to guess at the missing piece will not guess in your favour.",
      },
      {
        type: "heading",
        level: 2,
        text: "How Visaworx Helps",
      },
      {
        type: "paragraph",
        text: "Visaworx is a visa intelligence and guidance service from KLAR Travels. We do not decide applications and we do not speak for UK Visas and Immigration. What we can do is read a file the way a caseworker will and tell you where it does not hold together. If you have gathered the documents but cannot tell whether they tell one consistent story, the readiness assessment will show you which parts deserve a closer look before you apply.",
      },
      {
        type: "heading",
        level: 2,
        text: "Before You Apply",
      },
      {
        type: "list",
        items: [
          "Confirm you need a visa rather than an ETA. From India, you do.",
          "Count backwards from your travel date and apply early in the three-month window.",
          "Decide what your visit is for, then check every document supports that one account.",
          "Be able to explain where your funds came from, not just that they exist.",
          "Disclose any previous refusal, from any country.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Verify before you rely on this",
        text: "Fees, eligible nationalities and visitor rules change. Every figure in this guide was verified against GOV.UK on 21 August 2026. Confirm the current position on the official pages listed with this guide before you apply, particularly the ETA national list, which has been expanding.",
      },
    ],
    relatedCountrySlugs: ["united-kingdom"],
    relatedServiceSlugs: ["tourist-visa", "business-visa", "documentation-review"],
    faqIds: [
      "uk-in-1",
      "uk-in-2",
      "uk-in-3",
      "uk-in-4",
      "uk-in-5",
      "uk-in-6",
    ],
    officialReferences: [
      {
        label: "GOV.UK - Standard Visitor visa",
        url: "https://www.gov.uk/standard-visitor",
      },
      {
        label: "GOV.UK - Check if you can get an ETA",
        url: "https://www.gov.uk/guidance/check-when-you-can-get-an-electronic-travel-authorisation-eta",
      },
      {
        label: "GOV.UK - Check if you need a UK visa",
        url: "https://www.gov.uk/check-uk-visa",
      },
    ],
    lastReviewed: "2026-08-21",
    authorLabel: "Visaworx Visa Intelligence Team",
    seo: {
      title: "UK Visitor Visa from India: Fees, Rules & Timeline",
      description:
        "UK Standard Visitor visa from India explained - why the ETA does not apply to Indian nationals, what the visa allows, the GBP 135 fee and when to apply.",
    },
  },
  {
    slug: "uae-visa-from-india",
    title: "UAE Visa from India: Why Your Other Visas Decide Which Route You Take",
    summary: "Whether an Indian passport holder gets a UAE visa on arrival depends on what other visas or residence permits they already hold. A guide to both routes, who qualifies for which, and what each actually gives you.",
    category: "Country Guides",
    readingTime: "8 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Priya's sister has lived in Dubai for six years, and every time the subject of visiting came up the answer was the same: do not worry about it, Indians get a visa on arrival now. So Priya booked flights for a long weekend and planned to sort the rest out at the airport. Her sister was not wrong, exactly. She was describing a rule that applied to her and not to Priya.",
      },
      {
        type: "paragraph",
        text: "Priya is an illustration, but this specific misunderstanding is unusually common, and it is easy to see why. The UAE does grant visas on arrival to Indian passport holders. It grants them on a condition that has nothing to do with your Indian passport and everything to do with what else is in it.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick answer",
        text: "Indian passport holders qualify for a UAE visa on arrival only if they already hold a valid visa, residence permit or Green Card from the United States, the United Kingdom or the European Union, or a valid residence permit from Australia, Canada, Japan, New Zealand, the Republic of Korea or Singapore. If you hold none of those, you need an entry permit arranged before you travel.",
      },
      {
        type: "heading",
        level: 2,
        text: "There Are Two Routes, and Your Documents Choose for You",
      },
      {
        type: "paragraph",
        text: "This is the part most travellers miss. The UAE does not have one process for Indian nationals, it has two, and which one applies to you is decided entirely by what other permissions you hold.",
      },
      {
        type: "list",
        items: [
          "Route one, visa on arrival: available if you hold a qualifying visa or residence permit from another country. Nothing is arranged before you fly.",
          "Route two, entry permit arranged in advance: the route for everyone else, and the one most first-time visitors from India will take.",
        ],
      },
      {
        type: "paragraph",
        text: "Neither is better. They are simply different, and assuming you are on the first when you are on the second is what turns a holiday into an airport problem.",
      },
      {
        type: "heading",
        level: 2,
        text: "Who Qualifies for a Visa on Arrival",
      },
      {
        type: "paragraph",
        text: "You need an ordinary Indian passport plus one of the following, held validly at the time you travel:",
      },
      {
        type: "list",
        items: [
          "A visa, residence permit or Green Card issued by the United States.",
          "A residence visa issued by the United Kingdom.",
          "A residence visa issued by a European Union country.",
          "Since 13 February 2025, a valid residence permit from Australia, Canada, Japan, New Zealand, the Republic of Korea or Singapore.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "The six-month rule applies twice",
        text: "Your passport must have at least six months validity. So must the qualifying document. A UK residence visa with four months left does not qualify you, even though it is still valid for the UK. Both clocks are checked, and travellers who remember the first routinely forget the second.",
      },
      {
        type: "heading",
        level: 3,
        text: "What the visa on arrival gives you",
      },
      {
        type: "paragraph",
        text: "It is a visitor entry for 14 days, which can be extended once for a similar period. That is the whole allowance. It is not a month, and the extension is available one time only, so a trip planned around a longer stay does not fit this route even if you qualify for it.",
      },
      {
        type: "heading",
        level: 2,
        text: "If You Do Not Qualify",
      },
      {
        type: "paragraph",
        text: "Then you arrange an entry permit before you travel, and you cannot do it yourself at the border. UAE visitor entry permits are applied for through a sponsor: an airline you are flying with, a hotel you have booked, a licensed tour operator, or a relative or company resident in the UAE.",
      },
      {
        type: "paragraph",
        text: "Durations, fees and permitted extensions vary by permit type and by which authority issues it, and they change. Rather than repeat figures that may be stale by the time you read this, check the current position directly with the UAE authorities listed with this guide before you book anything non-refundable.",
      },
      {
        type: "callout",
        tone: "expert",
        title: "Sponsorship is not a formality",
        text: "Because a sponsor applies on your behalf, the quality of your trip planning becomes someone else's administrative problem, and delays are common when hotel bookings, flight dates and passenger details do not agree. Have the details settled and consistent before you hand them over, not after.",
      },
      {
        type: "heading",
        level: 2,
        text: "Dubai Is Not the Only Authority",
      },
      {
        type: "paragraph",
        text: "The UAE is a federation, and visitor entry is administered both federally and at emirate level. Dubai has its own residency and foreigners affairs authority with its own service pages and fees, while other emirates are handled federally.",
      },
      {
        type: "paragraph",
        text: "In practice this means the guidance you find depends on which authority published it, and a fee or procedure quoted for Dubai may not be the one that applies to your entry point. Check the authority for the emirate you are actually flying into.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where Applications from India Usually Go Wrong",
      },
      {
        type: "list",
        items: [
          "Assuming visa on arrival applies because it applies to a relative or colleague who holds a residence permit you do not.",
          "A qualifying US, UK or EU document with less than six months validity left.",
          "Booking non-refundable flights before confirming which route you are on.",
          "Planning a stay longer than the visa on arrival allows, then discovering the extension is available only once.",
          "Passenger name or passport details that do not match between the booking and the permit application.",
          "Treating a UAE transit stop as automatically permitting entry into the country.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "If Your Situation Is Not Straightforward",
      },
      {
        type: "list",
        items: [
          "You hold a qualifying residence permit but it expires during the trip.",
          "You are visiting family who will sponsor you rather than booking a hotel.",
          "You are travelling for business meetings rather than tourism.",
          "You are transiting the UAE and want to leave the airport.",
          "You are travelling with children whose documents differ from yours.",
          "You have a previous UAE entry refusal or an unresolved issue from an earlier stay.",
        ],
      },
      {
        type: "paragraph",
        text: "Each of these changes which route applies or which sponsor is appropriate, and none of them is answered by a general checklist.",
      },
      {
        type: "heading",
        level: 2,
        text: "How Visaworx Helps",
      },
      {
        type: "paragraph",
        text: "Visaworx is a visa intelligence and guidance service from KLAR Travels. We do not issue entry permits and we do not speak for the UAE authorities. What we can do is establish which of the two routes actually applies to you before you commit to bookings, and tell you what your documents need to show. If you are not certain which route you are on, that is the question worth settling first, and the readiness assessment is built for exactly that kind of check.",
      },
      {
        type: "heading",
        level: 2,
        text: "Before You Book",
      },
      {
        type: "list",
        items: [
          "Establish your route first. Everything else follows from it.",
          "If you are relying on another country's visa or residence permit, check its remaining validity, not just that it exists.",
          "Confirm your passport has at least six months left.",
          "Match your intended length of stay to what your route actually permits.",
          "Check the authority for the emirate you are flying into, not simply the first page you find.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Verify before you rely on this",
        text: "UAE entry rules have changed repeatedly, and the qualifying list for visa on arrival was last expanded in February 2025. Every condition in this guide was verified against UAE government sources on 21 August 2026. Confirm the current position with the authority for your entry point before you travel.",
      },
    ],
    relatedCountrySlugs: ["united-arab-emirates"],
    relatedServiceSlugs: ["tourist-visa", "business-visa", "family-dependent-visa"],
    faqIds: ["uae-in-1", "uae-in-2", "uae-in-3", "uae-in-4", "uae-in-5", "uae-in-6"],
    officialReferences: [
      {
        label: "GDRFA Dubai - visa on arrival for citizens of India",
        url: "https://www.gdrfad.gov.ae/en/services/727c91b1-52eb-11ea-0320-0050569629e8",
      },
      {
        label: "UAE Ministry of Foreign Affairs - visa on arrival expansion, February 2025",
        url: "https://www.mofa.gov.ae/en/missions/new-delhi/media-hub/embassy-news/19-2-2025-new-delhi",
      },
      {
        label: "The Official Portal of the UAE Government - visas and Emirates ID",
        url: "https://u.ae/en/information-and-services/visa-and-emirates-id",
      },
      {
        label: "Federal Authority for Identity and Citizenship (ICP)",
        url: "https://icp.gov.ae/en/",
      },
    ],
    lastReviewed: "2026-08-21",
    authorLabel: "Visaworx Visa Intelligence Team",
    seo: {
      title: "UAE Visa from India: Visa on Arrival Rules Explained",
      description:
        "Indian passport holders get a UAE visa on arrival only with a qualifying US, UK, EU or other residence permit. Both routes explained, with validity rules.",
    },
  },
  {
    slug: "us-visitor-visa-from-india",
    title: "US B1/B2 Visa from India: What Changed for Interview Waivers",
    summary: "The interview waiver window narrowed sharply in October 2025. What that means for Indian applicants renewing a B1/B2, what the fee is, and why an old dropbox experience is no longer a guide to this one.",
    category: "Country Guides",
    readingTime: "8 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Karthik renewed his B1/B2 in 2019 without ever meeting a consular officer. He dropped his passport at a collection centre, it came back with a visa in it, and the whole thing took less effort than booking the flights. When the visa lapsed and he started planning another trip, he assumed the same arrangement was waiting for him. It is not, and the difference is measured in months rather than days.",
      },
      {
        type: "paragraph",
        text: "Karthik is an illustration, but the assumption behind him is extremely widespread among Indian applicants, because for several years it was correct. The interview waiver route was generous, then it narrowed, and in October 2025 it narrowed again to something much smaller than most people remember.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick answer",
        text: "From 1 October 2025 the interview waiver for B1/B2 applicants applies only to renewals made within 12 months of the previous visa expiring, where that visa was issued for full validity and the applicant was at least 18. You must have no prior refusal that was not overcome or waived, and must apply in your country of nationality or residence. The application fee is USD 185. A consular officer can still require an interview in any case.",
      },
      {
        type: "heading",
        level: 2,
        text: "What the Interview Waiver Now Covers",
      },
      {
        type: "paragraph",
        text: "The waiver is a narrow renewal provision, not a general convenience. Every one of these conditions has to hold at the same time:",
      },
      {
        type: "list",
        items: [
          "You are renewing a B-1, B-2, B1/B2 or Border Crossing Card, in the same category.",
          "You apply within 12 months of the previous visa expiring.",
          "That previous visa was issued for full validity at the time it was granted.",
          "You were at least 18 years old.",
          "You have never been refused a visa, unless the refusal was overcome or waived.",
          "You are applying in your country of nationality or usual residence.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Twelve months, not forty-eight",
        text: "The number most Indian applicants are carrying in their heads is from an earlier and far more generous version of this policy. If your last visa expired two years ago, you are not renewing under the waiver, you are applying as an interview case. That single fact changes your timeline more than anything else in your preparation.",
      },
      {
        type: "paragraph",
        text: "Meeting every condition still does not entitle you to a waiver. Consular officers retain discretion to require an in-person interview in any case, for any reason. The waiver is something you may be considered for, not something you qualify into.",
      },
      {
        type: "heading",
        level: 2,
        text: "What It Costs",
      },
      {
        type: "paragraph",
        text: "The non-immigrant visa application fee, commonly called the MRV fee, is USD 185 for a B1/B2. It is paid before the appointment and is not refunded if the application is refused.",
      },
      {
        type: "paragraph",
        text: "Depending on your nationality and visa category, a separate reciprocity or issuance fee may apply after approval, and US fee policy has changed more than once in recent years. Confirm the total against the official fee schedule before you pay rather than relying on a figure quoted in a forum.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Process, in the Order It Actually Happens",
      },
      {
        type: "list",
        items: [
          "Complete Form DS-160 online, accurately. What you enter here is what the officer reads.",
          "Pay the application fee and keep the receipt.",
          "Schedule your appointment, or submit under interview waiver if you are eligible.",
          "Attend biometrics collection, and the interview where one is required.",
          "Wait for administrative processing where applicable, then passport return.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "The DS-160 is the application",
        text: "Indian applicants often treat the form as an administrative preliminary and the interview as the real event. The officer is reading your DS-160 while you stand there. Inconsistencies between what it says and what you say are the fastest route to a difficult conversation, and they are almost always careless rather than dishonest.",
      },
      {
        type: "heading",
        level: 2,
        text: "Why We Do Not Publish Wait Times",
      },
      {
        type: "paragraph",
        text: "Appointment availability at the US missions in India moves constantly and differs by post and by visa class. Any number stated here would be wrong for someone reading it a month later, and planning a trip on a stale figure is worse than having no figure at all.",
      },
      {
        type: "paragraph",
        text: "The Department of State publishes current appointment wait times by post. Check the post you will apply at, on the day you are planning, and build your timeline from that.",
      },
      {
        type: "heading",
        level: 2,
        text: "What a B1/B2 Application Has to Establish",
      },
      {
        type: "paragraph",
        text: "A visitor visa applicant is presumed to intend immigration until they demonstrate otherwise. That presumption is the whole architecture of the interview, and understanding it explains almost every question you will be asked.",
      },
      {
        type: "list",
        items: [
          "A specific, temporary purpose for the visit, with a defined end.",
          "The means to fund the trip without working in the United States.",
          "Ties to India strong enough to make return the obvious outcome: employment, business, property, family responsibility, study.",
          "A history, where you have one, of complying with the terms of previous visas.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Where Applications from India Usually Weaken",
      },
      {
        type: "list",
        items: [
          "Assuming an interview waiver applies because it applied last time, and discovering otherwise with weeks rather than months in hand.",
          "A DS-160 completed quickly and never re-read before the interview.",
          "Employment or income described one way on the form and another in conversation.",
          "Funds that appear shortly before the application with no explainable source.",
          "Failing to declare a previous refusal, which also removes any interview waiver eligibility.",
          "Answers that describe an open-ended stay when the visa category is for a temporary visit.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "If Your Situation Is Not Straightforward",
      },
      {
        type: "list",
        items: [
          "Your previous US visa expired more than 12 months ago.",
          "You have a prior refusal, under any section, from the US or elsewhere.",
          "You are self-employed, or your income is difficult to evidence conventionally.",
          "You are visiting family who are US residents or citizens.",
          "You are applying with children, or on behalf of a parent.",
          "You have spent long or frequent periods in the US on previous visits.",
        ],
      },
      {
        type: "paragraph",
        text: "None of these is disqualifying. All of them change what your application has to explain, and explaining them deliberately is better than leaving an officer to infer.",
      },
      {
        type: "heading",
        level: 2,
        text: "How Visaworx Helps",
      },
      {
        type: "paragraph",
        text: "Visaworx is a visa intelligence and guidance service from KLAR Travels. We do not decide applications, we do not schedule consular appointments, and we do not speak for the Department of State. What we can do is check whether the route you think you are on is the route that applies, and review how your documents and your DS-160 read together. If your last visa expired more than a year ago, that check is worth doing before you plan anything around a date.",
      },
      {
        type: "heading",
        level: 2,
        text: "Before You Apply",
      },
      {
        type: "list",
        items: [
          "Find your previous visa and check its expiry date against the 12-month window.",
          "Assume an interview until you are told otherwise, and build your timeline that way.",
          "Check current appointment wait times for your post, on the day.",
          "Re-read your DS-160 before the interview, not after submitting it.",
          "Declare any previous refusal.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Verify before you rely on this",
        text: "US visa policy has changed repeatedly, and the interview waiver criteria in particular have narrowed more than once. Everything here was verified against Department of State sources on 21 August 2026. Confirm the current criteria and fees on the official pages listed with this guide, and check your post's own instructions, before you apply.",
      },
    ],
    relatedCountrySlugs: ["united-states"],
    relatedServiceSlugs: ["tourist-visa", "business-visa", "interview-preparation"],
    faqIds: ["us-in-1", "us-in-2", "us-in-3", "us-in-4", "us-in-5", "us-in-6"],
    officialReferences: [
      {
        label: "US Department of State - interview waiver update, September 2025",
        url: "https://travel.state.gov/content/travel/en/News/visas-news/interview-waiver-update-sept-18-2025.html",
      },
      {
        label: "US Department of State - fees for visa services",
        url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/fees-visa-services.html",
      },
      {
        label: "US Department of State - visa appointment wait times",
        url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wait-times.html",
      },
      {
        label: "US Embassy and Consulates in India - visas",
        url: "https://in.usembassy.gov/visas/",
      },
    ],
    lastReviewed: "2026-08-21",
    authorLabel: "Visaworx Visa Intelligence Team",
    seo: {
      title: "US B1/B2 Visa from India: Interview Waiver Changes",
      description:
        "The US interview waiver narrowed in October 2025 to 12-month renewals. What Indian B1/B2 applicants need to know, the USD 185 fee, and how to plan the timeline.",
    },
  },
  {
    slug: "canada-visitor-visa-from-india",
    title: "Canada Visitor Visa from India: TRV, Biometrics and the eTA Question",
    summary: "Indian travellers keep hearing that a US visa gets you into Canada on a quick online authorisation. A guide to what the visitor visa actually involves, what biometrics cost and how long they last, and where the eTA question really stands.",
    category: "Country Guides",
    readingTime: "8 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Anita had a valid US B1/B2 and a colleague who was certain that settled it. Canada, he said, lets you in on an online authorisation if you hold an American visa. She spent an evening trying to apply for one, could not make the eligibility questions work, and went to bed assuming she had misunderstood the form.",
      },
      {
        type: "paragraph",
        text: "Anita is an illustration, but the belief is real and it is unusually sticky, because it is half true. Canada does let citizens of certain visa-required countries apply for an electronic travel authorisation instead of a visitor visa, and holding a valid US non-immigrant visa is one of the conditions. What people leave out is that the country has to be on the eligible list first.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick answer",
        text: "Indian citizens generally need a visitor visa, a Temporary Resident Visa, to travel to Canada. The visa fee is CAD 100 and biometrics cost a further CAD 85, with family maximums of CAD 500 and CAD 170. Biometrics stay valid for 10 years. The eTA alternative exists only for citizens of certain visa-required countries, and India is not currently among them.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where the eTA Question Actually Stands",
      },
      {
        type: "paragraph",
        text: "Canada operates an eTA route for citizens of a limited set of visa-required countries. Where it applies, the applicant must either have held a Canadian visitor visa in the past 10 years or currently hold a valid US non-immigrant visa, and it covers air travel only. Arriving by car, bus, train or boat still requires a visitor visa.",
      },
      {
        type: "paragraph",
        text: "The part that gets dropped in retelling is the first step. The eligible-country list is short, and India is not currently on it, so an Indian citizen holding a valid US visa is still applying for a Temporary Resident Visa. Because that list has been extended more than once, confirm the current position on the official eligibility page rather than assuming either way.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Half-true advice is the expensive kind",
        text: "The US-visa condition is genuine, which is exactly why this misunderstanding survives. Someone will always know a person it worked for, usually a citizen of a country that is on the list. Check your own nationality against the list before you plan around the answer.",
      },
      {
        type: "heading",
        level: 2,
        text: "What It Costs",
      },
      {
        type: "list",
        items: [
          "Visitor visa, per person: CAD 100.",
          "Visitor visa, family of five or more applying together: CAD 500 maximum.",
          "Biometrics, per person: CAD 85.",
          "Biometrics, family of two or more eligible people applying together: CAD 170 maximum.",
        ],
      },
      {
        type: "paragraph",
        text: "The family maximums are worth knowing before you apply as individuals out of habit. A family applying at the same time and place is treated as a family for fee purposes, and applying separately can cost more for no benefit.",
      },
      {
        type: "heading",
        level: 2,
        text: "Biometrics Last Ten Years",
      },
      {
        type: "paragraph",
        text: "If you have already given biometrics for a Canadian visitor visa, study permit or work permit, they remain valid for 10 years. Within that period you do not need to give them again for a further visitor visa, work permit or study permit application.",
      },
      {
        type: "paragraph",
        text: "This is one of the few genuinely generous provisions in the process, and a large number of repeat applicants pay and attend for collection they did not need. Check when you last gave them before you book anything.",
      },
      {
        type: "heading",
        level: 2,
        text: "What a Canadian Visitor Application Has to Establish",
      },
      {
        type: "paragraph",
        text: "Immigration, Refugees and Citizenship Canada is assessing whether you will leave at the end of an authorised stay. Everything in the application speaks to that question.",
      },
      {
        type: "list",
        items: [
          "A clear purpose for the visit, with dates that make sense for it.",
          "Funds sufficient for the trip, from a source you can explain.",
          "Ties to India: employment, business, family responsibilities, property, studies.",
          "Immigration history consistent with what you are describing now.",
          "Where someone in Canada is hosting or funding you, documents establishing who they are and their status there.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Where Applications from India Usually Weaken",
      },
      {
        type: "list",
        items: [
          "Applying for an eTA on the strength of a US visa without checking nationality eligibility first.",
          "Paying for biometrics again inside the 10-year validity period.",
          "Family members applying separately and losing the family fee maximum.",
          "A host in Canada described in the application but not evidenced.",
          "Travel dates that do not match leave approval or bookings.",
          "Assuming an eTA would cover a land or sea crossing, which it does not even where it applies.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "If Your Situation Is Not Straightforward",
      },
      {
        type: "list",
        items: [
          "You have family in Canada who will sponsor or host the visit.",
          "You have previously applied for a Canadian study or work permit.",
          "You have a refusal from Canada or another country.",
          "You are self-employed or your income varies.",
          "You are travelling with dependants, or as a parent visiting adult children.",
          "You intend to enter overland from the United States.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "How Visaworx Helps",
      },
      {
        type: "paragraph",
        text: "Visaworx is a visa intelligence and guidance service from KLAR Travels. We do not decide applications and we do not speak for IRCC. What we can do is confirm which route applies to you before you spend anything, check whether your biometrics are still valid, and review whether your documents support the purpose you are describing. If a family is applying together, that check usually pays for itself in fees alone.",
      },
      {
        type: "heading",
        level: 2,
        text: "Before You Apply",
      },
      {
        type: "list",
        items: [
          "Check your nationality against the eTA eligibility page before assuming a US visa helps.",
          "Find out when you last gave biometrics for a Canadian application.",
          "If a family is travelling, apply at the same time and place.",
          "Evidence your host in Canada, do not merely mention them.",
          "Make sure your dates agree across bookings, leave approval and the application.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Verify before you rely on this",
        text: "Canadian fees and eTA eligibility both change, and the eligible-country list has been extended more than once. Everything here was verified against IRCC sources on 21 August 2026. Confirm the current position on the official pages listed with this guide before you apply.",
      },
    ],
    relatedCountrySlugs: ["canada"],
    relatedServiceSlugs: ["tourist-visa", "family-dependent-visa", "documentation-review"],
    faqIds: ["ca-in-1", "ca-in-2", "ca-in-3", "ca-in-4", "ca-in-5", "ca-in-6"],
    officialReferences: [
      {
        label: "IRCC - visitor visa (temporary resident visa)",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/visitor-visa.html",
      },
      {
        label: "IRCC - eTA eligibility, citizens from some visa-required countries",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/eligibility/eta-x.html",
      },
      {
        label: "IRCC - application fee list",
        url: "https://ircc.canada.ca/english/information/fees/fees.asp",
      },
      {
        label: "IRCC - biometrics",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/biometrics.html",
      },
    ],
    lastReviewed: "2026-08-21",
    authorLabel: "Visaworx Visa Intelligence Team",
    seo: {
      title: "Canada Visitor Visa from India: Fees, Biometrics, eTA",
      description:
        "Indian citizens generally need a Canadian visitor visa, not an eTA. The CAD 100 fee, CAD 85 biometrics and their 10-year validity, and family fee maximums.",
    },
  },
  {
    slug: "singapore-visa-from-india",
    title: "Singapore Visa from India: Why You Cannot Apply for It Yourself",
    summary: "Indian passport holders need a Singapore entry visa, and it is one of the few that cannot be submitted directly by the applicant. What the SGD 30 visa actually gets you, why the arrival card is not a visa, and who decides how long you can stay.",
    category: "Country Guides",
    readingTime: "7 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Sandeep spent most of a Sunday looking for the page where he could upload his documents and pay for a Singapore visa. He found plenty of sites offering to do it for him, several asking for money to complete an arrival card that turns out to be free, and no official form he could fill in himself. He assumed he was searching badly. He was not. There is no such form.",
      },
      {
        type: "paragraph",
        text: "Sandeep is an illustration, but the dead end is real, and it is the reason this route confuses people more than it should. Singapore does not accept entry visa applications directly from the traveller. Somebody in Singapore has to submit it for you.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick answer",
        text: "Holders of ordinary Indian passports need an entry visa for Singapore. It cannot be lodged by you directly: it goes through a local contact in Singapore, a strategic partner, an authorised visa agent, or a Singapore Overseas Mission. The processing fee is SGD 30 and is not refunded if the application is unsuccessful. Applications are normally processed within three working days.",
      },
      {
        type: "heading",
        level: 2,
        text: "Who Needs a Visa",
      },
      {
        type: "paragraph",
        text: "Travellers holding ordinary Indian passports need an entry visa before visiting Singapore. Holders of Indian official and diplomatic passports are exempt from that requirement.",
      },
      {
        type: "paragraph",
        text: "That distinction catches families where one member travels on an official passport and assumes the rest of the household is covered by the same rule. Each traveller is assessed on the passport they hold.",
      },
      {
        type: "heading",
        level: 2,
        text: "You Cannot Submit It Yourself",
      },
      {
        type: "paragraph",
        text: "This is the part worth understanding before you start looking for a form. An entry visa application is submitted on your behalf, through one of these routes:",
      },
      {
        type: "list",
        items: [
          "Online through the electronic service, submitted by a strategic partner or a local contact in Singapore.",
          "At a Singapore Overseas Mission.",
          "Through an authorised visa agent.",
        ],
      },
      {
        type: "paragraph",
        text: "A local contact is exactly what it sounds like: a person or organisation in Singapore who submits for you. If you are visiting family, that is usually them. If you are travelling on business, it is often the company hosting you. If you have neither, an authorised visa agent is the ordinary route.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "The arrival card is free, and it is not a visa",
        text: "The SG Arrival Card is a separate thing, it costs nothing, and no visa is granted by completing it. A large number of sites charge for it anyway. If something is asking you for money to fill in an arrival card, you are not on an official service, and the visa question is still unanswered.",
      },
      {
        type: "heading",
        level: 2,
        text: "Cost and Timing",
      },
      {
        type: "list",
        items: [
          "A processing fee of SGD 30, paid online by credit or debit card.",
          "The fee is non-refundable, whether or not the visa is granted.",
          "Applications are normally processed within three working days, excluding the day of submission. Some take longer.",
          "Apply within the 30 days before your arrival.",
        ],
      },
      {
        type: "paragraph",
        text: "Three working days sounds generous until you notice the application window is narrow at the other end. Aim for the middle of that thirty-day window rather than either edge.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Visa Does Not Decide How Long You Stay",
      },
      {
        type: "paragraph",
        text: "This is the single most common misunderstanding about Singapore, and it is worth stating plainly. The entry visa allows you to travel to Singapore and present yourself at immigration. How long you may remain is decided at the checkpoint, not by the visa.",
      },
      {
        type: "paragraph",
        text: "Since March 2022 that decision arrives digitally. Foreign visitors are notified of their Visit Pass by email, with nothing endorsed in the passport, and it is that notification which states the period of stay granted and the last day you may remain.",
      },
      {
        type: "callout",
        tone: "expert",
        title: "Read the e-Pass, do not assume it",
        text: "Because there is no stamp in the passport, there is nothing to glance at later. Travellers who assume they were given the length of stay they asked for, rather than reading what they were actually granted, are the ones who overstay without meaning to. Open the email, note the last day, and keep it.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where Applications from India Usually Go Wrong",
      },
      {
        type: "list",
        items: [
          "Searching for a direct application form, losing days, and then applying too close to departure.",
          "Paying a site to complete the free arrival card and believing a visa has been arranged.",
          "Assuming a family member's official or diplomatic passport exemption covers everyone travelling.",
          "Not identifying a local contact or authorised agent early, when that is the step everything else depends on.",
          "Treating the visa validity as the permitted length of stay.",
          "Not reading the e-Pass notification, and overstaying against a date nobody stamped anywhere.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "If Your Situation Is Not Straightforward",
      },
      {
        type: "list",
        items: [
          "You have no family, host or business contact in Singapore.",
          "You are transiting Singapore rather than visiting it.",
          "You are travelling with family members holding different passport types.",
          "Your trip is being sponsored or hosted by a Singapore company.",
          "You have a previous refusal or an immigration issue from any country.",
          "You need a longer stay than a standard visit permits.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "How Visaworx Helps",
      },
      {
        type: "paragraph",
        text: "Visaworx is a visa intelligence and guidance service from KLAR Travels. We do not issue Singapore visas and we do not speak for the Immigration and Checkpoints Authority. Where we help is upstream: working out which submission route is actually available to you, what your host or agent will need from you, and whether your documents support the visit you are describing. For a route where the first step is finding someone to submit on your behalf, knowing that early is most of the battle.",
      },
      {
        type: "heading",
        level: 2,
        text: "Before You Travel",
      },
      {
        type: "list",
        items: [
          "Confirm your passport type. Ordinary Indian passports need a visa.",
          "Identify who will submit for you before anything else.",
          "Apply inside the thirty days before arrival, not on the last day of it.",
          "Complete the SG Arrival Card yourself, free, and do not pay anyone for it.",
          "Read the e-Pass email on arrival and note the last day of your permitted stay.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Verify before you rely on this",
        text: "Fees, submission routes and pass arrangements change. Everything here was verified against Immigration and Checkpoints Authority and Singapore Overseas Mission sources on 21 August 2026. Confirm the current position on the official pages listed with this guide before you apply.",
      },
    ],
    relatedCountrySlugs: ["singapore"],
    relatedServiceSlugs: ["tourist-visa", "business-visa", "family-dependent-visa"],
    faqIds: ["sg-in-1", "sg-in-2", "sg-in-3", "sg-in-4", "sg-in-5", "sg-in-6"],
    officialReferences: [
      {
        label: "ICA - visa requirements for India",
        url: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements/visa-detail-page/india",
      },
      {
        label: "ICA - check if you need an entry visa",
        url: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
      },
      {
        label: "ICA - visiting Singapore",
        url: "https://www.ica.gov.sg/public-education/visiting-singapore",
      },
      {
        label: "High Commission of Singapore, New Delhi - visa information",
        url: "https://new-delhi.mfa.gov.sg/consular-services/visa-information/",
      },
    ],
    lastReviewed: "2026-08-21",
    authorLabel: "Visaworx Visa Intelligence Team",
    seo: {
      title: "Singapore Visa from India: How to Apply and What It Costs",
      description:
        "Indian passport holders cannot lodge a Singapore visa directly - it goes through a local contact or authorised agent. The SGD 30 fee, timing, and the e-Pass.",
    },
  },
];
