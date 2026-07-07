import type { GoClaimStats } from "@/lib/subgraph/types";
import { formatGdWeiWhole } from "@/lib/formatGd";

export function StatsKpiGrid({ stats }: { stats: GoClaimStats }) {
  const items = [
    {
      label: "Accounts",
      value: stats.accountsCreated.toLocaleString("en-US"),
    },
    {
      label: "Total claimed",
      value: `G$ ${formatGdWeiWhole(stats.totalClaimedWei)}`,
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
      value: `G$ ${formatGdWeiWhole(stats.claimedTodayWei ?? "0")}`,
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
          <p className="text-[10px] font-sans uppercase leading-tight tracking-wide text-black/60 sm:text-xs">
            {item.label}
          </p>
          <p className="mt-1 font-display text-lg font-extrabold leading-none sm:mt-2 sm:text-2xl">
            {item.value}
          </p>
        </article>
      ))}
    </div>
  );
}
