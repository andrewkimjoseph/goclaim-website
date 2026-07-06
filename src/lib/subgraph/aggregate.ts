import type {
  AccountConnectedRow,
  AccountCreatedRow,
  CumulativeAdoptionPoint,
  DailyGrowthPoint,
  DailyTransactionsPoint,
  DailyVolumePoint,
  TimestampedEvent,
  TokenTransferredRow,
  UbiClaimedRow,
} from "./types";

export function utcDayKey(timestampSeconds: string): string {
  return new Date(Number(timestampSeconds) * 1000).toISOString().slice(0, 10);
}

function countByDay(events: TimestampedEvent[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const event of events) {
    const day = utcDayKey(event.timestamp_);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  return counts;
}

function sortedDays(...maps: Map<string, number>[]): string[] {
  const days = new Set<string>();
  for (const map of maps) {
    for (const day of map.keys()) {
      days.add(day);
    }
  }
  return [...days].sort();
}

export function dedupeClaims(rows: UbiClaimedRow[]): UbiClaimedRow[] {
  const seen = new Set<string>();
  return rows.filter((row) => {
    const key = `${row.transactionHash_}:${row.smartAccountAddress.toLowerCase()}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export function buildCumulativeAdoptionSeries(
  created: AccountCreatedRow[],
  connected: AccountConnectedRow[],
): CumulativeAdoptionPoint[] {
  const createdByDay = countByDay(created);
  const connectedByDay = countByDay(connected);
  const days = sortedDays(createdByDay, connectedByDay);

  let cumulativeCreated = 0;
  let cumulativeConnected = 0;

  return days.map((day) => {
    cumulativeCreated += createdByDay.get(day) ?? 0;
    cumulativeConnected += connectedByDay.get(day) ?? 0;
    return {
      day,
      created: cumulativeCreated,
      connected: cumulativeConnected,
    };
  });
}

export function buildDailyGrowthSeries(
  created: AccountCreatedRow[],
  connected: AccountConnectedRow[],
): DailyGrowthPoint[] {
  const createdByDay = countByDay(created);
  const connectedByDay = countByDay(connected);
  const days = sortedDays(createdByDay, connectedByDay);

  return days.map((day) => ({
    day,
    created: createdByDay.get(day) ?? 0,
    connected: connectedByDay.get(day) ?? 0,
  }));
}

export function buildDailyVolumeSeries(claims: UbiClaimedRow[]): DailyVolumePoint[] {
  const byDay = new Map<string, { amountWei: bigint; claimCount: number }>();

  for (const claim of claims) {
    const day = utcDayKey(claim.timestamp_);
    const existing = byDay.get(day) ?? { amountWei: BigInt(0), claimCount: 0 };
    byDay.set(day, {
      amountWei: existing.amountWei + BigInt(claim.amount),
      claimCount: existing.claimCount + 1,
    });
  }

  return [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, value]) => ({
      day,
      amountWei: value.amountWei.toString(),
      claimCount: value.claimCount,
    }));
}

type TransactionEventRow = {
  timestamp_: string;
  transactionHash_: string;
};

export function dedupeTransactionHashes(rows: TransactionEventRow[]): string[] {
  return [...new Set(rows.map((row) => row.transactionHash_.toLowerCase()))];
}

export function buildDailyTransactionsSeries(
  created: AccountCreatedRow[],
  connected: AccountConnectedRow[],
  claims: UbiClaimedRow[],
  transfers: TokenTransferredRow[],
): DailyTransactionsPoint[] {
  const txToDay = new Map<string, string>();
  const rows: TransactionEventRow[] = [...created, ...connected, ...claims, ...transfers];

  for (const row of rows) {
    const txHash = row.transactionHash_.toLowerCase();
    const day = utcDayKey(row.timestamp_);
    if (!txToDay.has(txHash)) {
      txToDay.set(txHash, day);
    }
  }

  const dailyCount = new Map<string, number>();
  for (const day of txToDay.values()) {
    dailyCount.set(day, (dailyCount.get(day) ?? 0) + 1);
  }

  return [...dailyCount.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, transactions]) => ({ day, transactions }));
}
