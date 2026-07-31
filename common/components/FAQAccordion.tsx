import type { FAQItem } from "../content/faqs";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((faq) => (
        <details
          key={faq.id}
          id={faq.id}
          className="group rounded-2xl border border-slate-200 bg-white p-5 transition focus-within:ring-2 focus-within:ring-[#071f4a]"
        >
          <summary className="cursor-pointer font-bold text-[#071f4a] outline-none flex items-center justify-between">
            <span className="text-base sm:text-lg">{faq.question}</span>
            <span className="ml-2 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
              {faq.category}
            </span>
          </summary>
          <p className="mt-3 text-sm leading-7 text-slate-600 border-t border-slate-100 pt-3">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
