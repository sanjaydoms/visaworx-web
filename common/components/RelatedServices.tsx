import Link from "next/link";
import { ArrowRight, FileSearch, Plane } from "lucide-react";
import { servicesData, type ServiceCategory } from "../content/services";
import { routes } from "../config/routes";

const categoryIcons: Record<ServiceCategory, typeof Plane> = {
  "Travel Purpose": Plane,
  Advisory: FileSearch,
};

export function RelatedServices({ serviceSlugs }: { serviceSlugs: string[] }) {
  // Resolve against the real service records, preserving the caller's ordering
  // and silently dropping any slug with no matching service so a stale
  // reference degrades to fewer cards rather than a broken link.
  const matchedServices = serviceSlugs
    .map((slug) => servicesData.find((service) => service.slug === slug))
    .filter((service) => service !== undefined)
    .slice(0, 3);

  if (matchedServices.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-services-heading" className="space-y-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Advisory Support</p>
        <h2 id="related-services-heading" className="mt-2 text-2xl font-extrabold text-[#071f4a] sm:text-3xl">
          Related Visa Consultation Services
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {matchedServices.map((service) => {
          const Icon = categoryIcons[service.category];
          return (
            <div key={service.slug} className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <Icon className="h-7 w-7 text-[#071f4a]" />
                <h3 className="mt-4 font-bold text-[#071f4a]">{service.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{service.shortDescription}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <Link
                  href={routes.serviceDetail(service.slug)}
                  className="inline-flex min-h-[48px] items-center text-xs font-bold text-[#071f4a] hover:underline"
                >
                  Learn More <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
