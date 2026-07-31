import Link from "next/link";
import { ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import type { Service } from "../content/services";
import { routes } from "../config/routes";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#071f4a]/20 hover:shadow-xl">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#071f4a]/5 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#071f4a]">
            {service.category}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-extrabold text-[#071f4a] group-hover:text-[#0b3478]">
          {service.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {service.shortDescription}
        </p>

        <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
          <div className="flex items-start gap-2 text-xs text-slate-600">
            <UserCheck className="h-4 w-4 shrink-0 text-[#e6282f] mt-0.5" />
            <span><strong className="font-bold text-[#071f4a]">Ideal for:</strong> {service.idealFor[0]}</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-600">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
            <span><strong className="font-bold text-[#071f4a]">Key Outcome:</strong> {service.outcomes[0]}</span>
          </div>
        </div>
      </div>

      <div className="mt-7 pt-4 border-t border-slate-100">
        <Link
          href={routes.serviceDetail(service.slug)}
          className="inline-flex min-h-[48px] w-full items-center justify-between rounded-2xl bg-slate-50 px-4 text-sm font-bold text-[#071f4a] transition hover:bg-[#071f4a] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
        >
          <span>Explore Service</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
