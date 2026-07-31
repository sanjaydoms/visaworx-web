import { Edit2 } from "lucide-react";
import type { ReadinessAnswers } from "../types/readiness";
import { countriesData } from "../content/countries";

type ReadinessReviewProps = {
  answers: ReadinessAnswers;
  onEditStep: (step: number) => void;
};

export function ReadinessReview({ answers, onEditStep }: ReadinessReviewProps) {
  const destName =
    countriesData.find((c) => c.slug === answers.destinationSlug)?.name || answers.destinationSlug;

  const preparationItems = [
    { label: "Core Identity Documents", value: answers.hasIdentityDocs },
    { label: "Purpose-Specific Supporting Docs", value: answers.hasPurposeDocs },
    { label: "Financial Evidence & Bank Statements", value: answers.hasFinancialEvidence },
    { label: "Travel & Flight Itinerary", value: answers.hasTravelItinerary },
    { label: "Employment / Education / Sponsorship Docs", value: answers.hasEmploymentOrSponsorshipDocs },
    { label: "Prior Refusal Documentation", value: answers.hasPriorRefusalDocs },
  ].filter((item) => item.value);

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
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Step 2 — Visa Purpose</h3>
            <p className="mt-1 text-base font-bold text-[#071f4a]">{answers.visaPurpose || "Not Selected"}</p>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            aria-label="Edit Step 2 Visa Purpose"
            className="inline-flex min-h-[48px] min-w-[48px] items-center gap-1 text-xs font-bold text-[#071f4a] hover:underline focus:outline-none focus:ring-2 focus:ring-[#071f4a] rounded-lg p-2"
          >
            <Edit2 className="h-3.5 w-3.5" /> Edit
          </button>
        </div>

        {/* Step 3 Review */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Step 3 — Basic Profile</h3>
            <div className="grid gap-2 text-xs text-slate-700 sm:grid-cols-2">
              <div><span className="font-semibold text-[#071f4a]">Valid Passport:</span> {answers.validPassport}</div>
              <div><span className="font-semibold text-[#071f4a]">Travel Purpose Defined:</span> {answers.purposeDefined}</div>
              <div><span className="font-semibold text-[#071f4a]">Home Country Ties:</span> {answers.homeCommitment}</div>
              <div><span className="font-semibold text-[#071f4a]">Funding Source:</span> {answers.fundingSource}</div>
              {answers.priorRefusal && (
                <div><span className="font-semibold text-[#071f4a]">Prior Visa Refusal:</span> {answers.priorRefusal}</div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            aria-label="Edit Step 3 Basic Profile"
            className="inline-flex min-h-[48px] min-w-[48px] items-center gap-1 text-xs font-bold text-[#071f4a] hover:underline focus:outline-none focus:ring-2 focus:ring-[#071f4a] rounded-lg p-2"
          >
            <Edit2 className="h-3.5 w-3.5" /> Edit
          </button>
        </div>

        {/* Step 4 Review */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Step 4 — Document Assembly</h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {preparationItems.length > 0 ? (
                preparationItems.map((item) => (
                  <span key={item.label} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
                    ✓ {item.label}
                  </span>
                ))
              ) : (
                <span className="text-xs font-medium text-slate-500">No documents selected yet</span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(4)}
            aria-label="Edit Step 4 Document Assembly"
            className="inline-flex min-h-[48px] min-w-[48px] items-center gap-1 text-xs font-bold text-[#071f4a] hover:underline focus:outline-none focus:ring-2 focus:ring-[#071f4a] rounded-lg p-2"
          >
            <Edit2 className="h-3.5 w-3.5" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}
