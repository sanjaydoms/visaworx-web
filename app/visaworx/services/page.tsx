import type { Metadata } from "next";
import { ServicesListPage } from "../../../features/services/ServicesListPage";

export const metadata: Metadata = {
  title: "Visa Consultation Services | Visaworx",
  description:
    "Explore Visaworx visa consultation, readiness, documentation, interview and refusal-review services.",
  alternates: {
    canonical: "/visaworx/services",
  },
  openGraph: {
    title: "Visa Consultation Services | Visaworx",
    description:
      "Explore Visaworx visa consultation, readiness, documentation, interview and refusal-review services.",
    url: "/visaworx/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesListPage />;
}
