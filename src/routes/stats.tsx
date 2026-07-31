import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useIsRestoring } from "@tanstack/react-query";
import { RefreshCw, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { Shell } from "@/components/Shell";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useMinDuration } from "@/hooks/use-min-duration";
import { useStatsRefreshCooldown } from "@/hooks/use-stats-refresh-cooldown";
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

function StatsOverlay({
  visible = true,
  blur = false,
  busy = false,
  children,
}: {
  visible?: boolean;
  blur?: boolean;
  busy?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ease-out ${
        blur ? "backdrop-blur-sm" : ""
      } ${visible ? "opacity-100" : "opacity-0"}`}
      aria-hidden={!visible}
      aria-busy={busy || undefined}
    >
      {children}
    </div>
  );
}

function StatsLoadingOverlay({
  label,
  visible = true,
}: {
  label: string;
  visible?: boolean;
}) {
  return (
    <StatsOverlay visible={visible} busy={visible}>
      <LoadingSpinner label={label} />
    </StatsOverlay>
  );
}

function formatLastUpdated(iso: string | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function StatsPage() {
  const isRestoring = useIsRestoring();
  const { canRefresh, formattedCountdown, recordRefresh } = useStatsRefreshCooldown();
  const { data, isLoading, isError, error, refetch, isFetching, dataUpdatedAt } = useQuery({
    queryKey: ["goclaim-stats"],
    queryFn: fetchGoClaimStats,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const handleRefresh = async () => {
    if (!canRefresh || isFetching) return;
    const result = await refetch();
    if (result.isSuccess) {
      recordRefresh();
    }
  };

  const isInitialLoad = !data && (isRestoring || isLoading);
  const isRefreshing = isFetching && Boolean(data);
  const showRefreshing = useMinDuration(isRefreshing, 500);
  const showErrorOverlay = isError && !data;
  const showInlineRefreshError = isError && Boolean(data);
  const lastUpdatedLabel = formatLastUpdated(new Date(dataUpdatedAt).toISOString());
  const refreshDisabled = isFetching || !canRefresh;
  const refreshLabel = isFetching
    ? "Refreshing…"
    : !canRefresh
      ? `Refresh in ${formattedCountdown}`
      : "Refresh";

  return (
    <Shell nav="inner">
      <header className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white">
            GoClaim stats
          </h1>
          <button
            type="button"
            onClick={() => void handleRefresh()}
            disabled={refreshDisabled}
            aria-label={refreshLabel}
            className="section-label-inverse inline-flex shrink-0 items-center gap-1.5 px-3 py-1 text-xs disabled:opacity-60"
          >
            <RefreshCw className="size-3.5" aria-hidden />
            <span>{refreshLabel}</span>
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
        <p className="mt-3 text-sm text-white/60 font-sans">
          {formatStatsSinceNote(data?.statsSinceDay ?? null)}
        </p>
        {data ? (
          <p className="mt-2 text-xs text-white/50 font-sans">Last updated: {lastUpdatedLabel}</p>
        ) : null}
        {showInlineRefreshError ? (
          <p
            role="status"
            className="mt-3 flex items-center gap-2 text-sm font-sans text-white/70"
          >
            <TriangleAlert className="size-3.5 shrink-0" aria-hidden />
            Couldn&apos;t refresh. Showing the last saved snapshot.
          </p>
        ) : null}
      </header>

      {isInitialLoad ? <StatsLoadingOverlay label="Loading..." /> : null}

      {showErrorOverlay ? (
        <StatsOverlay blur>
          <div
            role="alert"
            className="pointer-events-auto flex max-w-sm flex-col items-center gap-4 text-center animate-in fade-in-0 duration-300"
          >
            <div className="space-y-2">
              <h2 className="font-display text-xl font-bold text-white">Could not load stats</h2>
              {error instanceof Error ? (
                <p className="text-sm font-sans text-white/60">{error.message}</p>
              ) : null}
            </div>
            <div className="w-full max-w-[220px]">
              <button
                type="button"
                onClick={() => void refetch()}
                className="btn-hero-primary"
              >
                Try again
              </button>
            </div>
          </div>
        </StatsOverlay>
      ) : null}

      {data ? (
        <div className="relative">
          <StatsLoadingOverlay label="Refreshing" visible={showRefreshing} />

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
