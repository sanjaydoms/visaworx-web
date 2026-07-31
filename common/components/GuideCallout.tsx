import { AlertTriangle, Info, UserCheck } from "lucide-react";

export function GuideCallout({
  tone,
  title,
  text,
}: {
  tone: "info" | "warning" | "expert";
  title: string;
  text: string;
}) {
  const styles =
    tone === "warning"
      ? "bg-amber-50 border-amber-200 text-amber-950"
      : tone === "expert"
      ? "bg-[#071f4a]/5 border-[#071f4a]/20 text-[#071f4a]"
      : "bg-blue-50 border-blue-200 text-blue-950";

  const Icon = tone === "warning" ? AlertTriangle : tone === "expert" ? UserCheck : Info;

  return (
    <div className={`rounded-2xl border p-5 space-y-2 ${styles}`}>
      <div className="flex items-center gap-2 font-bold text-sm">
        <Icon className="h-4 w-4 shrink-0" />
        <span>{title}</span>
      </div>
      <p className="text-xs leading-6 opacity-90">{text}</p>
    </div>
  );
}
