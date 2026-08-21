import type { Metadata } from "next";
import { ReadinessAssessmentPage } from "../../features/readiness/ReadinessAssessmentPage";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Visa Readiness Assessment | Visaworx",
  description:
    "Assess your visa preparation for travel from India, identify gaps and understand the next steps before you apply.",
  alternates: {
    canonical: "/readiness",
  },
  openGraph: {
    siteName: "Visaworx",
    locale: "en_IN",
    title: "Visa Readiness Assessment | Visaworx",
    description:
      "Assess your visa preparation for travel from India, identify gaps and understand the next steps before you apply.",
    url: "/readiness",
    type: "website",
  },
};

export default function ReadinessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading assessment...</div>}>
      <ReadinessAssessmentPage />
    </Suspense>
  );
}
