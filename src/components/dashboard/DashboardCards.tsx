import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { mockAssessment, mockScenarios } from "@/data/mock-data";
import { ValueKey } from "@/types";

interface CoachingCardProps {
  coaching: {
    title: string;
    summary: string;
    value: ValueKey;
  }
}

function CoachingCard({
  coaching,
}: {
  coaching: {
    title: string;
    summary: string;
    value?: ValueKey;
  };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{coaching.title}</CardTitle>
        <CardDescription>{coaching.summary}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button size="sm">코칭 받기</Button>
      </CardFooter>
    </Card>
  );
}

export function TopCoaching() {
  const top3Coaching = mockAssessment.coaching.slice(0, 3);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Top 3 코칭 제안</h2>
      {top3Coaching.map((coach, index) => (
        <CoachingCard key={index} coaching={coach} />
      ))}
    </div>
  );
}

export function DailyMission() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>오늘의 10분 미션</CardTitle>
        <CardDescription>매일 작은 실천으로 리더십을 키워보세요.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {mockAssessment.missions.map((mission, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox id={`mission-${index}`} />
            <label
              htmlFor={`mission-${index}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {mission}
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function RecentScenarios() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 시나리오</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {mockScenarios.map((scenario) => (
            <li key={scenario.id} className="text-sm text-muted-foreground">
              {scenario.params.topic} ({new Date(scenario.createdAt).toLocaleDateString()})
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">모두 보기</Button>
      </CardFooter>
    </Card>
  );
}
