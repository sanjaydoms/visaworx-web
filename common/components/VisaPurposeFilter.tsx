import type { VisaPurpose } from "../content/countries";

type VisaPurposeFilterProps = {
  selectedPurpose: VisaPurpose | "All";
  onSelect: (purpose: VisaPurpose | "All") => void;
};

const options: Array<VisaPurpose | "All"> = [
  "All",
  "Tourist",
  "Business",
  "Student",
  "Work",
  "Family",
];

export function VisaPurposeFilter({
  selectedPurpose,
  onSelect,
}: VisaPurposeFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Visa Purpose Filter">
      {options.map((purpose) => {
        const active = selectedPurpose === purpose;
        return (
          <button
            key={purpose}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(purpose)}
            className={`inline-flex min-h-[48px] items-center rounded-2xl px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#071f4a] ${
              active
                ? "bg-[#071f4a] text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {purpose === "All" ? "All Purposes" : purpose}
          </button>
        );
      })}
    </div>
  );
}
