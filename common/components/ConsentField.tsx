import { PrivacyNotice } from "./PrivacyNotice";

/**
 * Explicit consent gate. Submission is blocked until this is checked, and it
 * always starts unchecked - consent is never pre-granted on the applicant's
 * behalf.
 */
export function ConsentField({
  checked,
  onChange,
  consentText,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  consentText: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 shrink-0 rounded border-slate-300 text-[#071f4a] focus:ring-[#071f4a] mt-0.5"
        />
        <span className="text-xs leading-6 font-semibold text-[#071f4a]">{consentText}</span>
      </label>
      <PrivacyNotice />
    </div>
  );
}
