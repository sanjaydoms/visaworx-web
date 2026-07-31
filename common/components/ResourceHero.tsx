import { BookOpen } from "lucide-react";

export function ResourceHero({
  eyebrow = "Visa Intelligence Centre",
  title = "Clear guidance before important visa decisions.",
  description = "Explore trusted visa guides, preparation insights, document explanations, interview guidance and refusal-awareness resources.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-[#e6282f]" />
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f] sm:text-sm">
          {eyebrow}
        </p>
      </div>
      <h1 className="text-4xl font-black tracking-tight text-[#071f4a] sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="text-lg leading-8 text-slate-600 sm:text-xl">
        {description}
      </p>
    </div>
  );
}
