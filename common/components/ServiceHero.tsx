import { ArrowRight, ShieldCheck, Users, Zap } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import type { Service } from "../content/services";
import { site } from "../config/site";
import { routes } from "../config/routes";

export function ServiceHero({ service }: { service: Service }) {
  return (
    <section className="overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_right,#0b3478,transparent_45%),linear-gradient(180deg,#071f4a,#051738)] p-8 text-white sm:p-12">
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/90">
            <Users className="h-3.5 w-3.5 text-[#ff7377]" /> Human-led
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/90">
            <Zap className="h-3.5 w-3.5 text-[#ff7377]" /> Preparation-focused
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/90">
            <ShieldCheck className="h-3.5 w-3.5 text-[#ff7377]" /> No approval guarantees
          </span>
        </div>

        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          {service.title}
        </h1>

        <p className="mt-5 text-lg leading-8 text-white/80 sm:text-xl">
          {service.shortDescription}
        </p>

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
