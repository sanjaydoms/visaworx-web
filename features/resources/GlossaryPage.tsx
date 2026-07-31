"use client";

import { useMemo, useState } from "react";
import { Container } from "../../common/components/Container";
import { ResourceHero } from "../../common/components/ResourceHero";
import { GlossarySearch } from "../../common/components/GlossarySearch";
import { GlossaryIndex } from "../../common/components/GlossaryIndex";
import { GlossaryTerm } from "../../common/components/GlossaryTerm";
import { EmptyState } from "../../common/components/EmptyState";
import { ExpertCTA } from "../../common/components/ExpertCTA";
import { glossaryData } from "../../common/content/glossary";

export function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("All");

  const filteredTerms = useMemo(() => {
    return glossaryData
      .filter((item) => {
        const matchesSearch =
          searchQuery === "" ||
          item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.definition.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLetter =
          selectedLetter === "All" ||
          item.term.toUpperCase().startsWith(selectedLetter.toUpperCase());

        return matchesSearch && matchesLetter;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedLetter]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedLetter("All");
  };

  return (
    <div className="space-y-12 py-10 sm:py-16">
      <Container>
        <div className="space-y-6">
          <ResourceHero
            eyebrow="Visa Terminology"
            title="Visa Glossary"
            description="Clear, non-technical definitions of essential immigration and visa preparation terminology."
          />
          <GlossarySearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Letter Index */}
        <div className="mt-8">
          <GlossaryIndex selectedLetter={selectedLetter} onSelectLetter={setSelectedLetter} />
        </div>

        {/* Glossary Terms List */}
        <div className="mt-10 mx-auto max-w-4xl">
          {filteredTerms.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredTerms.map((item) => (
                <GlossaryTerm key={item.term} term={item} />
              ))}
            </div>
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
