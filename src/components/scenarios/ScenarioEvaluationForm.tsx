"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useScenarioStore } from "@/stores/useScenarioStore";
import { ScenarioDisplay } from "./ScenarioDisplay"; // 새로 만든 컴포넌트 임포트
import { Separator } from "@/components/ui/separator"; // 구분선 추가

const evaluationSchema = z.object({
  scores: z.object({
    leader: z.number(),
    senior: z.number(),
    manager: z.number(),
  }),
  opinions: z.object({
    leader: z.string(),
    senior: z.string(),
    manager: z.string(),
  }),
});

type EvaluationFormValues = z.infer<typeof evaluationSchema>;

const roles = [
  { key: "leader", name: "리더" },
  { key: "senior", name: "책임" },
  { key: "manager", name: "매니저" },
] as const;

export function ScenarioEvaluationForm() {
  const { result, setScores, setOpinions, goToStep, reset } = useScenarioStore();

  const form = useForm<EvaluationFormValues>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      scores: { leader: 3, senior: 3, manager: 3 },
      opinions: { leader: "", senior: "", manager: "" },
    },
  });

  const onSubmit = (data: EvaluationFormValues) => {
    setScores(data.scores);
    setOpinions(data.opinions);
    goToStep("result");
  };

  if (!result) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>AI 생성 시나리오</CardTitle>
          <CardDescription>
            아래 대화 내용을 읽고, 각 인물의 대처 방식에 대해 평가해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* ReactMarkdown 대신 새로 만든 ScenarioDisplay 사용 */}
          <ScenarioDisplay script={result} />

          <Separator />

          <div>
            <h2 className="text-xl font-bold mb-4">시나리오 셀프 평가</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {roles.map((role) => (
                  <div
                    key={role.key}
                    className="space-y-4 p-4 border rounded-md bg-background"
                  >
                    <h3 className="font-semibold text-lg">{role.name}</h3>
                    <FormField
                      control={form.control}
                      name={`scores.${role.key}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>역할 수행 점수: {field.value}점</FormLabel>
                          <Slider
                            min={1} max={5} step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`opinions.${role.key}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>의견</FormLabel>
                          <Textarea
                            placeholder={`${role.name}의 어떤 행동이 인상 깊었나요? 아쉬운 점은 없었나요?`}
                            {...field}
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => reset()}
                  >
                    다시 생성
                  </Button>
                  <Button type="submit">평가 완료</Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
