import { ShieldCheck } from "lucide-react";
import { readinessContent } from "../content/readiness";

export function ReadinessHero() {
  const { eyebrow, title, description } = readinessContent.hero;

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-[#e6282f]" />
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f] sm:text-sm">
          {eyebrow}
        </p>
      </div>
      <h1 className="text-3xl font-black tracking-tight text-[#071f4a] sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="text-base leading-7 text-slate-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
}
