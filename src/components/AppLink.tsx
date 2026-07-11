import type { ReactNode } from "react";
import { APP_URL, OPEN_GOCLAIM_LABEL } from "@/lib/copy";

export function AppLink({
  className = "btn-hero-primary",
  children = OPEN_GOCLAIM_LABEL,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
