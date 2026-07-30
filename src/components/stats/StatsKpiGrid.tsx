import type { GoClaimStats } from "@/lib/subgraph/types";
import { formatGdWeiWhole } from "@/lib/formatGd";
import { formatUsdmDisplay } from "@/lib/formatUsdm";
import { GdUsdmHoverFigure } from "@/components/stats/GdUsdmHoverFigure";

type KpiItem =
  | {
      label: string;
      kind: "text";
      value: string;
    }
  | {
      label: string;
      kind: "gd-usdm";
      gdAmount: string;
      usdmAmount: string | null;
      fallbackValue: string;
    };

export function StatsKpiGrid({ stats }: { stats: GoClaimStats }) {
  const totalClaimedUsdm = formatUsdmDisplay(stats.totalClaimedUsdm);
  const claimedTodayUsdm = formatUsdmDisplay(stats.claimedTodayUsdm);

  const items: KpiItem[] = [
    {
      label: "Accounts",
      kind: "text",
      value: stats.accountsCreated.toLocaleString("en-US"),
    },
    {
      label: "Total claimed",
      kind: "gd-usdm",
      gdAmount: formatGdWeiWhole(stats.totalClaimedWei),
      usdmAmount: totalClaimedUsdm,
      fallbackValue: formatGdWeiWhole(stats.totalClaimedWei),
    },
    {
      label: "Total claims",
      kind: "text",
      value: stats.successfulClaims.toLocaleString("en-US"),
    },
    {
      label: "Claims today",
      kind: "text",
      value: (stats.claimsToday ?? 0).toLocaleString("en-US"),
    },
    {
      label: "Claimed today",
      kind: "gd-usdm",
      gdAmount: formatGdWeiWhole(stats.claimedTodayWei ?? "0"),
      usdmAmount: claimedTodayUsdm,
      fallbackValue: formatGdWeiWhole(stats.claimedTodayWei ?? "0"),
    },
    {
      label: "Total txns",
      kind: "text",
      value: stats.totalTransactions.toLocaleString("en-US"),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-6">
      {items.map((item) => (
        <article key={item.label} className="card p-3 sm:p-4">
          <p className="text-[10px] font-sans uppercase leading-tight tracking-wide text-black/60 sm:text-xs">
            {item.label}
          </p>
          <p className="mt-1 font-display text-base font-extrabold leading-none sm:mt-2 sm:text-lg">
            {item.kind === "gd-usdm" && item.usdmAmount != null ? (
              <GdUsdmHoverFigure
                gdAmount={item.gdAmount}
                usdmAmount={item.usdmAmount}
                currencyClassName="decoration-black/25"
              />
            ) : item.kind === "gd-usdm" ? (
              item.fallbackValue
            ) : (
              item.value
            )}
          </p>
        </article>
      ))}
    </div>
  );
}
