export function TypingIndicator() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white p-3 rounded-2xl w-max border border-slate-200"
    >
      <span className="h-2 w-2 rounded-full bg-[#071f4a] animate-ping" />
      Analyzing approved Visaworx intelligence...
    </div>
  );
}
