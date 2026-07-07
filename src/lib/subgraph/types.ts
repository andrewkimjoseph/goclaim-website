export type TimestampedEvent = {
  id: string;
  timestamp_: string;
};

export type AccountCreatedRow = TimestampedEvent & {
  smartAccountAddress: string;
  transactionHash_: string;
};

export type AccountConnectedRow = TimestampedEvent & {
  smartAccountAddress: string;
  whitelistedRoot: string;
  transactionHash_: string;
};

export type UbiClaimedRow = TimestampedEvent & {
  smartAccountAddress: string;
  amount: string;
  transactionHash_: string;
};

export type TokenTransferredRow = TimestampedEvent & {
  smartAccountAddress: string;
  transactionHash_: string;
};

export type SubgraphMeta = {
  block: {
    number: number;
    timestamp: number | null;
  };
  hasIndexingErrors: boolean;
};

export type DailyCountPoint = {
  day: string;
  count: number;
};

export type CumulativeAdoptionPoint = {
  day: string;
  created: number;
  connected: number;
};

export type DailyVolumePoint = {
  day: string;
  amountWei: string;
  claimCount: number;
};

export type DailyGrowthPoint = {
  day: string;
  created: number;
  connected: number;
};

export type DailyTransactionsPoint = {
  day: string;
  transactions: number;
};

export type GoClaimStats = {
  accountsCreated: number;
  accountsConnected: number;
  linkRatePercent: number;
  totalClaimedWei: string;
  successfulClaims: number;
  claimsToday: number;
  claimedTodayWei: string;
  totalTransactions: number;
  adoptionSeries: CumulativeAdoptionPoint[];
  dailyVolume: DailyVolumePoint[];
  dailyGrowth: DailyGrowthPoint[];
  dailyTransactions: DailyTransactionsPoint[];
  statsSinceDay: string | null;
  meta: SubgraphMeta;
};
