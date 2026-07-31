import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import type { Country } from "../content/countries";
import { routes } from "../config/routes";

export function CountryCard({ country }: { country: Country }) {
  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#071f4a]/20 hover:shadow-xl">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071f4a]/5 text-[#071f4a] transition group-hover:bg-[#071f4a] group-hover:text-white">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-extrabold text-[#071f4a]">{country.name}</h3>
          </div>
          {country.popular && (
            <span className="rounded-full bg-[#e6282f]/10 px-3 py-1 text-xs font-bold text-[#e6282f]">
              Popular
            </span>
          )}
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600 line-clamp-3">
          {country.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {country.visaPurposes.map((purpose) => (
            <span
              key={purpose}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              {purpose}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-7 pt-4 border-t border-slate-100">
        <Link
          href={routes.countryDetail(country.slug)}
          className="inline-flex min-h-[48px] w-full items-center justify-between rounded-2xl bg-slate-50 px-4 text-sm font-bold text-[#071f4a] transition hover:bg-[#071f4a] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
        >
          <span>Explore Guidance</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
