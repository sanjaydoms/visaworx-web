import { consultationContent } from "../content/consultation";

export function ConsultationStepper({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick?: (step: number) => void;
}) {
  return (
    <nav aria-label="Consultation steps" className="w-full">
      <ol className="flex items-center justify-between gap-2 border-b border-slate-200 pb-4">
        {consultationContent.steps.map(({ step, label }) => {
          const isCurrent = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <li key={step} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => isCompleted && onStepClick?.(step)}
                disabled={!isCompleted}
                aria-current={isCurrent ? "step" : undefined}
                className={`flex w-full items-center gap-2 text-left focus:outline-none focus:ring-2 focus:ring-[#071f4a] rounded-lg p-1 transition ${
                  isCompleted ? "cursor-pointer hover:opacity-80" : "cursor-default"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                    isCurrent
                      ? "bg-[#071f4a] text-white ring-4 ring-[#071f4a]/10"
                      : isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {step}
                </div>
                <span
                  className={`hidden text-xs font-bold sm:inline ${
                    isCurrent ? "text-[#071f4a]" : isCompleted ? "text-slate-700" : "text-slate-500"
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
