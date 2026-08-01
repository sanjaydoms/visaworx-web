import Link from "next/link";
import { ExternalLink, ShieldAlert, UserCheck } from "lucide-react";
import type { AssistantMessage as AssistantMessageType } from "../../../common/ai/types/assistant";

export function AssistantMessage({ message }: { message: AssistantMessageType }) {
  const isUser = message.sender === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl bg-[#071f4a] p-3.5 text-xs leading-5 text-white shadow-sm">
          <p>{message.text}</p>
          {message.timestamp && (
            <span className="mt-1 block text-[10px] text-white/60 text-right">{message.timestamp}</span>
          )}
        </div>
      </div>
    );
  }

  const data = message.data;

  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-700 shadow-sm">
        {/* Main Answer */}
        <p className="font-semibold text-[#071f4a]">{message.text}</p>

        {/* Explanation */}
        {data?.explanation && (
          <p className="text-slate-600 border-l-2 border-[#071f4a]/20 pl-2.5">{data.explanation}</p>
        )}

        {/* Sources */}
        {data?.sources && data.sources.length > 0 && (
          <div className="space-y-1.5 pt-1 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Approved Sources:</span>
            <div className="flex flex-wrap gap-1.5">
              {data.sources.map((src, idx) => (
                <Link
                  key={idx}
                  href={src.href}
                  className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-bold text-[#071f4a] hover:bg-slate-200"
                >
                  {src.label} <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Limitation Notice */}
        {data?.limitation && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg">
            <ShieldAlert className="h-3.5 w-3.5 text-[#071f4a] shrink-0" />
            <span>{data.limitation}</span>
          </div>
        )}

        {/* Escalation Card */}
        {data?.escalation?.required && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-2 text-amber-950">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <UserCheck className="h-4 w-4 text-[#e6282f]" /> Human Expert Consultation Recommended
            </div>
            <p className="text-[11px] leading-4">
              {data.escalation.reason || "This situation requires personal evaluation by a Visaworx expert."}
            </p>
          </div>
        )}

        {/* Next Steps */}
        {data?.nextSteps && data.nextSteps.length > 0 && (
          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
            {data.nextSteps.map((ns, idx) => (
              <Link
                key={idx}
                href={ns.href}
                className={`inline-flex items-center rounded-xl px-3 py-1.5 text-[11px] font-bold transition ${
                  ns.type === "consultation"
                    ? "bg-[#c92027] text-white hover:bg-[#a81a20]"
                    : "bg-[#071f4a] text-white hover:bg-[#0b3478]"
                }`}
              >
                {ns.label}
              </Link>
            ))}
          </div>
        )}

        {message.timestamp && (
          <span className="block text-[10px] text-slate-500">{message.timestamp}</span>
        )}
      </div>
    </div>
  );
}
