import type { Metadata } from "next";
import { GuidesListPage } from "../../../../features/resources/GuidesListPage";

export const metadata: Metadata = {
  title: "Visa Guides and Preparation Resources | Visaworx",
  description:
    "Search and browse comprehensive visa guides, preparation roadmaps, document checklists, and refusal-awareness resources.",
  alternates: {
    canonical: "/visaworx/resources/guides",
  },
  openGraph: {
    title: "Visa Guides and Preparation Resources | Visaworx",
    description:
      "Search and browse comprehensive visa guides, preparation roadmaps, document checklists, and refusal-awareness resources.",
    url: "/visaworx/resources/guides",
    type: "website",
  },
};

export default function GuidesListRoute() {
  return <GuidesListPage />;
}
