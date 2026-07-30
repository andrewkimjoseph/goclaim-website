import { sumWei } from "./formatGd";
import { quoteGdWeiToUsdm } from "./quoteGdToUsdm";
import {
  buildCumulativeAdoptionSeries,
  buildDailyGrowthSeries,
  buildDailyTransactionsSeries,
  buildDailyVolumeSeries,
  dedupeClaims,
  dedupeTransactionHashes,
  utcDayKey,
} from "./subgraph/aggregate";
import { querySubgraph } from "./subgraph/client";
import { fetchAllPages } from "./subgraph/paginate";
import {
  ACCOUNT_CONNECTEDS_QUERY,
  ACCOUNT_CREATEDS_QUERY,
  META_QUERY,
  TOKEN_TRANSFERREDS_QUERY,
  UBI_CLAIMEDS_QUERY,
} from "./subgraph/queries";
import type {
  AccountConnectedRow,
  AccountCreatedRow,
  GoClaimStats,
  SubgraphMeta,
  TimestampedEvent,
  TokenTransferredRow,
  UbiClaimedRow,
} from "./subgraph/types";

function statsSinceDayFromEvents(...eventLists: TimestampedEvent[][]): string | null {
  let earliestTimestamp: number | null = null;

  for (const events of eventLists) {
    for (const event of events) {
      const timestamp = Number(event.timestamp_);
      if (earliestTimestamp === null || timestamp < earliestTimestamp) {
        earliestTimestamp = timestamp;
      }
    }
  }

  return earliestTimestamp === null ? null : utcDayKey(String(earliestTimestamp));
}

export async function fetchGoClaimStats(): Promise<GoClaimStats> {
  const [metaResult, created, connected, ubiRows, transferRows] = await Promise.all([
    querySubgraph<{ _meta: SubgraphMeta }>(META_QUERY),
    fetchAllPages<AccountCreatedRow, "goClaimAccountCreateds">(
      ACCOUNT_CREATEDS_QUERY,
      "goClaimAccountCreateds",
    ),
    fetchAllPages<AccountConnectedRow, "goClaimAccountConnecteds">(
      ACCOUNT_CONNECTEDS_QUERY,
      "goClaimAccountConnecteds",
    ),
    fetchAllPages<UbiClaimedRow, "goClaimUBIClaimeds">(UBI_CLAIMEDS_QUERY, "goClaimUBIClaimeds"),
    fetchAllPages<TokenTransferredRow, "goClaimTokenTransferreds">(
      TOKEN_TRANSFERREDS_QUERY,
      "goClaimTokenTransferreds",
    ),
  ]);

  const dedupedClaims = dedupeClaims(ubiRows);
  const todayKey = utcDayKey(String(Math.floor(Date.now() / 1000)));
  const todayClaims = dedupedClaims.filter((claim) => utcDayKey(claim.timestamp_) === todayKey);
  const claimsToday = todayClaims.length;
  const claimedTodayWei = sumWei(todayClaims.map((row) => row.amount));
  const accountsCreated = created.length;
  const accountsConnected = connected.length;
  const linkRatePercent = accountsCreated > 0 ? (accountsConnected / accountsCreated) * 100 : 0;
  const totalTransactions = dedupeTransactionHashes([
    ...created,
    ...connected,
    ...ubiRows,
    ...transferRows,
  ]).length;
  const totalClaimedWei = sumWei(dedupedClaims.map((row) => row.amount));
  const dailyVolumeRaw = buildDailyVolumeSeries(dedupedClaims);
  const dailyWei = dailyVolumeRaw.map((point) => point.amountWei);

  let totalClaimedUsdm: string | null = null;
  let claimedTodayUsdm: string | null = null;
  let dailyQuotes: (string | null)[] = dailyVolumeRaw.map(() => null);

  try {
    const quotes = await quoteGdWeiToUsdm({
      data: { amountsWei: [totalClaimedWei, claimedTodayWei, ...dailyWei] },
    });
    totalClaimedUsdm = quotes[0] ?? null;
    claimedTodayUsdm = quotes[1] ?? null;
    dailyQuotes = quotes.slice(2);
  } catch (error) {
    console.error("Failed to quote G$→USDm for GoClaim stats", error);
  }

  const dailyVolume = dailyVolumeRaw.map((point, index) => ({
    ...point,
    amountUsdm: dailyQuotes[index] ?? null,
  }));

  return {
    accountsCreated,
    accountsConnected,
    linkRatePercent,
    totalClaimedWei,
    totalClaimedUsdm,
    successfulClaims: dedupedClaims.length,
    claimsToday,
    claimedTodayWei,
    claimedTodayUsdm,
    totalTransactions,
    adoptionSeries: buildCumulativeAdoptionSeries(created, connected),
    dailyVolume,
    dailyGrowth: buildDailyGrowthSeries(created, connected),
    dailyTransactions: buildDailyTransactionsSeries(created, connected, ubiRows, transferRows),
    statsSinceDay: statsSinceDayFromEvents(created, connected, ubiRows, transferRows),
    meta: metaResult._meta,
  };
}
