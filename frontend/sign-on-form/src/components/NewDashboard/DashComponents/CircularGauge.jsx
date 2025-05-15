"use client"
/**
 * This file is responsble for the "Your Fit Score"
 * 
 */
import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { ChartConfig, ChartContainer } from "@/components/ui/chart.tsx"
import { Progress } from "@/components/ui/progress.tsx"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
}

export function CircularGauge({ score, maxScore, feedBackLoaded, feedBackLoading, progress }) {
  const chartData = [
    { browser: "safari", visitors: score, fill: "var(--color-safari)" },
  ]
  return (
    <Card className="flex flex-col min-h-[180px] max-h-[220px] w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Your Fit Score</CardTitle>
        <CardDescription className="mb-1 text-xs">
          A score that shows how your resume compares to the job description.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-0 pb-0">
        {!feedBackLoaded && !feedBackLoading && <div className="flex items-center justify-center h-full">
          <p>No data yet</p>
        </div>}
        {feedBackLoading && <div className="flex items-center justify-center h-full"><Progress value={progress} /></div>}
        {feedBackLoaded && <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[120px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={50}
            outerRadius={65}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[56, 44]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className="fill-muted-foreground text-xs"
                        >
                          out of 100
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>}
      </CardContent>
      {feedBackLoaded && <CardFooter className="flex-col items-start gap-2 text-xs">
      </CardFooter>}
    </Card>
  );
}