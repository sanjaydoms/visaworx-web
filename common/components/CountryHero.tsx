import { ArrowRight, Globe } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import type { Country } from "../content/countries";
import { site } from "../config/site";
import { routes } from "../config/routes";

export function CountryHero({ country }: { country: Country }) {
  return (
    <section className="overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_right,#0b3478,transparent_45%),linear-gradient(180deg,#071f4a,#051738)] p-8 text-white sm:p-12">
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#ff7377]">
            <Globe className="h-5 w-5" />
          </div>
          <span className="text-sm font-extrabold uppercase tracking-widest text-[#ff7377]">
            Visa Guidance & Intelligence
          </span>
          {country.lastReviewed && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
              Reviewed: {country.lastReviewed}
            </span>
          )}
        </div>

        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          {country.name} Visa Guidance for Indian Travellers
        </h1>

        <p className="mt-5 text-lg leading-8 text-white/80 sm:text-xl">
          {country.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {country.visaPurposes.map((purpose) => (
            <span
              key={purpose}
              className="rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold text-white/90"
            >
              {purpose} Visa
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href={site.consultationUrl}>
            Speak to an Expert <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
          <ButtonLink href={routes.readiness} variant="secondary">
            Check My Readiness
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
