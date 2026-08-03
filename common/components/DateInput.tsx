/**
 * Optional preferred callback date.
 *
 * A preference, never a booking. The label says "optional" and the helper text
 * states plainly that nothing is reserved - Visaworx does not hold appointment
 * slots, and implying otherwise would be a promise the product cannot keep.
 */
export function DateInput({
  value,
  onChange,
  id = "preferred-date",
  label = "Preferred Date (optional)",
  min,
}: {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label?: string;
  min?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider mb-1">
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-sm font-medium text-[#071f4a] focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
      />
    </div>
  );
}
