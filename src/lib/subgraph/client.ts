const DEFAULT_SUBGRAPH_URL =
  "https://api.goldsky.com/api/public/project_cmr7ftnps98f101vcbrc5emol/subgraphs/goclaim/1.0.0/gn";

export function getSubgraphUrl(): string {
  const fromEnv = import.meta.env?.VITE_GOCLAIM_SUBGRAPH_URL?.trim();
  return fromEnv || DEFAULT_SUBGRAPH_URL;
}

export async function querySubgraph<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(getSubgraphUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Subgraph request failed (${response.status})`);
  }

  const json = (await response.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "Subgraph query error");
  }

  if (!json.data) {
    throw new Error("Subgraph returned no data");
  }

  return json.data;
}
