import { createServerFn } from "@tanstack/react-start";
import { weiToHumanAmount } from "@/lib/formatUsdm";

function resolveRpcUrl(): string {
  return process.env.CELO_RPC_URL || process.env.VITE_CELO_RPC_URL || "https://forno.celo.org";
}

/**
 * Quote G$ wei amounts to USDm via the GoodDollar reserve (server-only).
 * Returns one nullable USDm string per input; failures are non-fatal.
 */
export const quoteGdWeiToUsdm = createServerFn({ method: "POST" })
  .validator((data: { amountsWei: string[] }) => {
    if (!data || !Array.isArray(data.amountsWei)) {
      throw new Error("amountsWei must be an array of wei strings");
    }
    return {
      amountsWei: data.amountsWei.map((value) => String(value ?? "0")),
    };
  })
  .handler(async ({ data }): Promise<(string | null)[]> => {
    const { createCelinaClient } = await import("@andrewkimjoseph/celina-sdk");
    const celina = createCelinaClient({
      rpcUrl: resolveRpcUrl(),
      analyticsEnabled: false,
      attributionTags: ["goclaim"],
    });

    return Promise.all(
      data.amountsWei.map(async (wei) => {
        try {
          const amount = weiToHumanAmount(wei);
          if (amount === "0") return "0";
          const quote = await celina.gooddollar.getReserveQuote("GoodDollar", "USDm", amount);
          return quote.expectedOut;
        } catch (error) {
          console.error("G$→USDm reserve quote failed", error);
          return null;
        }
      }),
    );
  });
