import type { ReactNode } from "react";

type ReadinessOptionProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (val: string) => void;
  type?: "radio" | "checkbox";
  label: string;
  description?: string;
  icon?: ReactNode;
};

export function ReadinessOption({
  name,
  value,
  checked,
  onChange,
  type = "radio",
  label,
  description,
  icon,
}: ReadinessOptionProps) {
  return (
    <label
      className={`flex min-h-[48px] cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition-all focus-within:ring-2 focus-within:ring-[#071f4a] ${
        checked
          ? "border-[#071f4a] bg-[#071f4a]/5 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => {
          if (type === "checkbox") {
            onChange(e.target.checked ? value : "");
          } else {
            onChange(value);
          }
        }}
        className="mt-1 h-4 w-4 shrink-0 text-[#071f4a] focus:ring-[#071f4a]"
      />
      {icon && <div className="mt-0.5 shrink-0 text-[#071f4a]">{icon}</div>}
      <div className="flex-1 text-sm">
        <span className="font-semibold text-[#071f4a]">{label}</span>
        {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
      </div>
    </label>
  );
}
