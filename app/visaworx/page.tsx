import type { Metadata } from "next";
import { HomePage } from "../../features/home/HomePage";

const title = "Visaworx | Visa Intelligence & Expert Guidance";
const description =
  "Visa guidance for travellers from India. Understand the right visa pathway, assess your readiness, identify avoidable risks and speak with experienced visa experts.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/visaworx",
  },
  openGraph: {
    siteName: "Visaworx",
    locale: "en_IN",
    title,
    description,
    url: "/visaworx",
    type: "website",
  },
};

export default function VisaworxPage() {
  return <HomePage />;
}
