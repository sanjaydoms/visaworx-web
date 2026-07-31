import { ArrowLeft } from "lucide-react";

export function BackButton({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Go back to previous step"
      className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#071f4a] disabled:opacity-50"
    >
      <ArrowLeft className="h-4 w-4" /> Back
    </button>
  );
}
