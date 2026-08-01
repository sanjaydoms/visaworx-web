"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bot } from "lucide-react";
import { AssistantPanel } from "./AssistantPanel";
import { routes } from "../../../common/config/routes";
import type { AssistantPageContext } from "../../../common/ai/types/assistant";

export function AssistantLauncher({ context }: { context?: AssistantPageContext }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // On the dedicated assistant route the floating launcher is redundant, and
  // it sat directly on top of the assistant's own message input.
  if (pathname === routes.assistant) return null;

  return (
    <>
      <div
        className="fixed right-5 z-40"
        style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <button
          type="button"
          data-assistant-launcher="true"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close Visaworx AI Assistant" : "Open Visaworx AI Assistant"}
          aria-expanded={isOpen}
          className="flex min-h-[56px] min-w-[56px] items-center justify-center gap-2.5 rounded-full bg-[#071f4a] px-5 py-3.5 text-xs font-extrabold text-white shadow-2xl transition hover:bg-[#0b3478] focus:outline-none focus:ring-4 focus:ring-[#071f4a]/30"
        >
          <Bot className="h-5 w-5 text-[#ff7377]" />
          <span className="hidden sm:inline">AI Visa Assistant</span>
        </button>
      </div>

      <AssistantPanel isOpen={isOpen} onClose={() => setIsOpen(false)} context={context} />
    </>
  );
}
