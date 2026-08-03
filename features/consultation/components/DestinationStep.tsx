import { CountrySelector } from "../../../common/components/CountrySelector";
import { UNDECIDED_LABELS } from "../../../common/config/consultation";
import type { ConsultationFormInput } from "../../../common/validation/consultation";
import { StepHeading } from "./StepHeading";

export function DestinationStep({
  formData,
  updateFormData,
}: {
  formData: ConsultationFormInput;
  updateFormData: (updater: (prev: ConsultationFormInput) => ConsultationFormInput) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeading
        title="Where are you planning to travel?"
        description={`Select your primary destination country or mark "${UNDECIDED_LABELS.destination}."`}
      />

      <CountrySelector
        selectedSlug={formData.destination.countrySlug}
        undecided={formData.destination.undecided}
        undecidedLabel={UNDECIDED_LABELS.destination}
        onSelect={(slug) =>
          updateFormData((prev) => ({
            ...prev,
            destination: { countrySlug: slug, undecided: false },
          }))
        }
        onUndecidedChange={(undecided) =>
          updateFormData((prev) => ({
            ...prev,
            destination: {
              countrySlug: undecided ? "" : prev.destination.countrySlug,
              undecided,
            },
          }))
        }
      />
    </div>
  );
}
