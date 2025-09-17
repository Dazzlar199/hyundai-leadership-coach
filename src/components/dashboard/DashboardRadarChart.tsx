"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts"
import type { TextProps } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ValueScore } from "@/types"
import rules from "@/data/rules.json";

interface CustomizedAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

const CustomizedAxisTick = (props: CustomizedAxisTickProps) => {
  const { x, y, payload } = props;
  const words = payload?.value.split(' ') ?? [];
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#888" fontSize={12}>
        {words.map((word, i) => (
          <tspan x={0} dy={i === 0 ? 0 : 15} key={i}>
            {word}
          </tspan>
        ))}
      </text>
    </g>
  );
};

interface DashboardRadarChartProps {
  scores: ValueScore[];
}

export function DashboardRadarChart({ scores }: DashboardRadarChartProps) {
  const chartData = scores.map(score => ({
    subject: rules.values.find(v => v.key === score.key)?.label || score.key,
    score: score.score,
    fullMark: 5,
  }));

  const chartConfig = {
    score: {
      label: "Score",
      color: "#3b82f6", // A bright blue color
    },
  }

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>리더십 진단</CardTitle>
        <CardDescription>
          10대 핵심 가치 기반 진단 결과입니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[300px]"
        >
          <RadarChart data={chartData} outerRadius="65%">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarAngleAxis dataKey="subject" tick={<CustomizedAxisTick />} />
            <PolarGrid stroke="#666666" strokeOpacity={0.5} />
            <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
            <Radar
              dataKey="score"
              fill={chartConfig.score.color}
              fillOpacity={0.6}
              stroke={chartConfig.score.color}
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          전반적으로 균형 잡힌 리더십을 보여주고 있습니다 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          2025년 9월 15일 진단 기준
        </div>
      </CardFooter>
    </Card>
  )
}
