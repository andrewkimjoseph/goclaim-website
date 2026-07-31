import { useCallback, useEffect, useState } from "react";

export const STATS_REFRESH_COOLDOWN_MS = 30 * 60_000;
const STORAGE_KEY = "goclaim-stats-last-refresh";

function readLastRefreshAt(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

function writeLastRefreshAt(timestamp: number): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, String(timestamp));
}

function getSecondsRemaining(lastRefreshAt: number, now: number): number {
  if (lastRefreshAt === 0) return 0;
  const elapsed = now - lastRefreshAt;
  if (elapsed >= STATS_REFRESH_COOLDOWN_MS) return 0;
  return Math.ceil((STATS_REFRESH_COOLDOWN_MS - elapsed) / 1000);
}

export function formatStatsRefreshCountdown(secondsRemaining: number): string {
  if (secondsRemaining <= 0) return "";
  if (secondsRemaining < 60) return `${secondsRemaining}s`;
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function useStatsRefreshCooldown() {
  const [lastRefreshAt, setLastRefreshAt] = useState(readLastRefreshAt);
  const [now, setNow] = useState(() => Date.now());

  const secondsRemaining = getSecondsRemaining(lastRefreshAt, now);
  const canRefresh = secondsRemaining === 0;
  const formattedCountdown = formatStatsRefreshCountdown(secondsRemaining);

  useEffect(() => {
    if (canRefresh) return;
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [canRefresh]);

  const recordRefresh = useCallback(() => {
    const timestamp = Date.now();
    writeLastRefreshAt(timestamp);
    setLastRefreshAt(timestamp);
    setNow(timestamp);
  }, []);

  return {
    canRefresh,
    secondsRemaining,
    formattedCountdown,
    recordRefresh,
  };
}
