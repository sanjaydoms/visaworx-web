import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GlossaryTermItem } from "../content/glossary";
import { guidesData } from "../content/guides";
import { routes } from "../config/routes";

export function GlossaryTerm({ term }: { term: GlossaryTermItem }) {
  const relatedGuide = term.relatedGuideSlugs?.[0]
    ? guidesData.find((g) => g.slug === term.relatedGuideSlugs?.[0])
    : null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
      <h3 className="text-xl font-black text-[#071f4a]">{term.term}</h3>
      <p className="text-sm leading-7 text-slate-600">{term.definition}</p>

      {relatedGuide && (
        <div className="pt-2 border-t border-slate-100">
          <Link
            href={routes.guideDetail(relatedGuide.slug)}
            className="inline-flex min-h-[44px] items-center text-xs font-bold text-[#071f4a] hover:underline"
          >
            Related Guide: {relatedGuide.title} <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
