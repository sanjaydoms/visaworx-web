import { AlertTriangle, Mail, RefreshCw } from "lucide-react";
import { site } from "../config/site";

export function SubmissionError({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 space-y-4 text-left">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-6 w-6 text-[#e6282f] shrink-0 mt-0.5" />
        <div>
          <h3 className="text-base font-bold text-[#071f4a]">Submission Failed</h3>
          <p className="mt-1 text-sm text-slate-700">{error}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#071f4a] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#0b3478] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>

        <a
          href={`mailto:${site.supportEmail}?subject=Visaworx%20Consultation%20Direct%20Request`}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
        >
          <Mail className="h-4 w-4" /> Contact via Email
        </a>
      </div>
    </div>
  );
}
