"use client";

import { useCallback, useState } from "react";
import type { AssistantMessage, AssistantPageContext, AssistantResponse } from "../../../common/ai/types/assistant";

/**
 * The welcome message carries no timestamp on purpose. Computing one at module
 * scope evaluates on both server and client, and the two clocks/timezones
 * disagree — that produced a hydration mismatch (React #418) on every render
 * of the assistant. A greeting does not need a time anyway.
 */
const INITIAL_WELCOME: AssistantMessage = {
  id: "msg_welcome",
  sender: "assistant",
  text: "Hello! I am the Visaworx AI Assistant. I can help answer questions about visa categories, document preparation, and readiness, using approved Visaworx resources.",
  timestamp: "",
  data: {
    answer: "Hello! I am the Visaworx AI Assistant. I can help answer questions about visa categories, document preparation, and readiness, using approved Visaworx resources.",
    sources: [],
    nextSteps: [],
  },
};

export function useAssistant(initialContext?: AssistantPageContext) {
  const [messages, setMessages] = useState<AssistantMessage[]>([INITIAL_WELCOME]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (text: string, contextOverride?: AssistantPageContext) => {
      if (!text.trim() || isLoading) return;

      const userMsg: AssistantMessage = {
        id: `msg_user_${Date.now()}`,
        sender: "user",
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            context: contextOverride || initialContext,
          }),
        });

        const json = await res.json();

        if (res.ok && json.success && json.data) {
          const aiData: AssistantResponse = json.data;
          const aiMsg: AssistantMessage = {
            id: `msg_ai_${Date.now()}`,
            sender: "assistant",
            text: aiData.answer,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            data: aiData,
          };
          setMessages((prev) => [...prev, aiMsg]);
        } else {
          const errText = json.error || "The assistant is temporarily unavailable.";
          setMessages((prev) => [
            ...prev,
            {
              id: `msg_err_${Date.now()}`,
              sender: "assistant",
              text: errText,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              isError: true,
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg_err_${Date.now()}`,
            sender: "assistant",
            text: "The response is taking longer than expected. Please check your connection and try again.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isError: true,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, initialContext]
  );

  const clearMessages = useCallback(() => {
    setMessages([INITIAL_WELCOME]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}
