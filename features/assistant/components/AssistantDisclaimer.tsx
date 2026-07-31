import { ShieldAlert } from "lucide-react";

export function AssistantDisclaimer() {
  return (
    <div className="flex items-start gap-2 border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-[11px] leading-4 text-slate-500">
      <ShieldAlert className="h-4 w-4 shrink-0 text-[#071f4a] mt-0.5" />
      <p>
        Visaworx AI provides general educational guidance based on approved Visaworx content. It does not provide legal advice, determine eligibility, or guarantee visa approval.
      </p>
    </div>
  );
}
