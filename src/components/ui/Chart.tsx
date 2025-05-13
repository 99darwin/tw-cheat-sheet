import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "@/lib/utils"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  config?: {
    [key: string]: {
      label: string
      color: string
    }
  }
}

export function ChartContainer({ className, children, config, ...props }: ChartContainerProps) {
  return (
    <div className={cn("w-full h-[400px]", className)} {...props}>
      {children}
    </div>
  )
}

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  formatter?: (value: number) => string
}

export function ChartTooltip({ active, payload, label, formatter }: ChartTooltipProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </span>
          <span className="font-bold text-muted-foreground">
            {formatter ? formatter(payload[0].value) : payload[0].value}
          </span>
        </div>
      </div>
    </div>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  label?: string
  formatter?: (value: number) => string
  valuePrefix?: string
  valueSuffix?: string
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  formatter,
  valuePrefix = "",
  valueSuffix = "",
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </span>
          {payload.map((item, index) => (
            <span key={index} className="font-bold text-muted-foreground">
              {valuePrefix}
              {formatter ? formatter(item.value) : item.value}
              {valueSuffix}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

interface ChartProps {
  data: any[]
  type?: "line" | "area" | "bar"
  xAxisKey: string
  yAxisKey: string
  className?: string
  showGrid?: boolean
  showTooltip?: boolean
  formatter?: (value: number) => string
}

export function Chart({
  data,
  type = "line",
  xAxisKey,
  yAxisKey,
  className,
  showGrid = true,
  showTooltip = true,
  formatter,
}: ChartProps) {
  const chartComponents = {
    line: (
      <LineChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        {showTooltip && (
          <Tooltip
            content={
              <ChartTooltipContent
                formatter={formatter}
              />
            }
          />
        )}
        <Line
          type="monotone"
          dataKey={yAxisKey}
          stroke="currentColor"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    ),
    area: (
      <AreaChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        {showTooltip && (
          <Tooltip
            content={
              <ChartTooltipContent
                formatter={formatter}
              />
            }
          />
        )}
        <Area
          type="monotone"
          dataKey={yAxisKey}
          stroke="currentColor"
          fill="currentColor"
          fillOpacity={0.1}
        />
      </AreaChart>
    ),
    bar: (
      <BarChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        {showTooltip && (
          <Tooltip
            content={
              <ChartTooltipContent
                formatter={formatter}
              />
            }
          />
        )}
        <Bar dataKey={yAxisKey} fill="currentColor" />
      </BarChart>
    ),
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {chartComponents[type]}
    </ResponsiveContainer>
  )
} 