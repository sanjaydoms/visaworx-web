"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, MessageCircle, RotateCcw } from "lucide-react";
import { Container } from "../../common/components/Container";
import { ReadinessBand } from "../../common/components/ReadinessBand";
import { StrengthList } from "../../common/components/StrengthList";
import { AttentionList } from "../../common/components/AttentionList";
import { NextSteps } from "../../common/components/NextSteps";
import { ReadinessDisclaimer } from "../../common/components/ReadinessDisclaimer";
import { RelatedServices } from "../../common/components/RelatedServices";
import { ButtonLink } from "../../common/components/ButtonLink";
import { useReadinessAssessment } from "./hooks/useReadinessAssessment";
import { routes } from "../../common/config/routes";

export function ReadinessResultPage() {
  const { answers, evaluationResult, destinationObj, restartAssessment } = useReadinessAssessment();

  const consultationUrlWithHandoff = `${routes.consultation}?source=readiness&readinessBand=${encodeURIComponent(
    evaluationResult.band
  )}&country=${encodeURIComponent(answers.destinationSlug || "")}&service=${encodeURIComponent(answers.visaPurpose || "")}`;

  return (
    <div className="py-10 sm:py-16 space-y-12">
      <Container>
        <div className="mx-auto max-w-4xl space-y-10">
          {/* Header & Restart */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">
                Preparation Summary
              </p>
              <h1 className="mt-2 text-3xl font-black text-[#071f4a] sm:text-4xl">
                Visa Readiness Assessment Results
              </h1>
            </div>
            <Link
              href={routes.readiness}
              onClick={restartAssessment}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
            >
              <RotateCcw className="h-4 w-4" /> Start New Assessment
            </Link>
          </div>

          {/* 1. Readiness Band Card */}
          <ReadinessBand evaluation={evaluationResult} />

          {/* 2. Strengths & Attention Areas */}
          <div className="grid gap-8 md:grid-cols-2">
            <StrengthList strengths={evaluationResult.strengths} />
            <AttentionList attentionAreas={evaluationResult.attentionAreas} />
          </div>

          {/* 3. Recommended Next Steps */}
          <NextSteps steps={evaluationResult.nextSteps} />

          {/* 4. Destination Guide Card */}
          {destinationObj && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#071f4a]">
                  <BookOpen className="h-4 w-4 text-[#e6282f]" /> Destination Guide
                </div>
                <h3 className="mt-2 text-xl font-bold text-[#071f4a]">
                  Explore {destinationObj.name} Visa Requirements
                </h3>
                <p className="mt-1 text-xs text-slate-600 max-w-xl">
                  {destinationObj.summary}
                </p>
              </div>
              <Link
                href={routes.countryDetail(destinationObj.slug)}
                className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-sm font-bold text-[#071f4a] hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
              >
                View Country Guide <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* 5. Related Services */}
          <RelatedServices serviceSlugs={destinationObj?.relatedServiceSlugs || []} />

          {/* 6. Human Consultation Handoff CTA */}
          <section className="rounded-[2rem] border border-[#0b3478]/10 bg-white p-8 text-center shadow-[0_25px_70px_rgba(7,31,74,.10)] sm:p-12 space-y-4">
            <MessageCircle className="mx-auto h-10 w-10 text-[#e6282f]" />
            <h2 className="text-2xl font-black text-[#071f4a] sm:text-3xl">
              Need a second opinion before you apply?
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Speak with a Visaworx expert about your readiness, documents and next steps.
            </p>
            <div className="pt-2">
              <ButtonLink href={consultationUrlWithHandoff}>Speak to an Expert</ButtonLink>
            </div>
          </section>

          {/* 7. Non-predictive Disclaimer */}
          <ReadinessDisclaimer />
        </div>
      </Container>
    </div>
  );
}
