import { ShieldAlert } from "lucide-react";

/**
 * States what the assistant could not determine. Shown alongside an answer, not
 * instead of one - the applicant should always know where the answer stops.
 */
export function LimitationNotice({ limitation }: { limitation: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg">
      <ShieldAlert className="h-3.5 w-3.5 text-[#071f4a] shrink-0" />
      <span>{limitation}</span>
    </div>
  );
}
