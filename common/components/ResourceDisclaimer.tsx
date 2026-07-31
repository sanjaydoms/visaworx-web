import { ShieldAlert } from "lucide-react";

export function ResourceDisclaimer() {
  return (
    <aside
      aria-label="Official resource educational disclaimer"
      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
    >
      <div className="flex gap-4">
        <div className="flex shrink-0 items-center justify-center rounded-xl bg-[#071f4a]/5 p-2 text-[#071f4a]">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div className="text-sm leading-6 text-slate-600">
          <p className="font-bold text-[#071f4a]">Educational Intelligence Disclaimer</p>
          <p className="mt-1">
            Visa rules, fees, processing times and documentary requirements may change without notice. This guide provides general educational information and is not legal advice, an eligibility decision, or an approval guarantee. Confirm current requirements with the relevant official authority.
          </p>
        </div>
      </div>
    </aside>
  );
}
