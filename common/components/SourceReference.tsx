import { ExternalLink } from "lucide-react";

export function SourceReference({
  references,
}: {
  references: Array<{ label: string; url?: string }>;
}) {
  if (references.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Official Source References</h3>
      <ul className="space-y-2 text-xs font-bold text-[#071f4a]">
        {references.map((ref, idx) => (
          <li key={idx}>
            {ref.url ? (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                {ref.label} <ExternalLink className="h-3 w-3 text-slate-400" />
              </a>
            ) : (
              <span>{ref.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
