"use client";

import { Container } from "../../common/components/Container";
import { AssistantMessage } from "./components/AssistantMessage";
import { AssistantInput } from "./components/AssistantInput";
import { SuggestedQuestions } from "./components/SuggestedQuestions";
import { AssistantDisclaimer } from "./components/AssistantDisclaimer";
import { useAssistant } from "./hooks/useAssistant";
import { Bot, RotateCcw } from "lucide-react";

export function AssistantPage() {
  const { messages, isLoading, sendMessage, clearMessages } = useAssistant({ pageType: "assistant" });

  return (
    <div className="py-8 sm:py-14">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#071f4a] text-[#ff7377] shadow-sm">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">
                  AI Visa Intelligence
                </p>
                <h1 className="text-2xl font-black text-[#071f4a] sm:text-3xl">
                  Visa Intelligence Assistant
                </h1>
              </div>
            </div>

            <button
              type="button"
              onClick={clearMessages}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
            >
              <RotateCcw className="h-4 w-4" /> Start Over
            </button>
          </div>

          <div className="min-h-[420px] rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm space-y-4">
            {messages.map((msg) => (
              <AssistantMessage key={msg.id} message={msg} />
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white p-3 rounded-2xl w-max border border-slate-200">
                <span className="h-2 w-2 rounded-full bg-[#071f4a] animate-ping" />
                Analyzing approved Visaworx intelligence...
              </div>
            )}
          </div>

          {messages.length <= 2 && (
            <SuggestedQuestions context={{ pageType: "assistant" }} onSelect={(q) => sendMessage(q)} />
          )}

          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <AssistantDisclaimer />
            <AssistantInput onSend={sendMessage} disabled={isLoading} />
          </div>
        </div>
      </Container>
    </div>
  );
}
