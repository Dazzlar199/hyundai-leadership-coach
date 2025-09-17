'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { useAssessStore } from '@/stores/useAssessStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DashboardRadarChart } from '../dashboard/DashboardRadarChart';
import { CoachingCardList } from '../coach/CoachingCardList';
import Image from 'next/image';

export function AssessResult() {
  const { 
    result, 
    messages, 
    isChatLoading,
    isAssessing,
    sendMessage,
    runAssessment,
    reset,
    tone,
  } = useAssessStore();
  
  const [userInput, setUserInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() && !isChatLoading) {
      sendMessage(userInput);
      setUserInput('');
    }
  };
  
  const leaderImageSrc = useMemo(() => {
    const toneMap: Record<string, string> = {
      empathetic: 'empathy',
      balanced: 'balance',
      assertive: 'assertive',
    };
    const imageName = tone ? toneMap[tone] : 'balance'; // Default to 'balance' if tone is somehow null
    return `/images/${imageName}.jpeg`;
  }, [tone]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="relative w-24 h-24">
            <Image
              src={leaderImageSrc}
              alt={`${tone}적인 팀장`}
              width={96}
              height={96}
              className="rounded-full object-cover bg-muted"
            />
          </div>
          <div>
            <CardTitle>팀장님과의 1:1 대화</CardTitle>
            <p className="text-muted-foreground">리더십 경험에 대해 더 깊이 이야기해 보세요.</p>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            ref={chatContainerRef}
            className="space-y-4 h-96 overflow-y-auto p-4 border rounded-md mb-4"
          >
            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${item.role === 'user' ? 'justify-end' : ''}`}
              >
                <p className={`p-3 rounded-lg max-w-[80%] ${
                  item.role === 'assistant'
                    ? 'bg-muted'
                    : 'bg-primary text-primary-foreground'
                }`}>
                  {item.content}
                </p>
              </div>
            ))}
            {isChatLoading && (
               <div className="flex items-start gap-2">
                 <p className="p-3 rounded-lg max-w-[80%] bg-muted animate-pulse">...</p>
               </div>
            )}
          </div>
          
          {!result && (
            <div className="flex flex-col gap-2">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  disabled={isChatLoading || isAssessing}
                />
                <Button type="submit" disabled={isChatLoading || isAssessing}>
                  전송
                </Button>
              </form>
              <Button onClick={runAssessment} disabled={isChatLoading || isAssessing}>
                {isAssessing ? '분석 중...' : '대화 종료 및 분석하기'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {result && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>리더십 진단</CardTitle>
            </CardHeader>
            <CardContent>
              <DashboardRadarChart scores={result.scores} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>성장을 위한 코칭 제안</CardTitle>
            </CardHeader>
            <CardContent>
              <CoachingCardList items={result.coaching || []} />
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={reset}>다시 진단하기</Button>
          </div>
        </>
      )}
    </div>
  );
}
