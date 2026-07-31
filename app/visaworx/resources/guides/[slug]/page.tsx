import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guidesData } from "../../../../../common/content/guides";
import { GuideDetailPage } from "../../../../../features/resources/GuideDetailPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return guidesData.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug);

  if (!guide) {
    return {
      title: "Guide Not Found | Visaworx",
    };
  }

  return {
    title: guide.seo.title,
    description: guide.seo.description,
    alternates: {
      canonical: `/visaworx/resources/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.seo.title,
      description: guide.seo.description,
      url: `/visaworx/resources/guides/${guide.slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug);

  if (!guide) {
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
        name: "Resources",
        item: "https://www.klartravels.com/visaworx/resources",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Guides",
        item: "https://www.klartravels.com/visaworx/resources/guides",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: guide.title,
        item: `https://www.klartravels.com/visaworx/resources/guides/${guide.slug}`,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    dateModified: guide.lastReviewed || "2026-07-01",
    author: {
      "@type": "Organization",
      name: "Visaworx",
    },
    publisher: {
      "@type": "Organization",
      name: "Klar Travels",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <GuideDetailPage guide={guide} />
    </>
  );
}
