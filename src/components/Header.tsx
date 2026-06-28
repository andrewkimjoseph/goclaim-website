import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/BrandLogo";

export type HeaderNav = "home" | "inner";

export function Header({ nav }: { nav: HeaderNav }) {
  return (
    <header className="header-bar" style={{ viewTransitionName: "site-header" }}>
      <Link to="/" aria-label="GoClaim home" className="inline-flex items-center">
        <BrandLogo size="nav" />
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