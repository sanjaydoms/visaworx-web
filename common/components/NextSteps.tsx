import { ArrowRight } from "lucide-react";

export function NextSteps({ steps }: { steps: string[] }) {
  if (steps.length === 0) return null;

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[#071f4a]">Recommended Action Steps</h3>
      <ol className="space-y-3">
        {steps.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-sm leading-6 text-slate-700">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#071f4a]/10 text-xs font-bold text-[#071f4a]">
              {idx + 1}
            </div>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
