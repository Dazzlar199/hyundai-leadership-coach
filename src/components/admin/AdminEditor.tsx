"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAdminStore } from "@/stores/useAdminStore";
import { RuleSet } from "@/types";
import { Loader2 } from "lucide-react";

export function AdminEditor() {
  const { rules, isLoading, fetchRules, saveRules } = useAdminStore();
  const [editedRules, setEditedRules] = useState<string>("");

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  useEffect(() => {
    if (rules) {
      setEditedRules(JSON.stringify(rules, null, 2));
    }
  }, [rules]);

  const handleSave = () => {
    try {
      const parsedRules: RuleSet = JSON.parse(editedRules);
      saveRules(parsedRules);
    } catch (error) {
      alert("JSON 형식이 올바르지 않습니다.");
    }
  };

  if (isLoading && !rules) {
    return <div className="text-center">로딩 중...</div>;
  }
  
  if (!rules) {
    return <div className="text-center text-destructive">데이터를 불러오지 못했습니다.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>규칙 및 프롬프트 관리</CardTitle>
        <CardDescription>
          애플리케이션의 핵심 규칙과 AI 프롬프트를 JSON 형식으로 직접
          수정할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={editedRules}
          onChange={(e) => setEditedRules(e.target.value)}
          className="min-h-[500px] font-mono text-sm"
        />
        <Button onClick={handleSave} disabled={isLoading}>
           {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              저장 중...
            </>
          ) : (
            "변경사항 저장"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
