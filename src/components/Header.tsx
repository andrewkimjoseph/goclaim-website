import { Link } from "@tanstack/react-router";

export type HeaderNav = "home" | "inner";

export function Header({ nav }: { nav: HeaderNav }) {
  return (
    <header className="header-bar">
      <Link to="/" aria-label="GoClaim home" className="inline-flex items-center">
        <img src="/brand/watermelon.png" alt="GoClaim" width={48} height={48} className="h-12 w-12" />
      </Link>
      <nav className="flex items-center gap-2">
        {nav === "home" ? (
          <>
            <Link to="/faqs" className="section-label-inverse">FAQs</Link>
            <Link to="/about" className="section-label-inverse">About</Link>
          </>
        ) : (
          <Link to="/" className="section-label-inverse">Home</Link>
        )}
      </nav>
    </header>
  );
}