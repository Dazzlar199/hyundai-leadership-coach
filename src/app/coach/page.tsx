"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ValueFilter } from "@/components/coach/ValueFilter";
import { CoachingCardList } from "@/components/coach/CoachingCardList";
import { mockCoachingData } from "@/data/mock-coaching-data";
import { ValueKey } from "@/types";

export default function CoachPage() {
  const [selectedValue, setSelectedValue] = useState<ValueKey | "all">("all");

  const filteredData = selectedValue === "all"
    ? mockCoachingData
    : mockCoachingData.filter(item => item.value === selectedValue);

  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-8 p-4">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">리더십 코칭 라이브러리</h1>
            <p className="text-muted-foreground mt-2">
              10대 핵심 가치를 기반으로 당신의 리더십을 강화해보세요.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-4">가치 필터</h2>
            <ValueFilter
              selectedValue={selectedValue}
              onValueChange={setSelectedValue}
            />
          </div>

          <div>
            <CoachingCardList items={filteredData} />
          </div>
        </div>
      </main>
    </>
  );
}
