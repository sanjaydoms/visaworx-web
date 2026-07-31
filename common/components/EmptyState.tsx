import { Globe, RotateCcw } from "lucide-react";

type EmptyStateProps = {
  onReset?: () => void;
};

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-3 text-[#071f4a] shadow-sm">
        <Globe className="h-7 w-7 text-slate-400" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-[#071f4a]">No matching destinations found</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
        We couldn't find any country matching your current search query or visa purpose filter. Try adjusting your filters or search terms.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#071f4a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3478] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
        >
          <RotateCcw className="h-4 w-4" /> Reset Filters
        </button>
      )}
    </div>
  );
}
