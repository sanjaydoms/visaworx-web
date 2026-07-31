import { site } from "../config/site";

export function PrivacyNotice() {
  return (
    <p className="text-xs text-slate-500 leading-5">
      Your contact information will only be used by Visaworx / Klar Travels experts to contact you regarding your consultation request. For more details, view the{" "}
      <a
        href={site.klarTravelsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#071f4a] underline"
      >
        Klar Travels Privacy Policy
      </a>
      .
    </p>
  );
}
