import type { Metadata } from "next";
import { AssistantPage } from "../../../features/assistant/AssistantPage";

export const metadata: Metadata = {
  title: "Visa Intelligence Assistant | Visaworx",
  description:
    "Ask general visa preparation questions for travel from India and explore approved Visaworx country, service and readiness guidance.",
  alternates: {
    canonical: "/visaworx/assistant",
  },
  openGraph: {
    title: "Visa Intelligence Assistant | Visaworx",
    description:
      "Ask general visa preparation questions for travel from India and explore approved Visaworx country, service and readiness guidance.",
    url: "/visaworx/assistant",
    type: "website",
  },
};

export default function AssistantRoute() {
  return <AssistantPage />;
}
