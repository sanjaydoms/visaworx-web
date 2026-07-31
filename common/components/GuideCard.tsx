import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Guide } from "../content/guides";
import { routes } from "../config/routes";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#071f4a]/20 hover:shadow-xl">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#071f4a]/5 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#071f4a]">
            {guide.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5" /> {guide.readingTime}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-extrabold text-[#071f4a] group-hover:text-[#0b3478]">
          {guide.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
          {guide.summary}
        </p>
      </div>

      <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-between">
        {guide.lastReviewed && (
          <span className="text-xs text-slate-400">Reviewed: {guide.lastReviewed}</span>
        )}
        <Link
          href={routes.guideDetail(guide.slug)}
          className="inline-flex min-h-[48px] items-center gap-1.5 rounded-2xl bg-slate-50 px-4 py-2 text-xs font-bold text-[#071f4a] transition hover:bg-[#071f4a] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
        >
          <span>Read Guide</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
