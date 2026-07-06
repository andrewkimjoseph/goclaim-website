import type { ReactNode } from "react";

export function StatsChartCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`card ${className ?? ""}`}>
      <h2 className="font-display font-bold text-lg">{title}</h2>
      {description ? <p className="mt-1 text-sm font-sans text-black/70">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </article>
  );
}
