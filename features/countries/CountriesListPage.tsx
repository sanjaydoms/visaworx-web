"use client";

import { useMemo, useState } from "react";
import { Container } from "../../common/components/Container";
import { CountryCard } from "../../common/components/CountryCard";
import { CountrySearch } from "../../common/components/CountrySearch";
import { VisaPurposeFilter } from "../../common/components/VisaPurposeFilter";
import { EmptyState } from "../../common/components/EmptyState";
import { ExpertCTA } from "../../common/components/ExpertCTA";
import { countriesData, type VisaPurpose } from "../../common/content/countries";
import { trustPoints } from "../../common/content/home";

export function CountriesListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState<VisaPurpose | "All">("All");

  const filteredCountries = useMemo(() => {
    return countriesData.filter((country) => {
      const matchesSearch =
        searchQuery === "" ||
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (country.shortName && country.shortName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPurpose =
        selectedPurpose === "All" || country.visaPurposes.includes(selectedPurpose);

      return matchesSearch && matchesPurpose;
    });
  }, [searchQuery, selectedPurpose]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedPurpose("All");
  };

  return (
    <div className="space-y-16 py-10 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f] sm:text-sm">
            Visa Intelligence by Destination
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#071f4a] sm:text-5xl lg:text-6xl">
            Understand the visa journey before you apply.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore destination-specific visa guidance, common preparation requirements and expert consultation options.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          <CountrySearch value={searchQuery} onChange={setSearchQuery} />
          <VisaPurposeFilter selectedPurpose={selectedPurpose} onSelect={setSelectedPurpose} />
        </div>

        <div className="mt-10">
          {filteredCountries.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCountries.map((country) => (
                <CountryCard key={country.slug} country={country} />
              ))}
            </div>
          ) : (
            <EmptyState onReset={handleReset} />
          )}
        </div>
      </Container>

      <section aria-label="Trust principles" className="border-y border-slate-200 bg-slate-50 py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Icon className="h-7 w-7 text-[#e6282f]" />
                <h3 className="mt-4 font-extrabold text-[#071f4a]">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <ExpertCTA />
      </Container>
    </div>
  );
}
