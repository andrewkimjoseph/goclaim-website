import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useIsRestoring } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { Shell } from "@/components/Shell";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useMinDuration } from "@/hooks/use-min-duration";
import { DailyClaimsChart } from "@/components/stats/DailyClaimsChart";
import { DailyGrowthChart } from "@/components/stats/DailyGrowthChart";
import { DailyTransactionsChart } from "@/components/stats/DailyTransactionsChart";
import { DailyVolumeChart } from "@/components/stats/DailyVolumeChart";
import { StatsKpiGrid } from "@/components/stats/StatsKpiGrid";
import { fetchGoClaimStats } from "@/lib/fetchGoClaimStats";

const GOCLAIM_PROXY_ADDRESS = "0x3cf4b49daca649419df30ae1d2dc99f0cb518a50";

function formatStatsSinceNote(statsSinceDay: string | null): string {
  if (!statsSinceDay) {
    return "The contract was deployed today. Stats reflect on-chain activity since deployment.";
  }

  const todayKey = new Date().toISOString().slice(0, 10);
  const launchDate = new Date(`${statsSinceDay}T00:00:00.000Z`);
  const launchLabel =
    statsSinceDay === todayKey
      ? "today"
      : launchDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

  return `The contract was deployed ${launchLabel}. Stats reflect on-chain activity since deployment.`;
}

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Stats | GoClaim" },
      {
        name: "description",
        content: "On-chain GoClaim progress: accounts, links, and GoodDollar claimed.",
      },
      { property: "og:title", content: "Stats | GoClaim" },
      {
        property: "og:description",
        content: "On-chain GoClaim progress: accounts, links, and GoodDollar claimed.",
      },
      { property: "og:url", content: "/stats" },
    ],
    links: [{ rel: "canonical", href: "/stats" }],
  }),
  component: StatsPage,
});

function StatsPage() {
  const isRestoring = useIsRestoring();
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["goclaim-stats"],
    queryFn: fetchGoClaimStats,
  });

  const isInitialLoad = !data && (isRestoring || isLoading);
  const isRefreshing = isFetching && Boolean(data);
  const showRefreshing = useMinDuration(isRefreshing, 500);

  return (
    <Shell nav="inner">
      <header className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white">
            GoClaim stats
          </h1>
          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            aria-label="Refresh stats"
            className="section-label-inverse inline-flex shrink-0 items-center gap-1.5 px-3 py-1 text-xs disabled:opacity-60"
          >
            <RefreshCw className="size-3.5" aria-hidden />
            <span>Refresh</span>
          </button>
        </div>
        <p className="mt-2 text-sm text-white/80 font-sans">
          Live on-chain progress from the GoClaim{" "}
          <a
            href={`https://celoscan.io/address/${GOCLAIM_PROXY_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white hover:text-white/90"
          >
            contract
          </a>{" "}
          on Celo.
        </p>
        <p className="mt-1 text-sm text-white/60 font-sans">
          {formatStatsSinceNote(data?.statsSinceDay ?? null)}
        </p>
      </header>

      {isInitialLoad ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner label="Loading..." />
        </div>
      ) : null}

      {isError ? (
        <div className="card space-y-3">
          <p className="text-sm font-sans text-black/85">
            Could not load stats{error instanceof Error ? `: ${error.message}` : "."}
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="btn-hero-primary max-w-xs"
          >
            Try again
          </button>
        </div>
      ) : null}

      {data ? (
        <div className="relative">
          <div
            className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-out ${
              showRefreshing ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!showRefreshing}
          >
            <LoadingSpinner label="Refreshing" />
          </div>

          <div
            className={`space-y-4 transition-opacity duration-300 ease-out ${
              showRefreshing ? "opacity-50" : "opacity-100"
            }`}
          >
            <StatsKpiGrid stats={data} />

            <div className="grid gap-4 lg:grid-cols-2">
              <DailyTransactionsChart data={data.dailyTransactions} />
              <DailyClaimsChart data={data.dailyVolume} />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <DailyVolumeChart data={data.dailyVolume} />
              <DailyGrowthChart data={data.dailyGrowth} />
            </div>
          </div>
        </div>
      ) : null}
    </Shell>
  );
}
