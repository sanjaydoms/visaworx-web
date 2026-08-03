/**
 * A row of mutually exclusive pill buttons. Backs the preferred contact method
 * and contact window selectors, both of which are small fixed option sets where
 * a native select would cost an extra tap on mobile.
 */
export function OptionToggleGroup<T extends string>({
  label,
  options,
  value,
  onSelect,
  renderLabel,
  fill = false,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onSelect: (option: T) => void;
  renderLabel?: (option: T) => string;
  fill?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#071f4a] uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className={fill ? "flex gap-2" : "flex flex-wrap gap-2"}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            aria-pressed={value === option}
            className={`${
              fill ? "flex-1 py-3" : "inline-flex items-center px-4 py-2"
            } min-h-[48px] rounded-xl text-xs font-bold capitalize transition focus:outline-none focus:ring-2 focus:ring-[#071f4a] ${
              value === option
                ? "bg-[#071f4a] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {renderLabel ? renderLabel(option) : option.replace("-", " ")}
          </button>
        ))}
      </div>
    </div>
  );
}
