"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReadinessAnswers } from "../../../common/types/readiness";
import { evaluateReadiness } from "../engine/readiness-evaluator";
import { countriesData } from "../../../common/content/countries";

const STORAGE_KEY = "visaworx_readiness_answers";

export const initialAnswers: ReadinessAnswers = {
  destinationSlug: "",
  visaPurpose: "",
  validPassport: "",
  purposeDefined: "",
  homeCommitment: "",
  internationalTravel: "",
  priorRefusal: "",
  fundingSource: "",
  hasIdentityDocs: false,
  hasPurposeDocs: false,
  hasFinancialEvidence: false,
  hasTravelItinerary: false,
  hasEmploymentOrSponsorshipDocs: false,
  hasPriorRefusalDocs: false,
};

export function useReadinessAssessment(initialDestinationSlug?: string) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<ReadinessAnswers>(() => {
    if (initialDestinationSlug) {
      return { ...initialAnswers, destinationSlug: initialDestinationSlug };
    }
    return initialAnswers;
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  // Restore non-sensitive answers from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers((prev) => ({
          ...prev,
          ...parsed,
          ...(initialDestinationSlug ? { destinationSlug: initialDestinationSlug } : {}),
        }));
      }
    } catch {
      // Ignore storage errors
    }
  }, [initialDestinationSlug]);

  // Persist answers in sessionStorage
  const updateAnswers = useCallback((updates: Partial<ReadinessAnswers>) => {
    setValidationError(null);
    setAnswers((prev) => {
      const next = { ...prev, ...updates };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  const validateStep = useCallback(
    (step: number): boolean => {
      setValidationError(null);
      if (step === 1) {
        if (!answers.destinationSlug) {
          setValidationError("Please select a destination country to proceed.");
          return false;
        }
      } else if (step === 2) {
        if (!answers.visaPurpose) {
          setValidationError("Please select a travel purpose to proceed.");
          return false;
        }
      } else if (step === 3) {
        if (!answers.validPassport) {
          setValidationError("Please answer whether you have a valid passport.");
          return false;
        }
        if (!answers.purposeDefined) {
          setValidationError("Please specify if your travel purpose is clearly defined.");
          return false;
        }
        if (!answers.homeCommitment) {
          setValidationError("Please indicate your current home country commitment.");
          return false;
        }
        if (!answers.fundingSource) {
          setValidationError("Please select your travel funding source.");
          return false;
        }
      }
      return true;
    },
    [answers]
  );

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setValidationError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const jumpToStep = useCallback((step: number) => {
    setValidationError(null);
    setCurrentStep(step);
  }, []);

  const restartAssessment = useCallback(() => {
    setValidationError(null);
    setAnswers(initialAnswers);
    setCurrentStep(1);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const destinationObj = countriesData.find((c) => c.slug === answers.destinationSlug);
  const evaluationResult = evaluateReadiness(answers, destinationObj?.name || "your destination");

  return {
    currentStep,
    answers,
    updateAnswers,
    validationError,
    nextStep,
    prevStep,
    jumpToStep,
    restartAssessment,
    evaluationResult,
    destinationObj,
  };
}
