import type { AssistantMessage as AssistantMessageType } from "../../../common/ai/types/assistant";
import { AssistantError } from "./AssistantError";
import { EscalationCard } from "./EscalationCard";
import { LimitationNotice } from "./LimitationNotice";
import { NextStepCard } from "./NextStepCard";
import { SourceList } from "./SourceList";

export function AssistantMessage({ message }: { message: AssistantMessageType }) {
  if (message.isError) {
    return <AssistantError text={message.text} timestamp={message.timestamp} />;
  }

  if (message.sender === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl bg-[#071f4a] p-3.5 text-xs leading-5 text-white shadow-sm">
          <p>{message.text}</p>
          {message.timestamp && (
            <span className="mt-1 block text-[10px] text-white/60 text-right">
              {message.timestamp}
            </span>
          )}
        </div>
      </div>
    );
  }

  const data = message.data;

  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-700 shadow-sm">
        <p className="font-semibold text-[#071f4a]">{message.text}</p>

        {data?.explanation && (
          <p className="text-slate-600 border-l-2 border-[#071f4a]/20 pl-2.5">{data.explanation}</p>
        )}

        {data?.sources && <SourceList sources={data.sources} />}

        {data?.limitation && <LimitationNotice limitation={data.limitation} />}

        {data?.escalation?.required && <EscalationCard reason={data.escalation.reason} />}

        {data?.nextSteps && data.nextSteps.length > 0 && (
          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
            {data.nextSteps.map((nextStep, index) => (
              <NextStepCard key={index} nextStep={nextStep} />
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
