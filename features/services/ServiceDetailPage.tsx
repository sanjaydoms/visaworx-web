import { Container } from "../../common/components/Container";
import { Breadcrumb } from "../../common/components/Breadcrumb";
import { ServiceHero } from "../../common/components/ServiceHero";
import { IdealFor } from "../../common/components/IdealFor";
import { OutcomeList } from "../../common/components/OutcomeList";
import { IncludedList } from "../../common/components/IncludedList";
import { ExcludedList } from "../../common/components/ExcludedList";
import { ServiceProcess } from "../../common/components/ServiceProcess";
import { PreparationChecklist } from "../../common/components/PreparationChecklist";
import { ServiceFAQ } from "../../common/components/ServiceFAQ";
import { RelatedCountries } from "../../common/components/RelatedCountries";
import { RelatedServices } from "../../common/components/RelatedServices";
import { ExpertCTA } from "../../common/components/ExpertCTA";
import { ServiceDisclaimer } from "../../common/components/ServiceDisclaimer";
import { ButtonLink } from "../../common/components/ButtonLink";
import type { Service } from "../../common/content/services";
import { routes } from "../../common/config/routes";
import { ArrowRight } from "lucide-react";

export function ServiceDetailPage({ service }: { service: Service }) {
  const breadcrumbItems = [
    { label: "Home", href: routes.home },
    { label: "Services", href: routes.servicesList },
    { label: service.title },
  ];

  return (
    <article className="space-y-12 py-8 sm:py-12">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      <Container>
        <ServiceHero service={service} />
      </Container>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-14">
            {/* Long Description & Overview */}
            <section aria-labelledby="service-overview-heading" className="space-y-4">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Service Overview</p>
              <h2 id="service-overview-heading" className="text-2xl font-black text-[#071f4a] sm:text-3xl">
                About {service.title}
              </h2>
              <p className="text-base leading-8 text-slate-700">
                {service.longDescription}
              </p>
            </section>

            {/* Who It Is For */}
            <IdealFor items={service.idealFor} />

            {/* Key Outcomes */}
            <OutcomeList outcomes={service.outcomes} />

            {/* Included & Excluded Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              <IncludedList items={service.included} />
              <ExcludedList items={service.excluded} />
            </div>

            {/* Typical Process */}
            <ServiceProcess process={service.process} />

            {/* Preparation Checklist */}
            <PreparationChecklist checklist={service.preparationChecklist} />

            {/* Visa Readiness CTA Banner */}
            <section aria-label="Visa Readiness Callout" className="rounded-3xl bg-[#071f4a] p-8 text-white sm:p-10">
              <div className="max-w-2xl space-y-4">
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#ff7377]">
                  Check Preparation Alignment
                </p>
                <h2 className="text-2xl font-black sm:text-3xl">
                  Assess your visa readiness before requesting service support.
                </h2>
                <p className="text-sm leading-6 text-white/80">
                  Our structured readiness assessment evaluates your document preparation, identifies gaps, and recommends actionable next steps.
                </p>
                <div className="pt-2">
                  <ButtonLink href={routes.readiness}>
                    Check My Readiness <ArrowRight className="ml-2 h-4 w-4" />
                  </ButtonLink>
                </div>
              </div>
            </section>

            {/* Service FAQs */}
            <ServiceFAQ faqs={service.faqs} />

            {/* Related Countries */}
            <RelatedCountries countrySlugs={service.relatedCountrySlugs} />

            {/* Related Services */}
            <RelatedServices serviceSlugs={service.relatedServiceSlugs} />

            {/* Human Consultation CTA */}
            <ExpertCTA
              title={`Need assistance with ${service.title}?`}
              description="Speak with a Visaworx expert to discuss your situation, documents, and preparation strategy."
            />

            {/* Official Authority Service Disclaimer */}
            <ServiceDisclaimer />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div>
                <span className="rounded-full bg-[#071f4a]/5 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#071f4a]">
                  {service.category}
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-[#071f4a]">{service.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {service.shortDescription}
                </p>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-3">
                <h4 className="font-extrabold text-[#071f4a] text-sm">Need Direct Advice?</h4>
                <p className="text-xs leading-5 text-slate-600">
                  Connect with a senior consultant to review your travel purpose and documents.
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
