import { TextField } from "../../../common/components/TextField";
import { PhoneInput } from "../../../common/components/PhoneInput";
import { PreferredContactMethod } from "../../../common/components/PreferredContactMethod";
import { PreferredContactWindow } from "../../../common/components/PreferredContactWindow";
import type { ConsultationFormInput } from "../../../common/validation/consultation";
import { StepHeading } from "./StepHeading";

export function ContactStep({
  formData,
  updateFormData,
}: {
  formData: ConsultationFormInput;
  updateFormData: (updater: (prev: ConsultationFormInput) => ConsultationFormInput) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeading
        title="How should our expert contact you?"
        description="Provide your preferred contact channel and callback window."
      />

      {/* Honeypot field, hidden from human users. A bot that fills it is
          rejected by the schema. */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot || ""}
        onChange={(e) => updateFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="full-name"
          label="Full Name"
          required
          value={formData.contact.fullName}
          onChange={(value) =>
            updateFormData((prev) => ({
              ...prev,
              contact: { ...prev.contact, fullName: value },
            }))
          }
          placeholder="Enter your full legal name"
        />

        <TextField
          id="email-address"
          label="Email Address"
          type="email"
          required
          value={formData.contact.email}
          onChange={(value) =>
            updateFormData((prev) => ({
              ...prev,
              contact: { ...prev.contact, email: value },
            }))
          }
          placeholder="name@example.com"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <PhoneInput
          value={formData.contact.phone}
          onChange={(value) =>
            updateFormData((prev) => ({
              ...prev,
              contact: { ...prev.contact, phone: value },
            }))
          }
        />

        <PreferredContactMethod
          value={formData.contact.preferredMethod}
          onSelect={(method) =>
            updateFormData((prev) => ({
              ...prev,
              contact: { ...prev.contact, preferredMethod: method },
            }))
          }
        />
      </div>

      <PreferredContactWindow
        value={formData.contact.preferredWindow}
        onSelect={(window) =>
          updateFormData((prev) => ({
            ...prev,
            contact: { ...prev.contact, preferredWindow: window },
          }))
        }
      />
    </div>
  );
}
