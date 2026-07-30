import { useState } from "react";
import { cn } from "@/lib/utils";

type GdUsdmHoverFigureProps = {
  gdAmount: string;
  usdmAmount: string;
  className?: string;
  currencyClassName?: string;
};

export function GdUsdmHoverFigure({
  gdAmount,
  usdmAmount,
  className,
  currencyClassName,
}: GdUsdmHoverFigureProps) {
  const [showUsdm, setShowUsdm] = useState(false);
  const toggle = () => setShowUsdm((value) => !value);

  return (
    <span
      className={cn("inline-flex items-baseline whitespace-nowrap", className)}
      onMouseLeave={() => setShowUsdm(false)}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-label={`${gdAmount} GoodDollar, about ${usdmAmount} USDm`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
    >
      <span
        onMouseEnter={() => setShowUsdm(true)}
        className={cn(
          "cursor-default underline decoration-dotted underline-offset-2",
          currencyClassName,
        )}
      >
        {showUsdm ? "USDm" : "G$"}
      </span>
      <span className="ml-1 tabular-nums">{showUsdm ? usdmAmount : gdAmount}</span>
    </span>
  );
}
