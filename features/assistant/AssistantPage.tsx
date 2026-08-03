"use client";

import { Container } from "../../common/components/Container";
import { AssistantMessage } from "./components/AssistantMessage";
import { AssistantInput } from "./components/AssistantInput";
import { SuggestedQuestions } from "./components/SuggestedQuestions";
import { AssistantDisclaimer } from "./components/AssistantDisclaimer";
import { TypingIndicator } from "./components/TypingIndicator";
import { StartOverButton } from "./components/StartOverButton";
import { useAssistant } from "./hooks/useAssistant";
import { Bot } from "lucide-react";

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

            <StartOverButton onClick={clearMessages} />
          </div>

          <div className="min-h-[420px] rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm space-y-4">
            {messages.map((msg) => (
              <AssistantMessage key={msg.id} message={msg} />
            ))}

            {isLoading && <TypingIndicator />}
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
