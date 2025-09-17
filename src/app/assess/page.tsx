"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AssessResult } from '@/components/assess/AssessResult';
import { useAssessStore } from '@/stores/useAssessStore';
import { useScenarioStore } from '@/stores/useScenarioStore';
import { Navbar } from '@/components/layout/Navbar';

export default function AssessPage() {
  const router = useRouter();
  const { initialText, startConversation } = useAssessStore();
  const { selectedScenarioText, startAssessmentWithScenario } = useScenarioStore();

  useEffect(() => {
    // If there's a scenario text, start the conversation.
    if (selectedScenarioText && !initialText) {
      startConversation({ text: selectedScenarioText });
      startAssessmentWithScenario(''); // Clear the scenario text to prevent re-triggering
    } 
    // If the user lands here directly without a scenario, redirect them to start the flow.
    else if (!selectedScenarioText && !initialText) {
      router.replace('/scenarios');
    }
  }, [selectedScenarioText, initialText, startConversation, startAssessmentWithScenario, router]);


  // Only show the chat/result view if a conversation has been initiated.
  // Otherwise, the useEffect will handle redirection.
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-8 p-4">
        {initialText ? <AssessResult /> : <div className="text-center p-8">페이지를 이동하는 중입니다...</div>}
      </main>
    </>
  );
}
