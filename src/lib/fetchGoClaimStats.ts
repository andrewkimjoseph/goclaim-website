import { sumWei } from "./formatGd";
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
  const accountsCreated = created.length;
  const accountsConnected = connected.length;
  const linkRatePercent = accountsCreated > 0 ? (accountsConnected / accountsCreated) * 100 : 0;
  const totalTransactions = dedupeTransactionHashes([
    ...created,
    ...connected,
    ...ubiRows,
    ...transferRows,
  ]).length;

  return {
    accountsCreated,
    accountsConnected,
    linkRatePercent,
    totalClaimedWei: sumWei(dedupedClaims.map((row) => row.amount)),
    successfulClaims: dedupedClaims.length,
    totalTransactions,
    adoptionSeries: buildCumulativeAdoptionSeries(created, connected),
    dailyVolume: buildDailyVolumeSeries(dedupedClaims),
    dailyGrowth: buildDailyGrowthSeries(created, connected),
    dailyTransactions: buildDailyTransactionsSeries(created, connected, ubiRows, transferRows),
    statsSinceDay: statsSinceDayFromEvents(created, connected, ubiRows, transferRows),
    meta: metaResult._meta,
  };
}
