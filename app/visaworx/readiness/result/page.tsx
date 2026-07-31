import type { Metadata } from "next";
import { ReadinessResultPage } from "../../../../features/readiness/ReadinessResultPage";

export const metadata: Metadata = {
  title: "Visa Readiness Summary | Visaworx",
  description: "Review your personalized visa preparation summary, identified strengths, and recommended next steps.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReadinessResultRoute() {
  return <ReadinessResultPage />;
}
