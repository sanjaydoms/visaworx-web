import { CheckCircle2 } from "lucide-react";
import type { ContentBlock } from "../content/guides";
import { GuideCallout } from "./GuideCallout";

export function GuideContentRenderer({ content }: { content: ContentBlock[] }) {
  let headingCounter = 0;

  return (
    <div className="space-y-6">
      {content.map((block, idx) => {
        if (block.type === "heading") {
          const currentId = `heading-${headingCounter++}`;
          if (block.level === 2) {
            return (
              <h2 id={currentId} key={idx} className="pt-4 text-2xl font-black text-[#071f4a] sm:text-3xl">
                {block.text}
              </h2>
            );
          }
          return (
            <h3 id={currentId} key={idx} className="pt-2 text-xl font-bold text-[#071f4a]">
              {block.text}
            </h3>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={idx} className="text-base leading-8 text-slate-700">
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={idx} className="space-y-2.5 pt-1">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#e6282f] mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "callout") {
          return <GuideCallout key={idx} tone={block.tone} title={block.title} text={block.text} />;
        }

        return null;
      })}
    </div>
  );
}
