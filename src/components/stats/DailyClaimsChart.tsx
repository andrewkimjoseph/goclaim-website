import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { DailyVolumePoint } from "@/lib/subgraph/types";
import { StatsChartCard } from "./StatsChartCard";

const chartConfig = {
  claimCount: {
    label: "Claims:",
    color: "#F83028",
  },
} satisfies ChartConfig;

function formatDayLabel(day: string) {
  const date = new Date(`${day}T00:00:00.000Z`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function DailyClaimsChart({ data }: { data: DailyVolumePoint[] }) {
  if (!data.length) {
    return (
      <StatsChartCard
        title="Daily claims"
        description="Successful GoodDollar UBI claims per day."
      >
        <p className="text-sm font-sans text-black/70">No claims indexed yet.</p>
      </StatsChartCard>
    );
  }

  return (
    <StatsChartCard
      title="Daily claims"
      description="Successful GoodDollar UBI claims per day."
    >
      <ChartContainer config={chartConfig} className="aspect-[21/9] w-full">
        <LineChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
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
              <ChartTooltipContent
                labelFormatter={(value) => formatDayLabel(String(value))}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="claimCount"
            stroke="var(--color-claimCount)"
            strokeWidth={2}
            dot={{ fill: "var(--color-claimCount)", r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </StatsChartCard>
  );
}
