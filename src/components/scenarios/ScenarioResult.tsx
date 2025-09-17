"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useScenarioStore } from "@/stores/useScenarioStore";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const roles = [
  { key: "leader", name: "리더" },
  { key: "senior", name: "책임" },
  { key: "manager", name: "매니저" },
];

export function ScenarioResult() {
  const { scores, opinions, reset } = useScenarioStore();

  const chartData = [
    { subject: "리더", score: scores.leader, fullMark: 5 },
    { subject: "책임", score: scores.senior, fullMark: 5 },
    { subject: "매니저", score: scores.manager, fullMark: 5 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>셀프 평가 결과</CardTitle>
          <CardDescription>
            시나리오 속 인물들의 역할을 어떻게 평가했는지 확인해보세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-center">점수 분포</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">나의 학습 포인트</h3>
            <div className="space-y-4">
              {roles.map((role) =>
                opinions[role.key] ? (
                  <div key={role.key}>
                    <h4 className="font-semibold">{role.name}</h4>
                    <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                      {opinions[role.key]}
                    </p>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={reset}>처음으로</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
