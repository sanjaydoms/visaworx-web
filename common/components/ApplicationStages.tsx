export function ApplicationStages({
  stages,
}: {
  stages: Array<{ title: string; description: string }>;
}) {
  return (
    <section aria-labelledby="application-stages-heading" className="space-y-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#e6282f]">Process Journey</p>
        <h2 id="application-stages-heading" className="mt-2 text-2xl font-extrabold text-[#071f4a] sm:text-3xl">
          Typical Application Stages
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          General sequence of steps involved in preparing and lodging your visa application.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, idx) => (
          <div key={idx} className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#071f4a] text-xs font-bold text-white">
                0{idx + 1}
              </div>
              <h3 className="mt-4 font-extrabold text-[#071f4a]">{stage.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">{stage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
