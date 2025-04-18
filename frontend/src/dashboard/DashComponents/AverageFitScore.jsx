"use client"

/**
 * This file is responsible for the "Trend Line of fit score" block
 * 
 */
import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart.tsx"
import { Progress } from "@/components/ui/progress.tsx"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} 

export function AverageFitScore({trendScore, feedBackLoaded, feedBackLoading, progress,chartData}) {
  return (
    <Card className="flex flex-col min-h-[300px]">
      
      <CardHeader>
        <CardTitle>Trend Line of fit score</CardTitle>
        <CardDescription>A look into how your resume has improved over time</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-0 pb-0">
      {!feedBackLoaded && !feedBackLoading && <div className="flex items-center justify-center h-full">
      <p>No data yet</p>
      </div>}
      {feedBackLoading && <div className="flex items-center justify-center h-full"><Progress value={progress} /></div>}
        {feedBackLoaded &&<ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="upload"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="score"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>}
      </CardContent>
     {feedBackLoaded && <CardFooter className="flex-col items-start gap-2 text-sm mt-10">
        <div className="flex gap-2 font-medium leading-none">
          {`Trending by ${trendScore}% this upload`} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the trend of fit scores for the previous uploads
        </div>
      </CardFooter>}
      
      
    </Card>
  )
}