"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Container } from "../common/components/Container";
import { ButtonLink } from "../common/components/ButtonLink";
import { routes } from "../common/config/routes";
import { site } from "../common/config/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Visaworx Error Boundary]", error);
  }, [error]);

  return (
    <div className="py-16 sm:py-24 text-center space-y-8">
      <Container>
        <div className="mx-auto max-w-xl space-y-6 rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e6282f] text-white shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">
                Unexpected System Error
              </p>
              <h1 className="text-xl font-bold text-[#071f4a]">
                An unexpected error occurred.
              </h1>
            </div>
          </div>

          <p className="text-sm leading-6 text-slate-700">
            We encountered a temporary technical issue while rendering this page. Your progress has been safely preserved where applicable.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#071f4a] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#0b3478] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
            >
              <RefreshCw className="h-4 w-4" /> Try Again
            </button>

            <ButtonLink href={routes.home} variant="secondary">
              <Home className="mr-2 h-4 w-4" /> Return Home
            </ButtonLink>
          </div>

          <p className="text-xs text-slate-500 pt-2">
            If this issue persists, please contact{" "}
            <a href={`mailto:${site.supportEmail}`} className="font-semibold text-[#071f4a] underline">
              {site.supportEmail}
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
