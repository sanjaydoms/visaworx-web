export function ServiceProcess({
  process,
}: {
  process: Array<{ title: string; description: string }>;
}) {
  return (
    <section aria-labelledby="service-process-heading" className="space-y-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Structured Process</p>
        <h2 id="service-process-heading" className="mt-2 text-2xl font-extrabold text-[#071f4a] sm:text-3xl">
          Typical Advisory Steps
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step, idx) => (
          <div key={idx} className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#071f4a] text-xs font-bold text-white">
                0{idx + 1}
              </div>
              <h3 className="mt-4 font-extrabold text-[#071f4a]">{step.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
