import { UserCheck } from "lucide-react";

/**
 * Shown when a question needs human judgement - refusals, complex histories,
 * anything the approved content cannot responsibly answer on its own.
 */
export function EscalationCard({ reason }: { reason?: string }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-2 text-amber-950">
      <div className="flex items-center gap-1.5 font-bold text-xs">
        <UserCheck className="h-4 w-4 text-[#e6282f]" /> Human Expert Consultation Recommended
      </div>
      <p className="text-[11px] leading-4">
        {reason || "This situation requires personal evaluation by a Visaworx expert."}
      </p>
    </div>
  );
}
