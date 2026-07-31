import { faqsData } from "../content/faqs";

export function RelatedFAQs({ faqIds }: { faqIds: string[] }) {
  const matched = faqsData.filter((f) => faqIds.includes(f.id));

  if (matched.length === 0) return null;

  return (
    <section aria-labelledby="related-faqs-heading" className="space-y-4">
      <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Popular Questions</p>
      <h2 id="related-faqs-heading" className="text-2xl font-extrabold text-[#071f4a] sm:text-3xl">
        Related Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {matched.map((faq) => (
          <details key={faq.id} className="group rounded-2xl border border-slate-200 bg-white p-5 transition focus-within:ring-2 focus-within:ring-[#071f4a]">
            <summary className="cursor-pointer font-bold text-[#071f4a] outline-none flex items-center justify-between">
              <span>{faq.question}</span>
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-600 border-t border-slate-100 pt-3">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
