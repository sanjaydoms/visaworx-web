import { ConsultationReview } from "../../../common/components/ConsultationReview";
import { ConsentField } from "../../../common/components/ConsentField";
import { consultationContent } from "../../../common/content/consultation";
import type { ConsultationFormInput } from "../../../common/validation/consultation";
import { StepHeading } from "./StepHeading";

export function ReviewStep({
  formData,
  updateFormData,
  onEditStep,
}: {
  formData: ConsultationFormInput;
  updateFormData: (updater: (prev: ConsultationFormInput) => ConsultationFormInput) => void;
  onEditStep: (step: number) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeading
        title="Review your consultation request."
        description="Verify your selections and confirm permission for our senior expert team to contact you."
      />

      <ConsultationReview data={formData} onEditStep={onEditStep} />

      <ConsentField
        checked={formData.consent.contactPermission && formData.consent.privacyAccepted}
        onChange={(checked) =>
          updateFormData((prev) => ({
            ...prev,
            consent: {
              contactPermission: checked as true,
              privacyAccepted: checked as true,
            },
          }))
        }
        consentText={consultationContent.consentText}
      />
    </div>
  );
}
