import { RotateCcw } from "lucide-react";

/**
 * Clears the conversation. Rendered as a labelled pill on the full assistant
 * page and as an icon control in the floating panel header, where horizontal
 * space is scarce.
 */
export function StartOverButton({
  onClick,
  variant = "pill",
}: {
  onClick: () => void;
  variant?: "pill" | "icon";
}) {
  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Start over"
        title="Start over conversation"
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
    >
      <RotateCcw className="h-4 w-4" /> Start Over
    </button>
  );
}
