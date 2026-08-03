import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { routes } from "../config/routes";

/**
 * The navy readiness callout used on country, service and guide detail pages.
 * Only the eyebrow, heading and description differ between them.
 */
export function ReadinessCTA({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <section aria-label="Visa Readiness Callout" className="rounded-3xl bg-[#071f4a] p-8 text-white sm:p-10">
      <div className="max-w-2xl space-y-4">
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#ff7377]">{eyebrow}</p>
        <h2 className="text-2xl font-black sm:text-3xl">{title}</h2>
        <p className="text-sm leading-6 text-white/80">{description}</p>
        <div className="pt-2">
          <ButtonLink href={routes.readiness}>
            Check My Readiness <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
