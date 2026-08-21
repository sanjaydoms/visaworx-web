import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../common/components/Header";
import { Footer } from "../common/components/Footer";
import { site } from "../common/config/site";

export const metadata: Metadata = {
  // Without this every page's canonical and og:url stays relative, which
  // disagrees with the absolute URLs the sitemap publishes.
  metadataBase: new URL(site.url),
  title: "Visaworx | Visa Intelligence & Expert Guidance",
  description:
    "Visa intelligence, readiness and human consultation for travellers from India, within the Klar Travels ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
