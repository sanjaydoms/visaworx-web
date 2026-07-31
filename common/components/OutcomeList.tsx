import { CheckCircle2 } from "lucide-react";

export function OutcomeList({ outcomes }: { outcomes: string[] }) {
  return (
    <section aria-labelledby="outcomes-heading" className="space-y-4">
      <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Key Results</p>
      <h2 id="outcomes-heading" className="text-2xl font-extrabold text-[#071f4a] sm:text-3xl">
        What This Service Helps You Achieve
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {outcomes.map((outcome, idx) => (
          <div key={idx} className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
            <p className="text-sm font-semibold leading-6 text-slate-800">{outcome}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
