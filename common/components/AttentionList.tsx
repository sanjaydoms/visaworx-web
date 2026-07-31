import { AlertCircle } from "lucide-react";

export function AttentionList({ attentionAreas }: { attentionAreas: string[] }) {
  if (attentionAreas.length === 0) return null;

  return (
    <div className="space-y-4 rounded-3xl border border-amber-200 bg-amber-50/40 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[#071f4a]">Areas Needing Attention & Verification</h3>
      <ul className="space-y-3">
        {attentionAreas.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-sm leading-6 text-slate-800">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
