import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { Container } from "../common/components/Container";
import { ButtonLink } from "../common/components/ButtonLink";
import { routes } from "../common/config/routes";

export default function NotFound() {
  return (
    <div className="py-16 sm:py-24 text-center space-y-8">
      <Container>
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#071f4a]/5 text-[#e6282f]">
            <Compass className="h-10 w-10" />
          </div>

          <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">
            404 Page Not Found
          </p>

          <h1 className="text-3xl font-black text-[#071f4a] sm:text-4xl lg:text-5xl">
            We couldn&#39;t find that page.
          </h1>

          <p className="text-base leading-7 text-slate-600 sm:text-lg">
            The page you requested may have moved or no longer exists. Explore our core visa intelligence modules below.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <ButtonLink href={routes.home}>
              <Home className="mr-2 h-4 w-4" /> Return to Homepage
            </ButtonLink>
            <ButtonLink href={routes.countriesList} variant="secondary">
              Explore Countries
            </ButtonLink>
          </div>

          <div className="pt-8 border-t border-slate-200 grid gap-3 sm:grid-cols-3 text-left">
            <Link
              href={routes.servicesList}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#071f4a]/20"
            >
              <h3 className="font-bold text-[#071f4a] text-sm">Services</h3>
              <p className="mt-1 text-xs text-slate-500">Explore advisory offerings</p>
            </Link>

            <Link
              href={routes.readiness}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#071f4a]/20"
            >
              <h3 className="font-bold text-[#071f4a] text-sm">Visa Readiness</h3>
              <p className="mt-1 text-xs text-slate-500">Evaluate preparation</p>
            </Link>

            <Link
              href={routes.resourcesHub}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#071f4a]/20"
            >
              <h3 className="font-bold text-[#071f4a] text-sm">Resources Hub</h3>
              <p className="mt-1 text-xs text-slate-500">Guides, FAQs & Glossary</p>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
