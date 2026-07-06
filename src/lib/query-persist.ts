import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import type { PersistQueryClientOptions } from "@tanstack/react-query-persist-client";

const PERSIST_STORAGE_KEY = "goclaim-react-query-cache";
/** Bump when persisted query data shape changes so stale caches are dropped. */
export const QUERY_CACHE_BUSTER = "2026-07-goclaim-stats-v1";

const PERSIST_MAX_AGE_MS = 1000 * 60 * 60 * 24; // 24 hours

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 1000 * 60 * 60 * 24 * 7,
      retry: 2,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
  key: PERSIST_STORAGE_KEY,
  throttleTime: 1000,
});

export const queryPersistOptions: Omit<PersistQueryClientOptions, "queryClient"> = {
  persister,
  maxAge: PERSIST_MAX_AGE_MS,
  buster: QUERY_CACHE_BUSTER,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => query.queryKey[0] === "goclaim-stats",
  },
};
