import { ShieldAlert } from "lucide-react";

export function ServiceDisclaimer() {
  return (
    <aside
      aria-label="Official authority service disclaimer"
      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
    >
      <div className="flex gap-4">
        <div className="flex shrink-0 items-center justify-center rounded-xl bg-[#071f4a]/5 p-2 text-[#071f4a]">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div className="text-sm leading-6 text-slate-600">
          <p className="font-bold text-[#071f4a]">Official Authority Disclaimer</p>
          <p className="mt-1">
            Visaworx provides consultation and application-support guidance. Visa requirements and decisions are controlled by the relevant government or consular authority, and approval cannot be guaranteed.
          </p>
        </div>
      </div>
    </aside>
  );
}
