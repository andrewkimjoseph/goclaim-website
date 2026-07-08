import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { DailyGrowthPoint } from "@/lib/subgraph/types";
import { StatsChartCard } from "./StatsChartCard";

const chartConfig = {
  created: {
    label: "New accounts:",
    color: "#00B85F",
  },
} satisfies ChartConfig;

function formatDayLabel(day: string) {
  const date = new Date(`${day}T00:00:00.000Z`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function DailyGrowthChart({ data }: { data: DailyGrowthPoint[] }) {
  if (!data.length) {
    return (
      <StatsChartCard
        title="Daily new accounts"
        description="New GoClaim accounts created per day."
      >
        <p className="text-sm font-sans text-black/70">No activity indexed yet.</p>
      </StatsChartCard>
    );
  }

  return (
    <StatsChartCard
      title="Daily new accounts"
      description="New GoClaim accounts created per day."
    >
      <ChartContainer config={chartConfig} className="aspect-[16/10] w-full">
        <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
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
          <Bar dataKey="created" fill="var(--color-created)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </StatsChartCard>
  );
}
