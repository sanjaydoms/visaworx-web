import { List } from "lucide-react";
import type { ContentBlock } from "../content/guides";

export function GuideTableOfContents({ content }: { content: ContentBlock[] }) {
  const headings = content.filter((b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading");

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#071f4a]">
        <List className="h-4 w-4 text-[#e6282f]" /> Table of Contents
      </div>
      <ol className="space-y-1.5 text-xs">
        {headings.map((h, idx) => (
          <li key={idx} className={h.level === 3 ? "pl-3 text-slate-500" : "font-semibold text-slate-700"}>
            <a href={`#heading-${idx}`} className="hover:text-[#071f4a] hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
