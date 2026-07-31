import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../common/components/Header";
import { Footer } from "../common/components/Footer";

export const metadata: Metadata = {
  title: "Visaworx | Visa Intelligence & Expert Guidance",
  description:
    "Visa intelligence, readiness and human consultation within the Klar Travels ecosystem.",
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
