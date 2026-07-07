import type { ReactNode } from "react";
import { Header, type HeaderNav } from "./Header";

export function Shell({ nav, children }: { nav: HeaderNav; children: ReactNode }) {
  return (
    <div className="app-shell font-sans">
      <Header nav={nav} />
      <main className="flex-1 py-8">{children}</main>
    </div>
  );
}