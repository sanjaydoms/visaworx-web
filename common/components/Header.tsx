"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { ButtonLink } from "./ButtonLink";
import { routes } from "../config/routes";
import { site } from "../config/site";
import { AssistantLauncher } from "../../features/assistant/components/AssistantLauncher";

const navigation = [
  ["Services", routes.services],
  ["Countries", routes.countries],
  ["Visa Readiness", routes.readiness],
  ["Resources", routes.resources],
  ["FAQs", routes.faq],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-[#071f4a] py-1.5 px-4 text-center text-xs font-medium text-white leading-tight">
        Backed by 15+ years of Klar Travels expertise.
      </div>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <Container>
          <div className="flex min-h-[72px] items-center justify-between gap-4 sm:min-h-20">
            <Link href={routes.home} aria-label="Visaworx home" className="flex items-center">
              <Logo className="h-auto w-[180px] sm:w-52" />
            </Link>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
              {navigation.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm font-semibold text-slate-700 transition hover:text-[#0b3478]"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <ButtonLink href={site.consultationUrl}>Speak to an Expert</ButtonLink>
            </div>

            <button
              type="button"
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full p-3 text-[#0b3478] transition hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label="Toggle navigation"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {open && (
            <nav className="border-t border-slate-100 py-4 lg:hidden" aria-label="Mobile navigation">
              <div className="flex flex-col gap-2">
                {navigation.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[48px] items-center font-semibold text-slate-700 hover:text-[#0b3478]"
                  >
                    {label}
                  </Link>
                ))}
                <div className="pt-2">
                  <ButtonLink href={site.consultationUrl} fullWidth>Speak to an Expert</ButtonLink>
                </div>
              </div>
            </nav>
          )}
        </Container>
      </header>

      <AssistantLauncher />
    </>
  );
}


