"use client";

import { Navbar } from "@/components/layout/Navbar";
import { VoiceController } from "@/components/voice/VoiceController";
import { VoiceResult } from "@/components/voice/VoiceResult";
import { useVoiceStore } from "@/stores/useVoiceStore";
import { useEffect } from "react";

export default function VoicePage() {
  const reset = useVoiceStore((state) => state.reset);

  useEffect(() => {
    // 컴포넌트 언마운트 시 상태 초기화 및 TTS 중지
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-8 p-4">
        <div className="space-y-8">
          <VoiceController />
          <VoiceResult />
        </div>
      </main>
    </>
  );
}
