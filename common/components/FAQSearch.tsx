import { Search, X } from "lucide-react";

export function FAQSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="relative w-full max-w-xl">
      <label htmlFor="faq-search-input" className="sr-only">
        Search FAQ questions and answers
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
        <Search className="h-5 w-5" />
      </div>
      <input
        id="faq-search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search questions (e.g. bank statement, refusal, interview)..."
        className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-11 pr-11 text-sm font-medium text-[#071f4a] placeholder-slate-400 shadow-sm transition focus:border-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear FAQ search"
          className="absolute inset-y-0 right-0 flex min-h-[48px] min-w-[48px] items-center justify-center p-3 text-slate-400 hover:text-[#071f4a] focus:outline-none focus:ring-2 focus:ring-[#071f4a]"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
