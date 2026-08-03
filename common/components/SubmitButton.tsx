export function SubmitButton({
  onClick,
  isSubmitting,
  label,
  submittingLabel = "Submitting...",
}: {
  onClick: () => void;
  isSubmitting: boolean;
  label: string;
  submittingLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isSubmitting}
      className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#c92027] px-8 py-3 text-xs font-bold text-white hover:bg-[#a81a20] focus:outline-none focus:ring-2 focus:ring-[#e6282f] disabled:opacity-50"
    >
      {isSubmitting ? submittingLabel : label}
    </button>
  );
}
