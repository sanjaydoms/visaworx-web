import { Globe } from "lucide-react";
import { OptionCard } from "./OptionCard";
import { countriesData } from "../content/countries";

/**
 * Destination picker. "Undecided" is a first-class answer - an applicant who
 * has not settled on a country still deserves a consultation - so selecting it
 * clears any chosen country rather than sitting alongside it.
 */
export function CountrySelector({
  selectedSlug,
  undecided,
  undecidedLabel,
  onSelect,
  onUndecidedChange,
}: {
  selectedSlug?: string;
  undecided: boolean;
  undecidedLabel: string;
  onSelect: (slug: string) => void;
  onUndecidedChange: (undecided: boolean) => void;
}) {
  return (
    <>
      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold text-[#071f4a] cursor-pointer hover:bg-slate-100">
        <input
          type="checkbox"
          checked={undecided}
          onChange={(e) => onUndecidedChange(e.target.checked)}
          className="h-5 w-5 rounded border-slate-300 text-[#071f4a] focus:ring-[#071f4a]"
        />
        <span className="text-sm">{undecidedLabel} / Multiple destinations</span>
      </label>

      {!undecided && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {countriesData.map((country) => (
            <OptionCard
              key={country.slug}
              selected={selectedSlug === country.slug}
              onSelect={() => onSelect(country.slug)}
              title={country.name}
              icon={<Globe className="h-4 w-4 text-[#c92027]" />}
            />
          ))}
        </div>
      )}
    </>
  );
}
