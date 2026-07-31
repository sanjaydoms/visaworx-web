import type { Metadata } from "next";
import { CountriesListPage } from "../../../features/countries/CountriesListPage";

export const metadata: Metadata = {
  title: "Visa Guidance by Country | Visaworx",
  description:
    "Explore destination-specific visa intelligence, readiness guidance and expert human consultation from Visaworx.",
  alternates: {
    canonical: "/visaworx/countries",
  },
  openGraph: {
    title: "Visa Guidance by Country | Visaworx",
    description:
      "Explore destination-specific visa intelligence, readiness guidance and expert human consultation from Visaworx.",
    url: "/visaworx/countries",
    type: "website",
  },
};

export default function CountriesPage() {
  return <CountriesListPage />;
}
