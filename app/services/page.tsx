import type { Metadata } from "next";
import { ServicesListPage } from "../../features/services/ServicesListPage";

export const metadata: Metadata = {
  title: "Visa Consultation Services | Visaworx",
  description:
    "Visa consultation, readiness, documentation, interview and refusal-review services from Visaworx, for travellers applying from India.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    siteName: "Visaworx",
    locale: "en_IN",
    title: "Visa Consultation Services | Visaworx",
    description:
      "Visa consultation, readiness, documentation, interview and refusal-review services from Visaworx, for travellers applying from India.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesListPage />;
}
