"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "../../common/components/Container";
import { ReadinessHero } from "../../common/components/ReadinessHero";
import { ReadinessStepper } from "../../common/components/ReadinessStepper";
import { ReadinessProgress } from "../../common/components/ReadinessProgress";
import { ReadinessQuestion } from "../../common/components/ReadinessQuestion";
import { ReadinessOption } from "../../common/components/ReadinessOption";
import { ReadinessReview } from "../../common/components/ReadinessReview";
import { BackButton } from "../../common/components/BackButton";
import { ContinueButton } from "../../common/components/ContinueButton";
import { ExitConfirmation } from "../../common/components/ExitConfirmation";
import { useReadinessAssessment } from "./hooks/useReadinessAssessment";
import { countriesData, type VisaPurpose } from "../../common/content/countries";
import { routes } from "../../common/config/routes";
import { RotateCcw } from "lucide-react";

export function ReadinessAssessmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDest = searchParams.get("destination") || undefined;

  const {
    currentStep,
    answers,
    updateAnswers,
    validationError,
    nextStep,
    prevStep,
    jumpToStep,
    restartAssessment,
  } = useReadinessAssessment(initialDest);

  const [showExitModal, setShowExitModal] = useState(false);

  const handleFinishAssessment = () => {
    // Save state and navigate to result
    router.push(routes.readinessResult);
  };

  return (
    <div className="py-10 sm:py-16 space-y-8">
      <Container>
        <ReadinessHero />
      </Container>

      <Container>
        <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <ReadinessProgress currentStep={currentStep} totalSteps={5} />
            <button
              type="button"
              onClick={() => setShowExitModal(true)}
              className="inline-flex min-h-[48px] items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#e6282f] focus:outline-none focus:ring-2 focus:ring-[#071f4a] rounded-lg p-2"
            >
              <RotateCcw className="h-4 w-4" /> Restart
            </button>
          </div>

          <ReadinessStepper currentStep={currentStep} onStepClick={jumpToStep} />

          {/* STEP 1: DESTINATION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <ReadinessQuestion
                id="step-1-destination"
                label="Step 1 — Choose Your Destination Country"
                description="Select the country or territory you plan to visit."
                required
                error={validationError}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {countriesData.map((country) => (
                    <ReadinessOption
                      key={country.slug}
                      name="destinationSlug"
                      value={country.slug}
                      checked={answers.destinationSlug === country.slug}
                      onChange={(val) => updateAnswers({ destinationSlug: val })}
                      label={country.name}
                      description={country.summary}
                    />
                  ))}
                </div>
              </ReadinessQuestion>
            </div>
          )}

          {/* STEP 2: PURPOSE */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <ReadinessQuestion
                id="step-2-purpose"
                label="Step 2 — Primary Travel Purpose"
                description="Select the principal reason for your upcoming travel."
                required
                error={validationError}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {(["Tourist", "Business", "Student", "Work", "Family"] as VisaPurpose[]).map(
                    (purpose) => (
                      <ReadinessOption
                        key={purpose}
                        name="visaPurpose"
                        value={purpose}
                        checked={answers.visaPurpose === purpose}
                        onChange={(val) => updateAnswers({ visaPurpose: val as VisaPurpose })}
                        label={`${purpose} Purpose`}
                        description={`Travel intended primarily for ${purpose.toLowerCase()} objectives.`}
                      />
                    )
                  )}
                </div>
              </ReadinessQuestion>
            </div>
          )}

          {/* STEP 3: BASIC PROFILE */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Question 3.1: Valid Passport */}
              <ReadinessQuestion
                id="q-passport"
                label="Do you hold a valid passport with at least 6 months validity remaining?"
                required
                error={validationError}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <ReadinessOption
                    name="validPassport"
                    value="yes"
                    checked={answers.validPassport === "yes"}
                    onChange={(val) => updateAnswers({ validPassport: val as "yes" | "no" })}
                    label="Yes"
                    description="Passport is valid and has adequate blank pages."
                  />
                  <ReadinessOption
                    name="validPassport"
                    value="no"
                    checked={answers.validPassport === "no"}
                    onChange={(val) => updateAnswers({ validPassport: val as "yes" | "no" })}
                    label="No / Expired"
                    description="Passport needs renewal or first-time application."
                  />
                </div>
              </ReadinessQuestion>

              {/* Question 3.2: Purpose Defined */}
              <ReadinessQuestion
                id="q-purpose-defined"
                label="Is your travel purpose and itinerary clearly defined?"
                required
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <ReadinessOption
                    name="purposeDefined"
                    value="yes"
                    checked={answers.purposeDefined === "yes"}
                    onChange={(val) => updateAnswers({ purposeDefined: val as "yes" | "no" | "partially" })}
                    label="Yes, Clearly Defined"
                    description="Dates, accommodation, and purpose are established."
                  />
                  <ReadinessOption
                    name="purposeDefined"
                    value="partially"
                    checked={answers.purposeDefined === "partially"}
                    onChange={(val) => updateAnswers({ purposeDefined: val as "yes" | "no" | "partially" })}
                    label="Partially"
                    description="General idea, but missing specific dates or host details."
                  />
                  <ReadinessOption
                    name="purposeDefined"
                    value="no"
                    checked={answers.purposeDefined === "no"}
                    onChange={(val) => updateAnswers({ purposeDefined: val as "yes" | "no" | "partially" })}
                    label="Not Yet"
                    description="Still exploring options."
                  />
                </div>
              </ReadinessQuestion>

              {/* Question 3.3: Home Commitment */}
              <ReadinessQuestion
                id="q-home-ties"
                label="Do you currently have ongoing employment, business, education, or family commitments in your home country?"
                required
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <ReadinessOption
                    name="homeCommitment"
                    value="yes"
                    checked={answers.homeCommitment === "yes"}
                    onChange={(val) => updateAnswers({ homeCommitment: val as "yes" | "no" | "partial" })}
                    label="Yes, Strong Commitments"
                    description="Employed, student, property owner, or business owner."
                  />
                  <ReadinessOption
                    name="homeCommitment"
                    value="partial"
                    checked={answers.homeCommitment === "partial"}
                    onChange={(val) => updateAnswers({ homeCommitment: val as "yes" | "no" | "partial" })}
                    label="Partial"
                    description="Recent career transition or informal commitments."
                  />
                  <ReadinessOption
                    name="homeCommitment"
                    value="no"
                    checked={answers.homeCommitment === "no"}
                    onChange={(val) => updateAnswers({ homeCommitment: val as "yes" | "no" | "partial" })}
                    label="None"
                    description="No major formal commitments at present."
                  />
                </div>
              </ReadinessQuestion>

              {/* Question 3.4: Funding Source */}
              <ReadinessQuestion
                id="q-funding"
                label="How will your trip expenses be funded?"
                required
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <ReadinessOption
                    name="fundingSource"
                    value="self"
                    checked={answers.fundingSource === "self"}
                    onChange={(val) => updateAnswers({ fundingSource: val as "self" | "sponsor" | "both" })}
                    label="Self-Funded"
                    description="Personal bank savings and income."
                  />
                  <ReadinessOption
                    name="fundingSource"
                    value="sponsor"
                    checked={answers.fundingSource === "sponsor"}
                    onChange={(val) => updateAnswers({ fundingSource: val as "self" | "sponsor" | "both" })}
                    label="Sponsored"
                    description="Company, host, or family sponsor."
                  />
                  <ReadinessOption
                    name="fundingSource"
                    value="both"
                    checked={answers.fundingSource === "both"}
                    onChange={(val) => updateAnswers({ fundingSource: val as "self" | "sponsor" | "both" })}
                    label="Self + Sponsor"
                    description="Combination of personal and sponsor funds."
                  />
                </div>
              </ReadinessQuestion>

              {/* Question 3.5: Prior Refusal (Optional) */}
              <ReadinessQuestion
                id="q-refusal"
                label="Have you had a prior visa refusal for any country? (Optional)"
                description="Disclosing prior refusals allows our rules to highlight necessary documentation strategy."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <ReadinessOption
                    name="priorRefusal"
                    value="yes"
                    checked={answers.priorRefusal === "yes"}
                    onChange={(val) => updateAnswers({ priorRefusal: val as "yes" | "no" })}
                    label="Yes"
                    description="I have experienced a prior visa refusal."
                  />
                  <ReadinessOption
                    name="priorRefusal"
                    value="no"
                    checked={answers.priorRefusal === "no"}
                    onChange={(val) => updateAnswers({ priorRefusal: val as "yes" | "no" })}
                    label="No"
                    description="No prior refusals."
                  />
                </div>
              </ReadinessQuestion>
            </div>
          )}

          {/* STEP 4: PREPARATION */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <ReadinessQuestion
                id="step-4-prep"
                label="Step 4 — Document Assembly & Readiness"
                description="Select all document categories you currently have ready or accessible."
              >
                <div className="space-y-3">
                  <ReadinessOption
                    type="checkbox"
                    name="hasIdentityDocs"
                    value="hasIdentityDocs"
                    checked={answers.hasIdentityDocs}
                    onChange={(checked) => updateAnswers({ hasIdentityDocs: Boolean(checked) })}
                    label="Core Identity & Civil Documents"
                    description="Passport copies, national ID, birth/marriage certificates."
                  />
                  <ReadinessOption
                    type="checkbox"
                    name="hasPurposeDocs"
                    value="hasPurposeDocs"
                    checked={answers.hasPurposeDocs}
                    onChange={(checked) => updateAnswers({ hasPurposeDocs: Boolean(checked) })}
                    label="Purpose-Specific Supporting Documents"
                    description="Invitation letters, university admission letters, conference registration."
                  />
                  <ReadinessOption
                    type="checkbox"
                    name="hasFinancialEvidence"
                    value="hasFinancialEvidence"
                    checked={answers.hasFinancialEvidence}
                    onChange={(checked) => updateAnswers({ hasFinancialEvidence: Boolean(checked) })}
                    label="Financial Evidence & Bank Statements"
                    description="Recent 3-6 months bank statements, ITR, tax filings."
                  />
                  <ReadinessOption
                    type="checkbox"
                    name="hasTravelItinerary"
                    value="hasTravelItinerary"
                    checked={answers.hasTravelItinerary}
                    onChange={(checked) => updateAnswers({ hasTravelItinerary: Boolean(checked) })}
                    label="Travel & Accommodation Planning"
                    description="Flight reservations, hotel bookings, or host address details."
                  />
                  <ReadinessOption
                    type="checkbox"
                    name="hasEmploymentOrSponsorshipDocs"
                    value="hasEmploymentOrSponsorshipDocs"
                    checked={answers.hasEmploymentOrSponsorshipDocs}
                    onChange={(checked) => updateAnswers({ hasEmploymentOrSponsorshipDocs: Boolean(checked) })}
                    label="Employment / Business / Sponsorship Evidence"
                    description="NOC leave letter, payslips, company registration, or sponsor affidavit."
                  />
                  {answers.priorRefusal === "yes" && (
                    <ReadinessOption
                      type="checkbox"
                      name="hasPriorRefusalDocs"
                      value="hasPriorRefusalDocs"
                      checked={answers.hasPriorRefusalDocs}
                      onChange={(checked) => updateAnswers({ hasPriorRefusalDocs: Boolean(checked) })}
                      label="Prior Refusal Letter & Documentation"
                      description="Official refusal letter explaining previous grounds."
                    />
                  )}
                </div>
              </ReadinessQuestion>
            </div>
          )}

          {/* STEP 5: REVIEW */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[#071f4a]">Step 5 — Summary & Final Review</h2>
                <p className="text-sm text-slate-600">
                  Please review your responses below before generating your readiness assessment summary.
                </p>
              </div>

              <ReadinessReview answers={answers} onEditStep={jumpToStep} />
            </div>
          )}

          {/* Sticky Navigation Footer */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-6">
            <BackButton onClick={prevStep} disabled={currentStep === 1} />
            {currentStep < 5 ? (
              <ContinueButton onClick={nextStep}>Continue</ContinueButton>
            ) : (
              <ContinueButton onClick={handleFinishAssessment}>
                Generate Readiness Summary
              </ContinueButton>
            )}
          </div>
        </div>
      </Container>

      <ExitConfirmation
        isOpen={showExitModal}
        onConfirm={() => {
          setShowExitModal(false);
          restartAssessment();
        }}
        onCancel={() => setShowExitModal(false)}
      />
    </div>
  );
}
