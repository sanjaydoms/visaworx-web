"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, FileText, Globe, HelpCircle, Search, X } from "lucide-react";
import { searchResources } from "../utils/resource-search";
import { routes } from "../config/routes";

export function ResourceSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => searchResources(query), [query]);

  return (
    <div className="relative w-full max-w-2xl">
      <label htmlFor="resource-search-input" className="sr-only">
        Search visa guides, FAQs, glossary terms, countries, and services
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
        <Search className="h-5 w-5" />
      </div>
      <input
        id="resource-search-input"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Search guides, FAQs, terms (e.g. financial proof, refusal, B1/B2)..."
        className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-12 text-sm font-medium text-[#071f4a] placeholder-slate-400 shadow-sm transition focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setIsOpen(false);
          }}
          aria-label="Clear search query"
          className="absolute inset-y-0 right-0 flex min-h-[48px] min-w-[48px] items-center justify-center p-3 text-slate-400 hover:text-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {/* Search Results Dropdown */}
      {isOpen && query.trim() !== "" && (
        <div className="absolute top-full z-50 mt-2 max-h-[480px] w-full overflow-y-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Search Results ({results.totalCount})</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-[#071f4a]"
            >
              Close
            </button>
          </div>

          {results.totalCount === 0 ? (
            <div className="py-6 text-center text-sm text-slate-500">
              No matching resources found for &quot;{query}&quot;.
            </div>
          ) : (
            <div className="space-y-4 text-left">
              {/* Guides */}
              {results.guides.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e6282f] mb-2">
                    <BookOpen className="h-3.5 w-3.5" /> Guides ({results.guides.length})
                  </h4>
                  <div className="space-y-1">
                    {results.guides.slice(0, 3).map((g) => (
                      <Link
                        key={g.slug}
                        href={routes.guideDetail(g.slug)}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-xl p-2.5 transition hover:bg-slate-50"
                      >
                        <p className="text-sm font-bold text-[#071f4a]">{g.title}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{g.summary}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {results.faqs.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#071f4a] mb-2">
                    <HelpCircle className="h-3.5 w-3.5" /> FAQs ({results.faqs.length})
                  </h4>
                  <div className="space-y-1">
                    {results.faqs.slice(0, 3).map((f) => (
                      <Link
                        key={f.id}
                        href={routes.faqsPage}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-xl p-2.5 transition hover:bg-slate-50"
                      >
                        <p className="text-sm font-bold text-[#071f4a]">{f.question}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Glossary */}
              {results.glossary.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#071f4a] mb-2">
                    <FileText className="h-3.5 w-3.5" /> Glossary ({results.glossary.length})
                  </h4>
                  <div className="space-y-1">
                    {results.glossary.slice(0, 3).map((term) => (
                      <Link
                        key={term.term}
                        href={routes.glossaryPage}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-xl p-2.5 transition hover:bg-slate-50"
                      >
                        <p className="text-sm font-bold text-[#071f4a]">{term.term}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{term.definition}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Countries */}
              {results.countries.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#071f4a] mb-2">
                    <Globe className="h-3.5 w-3.5" /> Countries ({results.countries.length})
                  </h4>
                  <div className="space-y-1">
                    {results.countries.slice(0, 2).map((c) => (
                      <Link
                        key={c.slug}
                        href={routes.countryDetail(c.slug)}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-xl p-2.5 transition hover:bg-slate-50"
                      >
                        <p className="text-sm font-bold text-[#071f4a]">{c.name} Visa Guidance</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
