"use client";

import { Container } from "../../common/components/Container";
import { PageShell } from "../../common/components/PageShell";
import { StickyActionBar } from "../../common/components/StickyActionBar";
import { OptionCard } from "../../common/components/OptionCard";
import { ConsultationHero } from "../../common/components/ConsultationHero";
import { ConsultationStepper } from "../../common/components/ConsultationStepper";
import { ConsultationProgress } from "../../common/components/ConsultationProgress";
import { ConsultationReview } from "../../common/components/ConsultationReview";
import { ConsultationDisclaimer } from "../../common/components/ConsultationDisclaimer";
import { PrivacyNotice } from "../../common/components/PrivacyNotice";
import { SubmissionError } from "../../common/components/SubmissionError";
import { useConsultationFlow } from "./hooks/useConsultationFlow";
import { countriesData } from "../../common/content/countries";
import { servicesData } from "../../common/content/services";
import { ArrowLeft, ArrowRight, CheckCircle2, Globe, Shield, Sparkles } from "lucide-react";

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
          {/* Stepper & Progress Bar */}
          <div className="space-y-4">
            <ConsultationStepper currentStep={currentStep} onStepClick={jumpToStep} />
            <ConsultationProgress currentStep={currentStep} />
          </div>

          {/* Inline Validation Error */}
          {validationError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-700" role="alert">
              ⚠️ {validationError}
            </div>
          )}

          {/* Submission Failure Alert */}
          {submissionError && (
            <SubmissionError error={submissionError} onRetry={submitForm} />
          )}

          {/* STEP 1: DESTINATION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#071f4a]">Where are you planning to travel?</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Select your primary destination country or mark "Not decided yet."
                </p>
              </div>

              {/* Undecided Checkbox */}
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold text-[#071f4a] cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={formData.destination.undecided}
                  onChange={(e) =>
                    updateFormData((prev) => ({
                      ...prev,
                      destination: {
                        countrySlug: e.target.checked ? "" : prev.destination.countrySlug,
                        undecided: e.target.checked,
                      },
                    }))
                  }
                  className="h-5 w-5 rounded border-slate-300 text-[#071f4a] focus:ring-[#071f4a]"
                />
                <span className="text-sm">Not decided yet / Multiple destinations</span>
              </label>

              {/* Country Cards */}
              {!formData.destination.undecided && (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {countriesData.map((c) => {
                    const selected = formData.destination.countrySlug === c.slug;
                    return (
                      <OptionCard
                        key={c.slug}
                        selected={selected}
                        onSelect={() =>
                          updateFormData((prev) => ({
                            ...prev,
                            destination: { countrySlug: c.slug, undecided: false },
                          }))
                        }
                        title={c.name}
                        icon={<Globe className="h-4 w-4 text-[#c92027]" />}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SERVICE */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#071f4a]">What kind of support do you need?</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Select the visa category or advisory service that matches your objective.
                </p>
              </div>

              {/* Undecided Checkbox */}
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold text-[#071f4a] cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={formData.service.undecided}
                  onChange={(e) =>
                    updateFormData((prev) => ({
                      ...prev,
                      service: {
                        serviceSlug: e.target.checked ? "" : prev.service.serviceSlug,
                        undecided: e.target.checked,
                      },
                    }))
                  }
                  className="h-5 w-5 rounded border-slate-300 text-[#071f4a] focus:ring-[#071f4a]"
                />
                <span className="text-sm">Not sure yet / General consultation</span>
              </label>

              {/* Service Cards */}
              {!formData.service.undecided && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {servicesData.map((s) => {
                    const selected = formData.service.serviceSlug === s.slug;
                    return (
                      <OptionCard
                        key={s.slug}
                        selected={selected}
                        onSelect={() =>
                          updateFormData((prev) => ({
                            ...prev,
                            service: { serviceSlug: s.slug, undecided: false },
                          }))
                        }
                        title={s.title}
                        description={s.shortDescription}
                        layout="stack"
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: SITUATION */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#071f4a]">Tell us briefly about your situation.</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Share your travel timeframe, prior visa history, and key goals.
                </p>
              </div>

              {/* Travel Timeframe & Preferred Language */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="travel-timeframe" className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider mb-1">
                    Planned Travel Timeframe
                  </label>
                  <input
                    id="travel-timeframe"
                    type="text"
                    value={formData.situation.travelTimeframe || ""}
                    onChange={(e) =>
                      updateFormData((prev) => ({
                        ...prev,
                        situation: { ...prev.situation, travelTimeframe: e.target.value },
                      }))
                    }
                    placeholder="e.g. Next month, October 2026, Q4..."
                    className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-sm font-medium text-[#071f4a] focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
                  />
                </div>

                <div>
                  <label htmlFor="preferred-language" className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider mb-1">
                    Preferred Language
                  </label>
                  <input
                    id="preferred-language"
                    type="text"
                    value={formData.situation.preferredLanguage || ""}
                    onChange={(e) =>
                      updateFormData((prev) => ({
                        ...prev,
                        situation: { ...prev.situation, preferredLanguage: e.target.value },
                      }))
                    }
                    placeholder="e.g. English, Hindi, Arabic..."
                    className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-sm font-medium text-[#071f4a] focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
                  />
                </div>
              </div>

              {/* Free Text Summary */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="situation-summary" className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider">
                    Short Situation Summary *
                  </label>
                  <span id="situation-summary-count" className="text-xs text-slate-500">
                    {formData.situation.summary.length} / 1,000 chars
                  </span>
                </div>
                <textarea
                  id="situation-summary"
                  rows={4}
                  maxLength={1000}
                  aria-describedby="situation-summary-count"
                  value={formData.situation.summary}
                  onChange={(e) =>
                    updateFormData((prev) => ({
                      ...prev,
                      situation: { ...prev.situation, summary: e.target.value },
                    }))
                  }
                  placeholder="Describe your travel purpose, current employment/study status, or key questions (min 20 characters)..."
                  className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm font-medium text-[#071f4a] focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
                />
              </div>

              {/* Prior Refusal */}
              <div>
                <label className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider mb-2">
                  Have you experienced a prior visa refusal?
                </label>
                <div className="flex flex-wrap gap-3">
                  {(["no", "yes", "prefer-not-to-say"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        updateFormData((prev) => ({
                          ...prev,
                          situation: { ...prev.situation, priorRefusal: option },
                        }))
                      }
                      className={`inline-flex min-h-[48px] items-center rounded-xl px-5 py-2 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-[#071f4a] ${
                        formData.situation.priorRefusal === option
                          ? "bg-[#071f4a] text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {option === "no" ? "No prior refusal" : option === "yes" ? "Yes, I have a refusal" : "Prefer not to say"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT DETAILS */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#071f4a]">How should our expert contact you?</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Provide your preferred contact channel and callback window.
                </p>
              </div>

              {/* Honeypot field (hidden from human users) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot || ""}
                onChange={(e) => updateFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Full Name & Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="full-name" className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    value={formData.contact.fullName}
                    onChange={(e) =>
                      updateFormData((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, fullName: e.target.value },
                      }))
                    }
                    placeholder="Enter your full legal name"
                    className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-sm font-medium text-[#071f4a] focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
                  />
                </div>

                <div>
                  <label htmlFor="email-address" className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) =>
                      updateFormData((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, email: e.target.value },
                      }))
                    }
                    placeholder="name@example.com"
                    className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-sm font-medium text-[#071f4a] focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
                  />
                </div>
              </div>

              {/* Phone & Preferred Method */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone-number" className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider mb-1">
                    Phone Number (with Country Code) *
                  </label>
                  <input
                    id="phone-number"
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) =>
                      updateFormData((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, phone: e.target.value },
                      }))
                    }
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-sm font-medium text-[#071f4a] focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider mb-1">
                    Preferred Contact Channel
                  </label>
                  <div className="flex gap-2">
                    {(["phone", "whatsapp", "email"] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() =>
                          updateFormData((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, preferredMethod: method },
                          }))
                        }
                        className={`flex-1 min-h-[48px] rounded-xl py-3 text-xs font-bold capitalize transition focus:outline-none focus:ring-2 focus:ring-[#071f4a] ${
                          formData.contact.preferredMethod === method
                            ? "bg-[#071f4a] text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preferred Window */}
              <div>
                <label className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider mb-2">
                  Preferred Contact Window
                </label>
                <div className="flex flex-wrap gap-2">
                  {(["morning", "afternoon", "evening", "no-preference"] as const).map((window) => (
                    <button
                      key={window}
                      type="button"
                      onClick={() =>
                        updateFormData((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, preferredWindow: window },
                        }))
                      }
                      className={`inline-flex min-h-[48px] items-center rounded-xl px-4 py-2 text-xs font-bold capitalize transition focus:outline-none focus:ring-2 focus:ring-[#071f4a] ${
                        formData.contact.preferredWindow === window
                          ? "bg-[#071f4a] text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {window.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & CONSENT */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#071f4a]">Review your consultation request.</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Verify your selections and confirm permission for our senior expert team to contact you.
                </p>
              </div>

              <ConsultationReview data={formData} onEditStep={jumpToStep} />

              {/* Explicit Consent Checkbox */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent.contactPermission && formData.consent.privacyAccepted}
                    onChange={(e) =>
                      updateFormData((prev) => ({
                        ...prev,
                        consent: {
                          contactPermission: e.target.checked as true,
                          privacyAccepted: e.target.checked as true,
                        },
                      }))
                    }
                    className="h-5 w-5 shrink-0 rounded border-slate-300 text-[#071f4a] focus:ring-[#071f4a] mt-0.5"
                  />
                  <span className="text-xs leading-6 font-semibold text-[#071f4a]">
                    I agree that Visaworx / Klar Travels may contact me regarding this consultation request. I understand that this is not an official visa application and does not guarantee approval.
                  </span>
                </label>
                <PrivacyNotice />
              </div>
            </div>
          )}

          {/* Navigation Controls — pinned on small viewports so the primary
              action stays reachable in long steps. */}
          <StickyActionBar className="flex items-center justify-between gap-4 sm:border-t sm:border-slate-100 sm:pt-6">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#071f4a] px-8 py-3 text-xs font-bold text-white hover:bg-[#0b3478] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submitForm}
                disabled={isSubmitting}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#c92027] px-8 py-3 text-xs font-bold text-white hover:bg-[#a81a20] focus:outline-none focus:ring-2 focus:ring-[#e6282f] disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Request Consultation"}
              </button>
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
