import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Search,
} from "lucide-react";
import { ButtonLink } from "../../common/components/ButtonLink";
import { Container } from "../../common/components/Container";
import { countries, faqs, services, trustPoints } from "../../common/content/home";
import { routes } from "../../common/config/routes";
import { site } from "../../common/config/site";

export function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-[radial-gradient(circle_at_top_right,#edf4ff,transparent_35%),linear-gradient(180deg,#fff,#f8fafc)] py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#e6282f]">
                Visa intelligence. Human expertise.
              </p>
              <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-[#071f4a] sm:text-6xl">
                Make the right visa decision before you apply.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
                Understand the right pathway, assess your readiness, identify avoidable risks and speak with experienced visa professionals.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={site.consultationUrl}>
                  Speak to an Expert <ArrowRight className="ml-2 h-4 w-4" />
                </ButtonLink>
                <ButtonLink href={routes.readiness} variant="secondary">
                  Check Visa Readiness
                </ButtonLink>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                No approval guarantees. No false promises. Clear guidance and careful preparation.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#0b3478]/10 bg-white p-7 shadow-[0_30px_80px_rgba(7,31,74,.12)] sm:p-10">
              <div className="rounded-3xl bg-[#071f4a] p-7 text-white">
                <Search className="h-8 w-8 text-[#ef3a40]" />
                <h2 className="mt-6 text-2xl font-bold">Start with clarity</h2>
                <p className="mt-3 leading-7 text-white/75">
                  Tell us where you want to go and why. Visaworx helps you understand what matters before the paperwork begins.
                </p>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {["Right visa pathway", "Document readiness", "Potential gaps", "Clear next steps"].map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#e6282f]" />
                    {item}
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
