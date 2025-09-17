"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVoiceStore } from "@/stores/useVoiceStore";
import { useEffect } from "react";

export function VoiceResult() {
  const status = useVoiceStore((state) => state.status);
  const userTranscript = useVoiceStore((state) => state.userTranscript);
  const aiAnswer = useVoiceStore((state) => state.aiAnswer);
  const speakAnswer = useVoiceStore((state) => state.speakAnswer);
  const reset = useVoiceStore((state) => state.reset);
  
  useEffect(() => {
    if (status === 'speaking') {
      speakAnswer(reset); // Call reset when speaking ends
    }
  }, [status, speakAnswer, reset]);

  if (status !== 'speaking' && status !== 'processing') {
    return null;
  }
  
  if (!userTranscript || !aiAnswer) return null;

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>대화 내용</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-semibold">당신의 질문:</p>
          <p className="text-muted-foreground p-3 bg-muted rounded-md">{userTranscript}</p>
        </div>
        <div>
          <p className="font-semibold">AI 코치의 답변:</p>
          <p className="text-muted-foreground p-3 bg-muted rounded-md whitespace-pre-wrap">{aiAnswer}</p>
        </div>
      </CardContent>
    </Card>
  );
}
