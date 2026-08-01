"use client";

import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

/**
 * Selectable option tile used by the consultation and readiness flows.
 *
 * Both flows had their own near-identical selected/unselected button styling,
 * with different heights and focus treatments. This is the single source for
 * that pattern, and it guarantees the 48px minimum touch target.
 */
export function OptionCard({
  selected,
  onSelect,
  title,
  description,
  icon,
  layout = "row",
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  /** `row` for compact single-line options, `stack` when a description is shown. */
  layout?: "row" | "stack";
}) {
  const base =
    "rounded-2xl border p-4 text-left font-bold transition focus:outline-none focus:ring-2 focus:ring-[#071f4a]";
  const state = selected
    ? "border-[#071f4a] bg-[#071f4a]/5 text-[#071f4a] shadow-sm"
    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300";
  const shape =
    layout === "row"
      ? "flex min-h-[56px] items-center justify-between"
      : "flex min-h-[56px] flex-col justify-between";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`${shape} ${base} ${state}`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-extrabold">
          {icon}
          {title}
        </span>
        {selected && <CheckCircle2 className="h-5 w-5 shrink-0 text-[#071f4a]" />}
      </div>
      {description && (
        <p className="mt-1 text-xs font-normal text-slate-600 line-clamp-2">{description}</p>
      )}
    </button>
  );
}
