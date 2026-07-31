import type { ReadinessEvaluationResult } from "../types/readiness";
import { readinessContent } from "../content/readiness";

export function ReadinessBand({ evaluation }: { evaluation: ReadinessEvaluationResult }) {
  const config = readinessContent.bands[evaluation.band];

  return (
    <div className={`rounded-3xl border p-8 shadow-sm ${config.themeColor}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${config.badgeColor}`}>
            {evaluation.band}
          </span>
          <h2 className="mt-3 text-3xl font-black">{evaluation.summaryTitle}</h2>
        </div>
      </div>
      <p className="mt-4 text-base leading-7 opacity-90 sm:text-lg">
        {evaluation.explanation}
      </p>
    </div>
  );
}
