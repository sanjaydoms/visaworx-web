import { OptionCard } from "./OptionCard";
import { servicesData } from "../content/services";

/**
 * Service picker. As with the destination step, "not sure yet" is a valid
 * answer and clears any selected service.
 */
export function ServiceSelector({
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
        <span className="text-sm">{undecidedLabel} / General consultation</span>
      </label>

      {!undecided && (
        <div className="grid gap-3 sm:grid-cols-2">
          {servicesData.map((service) => (
            <OptionCard
              key={service.slug}
              selected={selectedSlug === service.slug}
              onSelect={() => onSelect(service.slug)}
              title={service.title}
              description={service.shortDescription}
              layout="stack"
            />
          ))}
        </div>
      )}
    </>
  );
}
