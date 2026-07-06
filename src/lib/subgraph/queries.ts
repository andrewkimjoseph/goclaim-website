export const META_QUERY = `
  query GoClaimMeta {
    _meta {
      block {
        number
        timestamp
      }
      hasIndexingErrors
    }
  }
`;

export const ACCOUNT_CREATEDS_QUERY = `
  query GoClaimAccountCreateds($first: Int!, $skip: Int!) {
    goClaimAccountCreateds(
      first: $first
      skip: $skip
      orderBy: timestamp_
      orderDirection: asc
    ) {
      id
      timestamp_
      smartAccountAddress
      transactionHash_
    }
  }
`;

export const ACCOUNT_CONNECTEDS_QUERY = `
  query GoClaimAccountConnecteds($first: Int!, $skip: Int!) {
    goClaimAccountConnecteds(
      first: $first
      skip: $skip
      orderBy: timestamp_
      orderDirection: asc
    ) {
      id
      timestamp_
      smartAccountAddress
      whitelistedRoot
      transactionHash_
    }
  }
`;

export const UBI_CLAIMEDS_QUERY = `
  query GoClaimUBIClaimeds($first: Int!, $skip: Int!) {
    goClaimUBIClaimeds(
      first: $first
      skip: $skip
      orderBy: timestamp_
      orderDirection: asc
    ) {
      id
      timestamp_
      smartAccountAddress
      amount
      transactionHash_
    }
  }
`;

export const TOKEN_TRANSFERREDS_QUERY = `
  query GoClaimTokenTransferreds($first: Int!, $skip: Int!) {
    goClaimTokenTransferreds(
      first: $first
      skip: $skip
      orderBy: timestamp_
      orderDirection: asc
    ) {
      id
      timestamp_
      smartAccountAddress
      transactionHash_
    }
  }
`;
