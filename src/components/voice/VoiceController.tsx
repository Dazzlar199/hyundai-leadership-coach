"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRecorder } from "@/hooks/use-recorder";
import { useVoiceStore } from "@/stores/useVoiceStore";
import { Mic, MicOff, Square } from "lucide-react";
import { useEffect } from "react";

function RecordingVisualizer() {
  return (
    <div className="flex justify-center items-center h-20 w-full">
      <div className="relative flex justify-center items-center w-24 h-24 rounded-full bg-primary/20">
        <div className="absolute w-full h-full rounded-full bg-primary/20 animate-ping"></div>
        <Mic className="h-10 w-10 text-primary" />
      </div>
    </div>
  );
}

export function VoiceController() {
  const status = useVoiceStore((state) => state.status);
  const startRecordingInStore = useVoiceStore((state) => state.startRecording);
  const stopRecordingInStore = useVoiceStore((state) => state.stopRecording);
  const reset = useVoiceStore((state) => state.reset);
  
  const handleStop = () => {
    // In a real app, you would pass the blob to the store:
    // stopRecordingInStore(audioBlob);
    stopRecordingInStore();
  };

  const { startRecording, stopRecording, isRecording } = useRecorder(handleStop);

  useEffect(() => {
    // Sync store state with recorder hook
    if (status === 'recording' && !isRecording) {
      startRecording();
    }
    if (status !== 'recording' && isRecording) {
      stopRecording();
    }
  }, [status, isRecording, startRecording, stopRecording]);

  const renderContent = () => {
    switch (status) {
      case 'recording':
        return (
          <>
            <RecordingVisualizer />
            <p className="text-center text-muted-foreground mt-4">녹음 중...</p>
            <Button onClick={stopRecording} variant="destructive" className="mt-4 w-full">
              <Square className="mr-2 h-4 w-4" /> 녹음 중지
            </Button>
          </>
        );
      case 'processing':
        return (
          <div className="text-center">
            <p>음성을 분석하고 답변을 생성하는 중입니다...</p>
          </div>
        );
      case 'speaking':
        return (
           <div className="text-center">
            <p>답변을 재생합니다. 잠시 후 다시 시도할 수 있습니다.</p>
          </div>
        );
      case 'error':
         return (
           <div className="text-center">
            <p className="text-destructive">오류가 발생했습니다.</p>
            <Button onClick={reset} className="mt-4">다시 시도</Button>
          </div>
        );
      case 'idle':
      default:
        return (
          <>
            <p className="text-center text-muted-foreground">아래 버튼을 누르고 질문을 녹음하세요.</p>
            <Button onClick={startRecordingInStore} className="mt-8 w-full">
              <Mic className="mr-2 h-4 w-4" /> 녹음 시작
            </Button>
          </>
        );
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>음성 코칭</CardTitle>
        <CardDescription>리더십에 대해 궁금한 점을 음성으로 질문하세요.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[200px] flex flex-col justify-center items-center">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
