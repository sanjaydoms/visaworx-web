import Link from "next/link";
import type { NextStepItem } from "../../../common/ai/types/assistant";

/**
 * A single suggested next action. Consultation steps carry the red accent so
 * the route to a human is always the most visually prominent option.
 */
export function NextStepCard({ nextStep }: { nextStep: NextStepItem }) {
  return (
    <Link
      href={nextStep.href}
      className={`inline-flex items-center rounded-xl px-3 py-1.5 text-[11px] font-bold transition ${
        nextStep.type === "consultation"
          ? "bg-[#c92027] text-white hover:bg-[#a81a20]"
          : "bg-[#071f4a] text-white hover:bg-[#0b3478]"
      }`}
    >
      {nextStep.label}
    </Link>
  );
}
