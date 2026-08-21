import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsultationPage } from "../../../features/consultation/ConsultationPage";

export const metadata: Metadata = {
  title: "Book a Visa Consultation | Visaworx",
  description:
    "Request a human visa consultation with Visaworx for destination guidance, readiness, documents, interviews or refusal review, from India.",
  alternates: {
    canonical: "/visaworx/consultation",
  },
  openGraph: {
    siteName: "Visaworx",
    locale: "en_IN",
    title: "Book a Visa Consultation | Visaworx",
    description:
      "Request a human visa consultation with Visaworx for destination guidance, readiness, documents, interviews or refusal review, from India.",
    url: "/visaworx/consultation",
    type: "website",
  },
};

export default function ConsultationRoute() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-slate-500">Loading consultation form...</div>}>
      <ConsultationPage />
    </Suspense>
  );
}
