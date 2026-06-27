import { useId, useState } from "react";
import { Plus, Minus } from "lucide-react";

export function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="card transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-3 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F83028] focus-visible:outline-offset-2"
      >
        <span className="font-display font-bold text-base leading-snug">{q}</span>
        <span
          className={`faq-toggle shrink-0 ${open ? "bg-[#F83028] text-white" : ""}`}
          aria-hidden="true"
        >
          {open ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        className="grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-4 border-t-2 border-black pt-4 text-sm font-sans text-black/85">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}