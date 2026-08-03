import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import { Container } from "../../common/components/Container";
import { ButtonLink } from "../../common/components/ButtonLink";
import { consultationContent } from "../../common/content/consultation";
import { routes } from "../../common/config/routes";

export function ConsultationSuccessPage() {
  const { heading, supportingCopy, whatHappensNext, importantNote } = consultationContent.success;

  return (
    <div className="space-y-12 py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <h1 className="text-3xl font-black text-[#071f4a] sm:text-4xl lg:text-5xl">
            {heading}
          </h1>

          <p className="text-base leading-7 text-slate-600 sm:text-lg max-w-xl mx-auto">
            {supportingCopy}
          </p>
        </div>
      </Container>

      {/* What Happens Next Timeline */}
      <Container>
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-6 sm:p-10">
          <h2 className="text-xl font-extrabold text-[#071f4a]">What Happens Next</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {whatHappensNext.map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#071f4a] text-xs font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-extrabold text-[#071f4a] text-sm">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Important Note */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex gap-3 text-xs leading-6 text-slate-600">
            <ShieldAlert className="h-5 w-5 text-[#071f4a] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#071f4a]">Important Note:</strong> {importantNote}
            </p>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href={routes.guidesList}>
              Explore Visa Guides <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={routes.home} variant="secondary">
              Return to Visaworx
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
