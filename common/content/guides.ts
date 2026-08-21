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
  {
    slug: "new-zealand-visitor-visa-from-india",
    title: "New Zealand Visitor Visa from India: The Levy Nobody Budgets For",
    summary: "Indian passport holders need a visitor visa rather than an NZeTA, and the visa fee is not the whole cost. What the conservation levy adds, why it is not refunded if you are declined, and how the length-of-stay maths actually works.",
    category: "Country Guides",
    readingTime: "7 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Nikhil budgeted for the visa fee, found it steep but manageable, and submitted. What he had not accounted for was a second charge added at the same moment, for something that is not a visa at all and is not returned if the application fails. It is not hidden. It is simply not the number people quote each other.",
      },
      {
        type: "paragraph",
        text: "Nikhil is an illustration, but the gap between the advertised fee and the actual cost is real, and New Zealand is unusual in how firmly it applies it. There is also a second surprise waiting in the small print of how long you are allowed to stay.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick answer",
        text: "Indian passport holders need a Visitor Visa, not an NZeTA, because India is not on New Zealand's visa waiver list. The visa starts from NZD 441, and most visitors also pay the International Visitor Conservation and Tourism Levy of NZD 100 at the same time. The levy is not refunded if your application is declined.",
      },
      {
        type: "heading",
        level: 2,
        text: "Why the NZeTA Is Not Your Route",
      },
      {
        type: "paragraph",
        text: "The NZeTA is for travellers holding passports from countries on New Zealand's visa waiver list. It is a light authorisation layered on visa-free travel, not an alternative to a visa.",
      },
      {
        type: "paragraph",
        text: "India is not on that list, so an Indian passport holder applies for a Visitor Visa. Australian citizens travelling on an Australian passport need neither, which is worth knowing if you hold dual citizenship or are travelling with someone who does.",
      },
      {
        type: "heading",
        level: 2,
        text: "What It Actually Costs",
      },
      {
        type: "list",
        items: [
          "Visitor Visa: from NZD 441.",
          "International Visitor Conservation and Tourism Levy: NZD 100, paid at the same time as the visa application.",
          "The levy is not refunded if the application is declined.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "A declined application still costs you the levy",
        text: "Immigration New Zealand states plainly that the levy is not refunded even where an application is declined. That makes a weak application more expensive here than in most places, and it is a good argument for getting the file right the first time rather than submitting hopefully and reapplying.",
      },
      {
        type: "paragraph",
        text: "Some travellers are exempt from the levy, including Australian and New Zealand passport holders, many Pacific Island nationals, transit passengers at Auckland, and holders of a Business Visitor Visa or an APEC business travel card. Check whether your category is exempt before assuming the levy applies to you.",
      },
      {
        type: "heading",
        level: 2,
        text: "How Long You Can Actually Stay",
      },
      {
        type: "paragraph",
        text: "This is where planning goes wrong, because the limit is expressed as a total across a period rather than a single continuous stay:",
      },
      {
        type: "list",
        items: [
          "On a multiple-entry visa, you may stay up to a total of 6 months in each 12-month period.",
          "On a single-entry visa, you may stay up to 9 months within an 18-month period.",
        ],
      },
      {
        type: "paragraph",
        text: "The multiple-entry figure is cumulative, not per visit. Three separate trips of two and a half months each will exhaust it, and leaving the country between them does not reset the count. Anyone planning repeat family visits inside a year should work out the total before booking the second trip.",
      },
      {
        type: "heading",
        level: 2,
        text: "What the Application Has to Establish",
      },
      {
        type: "paragraph",
        text: "Immigration New Zealand assesses a visitor on a small number of clear tests. Each of your documents is evidence for one of them:",
      },
      {
        type: "list",
        items: [
          "That you have plans to leave New Zealand at the end of your stay.",
          "That you have enough money for your living expenses, or an acceptable sponsor.",
          "That you do not plan to work in New Zealand, unless you are working remotely for a business overseas.",
          "That you are in good health and of good character.",
          "That your reasons for visiting are genuine.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Remote work is explicitly allowed, in one narrow sense",
        text: "New Zealand carves out working remotely for an overseas business, which many countries do not. That is useful if you are visiting family for several weeks and intend to keep answering email. It is not permission to take up work in New Zealand, and describing your trip loosely as a work visit will get it read the wrong way.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where Applications from India Usually Weaken",
      },
      {
        type: "list",
        items: [
          "Budgeting for the visa fee alone and being surprised by the levy at payment.",
          "Submitting a thin application on the assumption that reapplying is cheap. It is not, because the levy does not come back.",
          "Treating the six-month allowance as per visit rather than cumulative across twelve months.",
          "A sponsor named in the application but not evidenced as acceptable.",
          "Describing remote work in terms that read as intending to work in New Zealand.",
          "Health or character matters left undisclosed rather than explained.",
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
          "You are visiting family who will sponsor your stay.",
          "You have already spent time in New Zealand in the past twelve months.",
          "You intend to work remotely for your Indian employer while there.",
          "You have a health condition that may need declaring.",
          "You have a previous refusal from New Zealand or elsewhere.",
          "You are travelling with dependants or elderly parents.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "How Visaworx Helps",
      },
      {
        type: "paragraph",
        text: "Visaworx is a visa intelligence and guidance service from KLAR Travels. We do not decide applications and we do not speak for Immigration New Zealand. What we can do is check the file against the five tests above before you pay, which matters more here than in most places precisely because a declined application does not return the levy. If you are unsure whether your funds or your sponsor will read as sufficient, that is worth resolving first.",
      },
      {
        type: "heading",
        level: 2,
        text: "Before You Apply",
      },
      {
        type: "list",
        items: [
          "Budget the visa fee and the levy together, not the fee alone.",
          "Check whether your category is exempt from the levy before assuming it applies.",
          "Add up any time already spent in New Zealand in the relevant period.",
          "Evidence your sponsor rather than naming them.",
          "Be precise about remote work if it applies to you.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Verify before you rely on this",
        text: "Fees, the levy and stay entitlements all change, and the levy amount was revised in recent years. Everything here was verified against Immigration New Zealand on 21 August 2026. Confirm the current figures on the official pages listed with this guide before you apply.",
      },
    ],
    relatedCountrySlugs: ["new-zealand"],
    relatedServiceSlugs: ["tourist-visa", "family-dependent-visa", "documentation-review"],
    faqIds: ["nz-in-1", "nz-in-2", "nz-in-3", "nz-in-4", "nz-in-5"],
    officialReferences: [
      {
        label: "Immigration New Zealand - Visitor Visa",
        url: "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/visitor-visa",
      },
      {
        label: "Immigration New Zealand - paying the International Visitor Levy",
        url: "https://www.immigration.govt.nz/process-to-apply/applying-for-a-visa/fees-processing-times-and-refunds/paying-the-international-visitor-levy/",
      },
      {
        label: "Immigration New Zealand - visa waiver countries and territories",
        url: "https://www.immigration.govt.nz/visit/what-you-need-to-visit-new-zealand/visa-waiver-countries-and-territories/",
      },
    ],
    lastReviewed: "2026-08-21",
    authorLabel: "Visaworx Visa Intelligence Team",
    seo: {
      title: "New Zealand Visitor Visa from India: Fees and Stay Limits",
      description:
        "Indian travellers need a New Zealand visitor visa, not an NZeTA. The NZD 441 fee, the NZD 100 levy that is not refunded if declined, and how the stay limits work.",
    },
  },
  {
    slug: "japan-visa-from-india",
    title: "Japan Visa from India: There Is No Sticker in Your Passport Any More",
    summary: "Japan issues Indian applicants an electronic visa rather than a sticker, and you have to show it on a phone at the airport. What the eVisa changed, what it costs, and the practical failure nobody warns you about.",
    category: "Country Guides",
    readingTime: "7 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Ananya kept flipping through her passport looking for the visa. She had applied, she had been approved, she had the confirmation. There was nothing pasted on any page, and for a worrying half hour before her flight she was convinced something had gone wrong. Nothing had. Japan simply does not put a sticker in Indian applicants' passports any more.",
      },
      {
        type: "paragraph",
        text: "Ananya is an illustration, but the confusion is genuine and it has a sharper edge than mere anxiety. The electronic visa has to be produced at the airport, on a screen, and that requirement has a practical failure mode most travellers do not plan for.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick answer",
        text: "Japan has issued eVisas in India since 1 April 2024, for single-entry short-term tourism of up to 90 days. Applications go through the Japan Visa Application Centres run by VFS Global, and the visa arrives electronically rather than as a sticker. From 1 July 2026 the visa fee for Indian nationals is INR 500 for single or multiple entry, with the VFS service fee charged on top.",
      },
      {
        type: "heading",
        level: 2,
        text: "What the eVisa Changed",
      },
      {
        type: "paragraph",
        text: "The Japan eVisa system started in India on 1 April 2024. It covers single-entry short-term stays for tourism, of up to 90 days, and is open to Indian nationals and to foreign nationals resident in India.",
      },
      {
        type: "paragraph",
        text: "The mechanics of applying did not change as much as people expect. You still submit through a Japan Visa Application Centre operated by VFS Global. What changed is the output: instead of a visa sticker in your passport, you receive a visa issuance notice in electronic form.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "You need a working phone and internet at the airport",
        text: "The visa issuance notice has to be shown on a mobile device at the airport, and displaying it needs internet access. A screenshot is not what is being asked for, a dead battery is a problem, and an Indian SIM with no roaming in a transit airport is a problem. Charge the phone, and know how you will get online before you reach the counter.",
      },
      {
        type: "heading",
        level: 2,
        text: "What It Costs",
      },
      {
        type: "list",
        items: [
          "Visa fee for Indian nationals, from 1 July 2026: INR 500, for single or multiple entry.",
          "The VFS Global service fee is charged in addition to that.",
        ],
      },
      {
        type: "paragraph",
        text: "By international standards this is a low fee, and it is worth saying so plainly, because the gap between the government fee and what some intermediaries charge is wide. If a service is quoting you many multiples of this, you are paying for their handling rather than for the visa.",
      },
      {
        type: "heading",
        level: 2,
        text: "Short-Term Stay Means What It Says",
      },
      {
        type: "paragraph",
        text: "The eVisa route covers short-term tourism of up to 90 days. It is not a work permission, not a study permission, and not a route to a longer stay that gets extended after arrival.",
      },
      {
        type: "paragraph",
        text: "If your purpose is anything other than a short visit, the eVisa is the wrong instrument and applying under it because it is the convenient one is the kind of mismatch that causes trouble at the border rather than at the application stage.",
      },
      {
        type: "heading",
        level: 2,
        text: "What a Japanese Visitor Application Rests On",
      },
      {
        type: "paragraph",
        text: "Japan places unusual weight on the itinerary. Where some consulates want to see funds and ties above all, a Japanese application is read for whether the trip described actually hangs together:",
      },
      {
        type: "list",
        items: [
          "A day-by-day schedule that is internally consistent and matches your bookings.",
          "Financial capacity for the trip as described, from an explainable source.",
          "Accommodation that corresponds to the itinerary rather than contradicting it.",
          "A clear, temporary purpose with a defined end.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "The itinerary is not a formality",
        text: "A schedule assembled quickly to fill a required field, with cities in an impossible order or hotel dates that do not match the travel days, undermines the rest of a perfectly good application. Build the itinerary from the bookings you actually hold, not the other way round.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where Applications from India Usually Go Wrong",
      },
      {
        type: "list",
        items: [
          "Searching the passport for a sticker that will not be there, and assuming the application failed.",
          "Arriving at the airport with a flat phone or no way to get online to display the visa issuance notice.",
          "Paying an intermediary many times the actual visa fee without realising how low the official charge is.",
          "An itinerary that does not match the accommodation or flight dates.",
          "Applying under short-term tourism for a trip whose real purpose is something else.",
          "Leaving too little time before travel, because the eVisa still goes through a visa application centre.",
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
          "You are a foreign national resident in India rather than an Indian citizen.",
          "You are travelling for business meetings rather than tourism.",
          "You are visiting relatives who will host you.",
          "You need multiple entries rather than one.",
          "You have a previous refusal from Japan or elsewhere.",
          "Your trip is longer than a short-term stay allows.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "How Visaworx Helps",
      },
      {
        type: "paragraph",
        text: "Visaworx is a visa intelligence and guidance service from KLAR Travels. We do not issue Japanese visas and we do not speak for the Ministry of Foreign Affairs or its visa application centres. Where we are useful is in checking that the trip you are describing holds together on paper before it is submitted, and that you are applying under the right category for what you actually intend to do.",
      },
      {
        type: "heading",
        level: 2,
        text: "Before You Fly",
      },
      {
        type: "list",
        items: [
          "Expect an electronic notice, not a sticker.",
          "Charge your phone and arrange internet access for the airport.",
          "Check the government fee before agreeing to any handling charge.",
          "Make the itinerary match the bookings exactly.",
          "Apply under the category that matches your real purpose.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Verify before you rely on this",
        text: "Japanese visa fees and the scope of the eVisa system have both changed since it launched in India, and the fee stated here took effect on 1 July 2026. Everything was verified against Ministry of Foreign Affairs and Embassy of Japan sources on 21 August 2026. Confirm the current position before you apply.",
      },
    ],
    relatedCountrySlugs: ["japan"],
    relatedServiceSlugs: ["tourist-visa", "business-visa", "documentation-review"],
    faqIds: ["jp-in-1", "jp-in-2", "jp-in-3", "jp-in-4", "jp-in-5"],
    officialReferences: [
      {
        label: "Ministry of Foreign Affairs of Japan - the JAPAN eVISA system",
        url: "https://www.mofa.go.jp/j_info/visit/visa/visaonline.html",
      },
      {
        label: "Ministry of Foreign Affairs of Japan - visa fees",
        url: "https://www.mofa.go.jp/j_info/visit/visa/procedure/fee.html",
      },
      {
        label: "Embassy of Japan in India - visa information",
        url: "https://www.in.emb-japan.go.jp/itpr_en/Visa.html",
      },
      {
        label: "Ministry of Foreign Affairs of Japan - eVISA FAQ",
        url: "https://www.mofa.go.jp/j_info/visit/visa/page22e_000999.html",
      },
    ],
    lastReviewed: "2026-08-21",
    authorLabel: "Visaworx Visa Intelligence Team",
    seo: {
      title: "Japan Visa from India: eVisa, Fees and Airport Checks",
      description:
        "Japan issues Indian applicants an electronic visa, not a passport sticker, and it must be shown on a phone at the airport. The INR 500 fee and what to prepare.",
    },
  },
  {
    slug: "south-korea-visa-from-india",
    title: "South Korea Visa from India: K-ETA Is Not Your Route",
    summary: "K-ETA is only for travellers who can enter Korea without a visa, which does not include Indian passport holders. What the C-3-9 tourist visa costs, where it is submitted, and why the official K-ETA site warns about paid agencies.",
    category: "Country Guides",
    readingTime: "7 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Every article Divya read about visiting Korea mentioned K-ETA. Apply for your K-ETA, allow seventy-two hours for your K-ETA, do not forget your K-ETA. She found a site that would file it for her, paid, and received something. What she had not found anywhere was a plain statement that K-ETA was never available to her in the first place.",
      },
      {
        type: "paragraph",
        text: "Divya is an illustration, but the trap is real and Korea's own authorities are alert to it. The official K-ETA service carries a warning about third-party agencies charging inflated fees, which tells you how routinely people are sold something they either do not need or cannot use.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick answer",
        text: "K-ETA is only for nationals of countries that can enter Korea without a visa. Indian passport holders are not in that group, so the route is a short-term visitor visa, category C-3-9, submitted through the Korea Visa Application Centre. The basic rate for a single-entry tourist visa allowing a stay of no more than 90 days is USD 40, though fees differ for some countries and should be confirmed with the mission.",
      },
      {
        type: "heading",
        level: 2,
        text: "Why K-ETA Does Not Apply to You",
      },
      {
        type: "paragraph",
        text: "K-ETA exists for travellers who are already allowed to enter Korea without a visa. It is a pre-travel authorisation layered on visa-free entry, not a replacement for a visa or a cheaper alternative to one.",
      },
      {
        type: "paragraph",
        text: "Because Indian passport holders need a visa for Korea, K-ETA is not part of the process. Applying for one, or paying somebody to apply for one, does nothing about the requirement you actually have.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "The authority itself warns about this",
        text: "The official K-ETA service states that applications are only made through its own website or app, and cautions against third-party agencies charging inflated fees. If you are being quoted a large sum for a Korean travel authorisation, that is a signal worth stopping on, particularly since the thing being sold may not apply to your passport at all.",
      },
      {
        type: "paragraph",
        text: "This is the third destination in a row where an electronic travel authorisation gets mistaken for a visa route. The UK has an ETA, Canada has an eTA, Korea has K-ETA, and none of the three is open to Indian passport holders. The pattern is worth internalising: these schemes are almost always built for travellers who already did not need a visa.",
      },
      {
        type: "heading",
        level: 2,
        text: "What You Actually Apply For",
      },
      {
        type: "paragraph",
        text: "The short-term visit categories cover tourism and similar purposes, with C-3-9 being the tourist visa. A single-entry tourist visa permits a stay of no more than 90 days.",
      },
      {
        type: "list",
        items: [
          "Basic rate for a single-entry C-3-9: USD 40.",
          "Fees quoted by Korean missions are basic rates, and different fees apply to some countries.",
          "The Korea Visa Application Centre charges its own service fee in addition.",
        ],
      },
      {
        type: "paragraph",
        text: "That caveat about basic rates is the mission's own, not ours, and it is the reason to confirm your figure with the mission handling your application rather than reading a number off a general page.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where It Is Submitted",
      },
      {
        type: "paragraph",
        text: "The Embassy operates a Korea Visa Application Centre in partnership with VFS Global, and it handles the whole process rather than only collection: submission, processing, issuance, collection and counselling all happen through the Centre.",
      },
      {
        type: "paragraph",
        text: "Korea maintains an Embassy in New Delhi and Consulates General in Mumbai and Chennai. Which mission is competent for your application depends on where you are, and that determines whose fee schedule and instructions apply to you.",
      },
      {
        type: "heading",
        level: 2,
        text: "What a Korean Visitor Application Rests On",
      },
      {
        type: "paragraph",
        text: "As with most short-term visitor categories, the assessment is about whether the visit is genuine and temporary. In practice that means:",
      },
      {
        type: "list",
        items: [
          "A purpose that matches the category you are applying under.",
          "A trip that is affordable on funds you can account for.",
          "Ties to India that make return the expected outcome.",
          "Documents that agree with each other and with the dates you have given.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Apply under the right short-term category",
        text: "C-3 covers several short-term purposes and C-3-9 is the tourist one. Applying under tourism because it looks like the simplest option, when the actual purpose is a conference or business meetings, is a mismatch between what you have asked for and what your documents show. Pick the category that describes the trip.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where Applications from India Usually Go Wrong",
      },
      {
        type: "list",
        items: [
          "Pursuing K-ETA because every article mentions it, and losing time before starting the actual application.",
          "Paying a third-party site for a Korean travel authorisation that does not apply to an Indian passport.",
          "Reading a fee off a general page without checking what applies at the mission handling your case.",
          "Applying under tourism for a trip that is really business or a conference.",
          "Submitting close to travel without allowing for centre processing.",
          "Assuming a transit through Seoul carries the same permissions as a visit.",
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
          "You are transferring through a Korean airport rather than visiting. Korea publishes separate arrangements for transfer passengers, with their own conditions - check them with the Embassy directly rather than assuming they cover you.",
          "You are attending a conference or business meetings rather than travelling as a tourist.",
          "You need multiple entries.",
          "You are visiting family or a host in Korea.",
          "You have a previous refusal from Korea or elsewhere.",
          "You are applying from a city served by a different mission than you expected.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "How Visaworx Helps",
      },
      {
        type: "paragraph",
        text: "Visaworx is a visa intelligence and guidance service from KLAR Travels. We do not issue Korean visas and we do not speak for the Embassy or its visa application centre. What we can do is confirm which route and which category actually apply before you spend anything, which for Korea is most of the value, because the common failure here is money and time spent on the wrong instrument entirely.",
      },
      {
        type: "heading",
        level: 2,
        text: "Before You Apply",
      },
      {
        type: "list",
        items: [
          "Rule K-ETA out. On an Indian passport it is not your route.",
          "Identify which mission is competent for where you live.",
          "Confirm the fee with that mission rather than a general page.",
          "Choose the short-term category that matches your real purpose.",
          "If you are only transiting, check the transfer arrangements separately.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Verify before you rely on this",
        text: "Korean visa fees are published as basic rates that vary by country, and entry arrangements change. Everything here was verified against Korean Ministry of Foreign Affairs and K-ETA sources on 21 August 2026. Confirm the current position with the mission handling your application before you apply.",
      },
    ],
    relatedCountrySlugs: ["south-korea"],
    relatedServiceSlugs: ["tourist-visa", "business-visa", "documentation-review"],
    faqIds: ["kr-in-1", "kr-in-2", "kr-in-3", "kr-in-4", "kr-in-5"],
    officialReferences: [
      {
        label: "K-ETA - official application service",
        url: "https://www.k-eta.go.kr/portal/apply/index.do",
      },
      {
        label: "Embassy of the Republic of Korea in India - visa",
        url: "https://overseas.mofa.go.kr/in-en/wpge/m_2660/contents.do",
      },
      {
        label: "Consulate General of the Republic of Korea in Mumbai - visa requirements",
        url: "https://overseas.mofa.go.kr/in-mumbai-en/brd/m_1978/view.do?seq=717617&page=1",
      },
      {
        label: "Consulate General of the Republic of Korea in Chennai - visa issuance",
        url: "https://overseas.mofa.go.kr/in-chennai-en/wpge/m_2782/contents.do",
      },
    ],
    lastReviewed: "2026-08-21",
    authorLabel: "Visaworx Visa Intelligence Team",
    seo: {
      title: "South Korea Visa from India: C-3-9, Fees and K-ETA",
      description:
        "K-ETA is only for visa-free nationals, so Indian travellers need a C-3-9 tourist visa. What it costs, where it is submitted, and the agency warning to heed.",
    },
  },
  {
    slug: "travel-authorisations-are-not-visas",
    title: "ETA, eTA, ETIAS, NZeTA, K-ETA: None of Them Are Your Visa",
    summary: "Five countries now run quick online travel authorisations, and Indian passport holders are eligible for none of them. Why that is, how to tell an authorisation from an eVisa, and what the distinction costs travellers who miss it.",
    category: "Visa Preparation",
    readingTime: "8 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "The same conversation happens in five different shapes. Someone reads that Britain now has a quick online travel authorisation, or that Europe is introducing one, or that Korea requires one, and concludes that visiting has become simpler. They go looking for the application, and either cannot complete it or pay somebody who says they can. What almost nothing they read said plainly is who these schemes were built for.",
      },
      {
        type: "paragraph",
        text: "They were built for travellers who did not need a visa in the first place. If you hold an Indian passport, that describes none of these destinations, and the authorisation is not a route you can take.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick answer",
        text: "An electronic travel authorisation is a light pre-screening layered on top of visa-free travel. It is not a visa, not a cheaper alternative to one, and not available to travellers whose nationality requires a visa. Indian passport holders are not eligible for the UK ETA, the Canadian eTA, ETIAS, the NZeTA or K-ETA, and in each case the route remains a visa.",
      },
      {
        type: "heading",
        level: 2,
        text: "What an Authorisation Actually Is",
      },
      {
        type: "paragraph",
        text: "Countries that allow certain nationalities to arrive without a visa historically knew nothing about those travellers until they reached the border. An electronic travel authorisation closes that gap: a short online form, screened in advance, for people who were already going to be let in.",
      },
      {
        type: "paragraph",
        text: "That is the whole design. It adds a check to visa-free travel. It does not create a new way in for anyone who needed a visa before, which is why eligibility is decided by your nationality before anything else about you is considered.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Five, and Where Indian Passports Stand",
      },
      {
        type: "heading",
        level: 3,
        text: "United Kingdom - ETA",
      },
      {
        type: "paragraph",
        text: "Open only to nationalities on the ETA national list. India is not on it, and GOV.UK states directly that other nationalities cannot get an ETA and should check whether they need a visa instead. The route is a Standard Visitor visa.",
      },
      {
        type: "heading",
        level: 3,
        text: "Canada - eTA",
      },
      {
        type: "paragraph",
        text: "Canada is the interesting one, because it does extend the eTA to citizens of some visa-required countries, on condition they have held a Canadian visitor visa in the past ten years or hold a valid US non-immigrant visa, and only for travel by air. That has convinced a lot of people that a US visa is the key. It is not: the nationality has to be on the eligible list first, and India is not currently among them. Indian citizens apply for a Temporary Resident Visa.",
      },
      {
        type: "heading",
        level: 3,
        text: "European Union - ETIAS",
      },
      {
        type: "paragraph",
        text: "For nationals who may enter the Schengen Area without a visa. Indian passport holders need a Schengen visa, so ETIAS does not apply to them, and it is not yet in operation for anyone. If you hold a valid Schengen visa, that visa is your authorisation.",
      },
      {
        type: "heading",
        level: 3,
        text: "New Zealand - NZeTA",
      },
      {
        type: "paragraph",
        text: "For passports on New Zealand's visa waiver list. India is not on it, so the route is a Visitor Visa. Australian citizens travelling on an Australian passport need neither.",
      },
      {
        type: "heading",
        level: 3,
        text: "South Korea - K-ETA",
      },
      {
        type: "paragraph",
        text: "For nationals of countries that can enter Korea without a visa. Indian passport holders require a visa, so the route is a short-term visitor visa. Korea's own K-ETA service warns that applications are made only through its website or app, and cautions against third-party agencies charging inflated fees.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Why this keeps costing people money",
        text: "These schemes are cheap, heavily publicised and easy to imitate. A site that looks official, charges a fee and returns a document is a low-effort business, and the traveller often does not discover the problem until departure. Korea's authority has said so publicly. If a service is selling you a travel authorisation for a country where you need a visa, there is nothing genuine to buy.",
      },
      {
        type: "heading",
        level: 2,
        text: "An eVisa Is Not the Same Thing",
      },
      {
        type: "paragraph",
        text: "This is where the vocabulary genuinely misleads, because some destinations do issue Indian travellers a visa electronically, and that is a completely different animal.",
      },
      {
        type: "paragraph",
        text: "Japan is the clear example. Since April 2024 Indian applicants receive an eVisa: a real short-term visa, assessed on the same basis as before, delivered as an electronic issuance notice rather than a sticker in the passport. The delivery mechanism changed. The permission did not.",
      },
      {
        type: "list",
        items: [
          "A travel authorisation screens people who do not need a visa. Nationality decides eligibility.",
          "An eVisa is a visa, assessed as one, delivered digitally. Your circumstances decide the outcome.",
          "A conditional visa on arrival, such as the UAE's for Indian passport holders with certain other visas or residence permits, is a third thing again, and depends on documents you already hold.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Read the noun, not the format",
        text: "Whether something arrives by email tells you nothing about what it is. Ask instead what the scheme is for. If the answer is people who do not need a visa, it is not for you. If it is a visa that happens to be issued electronically, it is, and the usual preparation applies in full.",
      },
      {
        type: "heading",
        level: 2,
        text: "What This Costs When It Is Missed",
      },
      {
        type: "list",
        items: [
          "Time. Weeks spent pursuing an authorisation are weeks not spent on the visa, and several of these destinations have narrow application windows.",
          "Money paid to intermediaries for a document that does not apply.",
          "Trips planned around an authorisation timeline of days, when a visa needs considerably longer.",
          "Bookings made non-refundable on the assumption that entry was already sorted.",
        ],
      },
      {
        type: "paragraph",
        text: "None of these is a documentation problem. They all happen before the application starts, which is exactly why they are cheap to avoid and expensive to discover late.",
      },
      {
        type: "heading",
        level: 2,
        text: "How to Check, in Order",
      },
      {
        type: "list",
        items: [
          "Start with your nationality, not the destination's newest scheme.",
          "Find the destination's own eligibility list and look for India on it.",
          "If India is absent, the scheme is not your route, whatever the coverage says.",
          "Establish which visa category matches your purpose.",
          "Work the timeline back from that, not from an authorisation turnaround.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "How Visaworx Helps",
      },
      {
        type: "paragraph",
        text: "Visaworx is a visa intelligence and guidance service from KLAR Travels. We do not issue visas or authorisations and we do not speak for any government. What we do is settle this question first, because it is upstream of everything else: which route actually applies to your passport and your purpose. Almost every expensive visa mistake we see began with a route decision made on a headline rather than an eligibility list.",
      },
      {
        type: "callout",
        tone: "expert",
        title: "Verify before you rely on this",
        text: "Eligibility lists change and have been extended more than once. All five schemes were checked against their own official sources on 21 August 2026. Before you plan around any of this, confirm the current position on the destination's official eligibility page, because the day India appears on one of these lists, the answer for that country changes.",
      },
    ],
    relatedCountrySlugs: ["united-kingdom", "canada", "schengen", "new-zealand", "south-korea"],
    relatedServiceSlugs: ["tourist-visa", "visa-readiness-review"],
    faqIds: ["auth-1", "auth-2", "auth-3", "auth-4", "auth-5"],
    officialReferences: [
      {
        label: "GOV.UK - check if you can get an ETA",
        url: "https://www.gov.uk/guidance/check-when-you-can-get-an-electronic-travel-authorisation-eta",
      },
      {
        label: "IRCC - eTA eligibility, citizens from some visa-required countries",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/eligibility/eta-x.html",
      },
      {
        label: "European Union - ETIAS",
        url: "https://travel-europe.europa.eu/etias_en",
      },
      {
        label: "Immigration New Zealand - visa waiver countries and territories",
        url: "https://www.immigration.govt.nz/visit/what-you-need-to-visit-new-zealand/visa-waiver-countries-and-territories/",
      },
      {
        label: "K-ETA - official application service",
        url: "https://www.k-eta.go.kr/portal/apply/index.do",
      },
    ],
    lastReviewed: "2026-08-21",
    authorLabel: "Visaworx Visa Intelligence Team",
    seo: {
      title: "ETA, eTA, ETIAS, NZeTA, K-ETA: Not Visas for Indians",
      description:
        "Five online travel authorisations, and Indian passport holders are eligible for none. How they differ from an eVisa, and what missing the distinction costs.",
    },
  },
  {
    slug: "what-indian-financial-documents-prove",
    title: "ITR, Form 16 and Bank Statements: What Each One Actually Proves",
    summary: "Indian applicants are asked for a specific stack of financial documents, and each one corroborates the last from a more independent source. Understanding that chain explains why a strong balance alone rarely carries an application.",
    category: "Documentation",
    readingTime: "8 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Vikram had money in the bank and could not understand the problem. The balance was comfortable, the statement was stamped, and he had been told financial capacity was the main hurdle. What he had not been asked, and had not asked himself, was where the money came from and who else could confirm it.",
      },
      {
        type: "paragraph",
        text: "Vikram is an illustration, but the misunderstanding is close to universal among Indian applicants. The document stack you are asked for is not four separate proofs of the same thing. It is a chain, and each link is issued by someone with less reason to flatter you than the last.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick answer",
        text: "A bank statement shows that money exists. A payslip states what you claim to earn. Form 16 is your employer confirming they deducted tax on that salary. Form 26AS is the Income Tax Department's own record of what it received. The ITR acknowledgement shows what you declared. A consular officer reads these together, and the strength of your case comes from how well they agree.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Chain, from Weakest to Strongest",
      },
      {
        type: "paragraph",
        text: "Each of these is evidence of a different kind, and they are not interchangeable.",
      },
      {
        type: "heading",
        level: 3,
        text: "Bank statement - money moved",
      },
      {
        type: "paragraph",
        text: "The weakest link on its own, because it shows only that funds are present. It says nothing about where they came from. This is precisely why a large balance with no visible income pattern behind it can weaken an application rather than strengthen it.",
      },
      {
        type: "heading",
        level: 3,
        text: "Payslips - what you say you earn",
      },
      {
        type: "paragraph",
        text: "A claim about income. It becomes meaningful when the salary credits in the bank statement match the payslips month by month, and much less meaningful when they do not.",
      },
      {
        type: "heading",
        level: 3,
        text: "Form 16 - your employer confirming tax was deducted",
      },
      {
        type: "paragraph",
        text: "A tax deduction certificate issued by your employer, showing the tax deducted at source from your salary. It matters because your employer has legal exposure for what it says. That is a materially stronger statement than a payslip you could have been handed on request.",
      },
      {
        type: "heading",
        level: 3,
        text: "Form 26AS - the tax department's own record",
      },
      {
        type: "paragraph",
        text: "An annual statement drawn from the Income Tax Department's database against your PAN, showing tax deducted and collected at source. Neither you nor your employer authored it, which makes it the most independent document in the stack.",
      },
      {
        type: "heading",
        level: 3,
        text: "ITR acknowledgement - what you declared",
      },
      {
        type: "paragraph",
        text: "The acknowledgement you receive after e-filing your return. Note carefully what it is: proof that a return was submitted. It records your declaration, which is why it is read alongside Form 26AS rather than instead of it.",
      },
      {
        type: "callout",
        tone: "expert",
        title: "Mismatches are visible before anyone looks for them",
        text: "The Income Tax Department itself flags that figures in Form 26AS should be compared against Form 16, because discrepancies cause problems with your tax. The same discrepancy in a visa file causes a different problem. An officer comparing your documents is doing a version of the reconciliation your accountant should already have done.",
      },
      {
        type: "heading",
        level: 2,
        text: "What Consulates Actually Ask For",
      },
      {
        type: "paragraph",
        text: "Requirements are set by the mission deciding your application, and they differ. As an illustration, the checklist German missions publish for tourism applicants in India asks for different combinations depending on how you earn:",
      },
      {
        type: "list",
        items: [
          "Salaried: payslips for the last three months, employment contract, leave sanction letter, stamped bank statements for the last three months, and income tax records such as ITR acknowledgements for two years or Form 16.",
          "Self-employed and business owners: company registration with GST details, income tax acknowledgements for two years, and stamped bank statements.",
          "Retired: pension statements alongside bank statements.",
          "Students: enrolment certificate and a no-objection letter from the institution.",
        ],
      },
      {
        type: "paragraph",
        text: "The pattern is consistent even where the specifics differ: an income claim, an independent corroboration of it, and a bank record that agrees with both.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "There is no official minimum balance",
        text: "No Schengen-wide, UK-wide or generally applicable minimum bank balance exists, and any figure presented as the official threshold is invented. What is assessed is whether your funds are consistent with the trip you have described and whether their origin is explainable. That is a question about coherence, not about a number.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where the Chain Breaks for Indian Applicants",
      },
      {
        type: "paragraph",
        text: "Several very ordinary Indian financial situations produce a broken chain through no fault of the applicant. None of them is disqualifying. All of them need explaining rather than hoping:",
      },
      {
        type: "list",
        items: [
          "Income received partly in cash, so the bank statement understates what you actually earn.",
          "Declared income lower than the lifestyle the bank statement implies, which is a question waiting to be asked.",
          "Funds held in a spouse's or parent's account, or in a joint account, rather than your own.",
          "A large deposit shortly before applying, which reads as arranged rather than accumulated.",
          "Agricultural income, which is exempt and therefore leaves little tax trail to corroborate it.",
          "Self-employment with genuine but irregular receipts, where three months of statements are unrepresentative.",
        ],
      },
      {
        type: "paragraph",
        text: "In each case the fix is the same in shape: supply the missing link deliberately. If the money came from selling property, show the sale. If a parent is funding the trip, evidence the parent and the relationship rather than merely asserting it. An officer who has to guess at the gap will not guess generously.",
      },
      {
        type: "heading",
        level: 2,
        text: "Presenting It Well",
      },
      {
        type: "list",
        items: [
          "Statements issued and stamped by the bank, not printed from a screen.",
          "The period the mission asked for, not a longer one assembled to look thorough.",
          "Salary credits identifiable as such, so they can be matched to payslips.",
          "Any unusual credit accompanied by its explanation, in the file rather than in your head.",
          "Figures that reconcile across the documents before anyone else reconciles them.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "More documents is not more evidence",
        text: "A thick bundle of everything you own is harder to read and easier to find contradictions in. A focused set that tells one coherent story about one trip is consistently stronger than an exhaustive one that does not.",
      },
      {
        type: "heading",
        level: 2,
        text: "How Visaworx Helps",
      },
      {
        type: "paragraph",
        text: "Visaworx is a visa intelligence and guidance service from KLAR Travels. We do not decide applications and we do not speak for any consulate. What we can do is read your financial documents the way an officer will and tell you where they disagree with each other, which is almost always something you can fix before submitting and almost never something you can fix afterwards.",
      },
      {
        type: "heading",
        level: 2,
        text: "Before You Submit",
      },
      {
        type: "list",
        items: [
          "Check that salary credits match your payslips.",
          "Check that Form 16 and Form 26AS agree.",
          "Be able to explain every credit that is not routine income.",
          "Evidence any sponsor rather than naming them.",
          "Ask what your documents would look like to someone who has never met you.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Verify before you rely on this",
        text: "Consular checklists are set by the mission deciding your application and change over time. The German missions checklist referenced here and the descriptions of Indian tax documents were verified against official sources on 21 August 2026. Read the checklist published by the consulate handling your case.",
      },
    ],
    relatedCountrySlugs: ["schengen", "united-kingdom", "united-states"],
    relatedServiceSlugs: ["documentation-review", "visa-readiness-review"],
    faqIds: ["fin-in-1", "fin-in-2", "fin-in-3", "fin-in-4", "fin-in-5"],
    officialReferences: [
      {
        label: "Income Tax Department - Form 26AS and tax credit statement",
        url: "https://www.incometaxindia.gov.in/tax-services/online-26as-e-filing-website",
      },
      {
        label: "Income Tax Department - filing an income tax return",
        url: "https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/file-itr-1-sahaj-online",
      },
      {
        label: "German Federal Foreign Office - tourism checklist (India)",
        url: "https://india.diplo.de/in-en/2674158-2674158",
      },
    ],
    lastReviewed: "2026-08-21",
    authorLabel: "Visaworx Visa Intelligence Team",
    seo: {
      title: "ITR, Form 16 and Bank Statements for Visa Applications",
      description:
        "What Indian financial documents actually prove to a consular officer, why a strong balance alone rarely carries an application, and how to fix a broken chain.",
    },
  },
  {
    slug: "when-someone-else-funds-your-trip",
    title: "Sponsored Trips: What You Are Actually Asking Your Relative to Sign",
    summary: "A sponsor is not lending you money, they are becoming a guarantor. What the obligation covers, how long it lasts, who is allowed to take it on, and why a host and a payer are two different roles.",
    category: "Documentation",
    readingTime: "8 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Farhan's cousin in Rotterdam said yes immediately. Of course he would sponsor the trip, of course he would sign whatever was needed. Neither of them read what the form said, because it was a family favour and family favours do not usually come with terms. It was only at the municipal counter, being asked to sign in front of an official, that it started to feel like something else.",
      },
      {
        type: "paragraph",
        text: "Farhan is an illustration, but the gap between what is asked and what is understood is real and it runs both ways. Applicants think they are asking for money. Sponsors think they are confirming goodwill. In several countries what is actually being signed is a guarantee with a defined scope and a long tail.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Quick answer",
        text: "Third-party funding is permitted almost everywhere, but a sponsor is a guarantor rather than a well-wisher. Under Dutch rules, for example, a sponsor guarantees costs relating to the visitor's stay, medical care and repatriation, must meet eligibility conditions of their own, and remains bound until the visitor leaves the Schengen area or five years after the form was legalised, whichever comes first.",
      },
      {
        type: "heading",
        level: 2,
        text: "What the Obligation Actually Covers",
      },
      {
        type: "paragraph",
        text: "The scope is wider than most sponsors expect, and the third item is the one nobody anticipates. Taking the Netherlands as a worked example, a sponsor acts as guarantor for:",
      },
      {
        type: "list",
        items: [
          "Costs relating to the visitor's stay.",
          "Medical care.",
          "Repatriation.",
        ],
      },
      {
        type: "paragraph",
        text: "Repatriation is the word that changes the conversation. A sponsor who imagined they were covering hotel bills is also standing behind the cost of getting the visitor home if something goes wrong. That is not a reason to avoid sponsorship. It is a reason to have the conversation honestly before someone signs.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "The obligation can outlast the trip by years",
        text: "Under Dutch rules the sponsorship ends when the visitor leaves the Schengen area or five years after the form has been legalised, whichever comes first. A two-week holiday can therefore carry a commitment that remains live long after the holiday ended. Anyone signing should know that before they do.",
      },
      {
        type: "heading",
        level: 2,
        text: "Not Everyone Can Sponsor",
      },
      {
        type: "paragraph",
        text: "This is the part that derails plans late, because the applicant has usually already decided who is sponsoring them. Again using the Dutch conditions as the example, a sponsor must:",
      },
      {
        type: "list",
        items: [
          "Reside in the country concerned.",
          "Be at least 18 years old.",
          "Hold the local civic registration number, which in the Netherlands is the citizen service number.",
          "Have steady and sufficient income for at least the next twelve months.",
        ],
      },
      {
        type: "paragraph",
        text: "That last condition is forward-looking, which surprises people. It is not enough to be earning well today. A relative on a contract that ends in four months may not qualify, however willing and however comfortable their current salary.",
      },
      {
        type: "heading",
        level: 2,
        text: "A Host and a Payer Are Two Different Roles",
      },
      {
        type: "paragraph",
        text: "Families routinely split these without realising they have. You stay with one relative and a different relative pays. Administratively that is two roles, and both have to be documented.",
      },
      {
        type: "paragraph",
        text: "Where the person paying is not the person you are staying with, the host is generally required to provide a separate invitation or complete a separate sponsorship form of their own. Submitting one form covering both leaves half the arrangement unevidenced.",
      },
      {
        type: "heading",
        level: 2,
        text: "Signing Is a Formal Act",
      },
      {
        type: "paragraph",
        text: "Under the Dutch rules, legalisation is required specifically because the visitor needs a visa: the sponsor signs before a municipal official rather than at their kitchen table. Visitors who do not need a visa may have a self-signed form accepted.",
      },
      {
        type: "paragraph",
        text: "For an Indian applicant that distinction matters, because you are in the category that triggers the formal route. Your sponsor will need to attend in person, which takes time and needs planning into your timeline rather than discovering in the final week.",
      },
      {
        type: "callout",
        tone: "expert",
        title: "Requirements are set by the country deciding your case",
        text: "The conditions above are the Netherlands' own and are used here because they are published clearly. German missions in India, for instance, ask for proof of sponsorship or private accommodation from the host, the third person's signed confirmation, proof of address and a copy of their passport or national ID. The shape is similar everywhere; the specifics are not. Read the form your destination publishes.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where Other Destinations Sit",
      },
      {
        type: "list",
        items: [
          "United Kingdom: you must be able to support yourself and your dependants during the trip, or have funding from someone else. GOV.UK permits third-party funding without publishing sponsor eligibility conditions or a minimum figure on that page.",
          "New Zealand: you need enough money for your living expenses or an acceptable sponsor, with acceptability being the operative word.",
          "Schengen states: a sponsorship or private accommodation declaration, with the detail set by the state deciding the application.",
        ],
      },
      {
        type: "paragraph",
        text: "The common thread is that a sponsor must be evidenced, not merely named. Naming a relative establishes that you know them. It establishes nothing about whether they can or will pay.",
      },
      {
        type: "heading",
        level: 2,
        text: "What a Sponsored Application Has to Show",
      },
      {
        type: "list",
        items: [
          "Who the sponsor is, with identity and address documents.",
          "Their relationship to you, stated plainly rather than implied.",
          "Their financial position, on the terms the destination asks for.",
          "Their status in the country, where residence or registration is a condition.",
          "Their willingness, on the prescribed form rather than in a letter of your own drafting.",
          "Where host and payer differ, both roles documented separately.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Why a sponsor does not remove the funds question",
        text: "A sponsored applicant is often told they need show nothing about their own finances. That is rarely how it reads. Your own position still speaks to whether the trip is plausible and whether you will return, which is a separate question from who pays for the hotel. Sponsorship answers affordability, not intent.",
      },
      {
        type: "heading",
        level: 2,
        text: "Where Sponsored Applications Usually Weaken",
      },
      {
        type: "list",
        items: [
          "A sponsor named in the application and evidenced nowhere in it.",
          "A sponsor who does not meet the destination's own eligibility conditions, discovered late.",
          "One form submitted where the host and the payer are different people.",
          "A letter written by the applicant instead of the prescribed declaration.",
          "A signing appointment left until the final week, where legalisation is required.",
          "The applicant's own circumstances left thin on the assumption that sponsorship covers everything.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "How Visaworx Helps",
      },
      {
        type: "paragraph",
        text: "Visaworx is a visa intelligence and guidance service from KLAR Travels. We do not decide applications and we do not speak for any consulate. What we can do is check whether the person you are relying on actually qualifies under the rules that will be applied, and whether both roles are covered where a host and a payer differ. That is a cheap conversation to have early and an expensive one to have after a refusal.",
      },
      {
        type: "heading",
        level: 2,
        text: "Before You Ask Someone",
      },
      {
        type: "list",
        items: [
          "Read the destination's sponsorship form yourself before asking anyone to sign it.",
          "Check the eligibility conditions against your intended sponsor honestly.",
          "Tell them what the obligation covers, including how long it lasts.",
          "Establish whether your host and your payer are the same person.",
          "Book any legalisation appointment early.",
          "Keep preparing your own financial and ties evidence regardless.",
        ],
      },
      {
        type: "callout",
        tone: "expert",
        title: "Verify before you rely on this",
        text: "Sponsorship rules are set nationally and change. The Dutch conditions used as the worked example, the German checklist requirements, and the UK and New Zealand positions were all verified against official sources on 21 August 2026. Read the current form and conditions published by the country deciding your application.",
      },
    ],
    relatedCountrySlugs: ["schengen", "united-kingdom", "new-zealand"],
    relatedServiceSlugs: ["documentation-review", "family-dependent-visa", "visa-readiness-review"],
    faqIds: ["spon-1", "spon-2", "spon-3", "spon-4", "spon-5"],
    officialReferences: [
      {
        label: "Government of the Netherlands - sponsoring a visitor",
        url: "https://www.netherlandsworldwide.nl/visa-the-netherlands/sponsoring",
      },
      {
        label: "Government of the Netherlands - proof of sponsorship for a short stay",
        url: "https://www.netherlandsworldwide.nl/visa-the-netherlands/sponsor-invite-short-stay",
      },
      {
        label: "German Federal Foreign Office - visit family and friends checklist (India)",
        url: "https://india.diplo.de/in-en/2674162-2674162",
      },
      {
        label: "GOV.UK - Standard Visitor, money to support yourself",
        url: "https://www.gov.uk/standard-visitor/money-to-support-yourself",
      },
    ],
    lastReviewed: "2026-08-21",
    authorLabel: "Visaworx Visa Intelligence Team",
    seo: {
      title: "Visa Sponsorship: What Your Sponsor Is Actually Signing",
      description:
        "A visa sponsor guarantees stay costs, medical care and repatriation, and the obligation can last years. Who qualifies, and why a host and a payer are two roles.",
    },
  },
];
