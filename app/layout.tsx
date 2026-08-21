import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../common/components/Header";
import { Footer } from "../common/components/Footer";
import { site } from "../common/config/site";
import { routes } from "../common/config/routes";

const description =
  "Visa intelligence, readiness and human consultation for travellers from India, within the Klar Travels ecosystem.";

export const metadata: Metadata = {
  // Without this every page's canonical and og:url stays relative, which
  // disagrees with the absolute URLs the sitemap publishes.
  metadataBase: new URL(site.url),
  // No title.template here: pages already carry their own brand suffix, so a
  // template would render "... | Visaworx | Visaworx".
  title: "Visaworx | Visa Intelligence & Expert Guidance",
  description,
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Paste the token from Search Console into NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.
  // Omitted entirely when unset, rather than emitting an empty meta tag.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

/**
 * Sitewide identity for search and answer engines. The per-page schema already
 * covers Article, FAQPage and BreadcrumbList; what was missing was any statement
 * of who publishes the site, which is what connects the pages to an entity.
 */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: `${site.url}${site.basePath}`,
  parentOrganization: {
    "@type": "Organization",
    name: site.parentBrand,
    url: site.klarTravelsUrl,
  },
  slogan: site.tagline,
  description,
  logo: `${site.url}/brand/visaworx-logo.png`,
  areaServed: "IN",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: site.supportEmail,
    availableLanguage: ["en"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: `${site.url}${site.basePath}`,
  inLanguage: "en",
  publisher: { "@type": "Organization", name: site.name },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}${routes.guidesList}?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        {/* Bottom clearance so the floating assistant launcher never lands on
            top of a page's final call to action, plus the iOS home-indicator
            inset. Applied once here rather than per page. */}
        <main
          style={{
            paddingBottom: "calc(var(--vw-launcher-clearance) + env(safe-area-inset-bottom, 0px))",
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
