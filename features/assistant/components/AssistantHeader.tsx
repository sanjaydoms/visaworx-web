import { Bot, RotateCcw, X } from "lucide-react";

export function AssistantHeader({
  onClose,
  onReset,
}: {
  onClose?: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-[#071f4a] px-5 py-4 text-white">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e6282f] text-white">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-sm font-extrabold tracking-wide">Visaworx AI Assistant</h2>
          <p className="text-[11px] text-white/70">Source-verified visa intelligence</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          aria-label="Start over"
          title="Start over conversation"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close assistant panel"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
