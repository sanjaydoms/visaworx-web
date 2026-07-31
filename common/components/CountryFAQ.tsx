export function CountryFAQ({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  return (
    <section aria-labelledby="country-faq-heading" className="space-y-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Clear Answers</p>
        <h2 id="country-faq-heading" className="mt-2 text-2xl font-extrabold text-[#071f4a] sm:text-3xl">
          Destination FAQs
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group rounded-2xl border border-slate-200 bg-white p-5 transition focus-within:ring-2 focus-within:ring-[#071f4a]">
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
