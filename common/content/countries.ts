export type VisaPurpose = "Tourist" | "Business" | "Student" | "Work" | "Family";

export type Country = {
  slug: string;
  name: string;
  shortName?: string;
  summary: string;
  popular: boolean;
  visaPurposes: VisaPurpose[];
  overview: string;
  preparationChecklist: string[];
  applicationStages: Array<{
    title: string;
    description: string;
  }>;
  commonMistakes: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedServiceSlugs: string[];
  officialSourceLabel: string;
  officialSourceUrl?: string;
  lastReviewed?: string;
};

export const countriesData: Country[] = [
  {
    slug: "united-states",
    name: "United States",
    shortName: "USA",
    summary: "Comprehensive guidance for US B1/B2 visitor visas, F-1 student visas, and business travel preparation.",
    popular: true,
    visaPurposes: ["Tourist", "Business", "Student", "Work"],
    overview: "Applying for a United States visa requires demonstrating clear travel intent, financial stability, and strong ties to your home country. Most non-immigrant visas involve an online DS-160 submission followed by an in-person consular interview.",
    preparationChecklist: [
      "Valid passport with at least 6 months validity beyond intended stay",
      "Completed DS-160 application confirmation page",
      "Official visa fee payment receipt and appointment confirmation",
      "Proof of funds and financial sufficiency for trip duration",
      "Evidence of strong economic, employment, or family ties to home country",
      "Purpose-specific documents (e.g., I-20 form for students, invitation letter for business)",
    ],
    applicationStages: [
      {
        title: "Determine Visa Category",
        description: "Identify the appropriate visa category based on your travel purpose (B1/B2 for tourism/business, F-1 for study).",
      },
      {
        title: "DS-160 & Fee Payment",
        description: "Complete the online Form DS-160 accurately and pay the non-refundable visa application fee.",
      },
      {
        title: "Appointment Scheduling",
        description: "Schedule Biometrics (VAC) and Consular Interview appointments at the nearest US Embassy or Consulate.",
      },
      {
        title: "Consular Interview",
        description: "Attend the interview with all supporting evidence to demonstrate your travel purpose and ties.",
      },
    ],
    commonMistakes: [
      "Inconsistent information between DS-160 form and interview answers",
      "Insufficient evidence of ties to home country",
      "Over-relying on sponsor documents rather than personal credentials",
      "Failing to explain travel itinerary clearly to the consular officer",
    ],
    faqs: [
      {
        question: "How far in advance should I start US visa preparation?",
        answer: "Due to varying appointment wait times at US embassies and consulates, it is recommended to start preparation 3 to 6 months prior to your intended travel date.",
      },
      {
        question: "Is an invitation letter required for a B1/B2 visitor visa?",
        answer: "While an invitation letter can explain the purpose of your visit, it does not guarantee approval. Consular officers prioritize your ties to your home country and overall eligibility.",
      },
    ],
    relatedServiceSlugs: ["tourist-visitor-visas", "business-visas", "documentation-review"],
    officialSourceLabel: "US Travel Docs & State Dept",
    officialSourceUrl: "https://travel.state.gov/",
    lastReviewed: "2026-07-01",
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    shortName: "UK",
    summary: "Standard Visitor visa guidance for tourism, short business trips, family visits, and student entry requirements.",
    popular: true,
    visaPurposes: ["Tourist", "Business", "Student", "Family"],
    overview: "The UK Standard Visitor visa allows stays of up to 6 months for tourism, visiting family, or attending business events. Applicants must satisfy UK Visas and Immigration (UKVI) regarding genuine visitor intent and financial readiness.",
    preparationChecklist: [
      "Valid passport with at least one blank page",
      "Detailed travel itinerary and accommodation details",
      "Bank statements showing consistent personal financial standing",
      "Employment verification, leave sanction letter, or business registration",
      "Invitation letter and host UK status documents if visiting family or friends",
      "Tuberculosis test results (if residing in an eligible country for 6+ months)",
    ],
    applicationStages: [
      {
        title: "Online Application",
        description: "Submit the online UKVI visa application form and pay the applicable fee.",
      },
      {
        title: "Biometrics Appointment",
        description: "Book and attend an appointment at a VFS Global visa application centre to submit biometrics and documents.",
      },
      {
        title: "UKVI Assessment",
        description: "UKVI reviews documents to assess genuine visitor status and financial capability.",
      },
      {
        title: "Decision & Passport Return",
        description: "Receive visa decision and passport collection notification.",
      },
    ],
    commonMistakes: [
      "Submitting unexplained recent large cash deposits in bank accounts",
      "Failing to disclose previous visa refusals for any country",
      "Unclear explanation of relationship with UK sponsor or inviter",
      "Lack of evidence showing ongoing employment or commitments in home country",
    ],
    faqs: [
      {
        question: "Can I work in the UK on a Standard Visitor visa?",
        answer: "No. The Standard Visitor visa strictly prohibits paid or unpaid work for UK organizations, though permissible business activities like attending meetings are allowed.",
      },
      {
        question: "How many months of bank statements are expected for a UK visitor visa?",
        answer: "Typically 3 to 6 months of consecutive bank statements showing regular income and authentic personal savings are submitted.",
      },
    ],
    relatedServiceSlugs: ["tourist-visitor-visas", "student-visas", "refusal-review"],
    officialSourceLabel: "GOV.UK Visas & Immigration",
    officialSourceUrl: "https://www.gov.uk/browse/visas-immigration",
    lastReviewed: "2026-07-01",
  },
  {
    slug: "canada",
    name: "Canada",
    shortName: "Canada",
    summary: "Guidance for Temporary Resident Visas (TRV), visitor visas, study permits, and business visits.",
    popular: true,
    visaPurposes: ["Tourist", "Business", "Student", "Family"],
    overview: "Visiting Canada requires a Temporary Resident Visa (TRV) or eTA depending on citizenship. Immigration, Refugees and Citizenship Canada (IRCC) evaluates applicant ties, financial capacity, and specific travel purpose.",
    preparationChecklist: [
      "Valid passport with validity matching intended travel timeframe",
      "Proof of financial support including bank statements and tax records",
      "Purpose of visit evidence (invitation, conference registration, tourist itinerary)",
      "Proof of ties to home country (employment letter, property, family obligations)",
      "Completed IRCC application forms and family information forms",
      "Biometrics submission at authorized VFS centre",
    ],
    applicationStages: [
      {
        title: "IRCC Portal Submission",
        description: "Complete and submit application online through the official IRCC portal.",
      },
      {
        title: "Biometrics Instruction Letter",
        description: "Receive BIL and attend biometric appointment at VFS Global.",
      },
      {
        title: "Background & Document Review",
        description: "IRCC evaluates eligibility, financial proof, and home country ties.",
      },
      {
        title: "Passport Request",
        description: "Upon approval, submit physical passport for visa counterfoil stamping.",
      },
    ],
    commonMistakes: [
      "Inadequate proof of funds to cover travel, stay, and return costs",
      "Unexplained employment gaps or incomplete travel history",
      "Failing to detail exact relationship when visiting relatives",
      "Missing required supporting forms or family declarations",
    ],
    faqs: [
      {
        question: "What is the typical validity of a Canadian visitor visa?",
        answer: "Multiple-entry Canadian visitor visas are generally issued for up to 10 years or until passport expiry, whichever comes first.",
      },
      {
        question: "Is a medical exam mandatory for a Canadian visitor visa?",
        answer: "Medical exams are generally not required for short stays under 6 months unless specified by IRCC or if residing in certain regions.",
      },
    ],
    relatedServiceSlugs: ["tourist-visitor-visas", "student-visas", "visa-readiness-review"],
    officialSourceLabel: "IRCC Official Website",
    officialSourceUrl: "https://www.canada.ca/en/services/immigration-visas.html",
    lastReviewed: "2026-07-01",
  },
  {
    slug: "australia",
    name: "Australia",
    shortName: "Australia",
    summary: "Visitor visa (subclass 600) information, student visas (subclass 500), and short-term business stream guidance.",
    popular: true,
    visaPurposes: ["Tourist", "Business", "Student", "Family"],
    overview: "Australia's Visitor Visa (Subclass 600) allows travel for tourism or business visitor activities. Applications are lodged online via ImmiAccount and assessed under Genuine Temporary Entrant (GTE) or Genuine Visitor requirements.",
    preparationChecklist: [
      "Valid passport biodata page copy",
      "Detailed travel plan, hotel bookings, or host invitation details",
      "Evidence of personal financial resources (bank statements, payslips)",
      "Proof of current occupation (employer approval, business registration)",
      "Evidence of strong ties to home country (family, asset ownership, employment)",
      "Health insurance coverage for stay duration",
    ],
    applicationStages: [
      {
        title: "ImmiAccount Creation",
        description: "Set up ImmiAccount and select appropriate Subclass 600 stream.",
      },
      {
        title: "Document Upload & Fee Payment",
        description: "Attach clear color copies of supporting documents and pay application fee.",
      },
      {
        title: "Biometrics & Health Checks",
        description: "Complete biometrics collection or health examinations if requested.",
      },
      {
        title: "Evisa Notification",
        description: "Receive grant notification letter electronically linked to your passport.",
      },
    ],
    commonMistakes: [
      "Providing low quality or incomplete document scans",
      "Insufficient evidence showing ongoing job or ties in home country",
      "Failing to disclose previous international travel or visa refusals",
      "Submitting generic travel statements without realistic itinerary details",
    ],
    faqs: [
      {
        question: "Does Australia stamp the visa in the physical passport?",
        answer: "No. Australia issues electronic visas (eVisas) digitally linked to your passport number.",
      },
      {
        question: "What is the Genuine Visitor requirement for Australia?",
        answer: "Applicants must demonstrate an honest intent to stay temporarily in Australia and abide by visa conditions, backed by solid ties to their home country.",
      },
    ],
    relatedServiceSlugs: ["tourist-visitor-visas", "business-visas", "documentation-review"],
    officialSourceLabel: "Australian Dept of Home Affairs",
    officialSourceUrl: "https://immi.homeaffairs.gov.au/",
    lastReviewed: "2026-07-01",
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    shortName: "New Zealand",
    summary: "Visitor Visa preparation, NZeTA requirements, and business travel guidance.",
    popular: false,
    visaPurposes: ["Tourist", "Business", "Student", "Family"],
    overview: "New Zealand welcomes visitors through the Visitor Visa or NZeTA depending on nationality. Immigration New Zealand evaluates genuine travel intent, funds, and health requirements.",
    preparationChecklist: [
      "Valid passport with at least 3 months validity beyond departure date",
      "Proof of outward travel ticket or onward travel arrangements",
      "Proof of funds (at least NZD $1,000 per month of stay, or $400 if accommodation prepaid)",
      "Employment letter or proof of economic commitments in home country",
      "Cover letter detailing purpose of visit and travel schedule",
    ],
    applicationStages: [
      {
        title: "Online Application Submission",
        description: "Submit online via Immigration New Zealand portal.",
      },
      {
        title: "Document Verification",
        description: "Immigration officers review financial evidence and genuine visitor intent.",
      },
      {
        title: "Electronic Grant",
        description: "Receive visa approval approval notice linked to your passport.",
      },
    ],
    commonMistakes: [
      "Underestimating required maintenance funds per month of stay",
      "Failing to provide return flight booking or onward travel evidence",
      "Unclear details regarding host accommodation",
    ],
    faqs: [
      {
        question: "How much money do I need to show for a New Zealand Visitor Visa?",
        answer: "Immigration New Zealand generally expects evidence of at least NZD $1,000 per person per month of stay, or NZD $400 per month if accommodation is fully prepaid.",
      },
    ],
    relatedServiceSlugs: ["tourist-visitor-visas", "visa-readiness-review"],
    officialSourceLabel: "Immigration New Zealand",
    officialSourceUrl: "https://www.immigration.govt.nz/",
    lastReviewed: "2026-07-01",
  },
  {
    slug: "schengen",
    name: "Schengen Area",
    shortName: "Schengen",
    summary: "Short-stay Schengen visa (Type C) guidance across 29 European member states.",
    popular: true,
    visaPurposes: ["Tourist", "Business", "Family"],
    overview: "A Schengen Visa (Type C) allows short stays of up to 90 days within any 180-day period across Schengen member countries. Applications must be submitted to the consulate of the primary destination country.",
    preparationChecklist: [
      "Passport valid for at least 3 months after departure from Schengen zone",
      "Fully completed and signed Schengen visa application form",
      "Schengen-compliant travel medical insurance (€30,000 minimum coverage)",
      "Confirmed round-trip flight reservations and hotel bookings for full stay",
      "Bank statements for the last 3-6 months and income tax returns (ITR)",
      "Employment cover letter, leave approval, or company sponsorship letter",
    ],
    applicationStages: [
      {
        title: "Identify Main Destination",
        description: "Determine the main member state based on longest stay or main purpose.",
      },
      {
        title: "Form Completion & VFS Appointment",
        description: "Fill application form and book biometrics appointment at designated embassy/VFS center.",
      },
      {
        title: "Biometrics & Document Submission",
        description: "Submit physical file, biometrics, and passport at appointment.",
      },
      {
        title: "Consular Processing",
        description: "Member state consulate evaluates travel itinerary, insurance, and ties.",
      },
    ],
    commonMistakes: [
      "Applying to the wrong consulate when visiting multiple Schengen countries",
      "Inadequate travel insurance that fails to meet €30,000 coverage standards",
      "Discrepancies between flight dates, hotel bookings, and leave letter",
      "Insufficient balance or irregular financial transactions in bank accounts",
    ],
    faqs: [
      {
        question: "Which country's consulate should I apply to for a multi-country Schengen trip?",
        answer: "Apply to the consulate of the country where you will spend the longest duration. If spending equal time, apply to the country of first entry into the Schengen area.",
      },
      {
        question: "What is the 90/180-day rule for Schengen visas?",
        answer: "You can stay a maximum of 90 cumulative days within any rolling 180-day window across all Schengen member states.",
      },
    ],
    relatedServiceSlugs: ["tourist-visitor-visas", "business-visas", "documentation-review"],
    officialSourceLabel: "European Commission Migration & Home Affairs",
    officialSourceUrl: "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en",
    lastReviewed: "2026-07-01",
  },
  {
    slug: "united-arab-emirates",
    name: "United Arab Emirates",
    shortName: "UAE",
    summary: "Tourist and business entry permits for Dubai, Abu Dhabi, and all UAE emirates.",
    popular: true,
    visaPurposes: ["Tourist", "Business", "Family"],
    overview: "Travel to the UAE for tourism or business is facilitated via pre-arranged electronic tourist visas or visa-on-arrival depending on nationality and existing valid visas (such as US/UK/Schengen visas for certain passport holders).",
    preparationChecklist: [
      "Passport valid for at least 6 months from entry date",
      "Color passport size photograph with white background",
      "Confirmed round-trip flight tickets",
      "Hotel reservation or host residency documents in UAE",
      "Proof of sufficient funds or sponsor guarantee if applicable",
    ],
    applicationStages: [
      {
        title: "Select Visa Duration",
        description: "Choose 30-day or 60-day single or multiple entry tourist permit.",
      },
      {
        title: "Online Document Submission",
        description: "Submit passport scan and photo through authorized airline, travel partner, or portal.",
      },
      {
        title: "E-Visa Issuance",
        description: "Receive approved UAE entry permit electronically prior to travel.",
      },
    ],
    commonMistakes: [
      "Submitting passport copy with less than 6 months validity",
      "Blurry or low-resolution passport bio page upload",
      "Name mismatch between flight ticket and passport details",
    ],
    faqs: [
      {
        question: "Are Indian passport holders eligible for UAE visa on arrival?",
        answer: "Indian passport holders with a valid US visa, US Green Card, UK residence permit, or Schengen residence permit may be eligible for UAE visa-on-arrival at designated entry points.",
      },
    ],
    relatedServiceSlugs: ["tourist-visitor-visas", "business-visas"],
    officialSourceLabel: "UAE Federal Authority for Identity & Citizenship",
    officialSourceUrl: "https://icp.gov.ae/",
    lastReviewed: "2026-07-01",
  },
  {
    slug: "singapore",
    name: "Singapore",
    shortName: "Singapore",
    summary: "E-Visa application guidance for tourist visits, business travel, and SG Arrival Card completion.",
    popular: true,
    visaPurposes: ["Tourist", "Business"],
    overview: "Visiting Singapore for short-term travel requires an electronic visa (eVisa) submitted via authorized visa agents or local contacts, alongside mandatory SG Arrival Card submission prior to entry.",
    preparationChecklist: [
      "Passport valid for at least 6 months beyond arrival date",
      "Completed Form 14A signed by applicant",
      "Passport photograph compliant with ICA specifications",
      "Confirmed flight itinerary and hotel booking confirmation",
      "Cover letter detailing purpose of visit",
      "Completed SG Arrival Card within 3 days prior to arrival",
    ],
    applicationStages: [
      {
        title: "Authorized Agent Submission",
        description: "Submit application file through ICA-authorized strategic partner or agent.",
      },
      {
        title: "ICA Processing",
        description: "Immigration & Checkpoints Authority (ICA) assesses applicant information.",
      },
      {
        title: "eVisa Download",
        description: "Download electronic visa once issued and print for travel.",
      },
    ],
    commonMistakes: [
      "Submitting non-compliant photograph (shadows, background color error)",
      "Forgetting to submit SG Arrival Card within 3 days before landing",
      "Submitting unconfirmed or invalid accommodation details",
    ],
    faqs: [
      {
        question: "When should I submit the SG Arrival Card?",
        answer: "The SG Arrival Card with Electronic Health Declaration must be submitted within 3 days prior to your arrival date in Singapore.",
      },
    ],
    relatedServiceSlugs: ["tourist-visitor-visas", "business-visas"],
    officialSourceLabel: "Singapore ICA Official Site",
    officialSourceUrl: "https://www.ica.gov.sg/",
    lastReviewed: "2026-07-01",
  },
  {
    slug: "japan",
    name: "Japan",
    shortName: "Japan",
    summary: "Single and multiple-entry visitor visa preparation for leisure and business trips.",
    popular: true,
    visaPurposes: ["Tourist", "Business"],
    overview: "Japan tourist and business visas are processed through designated VFS/Japan Visa Application Centres. Applicants must demonstrate clear itinerary planning, financial self-sufficiency, and genuine tourist intent.",
    preparationChecklist: [
      "Valid passport with adequate blank pages",
      "Visa application form with photo attached",
      "Day-by-day travel itinerary (Schedule of Stay)",
      "Bank statement for past 6 months proving travel funding",
      "Income Tax Returns (ITR) for recent assessment years",
      "Employment certificate or company leave approval",
    ],
    applicationStages: [
      {
        title: "Prepare Schedule of Stay",
        description: "Draft clear day-by-day travel plan detailing cities, hotels, and activities.",
      },
      {
        title: "VFS Center Submission",
        description: "Submit hard-copy document dossier at authorized Japan Visa Application Centre.",
      },
      {
        title: "Embassy Review",
        description: "Japanese Embassy evaluates financial stability and travel schedule authenticity.",
      },
      {
        title: "Passport Collection",
        description: "Collect passport with stamped visa vignette.",
      },
    ],
    commonMistakes: [
      "Submitting vague or unrealistic Schedule of Stay",
      "Unexplained low bank balances relative to declared trip duration",
      "Missing Income Tax Return (ITR) documents without valid explanation",
    ],
    faqs: [
      {
        question: "Is a day-by-day itinerary compulsory for a Japan visa?",
        answer: "Yes. Japan requires a detailed 'Schedule of Stay' form outlining planned daily activities, contact details, and hotel arrangements.",
      },
    ],
    relatedServiceSlugs: ["tourist-visitor-visas", "documentation-review"],
    officialSourceLabel: "Ministry of Foreign Affairs of Japan",
    officialSourceUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
    lastReviewed: "2026-07-01",
  },
  {
    slug: "south-korea",
    name: "South Korea",
    shortName: "South Korea",
    summary: "C-3-9 tourist visa guidance, K-ETA information, and short-term business visitor requirements.",
    popular: false,
    visaPurposes: ["Tourist", "Business", "Student"],
    overview: "Short-term visitors to South Korea require a C-3-9 tourist visa or K-ETA (Korea Electronic Travel Authorization) depending on nationality. Applications involve physical document filing through designated KVAC application centres.",
    preparationChecklist: [
      "Valid passport with at least 6 months validity remaining",
      "Completed visa application form with standard passport photograph",
      "Personal bank statements for recent 6 months and tax receipts",
      "Employment verification letter, payslips, or student enrollment proof",
      "Detailed travel plan and hotel booking confirmation",
    ],
    applicationStages: [
      {
        title: "Document Preparation",
        description: "Gather financial records, employment verification, and travel itinerary.",
      },
      {
        title: "KVAC Center Submission",
        description: "Submit physical application file at Korea Visa Application Center.",
      },
      {
        title: "Consular Evaluation",
        description: "South Korean consular officers evaluate applicant documents and eligibility.",
      },
      {
        title: "Visa Grant Receipt",
        description: "Download electronic visa grant notice or collect stamped passport.",
      },
    ],
    commonMistakes: [
      "Submitting bank statements without official bank stamp/verification",
      "Inconsistent job designation across application forms and employer letters",
      "Lack of proof showing sufficient balance for trip expenses",
    ],
    faqs: [
      {
        question: "How long does a South Korea tourist visa processing take?",
        answer: "Processing typically takes 7 to 14 working days depending on KVAC location and consular workload.",
      },
    ],
    relatedServiceSlugs: ["tourist-visitor-visas", "visa-readiness-review"],
    officialSourceLabel: "Korea Visa Portal",
    officialSourceUrl: "https://www.visa.go.kr/",
    lastReviewed: "2026-07-01",
  },
];
