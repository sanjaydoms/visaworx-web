import { Edit2 } from "lucide-react";
import type { ConsultationFormInput } from "../validation/consultation";
import { countriesData } from "../content/countries";
import { servicesData } from "../content/services";

type ConsultationReviewProps = {
  data: ConsultationFormInput;
  onEditStep: (step: number) => void;
};

export function ConsultationReview({ data, onEditStep }: ConsultationReviewProps) {
  const destName = data.destination.undecided
    ? "Not decided yet"
    : countriesData.find((c) => c.slug === data.destination.countrySlug)?.name || data.destination.countrySlug;

  const serviceName = data.service.undecided
    ? "Not sure yet"
    : servicesData.find((s) => s.slug === data.service.serviceSlug)?.title || data.service.serviceSlug;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        {/* Step 1 Review */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Step 1 — Destination</h3>
            <p className="mt-1 text-base font-bold text-[#071f4a]">{destName || "Not Selected"}</p>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            aria-label="Edit Step 1 Destination"
            className="inline-flex min-h-[48px] min-w-[48px] items-center gap-1 text-xs font-bold text-[#071f4a] hover:underline focus:outline-none focus:ring-2 focus:ring-[#071f4a] rounded-lg p-2"
          >
            <Edit2 className="h-3.5 w-3.5" /> Edit
          </button>
        </div>

        {/* Step 2 Review */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Step 2 — Required Service</h3>
            <p className="mt-1 text-base font-bold text-[#071f4a]">{serviceName || "Not Selected"}</p>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            aria-label="Edit Step 2 Required Service"
            className="inline-flex min-h-[48px] min-w-[48px] items-center gap-1 text-xs font-bold text-[#071f4a] hover:underline focus:outline-none focus:ring-2 focus:ring-[#071f4a] rounded-lg p-2"
          >
            <Edit2 className="h-3.5 w-3.5" /> Edit
          </button>
        </div>

        {/* Step 3 Review */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Step 3 — Situation Summary</h3>
            <p className="text-sm text-slate-700 font-medium">"{data.situation.summary}"</p>
            <div className="grid gap-2 text-xs text-slate-600 sm:grid-cols-2 pt-1">
              <div><span className="font-semibold text-[#071f4a]">Travel Timeframe:</span> {data.situation.travelTimeframe || "Not specified"}</div>
              <div><span className="font-semibold text-[#071f4a]">Prior Refusal:</span> {data.situation.priorRefusal}</div>
              <div><span className="font-semibold text-[#071f4a]">Preferred Language:</span> {data.situation.preferredLanguage || "English"}</div>
              {data.source.readinessBand && (
                <div><span className="font-semibold text-[#071f4a]">Readiness Band Context:</span> {data.source.readinessBand}</div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            aria-label="Edit Step 3 Situation Summary"
            className="inline-flex min-h-[48px] min-w-[48px] items-center gap-1 text-xs font-bold text-[#071f4a] hover:underline focus:outline-none focus:ring-2 focus:ring-[#071f4a] rounded-lg p-2"
          >
            <Edit2 className="h-3.5 w-3.5" /> Edit
          </button>
        </div>

        {/* Step 4 Review */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Step 4 — Contact Details</h3>
            <div className="grid gap-2 text-xs text-slate-700 sm:grid-cols-2">
              <div><span className="font-semibold text-[#071f4a]">Full Name:</span> {data.contact.fullName}</div>
              <div><span className="font-semibold text-[#071f4a]">Email:</span> {data.contact.email}</div>
              <div><span className="font-semibold text-[#071f4a]">Phone:</span> {data.contact.phone}</div>
              <div><span className="font-semibold text-[#071f4a]">Preferred Method:</span> {data.contact.preferredMethod}</div>
              <div><span className="font-semibold text-[#071f4a]">Preferred Window:</span> {data.contact.preferredWindow}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(4)}
            aria-label="Edit Step 4 Contact Details"
            className="inline-flex min-h-[48px] min-w-[48px] items-center gap-1 text-xs font-bold text-[#071f4a] hover:underline focus:outline-none focus:ring-2 focus:ring-[#071f4a] rounded-lg p-2"
          >
            <Edit2 className="h-3.5 w-3.5" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}
