"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { User, Bot, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scenario } from "@/types";
import { useScenarioStore } from "@/stores/useScenarioStore";

interface ScenarioPreviewProps {
  scenario: Scenario;
  onReset: () => void;
}

const valueTagRegex = /#([^\s#.,!?;:]+)/g;

// Component to parse and render the script
function ScriptRenderer({ script }: { script: string }) {
  const { dialogueParts, summary } = useMemo(() => {
    const cleanedScript = script.replace(/```markdown|```/g, "").trim();

    let dialogueScript = cleanedScript;
    let summaryScript = "";

    const summaryMarker = "[상황 정리]";
    const summaryIndex = cleanedScript.indexOf(summaryMarker);

    if (summaryIndex !== -1) {
      dialogueScript = cleanedScript.substring(0, summaryIndex).trim();
      summaryScript = cleanedScript
        .substring(summaryIndex + summaryMarker.length)
        .trim();
    }

    const dialogueLines = dialogueScript
      .split("\n")
      .filter((line) => line.trim().startsWith("**"));
    const parsedDialogue = dialogueLines.map((line) => {
      const match = line.match(/^\s*\*\*(.*?):\*\*\s*(.*)/);
      const contentWithTags = (match?.[2] || "").trim();
      const content = contentWithTags.replace(valueTagRegex, "").trim();
      const tags = [...contentWithTags.matchAll(valueTagRegex)].map(m => m[1]);

      return {
        speaker: (match?.[1] || "Unknown").trim(),
        content,
        tags,
      };
    });

    return { dialogueParts: parsedDialogue, summary: summaryScript };
  }, [script]);

  const getIcon = (speaker: string) => {
    if (speaker.includes("리더")) return <Bot className="w-5 h-5" />;
    if (speaker.includes("구성원")) return <User className="w-5 h-5" />;
    return <Users className="w-5 h-5" />;
  };

  return (
    <div className="space-y-4">
      {dialogueParts.map((part, index) => {
        const isLeader = part.speaker.includes("리더");
        return (
          <div
            key={index}
            className={`flex gap-3 ${isLeader ? "" : "flex-row-reverse"}`}
          >
            <div
              className={`p-2 rounded-full h-fit ${
                isLeader ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {getIcon(part.speaker)}
            </div>
            <div
              className={`w-full p-4 rounded-lg ${
                isLeader ? "bg-primary/10" : "bg-muted"
              }`}
            >
              <p className="font-semibold text-sm mb-2">{part.speaker}</p>
              <p className="text-sm whitespace-pre-line">{part.content}</p>
              {part.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {part.tags.map(tag => <Badge key={tag} variant="secondary">#{tag}</Badge>)}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {summary && (
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2">[상황 정리]</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {summary}
          </p>
        </div>
      )}
    </div>
  );
}

export function ScenarioPreview({ scenario, onReset }: ScenarioPreviewProps) {
  const router = useRouter();
  const startAssessment = useScenarioStore(
    (state) => state.startAssessmentWithScenario
  );

  const handleStartAssessment = () => {
    // Start assessment with the full script, including tags, to give AI full context
    const cleanText = scenario.scriptMd
      .replace(/\*\*.*?\:\*\*/g, "") // Remove speaker markdown
      .replace(/#([^\s#.,!?;:]+)/g, "") // Remove tags
      .replace(/\[상황 정리\]/g, "") // Remove summary marker
      .trim();
    startAssessment(cleanText);
    router.push("/assess");
  };

  const uniqueTags = useMemo(() => {
    const matches = [...scenario.scriptMd.matchAll(valueTagRegex)];
    const tags = matches.map((m) => m[1].trim().replace(/[.,!?;:]+$/, ""));
    return [...new Set(tags)];
  }, [scenario.scriptMd]);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>생성된 대화 시나리오</CardTitle>
          </CardHeader>
          <CardContent>
            <ScriptRenderer script={scenario.scriptMd} />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>등장한 핵심 가치</CardTitle>
          </CardHeader>
          <CardContent>
            {uniqueTags.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                태그를 찾을 수 없습니다.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {uniqueTags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <div className="text-center space-y-2">
          <Button onClick={handleStartAssessment} className="w-full">
            이 시나리오로 진단하기
          </Button>
          <Button onClick={onReset} className="w-full" variant="outline">
            새로운 시나리오 만들기
          </Button>
        </div>
      </div>
    </div>
  );
}
