const usdmWholeFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

/** Convert token wei to a decimal string suitable for Celina `getReserveQuote`. */
export function weiToHumanAmount(wei: string, decimals = 18): string {
  let value: bigint;
  try {
    value = BigInt(wei || "0");
  } catch {
    return "0";
  }
  if (value === 0n) return "0";

  const negative = value < 0n;
  if (negative) value = -value;

  const base = 10n ** BigInt(decimals);
  const whole = value / base;
  const fraction = value % base;
  if (fraction === 0n) {
    return `${negative ? "-" : ""}${whole}`;
  }

  const fracStr = fraction.toString().padStart(decimals, "0").replace(/0+$/, "");
  return `${negative ? "-" : ""}${whole}.${fracStr}`;
}

/** Round a USDm quote string for compact KPI display. */
export function formatUsdmWhole(amount: string | null | undefined): string | null {
  if (amount == null || amount === "") return null;
  const value = Number(amount);
  if (!Number.isFinite(value)) return null;
  return usdmWholeFormatter.format(Math.round(value));
}
