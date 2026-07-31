import { CheckCircle2 } from "lucide-react";

export function StrengthList({ strengths }: { strengths: string[] }) {
  if (strengths.length === 0) return null;

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[#071f4a]">Identified Preparation Strengths</h3>
      <ul className="space-y-3">
        {strengths.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-sm leading-6 text-slate-700">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
