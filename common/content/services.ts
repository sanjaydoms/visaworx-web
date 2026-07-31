export type ServiceCategory = "Travel Purpose" | "Advisory";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: ServiceCategory;
  idealFor: string[];
  outcomes: string[];
  included: string[];
  excluded: string[];
  process: Array<{
    title: string;
    description: string;
  }>;
  preparationChecklist: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedCountrySlugs: string[];
  relatedServiceSlugs: string[];
  lastReviewed?: string;
};

export const servicesData: Service[] = [
  {
    slug: "tourist-visa",
    title: "Tourist Visa Support",
    shortDescription: "Structured guidance for leisure, family visits, and short-term travel document preparation.",
    longDescription: "Our Tourist Visa Support service assists travellers in understanding eligibility categories, establishing clear travel purpose, gathering purpose-specific documentation, and completing application requirements for international leisure or visitor trips.",
    category: "Travel Purpose",
    idealFor: [
      "Leisure travellers planning international holidays or sightseeing",
      "Individuals visiting family members or friends abroad",
      "First-time international travel applicants seeking structured guidance",
    ],
    outcomes: [
      "Clear understanding of tourist visa category requirements",
      "Organized dossier of travel, accommodation, and personal evidence",
      "Reduced risk of common submission errors or inconsistent information",
    ],
    included: [
      "Review of travel itinerary and accommodation arrangements",
      "Guidance on personal financial evidence and ties to home country",
      "Detailed document preparation checklist tailored to destination",
      "Form completion review before submission",
    ],
    excluded: [
      "Guaranteed visa approval or expedited embassy processing",
      "Payment of official embassy or consular application fees",
      "Submission of unverified or fraudulent travel documentation",
    ],
    process: [
      {
        title: "Initial Travel Assessment",
        description: "Review destination requirements, travel dates, and applicant profile.",
      },
      {
        title: "Dossier Checklist Assembly",
        description: "Gather purpose documents, financial statements, and accommodation proof.",
      },
      {
        title: "Human Document Review",
        description: "Senior consultant verifies consistency, legibility, and completeness.",
      },
      {
        title: "Submission Preparation",
        description: "Final verification before formal embassy or appointment submission.",
      },
    ],
    preparationChecklist: [
      "Valid passport with at least 6 months validity",
      "Detailed day-by-day travel plan or holiday itinerary",
      "Bank statements showing personal financial sufficiency",
      "Employment leave sanction letter or business registration",
      "Invitation letter and host identity proof if visiting friends/family",
    ],
    faqs: [
      {
        question: "Does Visaworx guarantee tourist visa approval?",
        answer: "No. Consular authorities hold sole decision-making authority. Visaworx provides information, document review, and preparation guidance.",
      },
      {
        question: "What financial proof is expected for a tourist visa?",
        answer: "Consulates typically expect 3 to 6 months of personal bank statements showing consistent income and genuine personal savings sufficient for your stay.",
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "schengen", "canada"],
    relatedServiceSlugs: ["visa-readiness-review", "documentation-review"],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "business-visa",
    title: "Business Visa Guidance",
    shortDescription: "Advisory support for corporate meetings, industry conferences, trade visits, and professional travel.",
    longDescription: "Visaworx Business Visa Guidance helps business professionals, executives, and delegates prepare clear travel files for short-term corporate visits, client meetings, vendor negotiations, and industry events without work authorization confusion.",
    category: "Travel Purpose",
    idealFor: [
      "Corporate employees attending international business meetings or training",
      "Entrepreneurs attending trade shows, conventions, or client sites",
      "Organization delegates participating in commercial negotiations",
    ],
    outcomes: [
      "Proper alignment between host invitation and employer dispatch letter",
      "Clear documentation of non-gainful business travel intent",
      "Professional presentation of financial and corporate sponsorship",
    ],
    included: [
      "Verification of host company invitation letter details",
      "Review of employer dispatch and financial guarantee letters",
      "Category suitability assessment (B-1, Business Visitor, Short-stay Business)",
      "Pre-submission documentation check",
    ],
    excluded: [
      "Work permit authorization or long-term employment sponsorship advice",
      "Guaranteed consular approval or embassy appointment booking priority",
      "Legal representation before immigration tribunals",
    ],
    process: [
      {
        title: "Business Intent Review",
        description: "Examine invitation letter, event details, and corporate profile.",
      },
      {
        title: "Employer & Host Alignment",
        description: "Ensure travel dates and commercial activities match across all letters.",
      },
      {
        title: "Financial Guarantee Audit",
        description: "Verify company sponsorship letters or personal funding statements.",
      },
      {
        title: "Pre-Lodgement Check",
        description: "Perform final quality check before appointment submission.",
      },
    ],
    preparationChecklist: [
      "Valid passport and previous international travel copies",
      "Official host company invitation letter detailing visit purpose",
      "Employer deputation / dispatch letter on corporate letterhead",
      "Conference or trade show registration receipts if applicable",
      "Company registration certificates and financial records",
    ],
    faqs: [
      {
        question: "Can I perform paid work abroad on a Business Visitor visa?",
        answer: "No. Business Visitor visas strictly permit non-gainful professional activities such as attending meetings or negotiating contracts. Local employment requires formal work authorization.",
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "singapore", "japan"],
    relatedServiceSlugs: ["documentation-review", "visa-readiness-review"],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "student-visa",
    title: "Student Visa Advisory",
    shortDescription: "Structured assistance for study intent, financial evidence, academic documentation, and student readiness.",
    longDescription: "Our Student Visa Advisory service provides structured guidance for international students preparing for academic entry. We assist with study intent clarity, financial sponsorship evidence, academic transcript organization, and preparation for consular interviews.",
    category: "Travel Purpose",
    idealFor: [
      "Students admitted to accredited foreign universities or colleges",
      "Applicants needing structured guidance on student financial evidence",
      "Students preparing for visa interviews (F-1, Student Route, Study Permit)",
    ],
    outcomes: [
      "Clear explanation of study purpose and post-study intentions",
      "Structured presentation of tuition and living expense proof",
      "Increased student confidence ahead of consular interviews",
    ],
    included: [
      "Review of official offer letters and admission confirmation (e.g. I-20, CAS)",
      "Financial evidence structuring for tuition and living funds",
      "Statement of Purpose (SOP) intent review",
      "Mock interview preparation session",
    ],
    excluded: [
      "Guaranteed university admission or visa grant guarantees",
      "Financial scholarship funding or loan underwriting",
      "Alteration or falsification of academic transcripts",
    ],
    process: [
      {
        title: "Admission & Category Assessment",
        description: "Review academic acceptance documents and country-specific rules.",
      },
      {
        title: "Financial Dossier Structuring",
        description: "Organize sponsor accounts, education loans, and liquid assets.",
      },
      {
        title: "Statement of Purpose Review",
        description: "Verify clarity of academic goals and ties to home country.",
      },
      {
        title: "Interview Practice",
        description: "Conduct mock interview focusing on common student visa themes.",
      },
    ],
    preparationChecklist: [
      "Official university offer / acceptance letter and I-20 or CAS form",
      "Academic mark sheets, degrees, and standardized test scorecards",
      "Bank statements, education loan sanction letters, or scholarship letters",
      "Proof of relationship with financial sponsors if applicable",
      "Statement of Purpose / Study Plan detailing academic goals",
    ],
    faqs: [
      {
        question: "Does Visaworx guarantee student visa issuance?",
        answer: "No. Visa issuance is determined exclusively by government immigration authorities based on overall applicant eligibility.",
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "canada", "australia"],
    relatedServiceSlugs: ["interview-preparation", "visa-readiness-review"],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "work-visa",
    title: "Work Visa Preparation",
    shortDescription: "Preparation guidance for employment-backed visa pathways, employer documentation, and requirements.",
    longDescription: "Work Visa Preparation assists applicants holding job offers or employer transfers in understanding necessary submission steps, employer sponsorship documentation, and supporting credentials without providing legal representation.",
    category: "Travel Purpose",
    idealFor: [
      "Professionals holding valid foreign job offers or intra-company transfers",
      "Skilled workers preparing employer-sponsored visa documentation",
    ],
    outcomes: [
      "Clear organization of employment contracts, approvals, and credentials",
      "Understanding of required background and professional checks",
    ],
    included: [
      "Review of employment offer letter and sponsorship reference numbers",
      "Checklist of required professional qualifications and experience certificates",
      "Document dossier organization prior to submission",
    ],
    excluded: [
      "Job placement services or employment recruitment",
      "Immigration law legal advice or representation",
      "Guaranteed work permit issuance",
    ],
    process: [
      {
        title: "Sponsorship Verification",
        description: "Confirm employer approval notice and document requirements.",
      },
      {
        title: "Credential Organization",
        description: "Compile work experience letters, degrees, and background certificates.",
      },
      {
        title: "Quality Audit",
        description: "Verify completeness before embassy appointment or portal filing.",
      },
    ],
    preparationChecklist: [
      "Valid passport and prior work visa stamps",
      "Official employment contract or sponsorship approval notice",
      "Educational certificates and professional registration proof",
      "Detailed work experience letters from previous employers",
    ],
    faqs: [
      {
        question: "Does Visaworx provide job placement services?",
        answer: "No. Visaworx provides document preparation and consultation for applicants who already possess or are applying for employment visas.",
      },
    ],
    relatedCountrySlugs: ["united-kingdom", "canada", "australia", "united-arab-emirates"],
    relatedServiceSlugs: ["documentation-review", "visa-readiness-review"],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "family-dependent-visa",
    title: "Family & Dependent Visa Guidance",
    shortDescription: "Guidance for spouses, children, and dependent family members preparing travel documentation.",
    longDescription: "Our Family & Dependent Visa Guidance helps spouses, children, and dependent family members compile relationship evidence, financial maintenance documentation, and host status proof for joint or join-family travel.",
    category: "Travel Purpose",
    idealFor: [
      "Spouses joining a partner residing or studying abroad",
      "Dependent children travelling with or joining parents",
      "Parents visiting settled family members overseas",
    ],
    outcomes: [
      "Clear compilation of official relationship certificates and evidence",
      "Organized financial maintenance proof for the dependent family member",
    ],
    included: [
      "Review of marriage certificates, birth certificates, and civil documents",
      "Guidance on host sponsor income and accommodation proof",
      "Dossier organization for dependent application filings",
    ],
    excluded: [
      "Legal status determinations or permanent residency legal advice",
      "Guaranteed family visa approval",
    ],
    process: [
      {
        title: "Family Relationship Audit",
        description: "Review civil relationship certificates and sponsor status.",
      },
      {
        title: "Sponsorship & Living Proof",
        description: "Gather sponsor financial proof and housing adequacy evidence.",
      },
      {
        title: "Pre-Lodgement Check",
        description: "Verify document legibility and translation compliance.",
      },
    ],
    preparationChecklist: [
      "Valid passports for all dependent applicants",
      "Government-issued Marriage / Birth certificates (translated if required)",
      "Sponsor passport copy, visa status, and residential proof abroad",
      "Sponsor income tax returns, bank statements, and employment proof",
    ],
    faqs: [
      {
        question: "Do civil documents need to be translated for family visas?",
        answer: "Yes. Certificates in regional languages generally require certified English translations meeting consular standards.",
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "canada", "schengen"],
    relatedServiceSlugs: ["documentation-review", "visa-readiness-review"],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "visa-readiness-review",
    title: "Visa Readiness Review",
    shortDescription: "Structured assessment of document preparation, travel purpose alignment, and risk identification.",
    longDescription: "The Visa Readiness Review is a structured consultation service where senior Visaworx experts evaluate your overall preparation, identify missing or unclear documentation, highlight potential risks, and recommend actionable next steps.",
    category: "Advisory",
    idealFor: [
      "Applicants wanting an independent expert review before submitting",
      "Travellers with complex travel history or multi-country itineraries",
      "First-time applicants wanting clarity on document completeness",
    ],
    outcomes: [
      "Structured readiness band classification (`Good Foundation`, `Developing Readiness`, etc.)",
      "Actionable list of identified strengths and areas needing attention",
      "Clear recommendations before booking embassy appointments",
    ],
    included: [
      "Comprehensive evaluation of profile, intent, and financial proof",
      "Written summary report of identified gaps and strengths",
      "Consultation call with a senior Visaworx visa expert",
    ],
    excluded: [
      "Guaranteed visa approval or score-based probability predictions",
      "Submission of application on applicant's behalf without applicant authorization",
    ],
    process: [
      {
        title: "Profile & Questionnaire Submission",
        description: "Complete the initial readiness assessment questionnaire.",
      },
      {
        title: "Expert Evaluation",
        description: "Senior consultant analyzes documents against destination criteria.",
      },
      {
        title: "Feedback Consultation",
        description: "Discuss readiness band, gap analysis, and next steps with an expert.",
      },
    ],
    preparationChecklist: [
      "Completed Visaworx readiness assessment responses",
      "Draft travel itinerary and intended dates",
      "List of available supporting documents",
    ],
    faqs: [
      {
        question: "Does the readiness review predict my exact approval chance?",
        answer: "No. The review measures preparation completeness and risk factors. It does not output percentage predictions or guarantee decisions.",
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "canada", "schengen", "australia"],
    relatedServiceSlugs: ["documentation-review", "refusal-review"],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "documentation-review",
    title: "Documentation Review",
    shortDescription: "Detailed human review of supporting documents for completeness, consistency, and legibility.",
    longDescription: "Our Documentation Review service involves a meticulous line-by-line check of your supporting documents to ensure consistency across application forms, bank statements, employment letters, and itineraries before submission.",
    category: "Advisory",
    idealFor: [
      "Applicants with extensive supporting document dossiers",
      "Individuals wanting to ensure zero data mismatches across forms",
      "Corporate or self-employed applicants with complex financial files",
    ],
    outcomes: [
      "Identification of name mismatches, date errors, or missing signatures",
      "Verification of bank statement legibility and transaction clarity",
      "Improved dossier organization according to embassy guidelines",
    ],
    included: [
      "Line-by-line review of application forms against passport details",
      "Cross-verification of leave letters, invitation letters, and itineraries",
      "Feedback on document clarity, formatting, and translation requirements",
    ],
    excluded: [
      "Guarantee that consular officers will accept specific evidence",
      "Fabrication or modification of authentic official records",
    ],
    process: [
      {
        title: "Dossier Upload / Submission",
        description: "Provide draft application forms and supporting scans.",
      },
      {
        title: "Line-by-Line Quality Audit",
        description: "Expert checks names, dates, balances, and intent consistency.",
      },
      {
        title: "Correction Summary Report",
        description: "Receive detailed list of required corrections or additions.",
      },
    ],
    preparationChecklist: [
      "Draft visa application form",
      "Passport biodata page scan",
      "Bank statements, employment letters, and travel bookings",
    ],
    faqs: [
      {
        question: "Can Visaworx certify that my documents will be accepted?",
        answer: "Visaworx checks documents against published standards for completeness and consistency. Ultimate acceptance rests solely with the consulate.",
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "schengen", "japan"],
    relatedServiceSlugs: ["visa-readiness-review", "interview-preparation"],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "interview-preparation",
    title: "Interview Preparation",
    shortDescription: "Mock sessions and coaching on common consular interview themes, truthfulness, and intent.",
    longDescription: "Our Interview Preparation service helps applicants facing in-person consular interviews (such as US B1/B2, F-1, or student visas) build confidence, articulate truthful responses, and clearly explain their travel purpose.",
    category: "Advisory",
    idealFor: [
      "US B1/B2 visitor or F-1 student visa applicants",
      "Applicants feeling nervous about in-person embassy interviews",
      "Individuals needing practice explaining complex travel itineraries",
    ],
    outcomes: [
      "Familiarity with common consular interview questions and themes",
      "Enhanced ability to articulate concise, truthful answers",
      "Reduced interview anxiety and clear document navigation skills",
    ],
    included: [
      "One-on-one mock interview simulation with an experienced consultant",
      "Detailed feedback on communication clarity, tone, and focus",
      "Review of DS-160 / application form consistency",
    ],
    excluded: [
      "Coaching to misrepresent facts or memorize scripted false answers",
      "Guaranteed interview approval",
    ],
    process: [
      {
        title: "Application File Review",
        description: "Consultant reviews your application form and background file.",
      },
      {
        title: "Mock Interview Session",
        description: "Simulate actual consular interview questions in real-time.",
      },
      {
        title: "Feedback & Strategy Review",
        description: "Analyze response clarity, truthfulness, and key emphasis areas.",
      },
    ],
    preparationChecklist: [
      "Submitted application form copy (e.g. DS-160 confirmation)",
      "Passport and supporting document dossier",
      "List of specific interview concerns or questions",
    ],
    faqs: [
      {
        question: "Does Visaworx provide pre-scripted answers for embassy interviews?",
        answer: "No. Consular officers evaluate genuine personal intent. We coach applicants to answer truthfully, clearly, and concisely in their own words.",
      },
    ],
    relatedCountrySlugs: ["united-states", "schengen"],
    relatedServiceSlugs: ["student-visa", "refusal-review"],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "refusal-review",
    title: "Refusal Review & Consultation",
    shortDescription: "Analysis of previous visa refusal letters, changed circumstances, and re-application guidance.",
    longDescription: "The Refusal Review service provides objective human evaluation of prior visa refusal notices. We help you understand the official grounds cited, identify changed circumstances, and evaluate whether a stronger re-application is appropriate.",
    category: "Advisory",
    idealFor: [
      "Applicants who have experienced a recent visa refusal",
      "Individuals wanting objective analysis before deciding to re-apply",
      "Travellers needing guidance on addressing specific refusal grounds",
    ],
    outcomes: [
      "Clear explanation of official refusal clauses (e.g., 214(b), insufficient ties)",
      "Objective assessment of whether re-application is currently advisable",
      "Actionable plan to strengthen financial or home-country evidence",
    ],
    included: [
      "Detailed analysis of official refusal letter and prior application file",
      "One-on-one consultation with a senior Visaworx consultant",
      "Strategic advice on changed circumstances required for re-application",
    ],
    excluded: [
      "Guarantee of refusal reversal or approval upon re-application",
      "Legal appeals before administrative tribunals",
    ],
    process: [
      {
        title: "Refusal Document Submission",
        description: "Provide copy of refusal notice and previous application form.",
      },
      {
        title: "Gaps & Circumstances Analysis",
        description: "Consultant identifies underlying reasons and missing evidence.",
      },
      {
        title: "Consultation & Action Plan",
        description: "Discuss recommendations on timing, new evidence, and strategy.",
      },
    ],
    preparationChecklist: [
      "Official visa refusal letter / notice",
      "Copy of previous application form submitted",
      "Summary of any changed personal, financial, or employment circumstances",
    ],
    faqs: [
      {
        question: "Can a visa refusal be reversed automatically?",
        answer: "No. Visa refusals generally require a fresh application demonstrating significantly changed circumstances or corrected documentation.",
      },
    ],
    relatedCountrySlugs: ["united-states", "united-kingdom", "canada", "schengen"],
    relatedServiceSlugs: ["visa-readiness-review", "documentation-review"],
    lastReviewed: "2026-07-01",
  },
];
