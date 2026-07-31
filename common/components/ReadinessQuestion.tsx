import type { ReactNode } from "react";

type ReadinessQuestionProps = {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  error?: string | null;
  children: ReactNode;
};

export function ReadinessQuestion({
  id,
  label,
  description,
  required = false,
  error,
  children,
}: ReadinessQuestionProps) {
  return (
    <fieldset className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      <legend id={`${id}-legend`} className="text-base font-bold text-[#071f4a] sm:text-lg">
        {label} {required && <span className="text-[#e6282f]" aria-hidden="true">*</span>}
      </legend>
      {description && <p className="text-xs leading-5 text-slate-500">{description}</p>}
      <div className="pt-1">{children}</div>
      {error && (
        <p className="text-xs font-semibold text-[#e6282f]" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
