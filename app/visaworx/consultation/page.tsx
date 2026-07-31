import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsultationPage } from "../../../features/consultation/ConsultationPage";

export const metadata: Metadata = {
  title: "Book a Visa Consultation | Visaworx",
  description:
    "Request a human visa consultation with Visaworx for destination guidance, readiness, documents, interviews or refusal review.",
  alternates: {
    canonical: "/visaworx/consultation",
  },
  openGraph: {
    title: "Book a Visa Consultation | Visaworx",
    description:
      "Request a human visa consultation with Visaworx for destination guidance, readiness, documents, interviews or refusal review.",
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
