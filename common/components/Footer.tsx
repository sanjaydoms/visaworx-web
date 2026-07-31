import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { routes } from "../config/routes";
import { site } from "../config/site";

export function Footer() {
  return (
    <footer className="bg-[#071f4a] text-white">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="h-auto w-48 brightness-0 invert" />
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
              Visa intelligence, readiness and expert human consultation for more confident visa decisions.
            </p>
          </div>

          <div>
            <h2 className="font-bold">Explore</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              <Link href={routes.services}>Services</Link>
              <Link href={routes.countries}>Countries</Link>
              <Link href={routes.readiness}>Visa Readiness</Link>
              <Link href={routes.faq}>FAQs</Link>
            </div>
          </div>

          <div>
            <h2 className="font-bold">Klar Travels</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              <a href={site.klarTravelsUrl}>Visit Klar Travels</a>
              <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
            </div>
          </div>

          <div>
            <h2 className="font-bold">Important</h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Visa decisions are made solely by the relevant authority. Visaworx does not guarantee approval.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-sm text-white/60">
          © {new Date().getFullYear()} Visaworx. A Klar Travels business vertical.
        </div>
      </Container>
    </footer>
  );
}
