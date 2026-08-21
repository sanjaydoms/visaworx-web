import type { Metadata } from "next";
import { ResourcesHubPage } from "../../features/resources/ResourcesHubPage";

export const metadata: Metadata = {
  title: "Visa Intelligence Centre | Visaworx",
  description:
    "Visa guides for travellers from India - readiness insights, document preparation, interview guidance and refusal-awareness resources.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    siteName: "Visaworx",
    locale: "en_IN",
    title: "Visa Intelligence Centre | Visaworx",
    description:
      "Visa guides for travellers from India - readiness insights, document preparation, interview guidance and refusal-awareness resources.",
    url: "/resources",
    type: "website",
  },
};

export default function ResourcesHubRoute() {
  return <ResourcesHubPage />;
}
