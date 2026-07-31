import { AlertOctagon } from "lucide-react";

export function CommonMistakes({ mistakes }: { mistakes: string[] }) {
  return (
    <section aria-labelledby="common-mistakes-heading" className="space-y-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Risk Reduction</p>
        <h2 id="common-mistakes-heading" className="mt-2 text-2xl font-extrabold text-[#071f4a] sm:text-3xl">
          Common Avoidable Mistakes
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Frequent errors and documentation gaps identified during visa assessments.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {mistakes.map((mistake, idx) => (
          <div key={idx} className="flex gap-3.5 rounded-2xl border border-red-100 bg-red-50/50 p-4">
            <AlertOctagon className="h-5 w-5 shrink-0 text-[#e6282f] mt-0.5" />
            <p className="text-sm font-medium leading-6 text-slate-700">{mistake}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
