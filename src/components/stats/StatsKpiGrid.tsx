import type { GoClaimStats } from "@/lib/subgraph/types";
import { formatGdWeiWhole } from "@/lib/formatGd";

export function StatsKpiGrid({ stats }: { stats: GoClaimStats }) {
  const items = [
    {
      label: "GoClaim accounts",
      value: stats.accountsCreated.toLocaleString("en-US"),
    },
    {
      label: "Total claimed",
      value: `G$ ${formatGdWeiWhole(stats.totalClaimedWei)}`,
    },
    {
      label: "Successful claims",
      value: stats.successfulClaims.toLocaleString("en-US"),
    },
    {
      label: "Total transactions",
      value: stats.totalTransactions.toLocaleString("en-US"),
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <article key={item.label} className="card">
          <p className="text-xs font-sans uppercase tracking-wide text-black/60">{item.label}</p>
          <p className="mt-2 font-display font-extrabold text-2xl">{item.value}</p>
        </article>
      ))}
    </div>
  );
}
