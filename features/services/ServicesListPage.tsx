"use client";

import { useMemo, useState } from "react";
import { Container } from "../../common/components/Container";
import { ServiceCard } from "../../common/components/ServiceCard";
import { ExpertCTA } from "../../common/components/ExpertCTA";
import { servicesData, type ServiceCategory } from "../../common/content/services";
import { HeartHandshake, ShieldCheck, Sparkles, Users } from "lucide-react";

const categories: Array<ServiceCategory | "All"> = ["All", "Travel Purpose", "Advisory"];

const serviceTrustPoints = [
  {
    title: "Human expertise",
    description: "Experienced visa consultants provide judgement when it matters.",
    icon: Users,
  },
  {
    title: "Transparent process",
    description: "Clear expectations and preparation roadmaps without hidden steps.",
    icon: Sparkles,
  },
  {
    title: "Ethical advice",
    description: "Honest feedback and realistic preparation guidance without false claims.",
    icon: HeartHandshake,
  },
  {
    title: "Clear next steps",
    description: "Actionable recommendations tailored to your travel purpose.",
    icon: ShieldCheck,
  },
];

export function ServicesListPage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "All">("All");

  const filteredServices = useMemo(() => {
    if (selectedCategory === "All") return servicesData;
    return servicesData.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-16 py-10 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f] sm:text-sm">
            Expert Visa Support
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#071f4a] sm:text-5xl lg:text-6xl">
            Choose the support your visa journey needs.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            From visa readiness and documentation review to interview preparation and refusal review, Visaworx helps you prepare with clarity and confidence.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-10 flex flex-wrap items-center gap-2" role="tablist" aria-label="Service Category Filter">
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex min-h-[48px] items-center rounded-2xl px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#071f4a] ${
                  active
                    ? "bg-[#071f4a] text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category === "All" ? "All Services" : `${category} Services`}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>

      {/* Trust Strip */}
      <section aria-label="Service Trust Principles" className="border-y border-slate-200 bg-slate-50 py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {serviceTrustPoints.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Icon className="h-7 w-7 text-[#e6282f]" />
                <h3 className="mt-4 font-extrabold text-[#071f4a]">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final Expert CTA */}
      <Container>
        <ExpertCTA
          title="Not sure which service fits your situation?"
          description="Speak with a Visaworx expert before you decide."
        />
      </Container>
    </div>
  );
}
