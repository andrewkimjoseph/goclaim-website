const gdFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const gdWholeFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export function formatGdWei(wei: string): string {
  const value = Number(wei) / 1e18;
  if (!Number.isFinite(value)) {
    return "0";
  }
  return gdFormatter.format(value);
}

export function formatGdWeiWhole(wei: string): string {
  const whole = BigInt(wei) / BigInt(10) ** BigInt(18);
  const value = Number(whole);
  if (!Number.isFinite(value)) {
    return whole.toString();
  }
  return gdWholeFormatter.format(value);
}

export function sumWei(values: string[]): string {
  return values.reduce((sum, value) => sum + BigInt(value), BigInt(0)).toString();
}
