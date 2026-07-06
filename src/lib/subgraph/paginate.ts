import { querySubgraph } from "./client";

const PAGE_SIZE = 1000;

export async function fetchAllPages<TRow, TKey extends string>(
  query: string,
  resultKey: TKey,
): Promise<TRow[]> {
  const rows: TRow[] = [];
  let skip = 0;

  while (true) {
    const data = await querySubgraph<Record<TKey, TRow[]>>(query, {
      first: PAGE_SIZE,
      skip,
    });

    const batch = data[resultKey];
    if (!batch.length) {
      break;
    }

    rows.push(...batch);
    if (batch.length < PAGE_SIZE) {
      break;
    }

    skip += PAGE_SIZE;
  }

  return rows;
}
