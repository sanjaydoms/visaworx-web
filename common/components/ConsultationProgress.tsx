export function ConsultationProgress({
  currentStep,
  totalSteps = 5,
}: {
  currentStep: number;
  totalSteps?: number;
}) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full space-y-1.5" aria-live="polite">
      <div className="flex justify-between text-xs font-semibold text-slate-500">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{percentage}% Completed</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-[#071f4a] transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
