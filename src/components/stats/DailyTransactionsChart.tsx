import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { DailyTransactionsPoint } from "@/lib/subgraph/types";
import { StatsChartCard } from "./StatsChartCard";

const chartConfig = {
  transactions: {
    label: "Transactions:",
    color: "#2BA6FF",
  },
} satisfies ChartConfig;

function formatDayLabel(day: string) {
  const date = new Date(`${day}T00:00:00.000Z`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function DailyTransactionsChart({ data }: { data: DailyTransactionsPoint[] }) {
  if (!data.length) {
    return (
      <StatsChartCard
        title="Daily transactions"
        description="Unique transaction hashes across all GoClaim event types."
      >
        <p className="text-sm font-sans text-black/70">No transactions indexed yet.</p>
      </StatsChartCard>
    );
  }

  return (
    <StatsChartCard
      title="Daily transactions"
      description="Unique transaction hashes across all GoClaim event types."
    >
      <ChartContainer config={chartConfig} className="aspect-[16/9] w-full">
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
            dataKey="transactions"
            stroke="var(--color-transactions)"
            strokeWidth={2}
            dot={{ fill: "var(--color-transactions)", r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </StatsChartCard>
  );
}
