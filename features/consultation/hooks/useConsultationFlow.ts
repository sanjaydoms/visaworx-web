"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ConsultationFormInput } from "../../../common/validation/consultation";
import { consultationSchema } from "../../../common/validation/consultation";
import { countriesData } from "../../../common/content/countries";
import { servicesData } from "../../../common/content/services";
import { routes } from "../../../common/config/routes";

const SESSION_KEY = "visaworx_consultation_form";

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
    preferredLanguage: "English",
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
  consent: {
    contactPermission: true,
    privacyAccepted: true,
  },
};

export function useConsultationFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ConsultationFormInput>(initialFormInput);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Parse & preselect query parameter context on mount
  useEffect(() => {
    const countryParam = searchParams.get("country");
    const serviceParam = searchParams.get("service");
    const sourceParam = searchParams.get("source");
    const guideParam = searchParams.get("guide");
    const readinessBandParam = searchParams.get("readinessBand");

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

  // Restore non-sensitive data from sessionStorage if present
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          contact: {
            ...prev.contact,
            fullName: "", // Keep contact fields clear for security
            email: "",
            phone: "",
          },
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
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
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
          setValidationError('Please select a destination country or choose "Not decided yet."');
          return false;
        }
      } else if (step === 2) {
        if (!formData.service.undecided && !formData.service.serviceSlug) {
          setValidationError('Please select a service or choose "Not sure yet."');
          return false;
        }
      } else if (step === 3) {
        if (!formData.situation.summary || formData.situation.summary.length < 20) {
          setValidationError("Please describe your situation in at least 20 characters.");
          return false;
        }
      } else if (step === 4) {
        if (!formData.contact.fullName || formData.contact.fullName.trim().length < 2) {
          setValidationError("Please enter your full name.");
          return false;
        }
        if (!formData.contact.email || !formData.contact.email.includes("@")) {
          setValidationError("Please enter a valid email address.");
          return false;
        }
        if (!formData.contact.phone || formData.contact.phone.trim().length < 7) {
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
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setValidationError(null);
    setSubmissionError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const jumpToStep = useCallback((step: number) => {
    setValidationError(null);
    setSubmissionError(null);
    setCurrentStep(step);
  }, []);

  const submitForm = useCallback(async () => {
    setValidationError(null);
    setSubmissionError(null);

    // Full Zod validation
    const parsed = consultationSchema.safeParse(formData);
    if (!parsed.success) {
      const err = parsed.error.errors[0]?.message || "Please complete all required fields correctly.";
      setValidationError(err);
      return;
    }

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
          sessionStorage.removeItem(SESSION_KEY);
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
