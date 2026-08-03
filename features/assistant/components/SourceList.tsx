import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { SourceItem } from "../../../common/ai/types/assistant";

/**
 * Every substantive answer cites the approved content it came from, so the
 * applicant can verify it rather than take the assistant's word for it.
 */
export function SourceList({ sources }: { sources: SourceItem[] }) {
  if (sources.length === 0) return null;

  return (
    <div className="space-y-1.5 pt-1 border-t border-slate-100">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        Approved Sources:
      </span>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((source, index) => (
          <Link
            key={index}
            href={source.href}
            className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-bold text-[#071f4a] hover:bg-slate-200"
          >
            {source.label} <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
