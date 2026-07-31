import type { AssistantPageContext } from "../../../common/ai/types/assistant";

export function SuggestedQuestions({
  context,
  onSelect,
}: {
  context?: AssistantPageContext;
  onSelect: (q: string) => void;
}) {
  let questions: string[] = [
    "Which visa service should I explore?",
    "What does Visa Readiness mean?",
    "How can Visaworx help before I apply?",
    "When should I speak to an expert?",
  ];

  if (context?.pageType === "country") {
    questions = [
      "What visa purposes are commonly available?",
      "What should I prepare before applying?",
      "What common mistakes should I avoid?",
      "Should I complete a readiness review?",
    ];
  } else if (context?.pageType === "service") {
    questions = [
      "Who is this service for?",
      "What is included in this service?",
      "What should I prepare?",
      "When is expert review recommended?",
    ];
  } else if (context?.pageType === "readiness") {
    questions = [
      "What does my readiness band mean?",
      "Which area should I improve first?",
      "Which service is relevant for me?",
      "Should I speak to an expert?",
    ];
  } else if (context?.pageType === "guide") {
    questions = [
      "Summarize this guide",
      "Which country pages are related?",
      "Which service is relevant?",
      "What should I do next?",
    ];
  }

  return (
    <div className="space-y-2 p-4">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Suggested Questions</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(q)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#071f4a] shadow-xs transition hover:border-[#071f4a]/30 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
