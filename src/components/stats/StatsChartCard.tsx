import type { ReactNode } from "react";

export function StatsChartCard({
  title,
  description,
  headerAside,
  children,
  className,
}: {
  title: string;
  description?: string;
  headerAside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`card ${className ?? ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display font-bold text-lg">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm font-sans text-black/70">{description}</p>
          ) : null}
        </div>
        {headerAside ? <div className="shrink-0">{headerAside}</div> : null}
      </div>
      <div className="mt-4">{children}</div>
    </article>
  );
}
