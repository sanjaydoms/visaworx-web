import { ArrowRight } from "lucide-react";

export function ContinueButton({
  onClick,
  children = "Continue",
  disabled = false,
}: {
  onClick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#071f4a] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#0b3478] focus:outline-none focus:ring-2 focus:ring-[#071f4a] focus:ring-offset-2 disabled:opacity-50"
    >
      {children} <ArrowRight className="h-4 w-4" />
    </button>
  );
}
