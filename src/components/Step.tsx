export function Step({ n, title, description }: { n: number; title: string; description: string }) {
  return (
    <div className="card flex items-start gap-3">
      <span className="step-badge">{n}</span>
      <div>
        <h3 className="font-display font-bold text-base leading-tight">{title}</h3>
        <p className="mt-1 text-sm text-black/80 font-sans">{description}</p>
      </div>
    </div>
  );
}