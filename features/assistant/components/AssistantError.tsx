import { AlertTriangle } from "lucide-react";

/**
 * A failed request, styled distinctly from an answer.
 *
 * The hook has always flagged these with `isError`, but AssistantMessage
 * ignored the flag and rendered them as ordinary assistant replies - so an
 * outage or timeout looked like considered visa guidance. This makes the
 * failure legible.
 */
export function AssistantError({ text, timestamp }: { text: string; timestamp?: string }) {
  return (
    <div className="flex justify-start">
      <div
        role="alert"
        className="max-w-[90%] space-y-1.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs leading-5 text-red-800 shadow-sm"
      >
        <div className="flex items-center gap-1.5 font-bold">
          <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
          Assistant unavailable
        </div>
        <p>{text}</p>
        {timestamp && <span className="block text-[10px] text-red-500">{timestamp}</span>}
      </div>
    </div>
  );
}
