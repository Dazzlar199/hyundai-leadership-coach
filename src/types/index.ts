// 10대 핵심 가치 키
export const CORE_VALUES = [
  "SafetyQuality",
  "Perseverance",
  "Experimentation",
  "Agility",
  "Collaboration",
  "Resilience",
  "DEI",
  "Expertise",
  "Ethics",
  "DataThinking",
] as const;

export type ValueKey = typeof CORE_VALUES[number];

// 가치별 점수
export type ValueScore = {
  key: ValueKey;
  score: 0 | 1 | 2 | 3 | 4 | 5;
  evidence?: string[];
};

// 리더 성향 진단 결과
export type Assessment = {
  id: string;
  input: Record<string, unknown>;
  scores: ValueScore[];
  coaching: any[];
  missions: any[];
  createdAt: string;
};

// 대화 시나리오
export type Scenario = {
  id: string;
  input: ScenarioInput;
  scriptMd: string;
  createdAt: string;
};

// 가치/룰셋/프롬프트
export type RuleSet = {
  version: string;
  values: { key: string; label: string }[];
  prompts: Record<string, unknown>;
};

export type ScenarioInput = {
  situation: string;
  tone: string;
  turns: number;
};

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};
