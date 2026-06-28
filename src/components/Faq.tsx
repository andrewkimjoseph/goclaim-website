import { useId } from "react";

export function Faq({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const buttonId = useId();
  const panelId = useId();

  return (
    <div className="card transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none">
      <button
        type="button"
        id={buttonId}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-3 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      >
        <span className="font-display font-bold text-base leading-snug min-w-0">{q}</span>
        <span
          aria-hidden
          className={`inline-flex h-7 w-7 shrink-0 items-center justify-center border-2 border-black rounded-brutal font-display font-bold text-lg leading-none shadow-[2px_2px_0_0_#000000] transition-colors duration-200 ${
            open ? "bg-[#F83028] text-white" : "bg-white text-foreground"
          }`}
        >
          <span className={open ? "hidden" : "block"}>+</span>
          <span className={open ? "block -mt-0.5" : "hidden"}>−</span>
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-sm font-sans text-black/85 mt-3 pt-3 border-t-2 border-black leading-relaxed">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}
