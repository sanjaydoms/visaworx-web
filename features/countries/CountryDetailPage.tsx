import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "../../common/components/Container";
import { Breadcrumb } from "../../common/components/Breadcrumb";
import { CountryHero } from "../../common/components/CountryHero";
import { PreparationChecklist } from "../../common/components/PreparationChecklist";
import { ApplicationStages } from "../../common/components/ApplicationStages";
import { CommonMistakes } from "../../common/components/CommonMistakes";
import { CountryFAQ } from "../../common/components/CountryFAQ";
import { RelatedServices } from "../../common/components/RelatedServices";
import { ExpertCTA } from "../../common/components/ExpertCTA";
import { Disclaimer } from "../../common/components/Disclaimer";
import { ButtonLink } from "../../common/components/ButtonLink";
import type { Country } from "../../common/content/countries";
import { routes } from "../../common/config/routes";

export function CountryDetailPage({ country }: { country: Country }) {
  const breadcrumbItems = [
    { label: "Home", href: routes.home },
    { label: "Countries", href: routes.countriesList },
    { label: country.name },
  ];

  return (
    <article className="space-y-12 py-8 sm:py-12">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      <Container>
        <CountryHero country={country} />
      </Container>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-14">
            {/* Overview */}
            <section aria-labelledby="country-overview-heading" className="space-y-4">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Overview</p>
              <h2 id="country-overview-heading" className="text-2xl font-black text-[#071f4a] sm:text-3xl">
                About {country.name} Visa Preparation
              </h2>
              <p className="text-base leading-8 text-slate-700">
                {country.overview}
              </p>
            </section>

            {/* Common Visa Purposes */}
            <section aria-labelledby="visa-purposes-heading" className="space-y-4">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Travel Intent</p>
              <h2 id="visa-purposes-heading" className="text-2xl font-black text-[#071f4a] sm:text-3xl">
                Supported Travel Purposes
              </h2>
              <div className="flex flex-wrap gap-3">
                {country.visaPurposes.map((purpose) => (
                  <div
                    key={purpose}
                    className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#071f4a] shadow-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#e6282f]" />
                    {purpose} Purpose
                  </div>
                ))}
              </div>
            </section>

            {/* Preparation Checklist */}
            <PreparationChecklist checklist={country.preparationChecklist} />

            {/* Typical Application Stages */}
            <ApplicationStages stages={country.applicationStages} />

            {/* Common Avoidable Mistakes */}
            <CommonMistakes mistakes={country.commonMistakes} />

            {/* Visa Readiness CTA Banner */}
            <section aria-label="Visa Readiness Callout" className="rounded-3xl bg-[#071f4a] p-8 text-white sm:p-10">
              <div className="max-w-2xl space-y-4">
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#ff7377]">
                  Visa Readiness Review
                </p>
                <h2 className="text-2xl font-black sm:text-3xl">
                  Assess your {country.name} visa readiness before applying.
                </h2>
                <p className="text-sm leading-6 text-white/80">
                  Receive a structured summary of document readiness, identified gaps, and recommended next steps from experienced consultants.
                </p>
                <div className="pt-2">
                  <ButtonLink href={routes.readiness}>
                    Check My Readiness <ArrowRight className="ml-2 h-4 w-4" />
                  </ButtonLink>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <CountryFAQ faqs={country.faqs} />

            {/* Related Services */}
            <RelatedServices serviceSlugs={country.relatedServiceSlugs} />

            {/* Human Consultation CTA */}
            <ExpertCTA
              title={`Speak with a Visaworx ${country.name} Expert`}
              description="Get personalized guidance on document preparation, travel purpose alignment, and submission strategy."
            />

            {/* Official Authority Disclaimer */}
            <Disclaimer />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div>
                <h3 className="font-extrabold text-[#071f4a]">Official Source Info</h3>
                <p className="mt-1 text-xs text-slate-500">Official government portal for policy verification</p>
                <div className="mt-3">
                  {country.officialSourceUrl ? (
                    <a
                      href={country.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-[#071f4a] hover:underline"
                    >
                      {country.officialSourceLabel} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs font-medium text-slate-600">{country.officialSourceLabel}</span>
                  )}
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-3">
                <h3 className="font-extrabold text-[#071f4a]">Need Direct Assistance?</h3>
                <p className="text-xs leading-5 text-slate-600">
                  Discuss your travel timeline and document preparation with our senior team.
                </p>
                <ButtonLink href={routes.readiness} fullWidth>
                  Check My Readiness
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
