"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { ButtonLink } from "./ButtonLink";
import { routes } from "../config/routes";
import { site } from "../config/site";

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
      <div className="bg-[#071f4a] py-2 text-center text-xs font-medium text-white">
        Visaworx is part of the Klar Travels ecosystem — backed by 15+ years of industry expertise.
      </div>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <Container>
          <div className="flex min-h-20 items-center justify-between gap-6">
            <Link href={routes.home} aria-label="Visaworx home">
              <Logo className="h-auto w-44 sm:w-52" />
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
              className="rounded-full p-3 text-[#0b3478] lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label="Toggle navigation"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>

          {open && (
            <nav className="border-t border-slate-100 py-5 lg:hidden" aria-label="Mobile navigation">
              <div className="flex flex-col gap-4">
                {navigation.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="font-semibold text-slate-700"
                  >
                    {label}
                  </Link>
                ))}
                <ButtonLink href={site.consultationUrl}>Speak to an Expert</ButtonLink>
              </div>
            </nav>
          )}
        </Container>
      </header>
    </>
  );
}
