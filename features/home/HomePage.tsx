import {
  ArrowRight,
  ArrowRightCircle,
  Compass,
  FileCheck,
  MessageCircle,
  Search,
  ShieldAlert,
} from "lucide-react";
import { ButtonLink } from "../../common/components/ButtonLink";
import { Container } from "../../common/components/Container";
import { countries, faqs, services, trustPoints } from "../../common/content/home";
import { routes } from "../../common/config/routes";
import { site } from "../../common/config/site";

const panelOutcomes = [
  {
    title: "Right visa pathway",
    description: "Understand which visa category fits your travel purpose.",
    icon: Compass,
  },
  {
    title: "Document readiness",
    description: "See what is available, missing or unclear.",
    icon: FileCheck,
  },
  {
    title: "Potential gaps",
    description: "Identify avoidable weaknesses before submission.",
    icon: ShieldAlert,
  },
  {
    title: "Clear next steps",
    description: "Know what to do and when expert review is needed.",
    icon: ArrowRightCircle,
  },
];

export function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-[radial-gradient(circle_at_top_right,#edf4ff,transparent_35%),linear-gradient(180deg,#fff,#f8fafc)] pt-14 pb-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#e6282f] sm:text-sm">
                Visa intelligence. Human expertise.
              </p>
              <h1 className="mt-4 max-w-3xl text-[clamp(3rem,13vw,3.25rem)] font-black leading-[1.05] tracking-tight text-[#071f4a] sm:text-6xl">
                Make the right visa<br className="hidden sm:inline" /> decision before<br className="hidden sm:inline" /> you apply.
              </h1>
              <p className="mt-5 max-w-2xl text-[18px] leading-[1.55] text-slate-600 sm:text-xl">
                Understand the right pathway, assess your readiness, identify avoidable risks and speak with experienced visa experts.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={site.consultationUrl}>
                  Speak to an Expert <ArrowRight className="ml-2 h-4 w-4" />
                </ButtonLink>
                <ButtonLink href={routes.readiness} variant="secondary">
                  Check My Readiness
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-500">
                No approval guarantees. No false promises. Clear guidance and careful preparation.
              </p>
            </div>

            <div className="mx-1 rounded-[2rem] border border-[#0b3478]/10 bg-white p-5 shadow-[0_25px_70px_rgba(7,31,74,.10)] sm:mx-0 sm:p-8">
              <div className="rounded-2xl bg-[#071f4a] p-6 text-white sm:p-7">
                <Search className="h-7 w-7 text-[#ef3a40]" />
                <h2 className="mt-5 text-2xl font-bold">Know Before You Apply</h2>
                <p className="mt-2 text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                  Tell us where you want to go and why. Visaworx helps you understand what matters before the paperwork begins.
                </p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {panelOutcomes.map(({ title, description, icon: Icon }) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100/80"
                  >
                    <div className="flex shrink-0 items-center justify-center rounded-xl bg-[#071f4a]/5 p-2 text-[#e6282f]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#071f4a]">{title}</h3>
                      <p className="mt-0.5 text-xs leading-5 text-slate-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-10">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {trustPoints.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-3xl border border-slate-200 p-6">
                <Icon className="h-7 w-7 text-[#e6282f]" />
                <h2 className="mt-4 font-extrabold text-[#071f4a]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="services" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Expert support"
            title="Visa guidance that goes beyond paperwork"
            description="Choose the support you need without being pushed into a generic process."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
                <Icon className="h-8 w-8 text-[#0b3478]" />
                <h3 className="mt-5 text-xl font-extrabold text-[#071f4a]">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="countries" className="bg-[#f4f7fb] py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Popular destinations"
            title="Start with where you want to go"
            description="Initial country coverage can be expanded from one shared content source without rebuilding page components."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {countries.map((country) => (
              <article key={country} className="rounded-2xl border border-slate-200 bg-white p-5 font-bold text-[#071f4a]">
                {country}
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="readiness" className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 rounded-[2rem] bg-[#071f4a] p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff7377]">Visa readiness</p>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Know what is ready, what is missing and what needs expert attention.
              </h2>
              <p className="mt-5 max-w-3xl leading-7 text-white/75">
                The readiness experience provides a structured preparation summary—not an approval prediction.
              </p>
            </div>
            <ButtonLink href={site.consultationUrl}>Request a Readiness Review</ButtonLink>
          </div>
        </Container>
      </section>

      <section id="resources" className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Visa intelligence"
            title="Clear answers before important decisions"
            description="Country guidance, document explanations, interview preparation and refusal insights will live in one trusted knowledge experience."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["Country visa guides", "Understand common categories, process stages and practical requirements."],
              ["Document guidance", "Learn what supporting documents demonstrate and where common gaps appear."],
              ["Refusal insights", "Understand refusal reasons before deciding whether and how to reapply."],
            ].map(([title, description]) => (
              <article key={title} className="rounded-3xl bg-[#f4f7fb] p-7">
                <h3 className="text-xl font-extrabold text-[#071f4a]">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="bg-[#f4f7fb] py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Frequently asked" title="Important answers, without overpromising" />
          <div className="mt-12 mx-auto max-w-4xl space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-6">
                <summary className="cursor-pointer list-none font-extrabold text-[#071f4a]">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section id="consultation" className="py-20 sm:py-28">
        <Container>
          <div className="rounded-[2rem] border border-[#0b3478]/10 bg-white p-8 text-center shadow-[0_25px_70px_rgba(7,31,74,.10)] sm:p-12">
            <MessageCircle className="mx-auto h-10 w-10 text-[#e6282f]" />
            <h2 className="mt-6 text-3xl font-black text-[#071f4a] sm:text-4xl">
              Your visa journey deserves a real conversation.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
              Speak with a Visaworx expert about your destination, purpose, readiness and next step.
            </p>
            <div className="mt-8">
              <ButtonLink href={site.consultationUrl}>Speak to an Expert</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#e6282f]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-[#071f4a] sm:text-4xl">{title}</h2>
      {description && <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>}
    </div>
  );
}
