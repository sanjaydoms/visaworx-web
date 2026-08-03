import { ServiceSelector } from "../../../common/components/ServiceSelector";
import { UNDECIDED_LABELS } from "../../../common/config/consultation";
import type { ConsultationFormInput } from "../../../common/validation/consultation";
import { StepHeading } from "./StepHeading";

export function ServiceStep({
  formData,
  updateFormData,
}: {
  formData: ConsultationFormInput;
  updateFormData: (updater: (prev: ConsultationFormInput) => ConsultationFormInput) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeading
        title="What kind of support do you need?"
        description="Select the visa category or advisory service that matches your objective."
      />

      <ServiceSelector
        selectedSlug={formData.service.serviceSlug}
        undecided={formData.service.undecided}
        undecidedLabel={UNDECIDED_LABELS.service}
        onSelect={(slug) =>
          updateFormData((prev) => ({
            ...prev,
            service: { serviceSlug: slug, undecided: false },
          }))
        }
        onUndecidedChange={(undecided) =>
          updateFormData((prev) => ({
            ...prev,
            service: {
              serviceSlug: undecided ? "" : prev.service.serviceSlug,
              undecided,
            },
          }))
        }
      />
    </div>
  );
}
