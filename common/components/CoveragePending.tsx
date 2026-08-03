import { ShieldAlert, ArrowRight, Users } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { routes } from "../config/routes";
import type { Country } from "../content/countries";

/**
 * Shown for destinations Visaworx lists but has not yet published verified
 * guidance for.
 *
 * The page exists so a traveller searching for this destination finds Visaworx
 * and can reach a human expert. It deliberately states what is not held rather
 * than filling the space with generic visa text — unverified requirements
 * presented as guidance are what get applications rejected.
 */
export function CoveragePending({ country }: { country: Country }) {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-black text-[#071f4a]">
              Detailed {country.name} guidance is not published yet
            </h2>
            <p className="text-sm leading-7 text-slate-700">
              Visaworx supports consultations for {country.name}, but we have not yet published a
              reviewed preparation guide for this destination. Rather than show general visa
              information that may not apply to your situation, we would rather connect you with a
              consultant who can work through it with you.
            </p>
            <p className="text-sm leading-7 text-slate-700">
              For official requirements, always confirm with the {country.officialSourceLabel}.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071f4a]/5 text-[#071f4a]">
            <Users className="h-5 w-5" />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-[#071f4a]">
              Speak to a Visaworx expert about {country.name}
            </h3>
            <p className="text-sm leading-7 text-slate-600">
              Share your travel purpose and situation, and a consultant will review the current
              requirements with you before you apply.
            </p>
            <ButtonLink href={`${routes.consultation}?source=country`}>
              Request a consultation <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
        Looking for a destination we have published in depth?{" "}
        <a href={routes.countriesList} className="font-semibold text-[#071f4a] underline">
          Browse all destinations
        </a>
        .
      </div>
    </div>
  );
}
