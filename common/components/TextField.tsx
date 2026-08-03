/**
 * The single-line text input used throughout the consultation form. Extracted
 * so label wiring, focus ring and the 48px touch target stay identical across
 * every field rather than being retyped per input.
 */
export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  describedBy,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "date" | "time";
  required?: boolean;
  describedBy?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider mb-1"
      >
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={describedBy}
        className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-sm font-medium text-[#071f4a] focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
      />
    </div>
  );
}
