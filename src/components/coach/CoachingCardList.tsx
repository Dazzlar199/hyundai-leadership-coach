"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "../ui/badge";

interface CoachingCardListProps {
  items: {
    title: string;
    summary: string;
    description: string;
    dailyMission: string;
    weeklyGoal: string;
    value?: string;
  }[];
}

export function CoachingCardList({ items }: CoachingCardListProps) {

  if (!items || items.length === 0) {
    return <p className="text-muted-foreground text-center py-8">코칭 제안을 생성하는 중이거나, 제안할 항목이 없습니다.</p>;
  }

  const defaultValues = items.length > 0 ? [items[0].title] : [];

  return (
    <Accordion type="multiple" defaultValue={defaultValues} className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.title} value={item.title}>
          <AccordionTrigger>
            <div className="flex justify-between items-center w-full pr-4">
              <span className="text-left font-semibold">{item.title}</span>
              {item.value && <Badge variant="secondary">{item.value}</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <p className="text-sm font-semibold text-primary">{item.summary}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              
              <div className="p-4 bg-muted/50 rounded-md space-y-2">
                <div>
                  <h4 className="font-semibold text-xs text-muted-foreground mb-1">오늘의 10분 미션</h4>
                  <p className="text-sm">{item.dailyMission}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-muted-foreground mb-1">이번 주 목표</h4>
                  <p className="text-sm">{item.weeklyGoal}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
