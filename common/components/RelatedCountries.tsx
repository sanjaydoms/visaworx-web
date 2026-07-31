import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { countriesData } from "../content/countries";
import { routes } from "../config/routes";

export function RelatedCountries({ countrySlugs }: { countrySlugs: string[] }) {
  const matchedCountries = countriesData.filter((c) => countrySlugs.includes(c.slug));

  if (matchedCountries.length === 0) return null;

  return (
    <section aria-labelledby="related-countries-heading" className="space-y-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Popular Destinations</p>
        <h2 id="related-countries-heading" className="mt-2 text-2xl font-extrabold text-[#071f4a] sm:text-3xl">
          Related Country Visa Guidance
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {matchedCountries.map((country) => (
          <div
            key={country.slug}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#071f4a]/20"
          >
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#071f4a]/5 text-[#071f4a]">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold text-[#071f4a]">{country.name}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600 line-clamp-2">{country.summary}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100">
              <Link
                href={routes.countryDetail(country.slug)}
                className="inline-flex min-h-[48px] items-center text-xs font-bold text-[#071f4a] hover:underline"
              >
                View Country Guide <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
