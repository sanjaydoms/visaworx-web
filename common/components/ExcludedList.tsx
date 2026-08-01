import { X } from "lucide-react";

export function ExcludedList({ items }: { items: string[] }) {
  return (
    // Marked as a negated-claim block: everything inside is something Visaworx
    // explicitly does NOT provide, so compliance checks must not read these
    // items as promises.
    <div
      data-negated-claims="true"
      className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6"
    >
      <h3 className="text-xl font-bold text-[#071f4a]">What Is Not Included</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-sm leading-6 text-slate-600">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500 mt-0.5">
              <X className="h-3.5 w-3.5" />
            </div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
