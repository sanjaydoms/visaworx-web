import type { Metadata } from "next";
import { ReadinessAssessmentPage } from "../../../features/readiness/ReadinessAssessmentPage";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Visa Readiness Assessment | Visaworx",
  description:
    "Assess your visa preparation, identify gaps and understand the next steps before you apply.",
  alternates: {
    canonical: "/visaworx/readiness",
  },
  openGraph: {
    title: "Visa Readiness Assessment | Visaworx",
    description:
      "Assess your visa preparation, identify gaps and understand the next steps before you apply.",
    url: "/visaworx/readiness",
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
