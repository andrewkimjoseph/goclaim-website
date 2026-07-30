import { APP_URL } from "@/lib/copy";

/** Matches goclaim-app /api/g-usdm-quote MAX_AMOUNTS. */
const QUOTE_CHUNK_SIZE = 64;

const DEFAULT_QUOTE_API_URL = `${APP_URL}/api/g-usdm-quote`;

function resolveQuoteApiUrl(): string {
  return import.meta.env.VITE_GD_QUOTE_API_URL?.trim() || DEFAULT_QUOTE_API_URL;
}

function isZeroWei(wei: string): boolean {
  try {
    return BigInt(wei || "0") === 0n;
  } catch {
    return true;
  }
}

async function quoteGdWeiToUsdmChunk(amountsWei: string[]): Promise<(string | null)[]> {
  const apiUrl = resolveQuoteApiUrl();

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amountsWei }),
  });
  if (!response.ok) {
    console.error("G$→USDm quote API returned", response.status);
    return amountsWei.map(() => null);
  }

  const payload = (await response.json()) as { quotes?: (string | null)[] };
  if (!Array.isArray(payload.quotes) || payload.quotes.length !== amountsWei.length) {
    return amountsWei.map(() => null);
  }
  return payload.quotes;
}

/**
 * Calls the GoClaim app quote API for G$ wei amounts to USDm.
 * Defaults to https://app.goclaim.xyz/api/g-usdm-quote; override with VITE_GD_QUOTE_API_URL for local dev.
 */
export async function quoteGdWeiToUsdm(amountsWei: string[]): Promise<(string | null)[]> {
  const results: (string | null)[] = new Array(amountsWei.length).fill(null);
  const quoteIndices: number[] = [];
  const quoteAmounts: string[] = [];

  for (let index = 0; index < amountsWei.length; index += 1) {
    const wei = String(amountsWei[index] ?? "0");
    if (isZeroWei(wei)) {
      results[index] = "0";
      continue;
    }
    quoteIndices.push(index);
    quoteAmounts.push(wei);
  }

  if (quoteAmounts.length === 0) {
    return results;
  }

  try {
    for (let offset = 0; offset < quoteAmounts.length; offset += QUOTE_CHUNK_SIZE) {
      const chunk = quoteAmounts.slice(offset, offset + QUOTE_CHUNK_SIZE);
      const chunkQuotes = await quoteGdWeiToUsdmChunk(chunk);
      for (let chunkIndex = 0; chunkIndex < chunkQuotes.length; chunkIndex += 1) {
        results[quoteIndices[offset + chunkIndex]!] = chunkQuotes[chunkIndex] ?? null;
      }
    }
    return results;
  } catch (error) {
    console.error("Failed to call G$→USDm quote API", error);
    return amountsWei.map(() => null);
  }
}
