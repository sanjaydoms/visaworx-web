import { MessageCircle } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { site } from "../config/site";

export function ExpertCTA({
  title = "Not sure where to begin?",
  description = "Speak with a Visaworx expert about your destination, purpose and preparation.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="rounded-[2rem] border border-[#0b3478]/10 bg-white p-8 text-center shadow-[0_25px_70px_rgba(7,31,74,.10)] sm:p-12">
      <MessageCircle className="mx-auto h-10 w-10 text-[#e6282f]" />
      <h2 className="mt-5 text-2xl font-black text-[#071f4a] sm:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        {description}
      </p>
      <div className="mt-6">
        <ButtonLink href={site.consultationUrl}>Speak to an Expert</ButtonLink>
      </div>
    </section>
  );
}
