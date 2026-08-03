"use client";

import { Container } from "../../common/components/Container";
import { PageShell } from "../../common/components/PageShell";
import { StickyActionBar } from "../../common/components/StickyActionBar";
import { ConsultationHero } from "../../common/components/ConsultationHero";
import { ConsultationStepper } from "../../common/components/ConsultationStepper";
import { ConsultationProgress } from "../../common/components/ConsultationProgress";
import { ConsultationDisclaimer } from "../../common/components/ConsultationDisclaimer";
import { SubmissionError } from "../../common/components/SubmissionError";
import { SubmitButton } from "../../common/components/SubmitButton";
import { BackButton } from "../../common/components/BackButton";
import { ContinueButton } from "../../common/components/ContinueButton";
import { consultationContent } from "../../common/content/consultation";
import {
  CONSULTATION_FIRST_STEP,
  CONSULTATION_LAST_STEP,
} from "../../common/config/consultation";
import { useConsultationFlow } from "./hooks/useConsultationFlow";
import { DestinationStep } from "./components/DestinationStep";
import { ServiceStep } from "./components/ServiceStep";
import { SituationStep } from "./components/SituationStep";
import { ContactStep } from "./components/ContactStep";
import { ReviewStep } from "./components/ReviewStep";

export function ConsultationPage() {
  const {
    currentStep,
    formData,
    updateFormData,
    validationError,
    submissionError,
    isSubmitting,
    nextStep,
    prevStep,
    jumpToStep,
    submitForm,
  } = useConsultationFlow();

  return (
    <PageShell spacing="tight">
      <Container>
        <ConsultationHero />
      </Container>

      <Container>
        <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
          <div className="space-y-4">
            <ConsultationStepper currentStep={currentStep} onStepClick={jumpToStep} />
            <ConsultationProgress currentStep={currentStep} />
          </div>

          {validationError && (
            <div
              className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-700"
              role="alert"
            >
              ⚠️ {validationError}
            </div>
          )}

          {submissionError && <SubmissionError error={submissionError} onRetry={submitForm} />}

          {currentStep === 1 && (
            <DestinationStep formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && <ServiceStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && (
            <SituationStep formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 4 && <ContactStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 5 && (
            <ReviewStep
              formData={formData}
              updateFormData={updateFormData}
              onEditStep={jumpToStep}
            />
          )}

          {/* Navigation Controls — pinned on small viewports so the primary
              action stays reachable in long steps. */}
          <StickyActionBar className="flex items-center justify-between gap-4 sm:border-t sm:border-slate-100 sm:pt-6">
            {currentStep > CONSULTATION_FIRST_STEP ? (
              <BackButton onClick={prevStep} disabled={isSubmitting} />
            ) : (
              <div />
            )}

            {currentStep < CONSULTATION_LAST_STEP ? (
              <ContinueButton onClick={nextStep} />
            ) : (
              <SubmitButton
                onClick={submitForm}
                isSubmitting={isSubmitting}
                label={consultationContent.submitButtonText}
              />
            )}
          </StickyActionBar>
        </div>
      </Container>

      <Container>
        <ConsultationDisclaimer />
      </Container>
    </PageShell>
  );
}
