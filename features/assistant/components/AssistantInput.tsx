"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function AssistantInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative p-3 bg-white border-t border-slate-200">
      <label htmlFor="assistant-user-input" className="sr-only">
        Ask Visaworx AI Assistant a question
      </label>
      <input
        id="assistant-user-input"
        type="text"
        value={text}
        maxLength={500}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask a visa question (e.g. bank statements, B1/B2, readiness)..."
        disabled={disabled}
        className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-4 pr-12 text-xs font-medium text-[#071f4a] placeholder-slate-400 focus:border-[#071f4a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#071f4a] disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        aria-label="Send message"
        className="absolute inset-y-0 right-3 flex min-h-[44px] min-w-[44px] items-center justify-center text-[#071f4a] transition hover:text-[#0b3478] disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-[#071f4a] rounded-xl"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
