"use client";

import { useMemo, useState } from "react";
import { Container } from "../../common/components/Container";
import { GuideCard } from "../../common/components/GuideCard";
import { EmptyState } from "../../common/components/EmptyState";
import { ExpertCTA } from "../../common/components/ExpertCTA";
import { guidesData, type GuideCategory } from "../../common/content/guides";
import { Search, X } from "lucide-react";

const categories: Array<GuideCategory | "All"> = [
  "All",
  "Visa Preparation",
  "Documentation",
  "Interviews",
  "Refusals",
  "Business Travel",
  "Student Travel",
  "Family Travel",
  "Official Updates",
];

export function GuidesListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory | "All">("All");
  const [sortBy, setSortBy] = useState<"featured" | "recent" | "title">("featured");

  const filteredGuides = useMemo(() => {
    let result = guidesData.filter((g) => {
      const matchesQuery =
        searchQuery === "" ||
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === "All" || g.category === selectedCategory;

      return matchesQuery && matchesCat;
    });

    if (sortBy === "featured") {
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === "recent") {
      result = [...result].sort((a, b) => (b.lastReviewed || "").localeCompare(a.lastReviewed || ""));
    } else if (sortBy === "title") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("featured");
  };

  return (
    <div className="space-y-12 py-10 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f] sm:text-sm">
            Visa Intelligence Library
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#071f4a] sm:text-5xl lg:text-6xl">
            Visa Guides & Preparation Resources
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Search our curated collection of visa guides, document preparation checklists, interview strategies, and refusal-awareness resources.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <label htmlFor="guides-search-input" className="sr-only">Search guides</label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              id="guides-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guide titles or topics..."
              className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-11 pr-11 text-sm font-medium text-[#071f4a] focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear guide search"
                className="absolute inset-y-0 right-0 flex min-h-[48px] min-w-[48px] items-center justify-center p-3 text-slate-400 hover:text-[#071f4a]"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-by-select" className="text-xs font-bold text-slate-500 shrink-0">
              Sort By:
            </label>
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "featured" | "recent" | "title")}
              className="min-h-[48px] rounded-2xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
            >
              <option value="featured">Featured First</option>
              <option value="recent">Recently Reviewed</option>
              <option value="title">Alphabetical (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2" role="tablist" aria-label="Guide Category Filter">
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
                {cat === "All" ? "All Categories" : cat}
              </button>
            );
          })}
        </div>

        {/* Guides Grid */}
        <div className="mt-10">
          {filteredGuides.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
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
