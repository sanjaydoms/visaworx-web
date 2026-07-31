export type AssistantPageContext = {
  pageType: "homepage" | "country" | "service" | "readiness" | "guide" | "consultation" | "assistant";
  countrySlug?: string;
  serviceSlug?: string;
  guideSlug?: string;
  readinessBand?: string;
};

export type SourceItem = {
  label: string;
  href: string;
  type: "country" | "service" | "guide" | "faq" | "official-reference";
};

export type NextStepItem = {
  label: string;
  href: string;
  type: "readiness" | "consultation" | "country" | "service" | "guide";
};

export type AssistantResponse = {
  answer: string;
  explanation?: string;
  sources: SourceItem[];
  limitation?: string;
  nextSteps: NextStepItem[];
  escalation?: {
    required: boolean;
    reason?: string;
  };
};

export type AssistantMessage = {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  data?: AssistantResponse;
  isError?: boolean;
};

export type AssistantRequestPayload = {
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
  context?: AssistantPageContext;
};
