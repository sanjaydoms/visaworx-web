import { UserCheck } from "lucide-react";

export function IdealFor({ items }: { items: string[] }) {
  return (
    <section aria-labelledby="ideal-for-heading" className="space-y-4">
      <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Target Audience</p>
      <h2 id="ideal-for-heading" className="text-2xl font-extrabold text-[#071f4a] sm:text-3xl">
        Who This Service Is For
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <UserCheck className="h-5 w-5 shrink-0 text-[#071f4a] mt-0.5" />
            <p className="text-sm font-semibold leading-6 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
