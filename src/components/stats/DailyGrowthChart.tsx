import { useEffect, useState } from "react";
import { CircleHelp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isAccountCreationEnabled } from "@/lib/accountCreation";
import { ACCOUNT_CREATION_PAUSED_NOTE } from "@/lib/copy";
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

function useFinePointerHover() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return enabled;
}

const pausedInfoContentClassName =
  "max-w-[14rem] w-auto rounded-none border-2 border-black bg-white px-3 py-2 text-xs font-sans leading-snug text-black shadow-[var(--shadow-brutal-sm)]";

function AccountCreationPausedInfo() {
  const finePointerHover = useFinePointerHover();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const trigger = (
    <button
      type="button"
      className="inline-flex items-center justify-center text-black/55 transition-colors hover:text-black"
      aria-label="About new account creation"
    >
      <CircleHelp className="size-5" aria-hidden />
    </button>
  );

  if (!mounted) {
    return trigger;
  }

  if (finePointerHover) {
    return (
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
          <TooltipContent
            side="left"
            align="start"
            className={pausedInfoContentClassName}
          >
            {ACCOUNT_CREATION_PAUSED_NOTE}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        side="left"
        align="start"
        className={pausedInfoContentClassName}
      >
        {ACCOUNT_CREATION_PAUSED_NOTE}
      </PopoverContent>
    </Popover>
  );
}

export function DailyGrowthChart({ data }: { data: DailyGrowthPoint[] }) {
  const accountCreationEnabled = isAccountCreationEnabled();
  const headerAside = !accountCreationEnabled ? (
    <AccountCreationPausedInfo />
  ) : undefined;

  if (!data.length) {
    return (
      <StatsChartCard
        title="Daily new accounts"
        description="New GoClaim accounts created per day."
        headerAside={headerAside}
      >
        <p className="text-sm font-sans text-black/70">No activity indexed yet.</p>
      </StatsChartCard>
    );
  }

  return (
    <StatsChartCard
      title="Daily new accounts"
      description="New GoClaim accounts created per day."
      headerAside={headerAside}
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
