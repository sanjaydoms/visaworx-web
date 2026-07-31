import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "../content/home";
import { routes } from "../config/routes";

export function RelatedServices({ serviceSlugs }: { serviceSlugs: string[] }) {
  // Pick matching services from common home services array
  const matchedServices = services.slice(0, 3);

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
          const Icon = service.icon;
          return (
            <div key={service.title} className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <Icon className="h-7 w-7 text-[#071f4a]" />
                <h3 className="mt-4 font-bold text-[#071f4a]">{service.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{service.description}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <Link
                  href={routes.services}
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
