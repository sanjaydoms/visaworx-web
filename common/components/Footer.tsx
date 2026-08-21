import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { routes } from "../config/routes";
import { site } from "../config/site";

// The Klar mark is dark ink on transparency and vanishes against the footer's
// navy. It sits on its own light surface rather than being recoloured — it is
// another company's logo and immutable. Visaworx has its own knockout artwork.
const lightSurface = "inline-flex rounded-lg bg-white p-2.5";

export function Footer() {
  return (
    <footer className="bg-[#071f4a] text-white">
      <Container>
        <div className="grid gap-8 py-10 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href={routes.home} className="inline-block" aria-label="Visaworx Home">
              <Logo onDark className="h-auto w-40 sm:w-48" />
            </Link>
            <p className="max-w-sm text-sm leading-6 text-slate-300">
              Visa intelligence, readiness and expert human consultation for more confident visa decisions.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Explore</h2>
            <div className="mt-3 flex flex-col gap-1 text-sm text-slate-300">
              <Link href={routes.services} className="flex min-h-[48px] items-center transition hover:text-white">
                Services
              </Link>
              <Link href={routes.countries} className="flex min-h-[48px] items-center transition hover:text-white">
                Countries
              </Link>
              <Link href={routes.readiness} className="flex min-h-[48px] items-center transition hover:text-white">
                Visa Readiness
              </Link>
              <Link href={routes.faq} className="flex min-h-[48px] items-center transition hover:text-white">
                FAQs
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Klar Travels</h2>
            <div className="mt-3 mb-2">
              <span className={lightSurface}>
                <Logo kind="klar" className="h-auto max-w-[160px] object-contain" />
              </span>
            </div>
            <div className="flex flex-col gap-1 text-sm text-slate-300">
              <a
                href={site.klarTravelsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center transition hover:text-white"
              >
                Visit Klar Travels
              </a>
              <a
                href={`mailto:${site.supportEmail}`}
                className="flex min-h-[48px] items-center transition hover:text-white"
              >
                {site.supportEmail}
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Important</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Visa decisions are made by the relevant authority. Visaworx provides consultation and does not guarantee approval.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700/60 py-5 text-sm text-slate-400">
          © 2026 Visaworx. A Klar Travels business vertical.
        </div>
      </Container>
    </footer>
  );
}

