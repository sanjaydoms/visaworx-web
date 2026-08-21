import type { Metadata } from "next";
import { GuidesListPage } from "../../../features/resources/GuidesListPage";

export const metadata: Metadata = {
  title: "Visa Guides and Preparation Resources | Visaworx",
  description:
    "Visa guides for travellers from India - preparation roadmaps, document checklists, country guidance and refusal-awareness resources.",
  alternates: {
    canonical: "/resources/guides",
  },
  openGraph: {
    siteName: "Visaworx",
    locale: "en_IN",
    title: "Visa Guides and Preparation Resources | Visaworx",
    description:
      "Visa guides for travellers from India - preparation roadmaps, document checklists, country guidance and refusal-awareness resources.",
    url: "/resources/guides",
    type: "website",
  },
};

export default function GuidesListRoute() {
  return <GuidesListPage />;
}
