export type ConsultationStep = 1 | 2 | 3 | 4 | 5;

export type PreferredContactMethod = "phone" | "whatsapp" | "email";
export type PreferredContactWindow = "morning" | "afternoon" | "evening" | "no-preference";
export type PriorRefusalOption = "yes" | "no" | "prefer-not-to-say";

export type ConsultationRequest = {
  id: string;
  submittedAt: string;
  source: {
    pageType: "homepage" | "country" | "service" | "readiness" | "guide" | "direct" | "other";
    sourcePath?: string;
    countrySlug?: string;
    serviceSlug?: string;
    guideSlug?: string;
    readinessBand?: string;
  };
  destination: {
    countrySlug?: string;
    undecided: boolean;
  };
  service: {
    serviceSlug?: string;
    undecided: boolean;
  };
  situation: {
    travelTimeframe?: string;
    summary: string;
    priorRefusal: PriorRefusalOption;
    preferredLanguage?: string;
  };
  contact: {
    fullName: string;
    email: string;
    phone: string;
    preferredMethod: PreferredContactMethod;
    preferredWindow: PreferredContactWindow;
    preferredDate?: string;
    preferredTime?: string;
  };
  consent: {
    contactPermission: true;
    privacyAccepted: true;
  };
};

export type ConsultationApiResponse =
  | { success: true; requestId: string }
  | { success: false; error: string };
