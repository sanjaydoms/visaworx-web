/**
 * Optional preferred callback time. As with DateInput, this records a
 * preference and reserves nothing.
 */
export function TimeInput({
  value,
  onChange,
  id = "preferred-time",
  label = "Preferred Time (optional)",
}: {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider mb-1">
        {label}
      </label>
      <input
        id={id}
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-sm font-medium text-[#071f4a] focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
      />
    </div>
  );
}
