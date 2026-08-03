export function StepHeading({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-2xl font-black text-[#071f4a]">{title}</h2>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}
