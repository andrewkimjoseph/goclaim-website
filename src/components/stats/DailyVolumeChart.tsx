import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { DailyVolumePoint } from "@/lib/subgraph/types";
import { formatGdWei } from "@/lib/formatGd";
import { StatsChartCard } from "./StatsChartCard";

const chartConfig = {
  amountGd: {
    label: "G$ claimed",
    color: "#00C566",
  },
} satisfies ChartConfig;

function formatDayLabel(day: string) {
  const date = new Date(`${day}T00:00:00.000Z`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function DailyVolumeChart({ data }: { data: DailyVolumePoint[] }) {
  const chartData = data.map((point) => ({
    ...point,
    amountGd: Number(point.amountWei) / 1e18,
  }));

  if (!chartData.length) {
    return (
      <StatsChartCard title="Daily G$ volume" description="GoodDollar claimed by GoClaim each day.">
        <p className="text-sm font-sans text-black/70">No claims indexed yet.</p>
      </StatsChartCard>
    );
  }

  return (
    <StatsChartCard
      title="Daily G$ volume"
      description="GoodDollar claimed by GoClaim each day (deduped on-chain events)."
    >
      <ChartContainer config={chartConfig} className="aspect-[16/10] w-full">
        <BarChart data={chartData} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={formatDayLabel}
            minTickGap={24}
          />
          <YAxis tickLine={false} axisLine={false} width={40} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => formatDayLabel(String(value))}
                formatter={(value, _name, item) => {
                  const payload = item.payload as DailyVolumePoint & { amountGd: number };
                  return [
                    `${formatGdWei(payload.amountWei)} G$ (${payload.claimCount} claims)`,
                    "Volume",
                  ];
                }}
              />
            }
          />
          <Bar dataKey="amountGd" fill="var(--color-amountGd)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </StatsChartCard>
  );
}
