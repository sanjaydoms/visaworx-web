import type { Metadata } from "next";
import { GlossaryPage } from "../../../../features/resources/GlossaryPage";

export const metadata: Metadata = {
  title: "Visa Glossary | Visaworx",
  description:
    "Clear, non-technical definitions of visa terminology, consular clauses and documentation terms used by applicants from India.",
  alternates: {
    canonical: "/visaworx/resources/glossary",
  },
  openGraph: {
    title: "Visa Glossary | Visaworx",
    description:
      "Clear, non-technical definitions of visa terminology, consular clauses and documentation terms used by applicants from India.",
    url: "/visaworx/resources/glossary",
    type: "website",
  },
};

export default function GlossaryRoute() {
  return <GlossaryPage />;
}
