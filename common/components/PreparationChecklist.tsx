import { CheckCircle2 } from "lucide-react";

export function PreparationChecklist({ checklist }: { checklist: string[] }) {
  return (
    <section aria-labelledby="preparation-checklist-heading" className="space-y-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Preparation Roadmap</p>
        <h2 id="preparation-checklist-heading" className="mt-2 text-2xl font-extrabold text-[#071f4a] sm:text-3xl">
          Core Preparation Checklist
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Essential document preparation and verification steps recommended prior to formal visa submission.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {checklist.map((item, index) => (
          <div
            key={index}
            className="flex gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#071f4a]/20"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#e6282f] mt-0.5" />
            <p className="text-sm font-semibold leading-6 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
