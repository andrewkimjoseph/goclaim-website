export function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="card group">
      <summary className="flex items-center justify-between gap-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="font-display font-bold text-base leading-snug">{q}</span>
        <span className="faq-toggle group-open:bg-[#F83028] group-open:text-white">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      <div className="mt-4 border-t-2 border-black pt-4 text-sm font-sans text-black/85">{a}</div>
    </details>
  );
}