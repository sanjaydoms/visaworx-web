"use client";

import { useMemo, useState } from "react";
import { Container } from "../../common/components/Container";
import { ResourceHero } from "../../common/components/ResourceHero";
import { FAQSearch } from "../../common/components/FAQSearch";
import { FAQAccordion } from "../../common/components/FAQAccordion";
import { EmptyState } from "../../common/components/EmptyState";
import { ExpertCTA } from "../../common/components/ExpertCTA";
import { faqsData, type FAQCategory } from "../../common/content/faqs";

const categories: Array<FAQCategory | "All"> = [
  "All",
  "General",
  "Tourist",
  "Business",
  "Student",
  "Work",
  "Family",
  "Documentation",
  "Interviews",
  "Refusals",
  "Readiness",
];

export function FaqsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | "All">("All");

  const filteredFaqs = useMemo(() => {
    return faqsData.filter((faq) => {
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === "All" || faq.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="space-y-12 py-10 sm:py-16">
      <Container>
        <div className="space-y-6">
          <ResourceHero
            eyebrow="Visa Intelligence FAQs"
            title="Visa Questions & Answers"
            description="Clear answers to common questions about visa categories, financial proof, interviews, and refusal review."
          />
          <FAQSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap items-center gap-2" role="tablist" aria-label="FAQ Category Filter">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex min-h-[44px] items-center rounded-xl px-4 py-2 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-[#071f4a] ${
                  active ? "bg-[#071f4a] text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat === "All" ? "All Questions" : cat}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-10 mx-auto max-w-4xl">
          {filteredFaqs.length > 0 ? (
            <FAQAccordion items={filteredFaqs} />
          ) : (
            <EmptyState onReset={handleReset} />
          )}
        </div>
      </Container>

      <Container>
        <ExpertCTA />
      </Container>
    </div>
  );
}
