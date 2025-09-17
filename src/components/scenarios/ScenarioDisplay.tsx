"use client";

import { User, UserCog, UserSquare } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ScenarioDisplayProps {
  script: string;
}

const getSpeakerInfo = (speaker: string) => {
  if (speaker.includes("리더")) {
    return {
      icon: <UserCog className="h-6 w-6 text-blue-500" />,
      name: "리더",
    };
  }
  if (speaker.includes("구성원 A")) {
    return {
      icon: <UserSquare className="h-6 w-6 text-green-500" />,
      name: "구성원 A (책임/과장급)",
    };
  }
  if (speaker.includes("구성원 B")) {
    return {
      icon: <User className="h-6 w-6 text-yellow-500" />,
      name: "구성원 B (매니저/대리급)",
    };
  }
  return { icon: null, name: speaker };
};

export function ScenarioDisplay({ script }: ScenarioDisplayProps) {
  const lines = script
    .split("\n")
    .filter(
      (line) =>
        line.trim() !== "" && !line.startsWith("[") && !line.startsWith("---")
    );

  return (
    <div className="space-y-6 rounded-lg border bg-background p-4 sm:p-6">
      {lines.map((line, index) => {
        const match = line.match(/\*\*(.*?)\*\*:\s*(.*)/);
        if (match) {
          const [, speaker, dialogue] = match;
          const [text, ...tags] = dialogue.split("#");
          const speakerInfo = getSpeakerInfo(speaker);

          return (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">{speakerInfo.icon}</div>
              <div className="flex-1">
                <p className="font-bold">{speakerInfo.name}</p>
                <p className="mt-1 text-muted-foreground">{text.trim()}</p>
                {tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        }
        return null; // Or render as plain text if format doesn't match
      })}
    </div>
  );
}
