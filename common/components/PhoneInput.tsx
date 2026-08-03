import { TextField } from "./TextField";

/**
 * Phone entry. The country calling code is part of the same field rather than a
 * separate selector - the label and placeholder ask for it explicitly, and
 * validation only enforces a minimum length, so an applicant is never blocked
 * by a dial-code list that does not contain their country.
 */
export function PhoneInput({
  value,
  onChange,
  id = "phone-number",
}: {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}) {
  return (
    <TextField
      id={id}
      label="Phone Number (with Country Code)"
      type="tel"
      required
      value={value}
      onChange={onChange}
      placeholder="+1 (555) 000-0000"
    />
  );
}
