import type { Metadata } from "next";
import { ResourcesHubPage } from "../../../features/resources/ResourcesHubPage";

export const metadata: Metadata = {
  title: "Visa Intelligence Centre | Visaworx",
  description:
    "Explore Visaworx visa guides, readiness insights, document preparation, interview guidance and refusal-awareness resources.",
  alternates: {
    canonical: "/visaworx/resources",
  },
  openGraph: {
    title: "Visa Intelligence Centre | Visaworx",
    description:
      "Explore Visaworx visa guides, readiness insights, document preparation, interview guidance and refusal-awareness resources.",
    url: "/visaworx/resources",
    type: "website",
  },
};

export default function ResourcesHubRoute() {
  return <ResourcesHubPage />;
}
