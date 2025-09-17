import type { Assessment, Scenario, ValueScore, ValueKey } from "@/types";

const createMockScores = (): ValueScore[] => {
  const keys: ValueKey[] = [
    "SafetyQuality", "Perseverance", "Experimentation", "Agility",
    "Collaboration", "Resilience", "DEI", "Expertise", "Ethics", "DataThinking"
  ];
  return keys.map(key => ({
    key,
    score: Math.floor(Math.random() * 4) + 1, // 1~4점
    reason: `[${key}] 가치에 대한 구체적인 행동 근거 문장입니다.`
  }));
};

const mockAssessment: Assessment = {
  id: "asmt_12345",
  input: { text: "제가 최근에 팀원들과 함께 신규 프로젝트를 진행하면서..." },
  scores: createMockScores(),
  coaching: [
    {
      title: "피드백의 기술",
      summary: "구성원의 성장을 돕는 구체적이고 건설적인 피드백 방법을 연습합니다.",
      description: "피드백은 행동 변화의 출발점입니다. 관찰된 사실과 구체적 행동에 기반한 피드백이 효과적입니다.",
      dailyMission: "오늘 동료 한 명에게 구체적인 칭찬 한 가지 하기",
      weeklyGoal: "이번 주 내로 팀원 전체에게 한 번 이상 긍정적 피드백 제공하기",
      value: "Expertise"
    },
    {
      title: "민첩한 의사결정",
      summary: "정보가 불완전한 상황에서도 신속하게 판단하고 실행하는 훈련을 합니다.",
      description: "완벽한 정보는 오지 않습니다. 핵심 정보를 빠르게 정리하고 결정을 내리는 습관이 중요합니다.",
      dailyMission: "5분 안에 사소한 업무 관련 결정 3가지 내리기",
      weeklyGoal: "이번 주 회의에서 의사결정 시간을 20% 단축하기",
      value: "Agility"
    },
    {
      title: "데이터 기반 소통",
      summary: "주관적인 의견보다 데이터를 근거로 팀원들을 설득하고 소통하는 능력은 현대 리더에게 필수적입니다.",
      description: "핵심 지표를 정의하고, 주장마다 정량/정성 데이터를 연결해 소통하세요.",
      dailyMission: "오늘 업무 보고 시, 데이터나 수치를 한 가지 이상 포함하여 이야기하기",
      weeklyGoal: "주간 보고서의 모든 주장을 데이터로 뒷받침하기",
      value: "DataThinking"
    }
  ],
  createdAt: new Date().toISOString(),
};

const mockScenarios: Scenario[] = [
  {
    id: "scn_abcde",
    input: {
      situation: "팀 내 업무 분배 및 피드백",
      tone: 'balanced',
      turns: 10,
    },
    scriptMd: "**리더:** 안녕하세요. #협업\n**구성원 A:** 안녕하세요, 리더님. #소통",
    createdAt: new Date().toISOString(),
  },
  {
    id: "scn_fghij",
    input: {
      situation: "프로젝트 마일스톤 지연 문제 해결",
      tone: 'assertive',
      turns: 8,
    },
    scriptMd: "**리더:** 프로젝트가 지연되고 있습니다. 원인이 무엇인가요? #집요함",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export const MOCK_DATA = {
  assessments: [mockAssessment],
  scenarios: mockScenarios,
};
