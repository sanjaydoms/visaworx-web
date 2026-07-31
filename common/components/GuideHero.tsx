import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import type { Guide } from "../content/guides";
import { site } from "../config/site";
import { routes } from "../config/routes";

export function GuideHero({ guide }: { guide: Guide }) {
  return (
    <section className="overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_right,#0b3478,transparent_45%),linear-gradient(180deg,#071f4a,#051738)] p-8 text-white sm:p-12">
      <div className="max-w-3xl space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#ff7377]/20 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[#ff7377]">
            {guide.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/80">
            <Clock className="h-3.5 w-3.5" /> {guide.readingTime}
          </span>
          {guide.lastReviewed && (
            <span className="flex items-center gap-1 text-xs text-white/60">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Last Reviewed: {guide.lastReviewed}
            </span>
          )}
        </div>

        <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
          {guide.title}
        </h1>

        <p className="text-base leading-7 text-white/80 sm:text-lg">
          {guide.summary}
        </p>

        <div className="pt-2 flex flex-col gap-3 sm:flex-row">
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
