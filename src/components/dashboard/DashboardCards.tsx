import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MOCK_DATA } from "@/data/mock-data";
import { CoachingItem, Scenario } from "@/types";

function CoachingCard({ coaching }: { coaching: CoachingItem }) {
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

function MissionCard() {
  const mockAssessment = MOCK_DATA.assessments[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>오늘의 미션</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="mission-0" defaultChecked />
          <label
            htmlFor="mission-0"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {mockAssessment.coaching[0].dailyMission}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="mission-1" />
          <label
            htmlFor="mission-1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {mockAssessment.coaching[1].dailyMission}
          </label>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentScenarios() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 시나리오</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {MOCK_DATA.scenarios.slice(0, 3).map((scenario: Scenario) => (
            <li key={scenario.id} className="text-sm text-muted-foreground truncate">
              {scenario.input.situation}
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

export default function DashboardCards() {
  const top3Coaching = MOCK_DATA.assessments[0].coaching.slice(0, 3);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-1 space-y-4 md:col-span-2">
        <h2 className="text-xl font-bold">Top 3 코칭 제안</h2>
        {top3Coaching.map((coach: CoachingItem, index: number) => (
          <CoachingCard key={index} coaching={coach} />
        ))}
      </div>
      <div className="col-span-1 space-y-4">
        <MissionCard />
        <RecentScenarios />
      </div>
    </div>
  );
}
