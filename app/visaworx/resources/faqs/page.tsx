import type { Metadata } from "next";
import { FaqsPage } from "../../../../features/resources/FaqsPage";
import { faqsData } from "../../../../common/content/faqs";

export const metadata: Metadata = {
  title: "Visa Questions and Answers | Visaworx",
  description:
    "Search and browse frequently asked questions regarding visa categories, bank statements, consular interviews, and refusal reviews.",
  alternates: {
    canonical: "/visaworx/resources/faqs",
  },
  openGraph: {
    title: "Visa Questions and Answers | Visaworx",
    description:
      "Search and browse frequently asked questions regarding visa categories, bank statements, consular interviews, and refusal reviews.",
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
