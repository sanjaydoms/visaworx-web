"use client";

import Link from "next/link";
import { ArrowRight, FileText, HelpCircle, ShieldCheck } from "lucide-react";
import { Container } from "../../common/components/Container";
import { ResourceHero } from "../../common/components/ResourceHero";
import { ResourceSearch } from "../../common/components/ResourceSearch";
import { GuideCard } from "../../common/components/GuideCard";
import { ExpertCTA } from "../../common/components/ExpertCTA";
import { guidesData } from "../../common/content/guides";
import { faqsData } from "../../common/content/faqs";
import { routes } from "../../common/config/routes";

const categoryCards = [
  { label: "Country Guides", desc: "Destination-specific visa rules and preparation timelines." },
  { label: "Visa Preparation", desc: "Step-by-step preparation frameworks before you apply." },
  { label: "Documentation", desc: "Avoiding pitfalls in financial and employment proof." },
  { label: "Interviews", desc: "Consular interview techniques and confidence building." },
  { label: "Refusals", desc: "Understanding refusal notices and changed circumstances." },
  { label: "Business Travel", desc: "Corporate invitations and employer deputation alignment." },
  { label: "Student Travel", desc: "CAS, I-20, academic transcripts, and student SOPs." },
  { label: "Family Travel", desc: "Relationship proof and sponsor maintenance evidence." },
];

export function ResourcesHubPage() {
  const featuredGuides = guidesData.filter((g) => g.featured).slice(0, 3);
  const popularFaqs = faqsData.slice(0, 4);

  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* Hero & Search */}
      <Container>
        <div className="space-y-8">
          <ResourceHero />
          <ResourceSearch />
        </div>
      </Container>

      {/* Resource Categories Grid */}
      <Container>
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-[#071f4a] sm:text-3xl">Browse by Intelligence Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((cat) => (
              <Link
                key={cat.label}
                href={`${routes.guidesList}?category=${encodeURIComponent(cat.label)}`}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#071f4a]/20 hover:shadow-lg"
              >
                <div>
                  <h3 className="font-extrabold text-[#071f4a] group-hover:text-[#0b3478]">{cat.label}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{cat.desc}</p>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-[#071f4a]">
                  Explore Category <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>

      {/* Featured Guides */}
      <Container>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Featured Intelligence</p>
              <h2 className="mt-1 text-2xl font-black text-[#071f4a] sm:text-3xl">Essential Visa Guides</h2>
            </div>
            <Link
              href={routes.guidesList}
              className="inline-flex min-h-[48px] items-center gap-1.5 rounded-full bg-slate-100 px-5 py-2.5 text-xs font-bold text-[#071f4a] hover:bg-slate-200"
            >
              View All Guides <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </Container>

      {/* FAQs & Glossary Banner */}
      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* FAQs Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-bold text-[#071f4a]">
                  <HelpCircle className="h-5 w-5 text-[#e6282f]" /> Popular Questions
                </h3>
                <Link href={routes.faqsPage} className="text-xs font-bold text-[#071f4a] hover:underline">
                  All FAQs →
                </Link>
              </div>
              <div className="space-y-2">
                {popularFaqs.map((faq) => (
                  <Link
                    key={faq.id}
                    href={routes.faqsPage}
                    className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#071f4a]/20"
                  >
                    <p className="text-sm font-bold text-[#071f4a]">{faq.question}</p>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2">{faq.answer}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Glossary & Sourcing Trust */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#071f4a]">
                  <FileText className="h-6 w-6 text-[#e6282f]" />
                  <h3 className="text-xl font-bold">Visa Terminology Glossary</h3>
                </div>
                <p className="text-xs leading-6 text-slate-600">
                  Unsure what 214(b), CAS, or biometrics mean? Look up simple, non-technical definitions in our visa glossary.
                </p>
                <Link
                  href={routes.glossaryPage}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#071f4a] px-6 py-3 text-xs font-bold text-white hover:bg-[#0b3478]"
                >
                  Explore Glossary <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Sourcing & Review Commitment
                </div>
                <p className="text-xs leading-6 text-slate-600">
                  All Visaworx intelligence resources are reviewed by senior consultants and verified against current official government sources.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Final Expert CTA */}
      <Container>
        <ExpertCTA
          title="Need advice for your specific situation?"
          description="Speak with a Visaworx expert when general guidance is not enough."
        />
      </Container>
    </div>
  );
}
