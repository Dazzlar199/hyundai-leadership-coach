"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useScenarioStore } from "@/stores/useScenarioStore";
import { mockRandomScenarios } from "@/data/mock-random-scenarios";
import { Loader2, Wand2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  situation: z
    .string()
    .min(10, { message: "최소 10자 이상 구체적으로 작성해주세요." }),
  tone: z.string().default('balanced'),
  turns: z.number().min(8).max(12).default(10),
});

export function ScenarioForm() {
  const { generateScenario, isLoading } = useScenarioStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      situation: "",
      tone: "balanced",
      turns: 10,
    },
  });

  const handleRandomClick = () => {
    const randomScenario =
      mockRandomScenarios[Math.floor(Math.random() * mockRandomScenarios.length)];
    form.setValue("situation", randomScenario);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    generateScenario(values);
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>대화 시나리오 생성</CardTitle>
        <CardDescription>
          리더십 역량 진단을 위한 가상 대화 시나리오를 생성합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="situation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>어떤 상황을 가정해볼까요?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="예: 성과가 부진한 팀원에게 피드백을 주어야 하는 상황"
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>대화 어조</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="대화의 전반적인 분위기를 선택하세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="assertive">단호함</SelectItem>
                        <SelectItem value="balanced">균형적</SelectItem>
                        <SelectItem value="empathetic">공감적</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="turns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>대화 길이 (턴 수: {field.value})</FormLabel>
                    <FormControl>
                      <Slider
                        min={8}
                        max={12}
                        step={2}
                        value={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleRandomClick}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              랜덤 시나리오 보기
            </Button>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  생성 중...
                </>
              ) : (
                "시나리오 생성하기"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
