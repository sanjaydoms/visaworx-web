"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ConsultationFormInput } from "../../../common/validation/consultation";
import { consultationSchema } from "../../../common/validation/consultation";
import { countriesData } from "../../../common/content/countries";
import { servicesData } from "../../../common/content/services";
import { routes } from "../../../common/config/routes";
import {
  CONSULTATION_DEFAULT_LANGUAGE,
  CONSULTATION_FIRST_STEP,
  CONSULTATION_LAST_STEP,
  CONSULTATION_SESSION_KEY,
  CONTACT_FIELD_LIMITS,
  SITUATION_SUMMARY_LIMITS,
  UNDECIDED_LABELS,
} from "../../../common/config/consultation";

export const initialFormInput: ConsultationFormInput = {
  honeypot: "",
  source: {
    pageType: "direct",
    sourcePath: "",
    countrySlug: "",
    serviceSlug: "",
    guideSlug: "",
    readinessBand: "",
  },
  destination: {
    countrySlug: "",
    undecided: false,
  },
  service: {
    serviceSlug: "",
    undecided: false,
  },
  situation: {
    travelTimeframe: "",
    summary: "",
    priorRefusal: "no",
    preferredLanguage: CONSULTATION_DEFAULT_LANGUAGE,
  },
  contact: {
    fullName: "",
    email: "",
    phone: "",
    preferredMethod: "phone",
    preferredWindow: "no-preference",
    preferredDate: "",
    preferredTime: "",
  },
  // Consent must be granted by the applicant, never pre-granted on their
  // behalf. These are cast because the schema type narrows to `true`; the
  // form starts un-consented and submission is blocked until it is checked.
  consent: {
    contactPermission: false as unknown as true,
    privacyAccepted: false as unknown as true,
  },
};

/**
 * Progress is persisted so a reload does not lose the applicant's place, but
 * contact details are personal data and are deliberately never written to
 * browser storage.
 */
function toStorableProgress(data: ConsultationFormInput) {
  const { contact, consent, honeypot, ...rest } = data;
  void contact;
  void consent;
  void honeypot;
  return rest;
}

export function useConsultationFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState<number>(CONSULTATION_FIRST_STEP);
  const [formData, setFormData] = useState<ConsultationFormInput>(initialFormInput);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const inFlightRef = useRef(false);

  // Parse & preselect query parameter context.
  //
  // This stays in an effect because the preselection has to re-apply whenever
  // the URL context changes - a client-side navigation from
  // ?country=canada to ?service=refusal-review keeps this hook mounted, so a
  // lazy initialiser would silently ignore the new context.
  useEffect(() => {
    const countryParam = searchParams.get("country");
    const serviceParam = searchParams.get("service");
    const sourceParam = searchParams.get("source");
    const guideParam = searchParams.get("guide");
    const readinessBandParam = searchParams.get("readinessBand");

    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
    setFormData((prev) => {
      const validCountry = countriesData.find((c) => c.slug === countryParam)?.slug || prev.destination.countrySlug;
      const validService = servicesData.find((s) => s.slug === serviceParam)?.slug || prev.service.serviceSlug;

      const pageType = (sourceParam as ConsultationFormInput["source"]["pageType"]) || "direct";

      return {
        ...prev,
        source: {
          ...prev.source,
          pageType,
          countrySlug: validCountry,
          serviceSlug: validService,
          guideSlug: guideParam || "",
          readinessBand: readinessBandParam || "",
        },
        destination: {
          countrySlug: validCountry,
          undecided: !validCountry && prev.destination.undecided,
        },
        service: {
          serviceSlug: validService,
          undecided: !validService && prev.service.undecided,
        },
      };
    });
  }, [searchParams]);

  // Restore non-sensitive data from sessionStorage if present.
  //
  // Kept in an effect for the same reason as the readiness flow: sessionStorage
  // is unavailable during the server render, so reading it in render would
  // break hydration. It runs after the query-param effect above, so saved
  // progress wins over URL preselection - existing behaviour, unchanged.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(CONSULTATION_SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only non-personal progress is ever stored, so restore it as-is and
        // keep the in-memory contact and consent state untouched.
        // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          contact: prev.contact,
          consent: prev.consent,
        }));
      }
    } catch {
      // Ignore
    }
  }, []);

  const updateFormData = useCallback((updater: (prev: ConsultationFormInput) => ConsultationFormInput) => {
    setValidationError(null);
    setSubmissionError(null);
    setFormData((prev) => {
      const next = updater(prev);
      try {
        sessionStorage.setItem(CONSULTATION_SESSION_KEY, JSON.stringify(toStorableProgress(next)));
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  const validateStep = useCallback(
    (step: number): boolean => {
      setValidationError(null);

      if (step === 1) {
        if (!formData.destination.undecided && !formData.destination.countrySlug) {
          setValidationError(
            `Please select a destination country or choose "${UNDECIDED_LABELS.destination}."`
          );
          return false;
        }
      } else if (step === 2) {
        if (!formData.service.undecided && !formData.service.serviceSlug) {
          setValidationError(`Please select a service or choose "${UNDECIDED_LABELS.service}."`);
          return false;
        }
      } else if (step === 3) {
        if (
          !formData.situation.summary ||
          formData.situation.summary.length < SITUATION_SUMMARY_LIMITS.min
        ) {
          setValidationError(
            `Please describe your situation in at least ${SITUATION_SUMMARY_LIMITS.min} characters.`
          );
          return false;
        }
      } else if (step === 4) {
        if (
          !formData.contact.fullName ||
          formData.contact.fullName.trim().length < CONTACT_FIELD_LIMITS.fullNameMin
        ) {
          setValidationError("Please enter your full name.");
          return false;
        }
        if (!formData.contact.email || !formData.contact.email.includes("@")) {
          setValidationError("Please enter a valid email address.");
          return false;
        }
        if (
          !formData.contact.phone ||
          formData.contact.phone.trim().length < CONTACT_FIELD_LIMITS.phoneMin
        ) {
          setValidationError("Please enter a valid phone number.");
          return false;
        }
      }

      return true;
    },
    [formData]
  );

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, CONSULTATION_LAST_STEP));
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setValidationError(null);
    setSubmissionError(null);
    setCurrentStep((prev) => Math.max(prev - 1, CONSULTATION_FIRST_STEP));
  }, []);

  const jumpToStep = useCallback((step: number) => {
    setValidationError(null);
    setSubmissionError(null);
    setCurrentStep(step);
  }, []);

  const submitForm = useCallback(async () => {
    // Guard against double submission from rapid clicks or an Enter keypress
    // landing while a request is already in flight. A ref is used because
    // state updates are not applied synchronously.
    if (inFlightRef.current) return;

    setValidationError(null);
    setSubmissionError(null);

    // Full Zod validation
    const parsed = consultationSchema.safeParse(formData);
    if (!parsed.success) {
      const err = parsed.error.errors[0]?.message || "Please complete all required fields correctly.";
      setValidationError(err);
      return;
    }

    inFlightRef.current = true;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        // Clear session storage on success
        try {
          sessionStorage.removeItem(CONSULTATION_SESSION_KEY);
        } catch {
          // Ignore
        }
        router.push(routes.consultationSuccess);
      } else {
        setSubmissionError(json.error || "We could not submit your request right now. Your information has not been confirmed as received.");
      }
    } catch {
      setSubmissionError("The request is taking longer than expected. Please check your connection and try again.");
    } finally {
      inFlightRef.current = false;
      setIsSubmitting(false);
    }
  }, [formData, router]);

  return {
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
  };
}
