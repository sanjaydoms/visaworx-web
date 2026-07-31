const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function GlossaryIndex({
  selectedLetter,
  onSelectLetter,
}: {
  selectedLetter: string;
  onSelectLetter: (letter: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Alphabetical Index">
      <button
        type="button"
        onClick={() => onSelectLetter("All")}
        className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl px-3 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-[#071f4a] ${
          selectedLetter === "All"
            ? "bg-[#071f4a] text-white"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
      >
        All
      </button>
      {alphabet.map((letter) => {
        const active = selectedLetter === letter;
        return (
          <button
            key={letter}
            type="button"
            onClick={() => onSelectLetter(letter)}
            className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-[#071f4a] ${
              active
                ? "bg-[#071f4a] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
