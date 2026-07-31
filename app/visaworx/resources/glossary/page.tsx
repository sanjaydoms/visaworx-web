import type { Metadata } from "next";
import { GlossaryPage } from "../../../../features/resources/GlossaryPage";

export const metadata: Metadata = {
  title: "Visa Glossary | Visaworx",
  description:
    "Clear, non-technical definitions of essential visa terminology, consular clauses, and immigration documentation terms.",
  alternates: {
    canonical: "/visaworx/resources/glossary",
  },
  openGraph: {
    title: "Visa Glossary | Visaworx",
    description:
      "Clear, non-technical definitions of essential visa terminology, consular clauses, and immigration documentation terms.",
    url: "/visaworx/resources/glossary",
    type: "website",
  },
};

export default function GlossaryRoute() {
  return <GlossaryPage />;
}
