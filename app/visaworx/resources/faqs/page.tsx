import type { Metadata } from "next";
import { FaqsPage } from "../../../../features/resources/FaqsPage";
import { faqsData } from "../../../../common/content/faqs";

export const metadata: Metadata = {
  title: "Visa Questions and Answers | Visaworx",
  description:
    "Answers for applicants from India on visa categories, bank statements, income tax records, consular interviews and refusal reviews.",
  alternates: {
    canonical: "/visaworx/resources/faqs",
  },
  openGraph: {
    siteName: "Visaworx",
    locale: "en_IN",
    title: "Visa Questions and Answers | Visaworx",
    description:
      "Answers for applicants from India on visa categories, bank statements, income tax records, consular interviews and refusal reviews.",
    url: "/visaworx/resources/faqs",
    type: "website",
  },
};

export default function FaqsRoute() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <FaqsPage />
    </>
  );
}
