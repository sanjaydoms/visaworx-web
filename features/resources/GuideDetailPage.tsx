import { Container } from "../../common/components/Container";
import { Breadcrumb } from "../../common/components/Breadcrumb";
import { GuideHero } from "../../common/components/GuideHero";
import { GuideTableOfContents } from "../../common/components/GuideTableOfContents";
import { GuideContentRenderer } from "../../common/components/GuideContentRenderer";
import { SourceReference } from "../../common/components/SourceReference";
import { RelatedCountries } from "../../common/components/RelatedCountries";
import { RelatedServices } from "../../common/components/RelatedServices";
import { RelatedFAQs } from "../../common/components/RelatedFAQs";
import { ExpertCTA } from "../../common/components/ExpertCTA";
import { ResourceDisclaimer } from "../../common/components/ResourceDisclaimer";
import { ButtonLink } from "../../common/components/ButtonLink";
import type { Guide } from "../../common/content/guides";
import { routes } from "../../common/config/routes";
import { ArrowRight } from "lucide-react";

export function GuideDetailPage({ guide }: { guide: Guide }) {
  const breadcrumbItems = [
    { label: "Home", href: routes.home },
    { label: "Resources", href: routes.resourcesHub },
    { label: "Guides", href: routes.guidesList },
    { label: guide.title },
  ];

  return (
    <article className="space-y-12 py-8 sm:py-12">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      <Container>
        <GuideHero guide={guide} />
      </Container>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            {/* Guide Content Renderer */}
            <section aria-label="Guide Main Body">
              <GuideContentRenderer content={guide.content} />
            </section>

            {/* Related Countries */}
            <RelatedCountries countrySlugs={guide.relatedCountrySlugs} />

            {/* Related Services */}
            <RelatedServices serviceSlugs={guide.relatedServiceSlugs} />

            {/* Related FAQs */}
            <RelatedFAQs faqIds={guide.faqIds} />

            {/* Readiness Banner */}
            <section aria-label="Visa Readiness Callout" className="rounded-3xl bg-[#071f4a] p-8 text-white sm:p-10">
              <div className="max-w-2xl space-y-4">
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#ff7377]">
                  Preparation Check
                </p>
                <h2 className="text-2xl font-black sm:text-3xl">
                  Evaluate your preparation before submitting.
                </h2>
                <p className="text-sm leading-6 text-white/80">
                  Use our rule-based readiness assessment to review passport validity, purpose proof, and financial documents.
                </p>
                <div className="pt-2">
                  <ButtonLink href={routes.readiness}>
                    Check My Readiness <ArrowRight className="ml-2 h-4 w-4" />
                  </ButtonLink>
                </div>
              </div>
            </section>

            {/* Human Consultation CTA */}
            <ExpertCTA
              title="Need advice for your specific situation?"
              description="Speak with a Visaworx expert when general guidance is not enough."
            />

            {/* Educational Disclaimer */}
            <ResourceDisclaimer />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* TOC */}
              <GuideTableOfContents content={guide.content} />

              {/* Official Source References */}
              <SourceReference references={guide.officialReferences} />

              {/* Consultation Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <h3 className="font-extrabold text-[#071f4a]">Need Direct Guidance?</h3>
                <p className="text-xs leading-5 text-slate-600">
                  Discuss your travel goals and document preparation with our senior team.
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
