import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "../../../../common/content/services";
import { ServiceDetailPage } from "../../../../features/services/ServiceDetailPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Visaworx",
    };
  }

  const title = `${service.title} | Visaworx`;
  const description = `Understand who the service is for, what it includes and how Visaworx expert guidance can help you prepare.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/visaworx/services/${service.slug}`,
    },
    openGraph: {
    siteName: "Visaworx",
    locale: "en_IN",
      title,
      description,
      url: `/visaworx/services/${service.slug}`,
      type: "article",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
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
        name: "Services",
        item: "https://www.klartravels.com/visaworx/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://www.klartravels.com/visaworx/services/${service.slug}`,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <ServiceDetailPage service={service} />
    </>
  );
}
