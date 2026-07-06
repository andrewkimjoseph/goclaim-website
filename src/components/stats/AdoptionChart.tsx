import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { CumulativeAdoptionPoint } from "@/lib/subgraph/types";
import { StatsChartCard } from "./StatsChartCard";

const chartConfig = {
  created: {
    label: "Accounts created",
    color: "#0FA958",
  },
  connected: {
    label: "Accounts linked",
    color: "#FF5A52",
  },
} satisfies ChartConfig;

function formatDayLabel(day: string) {
  const date = new Date(`${day}T00:00:00.000Z`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function AdoptionChart({ data }: { data: CumulativeAdoptionPoint[] }) {
  if (!data.length) {
    return (
      <StatsChartCard
        title="Adoption over time"
        description="Cumulative GoClaim accounts created and linked."
      >
        <p className="text-sm font-sans text-black/70">No on-chain activity yet.</p>
      </StatsChartCard>
    );
  }

  return (
    <StatsChartCard
      title="Adoption over time"
      description="Cumulative GoClaim accounts created and linked to GoodDollar."
    >
      <ChartContainer config={chartConfig} className="aspect-[16/9] w-full">
        <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={formatDayLabel}
            minTickGap={24}
          />
          <YAxis tickLine={false} axisLine={false} width={32} allowDecimals={false} />
          <ChartTooltip
            content={
              <ChartTooltipContent labelFormatter={(value) => formatDayLabel(String(value))} />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            type="monotone"
            dataKey="created"
            stroke="var(--color-created)"
            fill="var(--color-created)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="connected"
            stroke="var(--color-connected)"
            fill="var(--color-connected)"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </StatsChartCard>
  );
}
