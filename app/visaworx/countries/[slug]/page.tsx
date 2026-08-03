import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { countriesData } from "../../../../common/content/countries";
import { CountryDetailPage } from "../../../../features/countries/CountryDetailPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return countriesData.map((country) => ({
    slug: country.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = countriesData.find((c) => c.slug === slug);

  if (!country) {
    return {
      title: "Country Not Found | Visaworx",
    };
  }

  // Titles must not promise guidance that is not published.
  const title =
    country.coverage === "awaiting-verification"
      ? `${country.name} Visa Consultation | Visaworx`
      : `${country.name} Visa Guidance for Indian Travellers | Visaworx`;
  const description =
    country.coverage === "awaiting-verification"
      ? `Visa consultation and preparation support for ${country.name}. Speak to a Visaworx expert about your travel.`
      : `Understand common visa purposes, preparation steps, avoidable mistakes and expert consultation options for ${country.name}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/visaworx/countries/${country.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/visaworx/countries/${country.slug}`,
      type: "article",
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = countriesData.find((c) => c.slug === slug);

  if (!country) {
    notFound();
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.klartravels.com/visaworx",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Countries",
        item: "https://www.klartravels.com/visaworx/countries",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: country.name,
        item: `https://www.klartravels.com/visaworx/countries/${country.slug}`,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: country.faqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Only emit FAQ structured data when there are real FAQs. An empty
          FAQPage schema is invalid and harms search presentation. */}
      {country.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <CountryDetailPage country={country} />
    </>
  );
}
