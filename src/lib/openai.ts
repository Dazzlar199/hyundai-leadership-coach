import OpenAI from 'openai';
import { z } from 'zod';
import { CORE_VALUES } from '@/types';

// Zod 스키마 정의 (데이터 유효성 검증용으로 계속 사용)
const assessSchema = z.object({
  scores: z.array(z.object({
    key: z.enum(CORE_VALUES),
    score: z.number().min(0).max(5),
    evidence: z.array(z.string()),
  })).min(5).describe("10대 핵심 가치별 점수 및 근거 (최소 5개 이상)"),
  coaching: z.array(z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string().describe("코칭 제안에 대한 구체적인 설명"),
    dailyMission: z.string().describe("오늘 바로 실천할 수 있는 10분 내외의 간단한 미션"),
    weeklyGoal: z.string().describe("이번 주 동안 달성할 구체적인 주간 목표"),
  })).describe("리더십 개선을 위한 3가지 구체적인 코칭 포인트"),
  missions: z.array(z.string()).describe("다음 1주 동안 실천할 수 있는 구체적인 미션"),
});

// OpenAI Function Calling을 위한 JSON 스키마 직접 정의
const assessJsonSchema = {
  type: 'object',
  properties: {
    scores: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            enum: CORE_VALUES,
          },
          score: {
            type: 'number',
            minimum: 0,
            maximum: 5,
          },
          evidence: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        required: ['key', 'score', 'evidence'],
      },
      minItems: 10,
      maxItems: 10,
      description: "10대 핵심 가치별 점수 및 근거",
    },
    coaching: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
          },
          summary: {
            type: 'string',
          },
          description: {
            type: 'string',
            description: "코칭 제안에 대한 구체적인 설명",
          },
          dailyMission: {
            type: 'string',
            description: "오늘 바로 실천할 수 있는 10분 내외의 간단한 미션",
          },
          weeklyGoal: {
            type: 'string',
            description: "이번 주 동안 달성할 구체적인 주간 목표",
          },
        },
        required: ['title', 'summary', 'description', 'dailyMission', 'weeklyGoal'],
      },
      description: "리더십 개선을 위한 3가지 구체적인 코칭 포인트",
    },
    missions: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: "다음 1주 동안 실천할 수 있는 구체적인 미션",
    },
  },
  required: ['scores', 'coaching', 'missions'],
};

let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} else {
  console.warn("OPENAI_API_KEY is not set. AI features will be disabled.");
}


// AI 리더십 분석 함수
export async function analyzeLeadership(text: string, systemPrompt: string) {
  if (!openai) {
    throw new Error('OpenAI API key is not configured.');
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text },
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'format_assessment',
          description: 'Formats the leadership assessment results.',
          parameters: assessJsonSchema,
        },
      },
    ],
    tool_choice: {
      type: 'function',
      function: { name: 'format_assessment' },
    },
    temperature: 0.5,
  });

  const toolCalls = response.choices[0].message.tool_calls;
  if (toolCalls && toolCalls[0].type === 'function') {
    const result = JSON.parse(toolCalls[0].function.arguments);
    return assessSchema.parse(result); // Zod로 한 번 더 검증
  }
  throw new Error('Failed to get a structured response from AI.');
}

// New generateScenario function
export async function generateScenario({
  situation,
  tone,
  turns,
  systemPrompt
}: {
  situation: string;
  tone: string;
  turns: number;
  systemPrompt: string;
}) {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }

  const safeSituation = typeof situation === 'string' ? situation : '';
  const safeTone = typeof tone === 'string' ? tone : 'balanced';
  const safeTurns = Number.isFinite(Number(turns)) ? Number(turns) : 10;
  const safeSystem = typeof systemPrompt === 'string' && systemPrompt.length > 0
    ? systemPrompt
    : '당신은 교육용 시나리오 작가입니다. 리더와 구성원 간의 대화 시나리오를 작성하세요. 각 대사 끝에는 관련된 핵심 가치를 #태그로 달아주세요. 마지막에는 [상황 정리]를 3줄로 요약하세요. 결과는 Markdown 형식.';

  const userPrompt = [
    '다음 조건으로 8~12턴 대화 시나리오를 생성해주세요.',
    `- 상황: ${safeSituation}`,
    `- 어조: ${safeTone}`,
    `- 길이(턴): ${safeTurns}`,
    '- 각 대사 끝에 관련 핵심 가치를 #태그로 달고, 마지막에 [상황 정리] 3줄을 작성하세요.',
  ].join('\n');

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: String(safeSystem) },
      { role: 'user', content: String(userPrompt) },
    ],
    temperature: 0.8,
  });

  const scriptMd = response.choices?.[0]?.message?.content ?? '';

  if (!scriptMd) {
    return null;
  }

  return {
    id: `scen_${Date.now()}`,
    input: { situation: safeSituation, tone: safeTone, turns: safeTurns },
    scriptMd,
    createdAt: new Date().toISOString(),
  };
}
