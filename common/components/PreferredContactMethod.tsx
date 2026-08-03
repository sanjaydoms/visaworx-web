import { OptionToggleGroup } from "./OptionToggleGroup";
import { CONTACT_METHOD_OPTIONS, type ContactMethodOption } from "../config/consultation";

export function PreferredContactMethod({
  value,
  onSelect,
}: {
  value: ContactMethodOption;
  onSelect: (method: ContactMethodOption) => void;
}) {
  return (
    <OptionToggleGroup
      label="Preferred Contact Channel"
      options={CONTACT_METHOD_OPTIONS}
      value={value}
      onSelect={onSelect}
      fill
    />
  );
}
