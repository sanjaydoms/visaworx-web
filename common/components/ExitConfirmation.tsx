import { AlertTriangle, X } from "lucide-react";

type ExitConfirmationProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ExitConfirmation({
  isOpen,
  onConfirm,
  onCancel,
}: ExitConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-confirmation-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-6 w-6" />
            <h3 id="exit-confirmation-title" className="text-lg font-bold text-[#071f4a]">
              Restart Assessment?
            </h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close dialog"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm leading-6 text-slate-600">
          Restarting will clear your current answers and return you to Step 1. Are you sure you want to proceed?
        </p>

        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#c92027] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#a81a20] focus:outline-none focus:ring-2 focus:ring-[#e6282f]"
          >
            Yes, Restart
          </button>
        </div>
      </div>
    </div>
  );
}
