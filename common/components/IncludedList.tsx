import { Check } from "lucide-react";

export function IncludedList({ items }: { items: string[] }) {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[#071f4a]">What Is Included</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-sm leading-6 text-slate-700">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
              <Check className="h-3.5 w-3.5" />
            </div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
