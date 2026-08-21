import type { Metadata } from "next";
import { ServicesListPage } from "../../../features/services/ServicesListPage";

export const metadata: Metadata = {
  title: "Visa Consultation Services | Visaworx",
  description:
    "Visa consultation, readiness, documentation, interview and refusal-review services from Visaworx, for travellers applying from India.",
  alternates: {
    canonical: "/visaworx/services",
  },
  openGraph: {
    title: "Visa Consultation Services | Visaworx",
    description:
      "Visa consultation, readiness, documentation, interview and refusal-review services from Visaworx, for travellers applying from India.",
    url: "/visaworx/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesListPage />;
}
