import { OptionToggleGroup } from "./OptionToggleGroup";
import { CONTACT_WINDOW_OPTIONS, type ContactWindowOption } from "../config/consultation";

/**
 * A preference, not a booking. The copy deliberately avoids implying that a
 * chosen window is confirmed or guaranteed.
 */
export function PreferredContactWindow({
  value,
  onSelect,
}: {
  value: ContactWindowOption;
  onSelect: (window: ContactWindowOption) => void;
}) {
  return (
    <OptionToggleGroup
      label="Preferred Contact Window"
      options={CONTACT_WINDOW_OPTIONS}
      value={value}
      onSelect={onSelect}
    />
  );
}
