type StepProps = {
  n: number;
  title: string;
  description: string;
  variant?: "card" | "inline";
};

export function Step({ n, title, description, variant = "card" }: StepProps) {
  if (variant === "inline") {
    return (
      <div className="surface-inline">
        <span className="step-badge">{n}</span>
        <div>
          <h3 className="font-display font-bold text-base leading-tight text-white">{title}</h3>
          <p className="mt-1 text-sm text-white/80 font-sans">{description}</p>
        </div>
      </div>
    );
  }

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
