import type { GoClaimStats } from "@/lib/subgraph/types";
import { formatGdWeiWhole } from "@/lib/formatGd";
import { formatUsdmWhole } from "@/lib/formatUsdm";

type KpiItem = {
  label: string;
  value: string;
  usdm?: string | null;
};

export function StatsKpiGrid({ stats }: { stats: GoClaimStats }) {
  const items: KpiItem[] = [
    {
      label: "Accounts",
      value: stats.accountsCreated.toLocaleString("en-US"),
    },
    {
      label: "G$ total claimed",
      value: formatGdWeiWhole(stats.totalClaimedWei),
      usdm: formatUsdmWhole(stats.totalClaimedUsdm),
    },
    {
      label: "Total claims",
      value: stats.successfulClaims.toLocaleString("en-US"),
    },
    {
      label: "Claims today",
      value: (stats.claimsToday ?? 0).toLocaleString("en-US"),
    },
    {
      label: "G$ claimed today",
      value: formatGdWeiWhole(stats.claimedTodayWei ?? "0"),
      usdm: formatUsdmWhole(stats.claimedTodayUsdm),
    },
    {
      label: "Total txns",
      value: stats.totalTransactions.toLocaleString("en-US"),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-6">
      {items.map((item) => (
        <article key={item.label} className="card p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[10px] font-sans uppercase leading-tight tracking-wide text-black/60 sm:text-xs">
              {item.label}
            </p>
            {item.usdm != null ? (
              <p className="shrink-0 text-[10px] font-sans leading-tight text-black/45 sm:text-xs">
                / {item.usdm} USDm
              </p>
            ) : null}
          </div>
          <p className="mt-1 font-display text-base font-extrabold leading-none sm:mt-2 sm:text-lg">
            {item.value}
          </p>
        </article>
      ))}
    </div>
  );
}
