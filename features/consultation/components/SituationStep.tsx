import { TextField } from "../../../common/components/TextField";
import { OptionToggleGroup } from "../../../common/components/OptionToggleGroup";
import {
  PRIOR_REFUSAL_OPTIONS,
  SITUATION_SUMMARY_LIMITS,
  type PriorRefusalOption,
} from "../../../common/config/consultation";
import type { ConsultationFormInput } from "../../../common/validation/consultation";
import { StepHeading } from "./StepHeading";

const priorRefusalLabels: Record<PriorRefusalOption, string> = {
  no: "No prior refusal",
  yes: "Yes, I have a refusal",
  "prefer-not-to-say": "Prefer not to say",
};

export function SituationStep({
  formData,
  updateFormData,
}: {
  formData: ConsultationFormInput;
  updateFormData: (updater: (prev: ConsultationFormInput) => ConsultationFormInput) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeading
        title="Tell us briefly about your situation."
        description="Share your travel timeframe, prior visa history, and key goals."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="travel-timeframe"
          label="Planned Travel Timeframe"
          value={formData.situation.travelTimeframe || ""}
          onChange={(value) =>
            updateFormData((prev) => ({
              ...prev,
              situation: { ...prev.situation, travelTimeframe: value },
            }))
          }
          placeholder="e.g. Next month, October 2026, Q4..."
        />

        <TextField
          id="preferred-language"
          label="Preferred Language"
          value={formData.situation.preferredLanguage || ""}
          onChange={(value) =>
            updateFormData((prev) => ({
              ...prev,
              situation: { ...prev.situation, preferredLanguage: value },
            }))
          }
          placeholder="e.g. English, Hindi, Arabic..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="situation-summary"
            className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider"
          >
            Short Situation Summary *
          </label>
          <span id="situation-summary-count" className="text-xs text-slate-500">
            {formData.situation.summary.length} /{" "}
            {SITUATION_SUMMARY_LIMITS.max.toLocaleString("en-US")} chars
          </span>
        </div>
        <textarea
          id="situation-summary"
          rows={4}
          maxLength={SITUATION_SUMMARY_LIMITS.max}
          aria-describedby="situation-summary-count"
          value={formData.situation.summary}
          onChange={(e) =>
            updateFormData((prev) => ({
              ...prev,
              situation: { ...prev.situation, summary: e.target.value },
            }))
          }
          placeholder={`Describe your travel purpose, current employment/study status, or key questions (min ${SITUATION_SUMMARY_LIMITS.min} characters)...`}
          className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm font-medium text-[#071f4a] focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
        />
      </div>

      <OptionToggleGroup
        label="Have you experienced a prior visa refusal?"
        options={PRIOR_REFUSAL_OPTIONS}
        value={formData.situation.priorRefusal}
        onSelect={(option) =>
          updateFormData((prev) => ({
            ...prev,
            situation: { ...prev.situation, priorRefusal: option },
          }))
        }
        renderLabel={(option) => priorRefusalLabels[option]}
      />
    </div>
  );
}
