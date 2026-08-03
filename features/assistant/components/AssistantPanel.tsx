"use client";

import { useRef, useEffect } from "react";
import { AssistantHeader } from "./AssistantHeader";
import { AssistantMessage } from "./AssistantMessage";
import { AssistantInput } from "./AssistantInput";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { AssistantDisclaimer } from "./AssistantDisclaimer";
import { TypingIndicator } from "./TypingIndicator";
import { useAssistant } from "../hooks/useAssistant";
import type { AssistantPageContext } from "../../../common/ai/types/assistant";

export function AssistantPanel({
  isOpen,
  onClose,
  context,
}: {
  isOpen: boolean;
  onClose: () => void;
  context?: AssistantPageContext;
}) {
  const { messages, isLoading, sendMessage, clearMessages } = useAssistant(context);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Visaworx AI Assistant Panel"
      className="fixed bottom-0 right-0 z-50 flex h-[85vh] max-h-[640px] w-full flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-slate-100 shadow-2xl sm:bottom-6 sm:right-6 sm:h-[600px] sm:w-[420px] sm:rounded-3xl"
    >
      <AssistantHeader onClose={onClose} onReset={clearMessages} />

      {/* Message List Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <AssistantMessage key={msg.id} message={msg} />
        ))}

        {isLoading && <TypingIndicator />}
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <SuggestedQuestions context={context} onSelect={(q) => sendMessage(q, context)} />
      )}

      <AssistantDisclaimer />
      <AssistantInput onSend={(txt) => sendMessage(txt, context)} disabled={isLoading} />
    </div>
  );
}
