import type { Assessment, ValueScore } from "@/types";
import { CORE_VALUES } from "@/types";

const createMockScores = (): ValueScore[] => {
  return CORE_VALUES.map(key => ({
    key,
    score: Math.floor(Math.random() * 5) + 1 as ValueScore['score'],
    evidence: ["Mock evidence for " + key]
  }));
};

export const mockAssessment: Assessment = {
  id: "asmt_12345",
  input: "Mock user input text.",
  scores: createMockScores(),
  coaching: [
    {
      title: "피드백의 기술",
      summary: "구성원의 성장을 돕는 구체적이고 건설적인 피드백 방법을 연습합니다.",
      mission: "오늘 동료 한 명에게 구체적인 칭찬 한 가지 하기",
      goal: "이번 주 내로 팀원 전체에게 한 번 이상 긍정적 피드백 제공하기",
      value: "Expertise"
    },
    {
      title: "민첩한 의사결정",
      summary: "정보가 불완전한 상황에서도 신속하게 판단하고 실행하는 훈련을 합니다.",
      mission: "5분 안에 사소한 업무 관련 결정 3가지 내리기",
      goal: "이번 주 회의에서 의사결정 시간을 20% 단축하기",
      value: "Agility"
    },
    {
      title: "데이터 기반 소통",
      summary: "주관적인 의견보다 데이터를 근거로 팀원들을 설득하고 소통합니다.",
      mission: "오늘 업무 보고 시, 데이터나 수치를 한 가지 이상 포함하여 이야기하기",
      goal: "주간 보고서의 모든 주장을 데이터로 뒷받침하기",
      value: "DataThinking"
    }
  ],
  missions: [
    "오늘 동료 한 명에게 구체적인 칭찬 한 가지 하기",
    "5분 안에 사소한 업무 관련 결정 3가지 내리기",
    "오늘 업무 보고 시, 데이터나 수치를 한 가지 이상 포함하여 이야기하기"
  ],
  createdAt: new Date().toISOString(),
};

export const mockScenarios = [
  {
    id: "scn_abcde",
    params: {
      topic: "팀 내 업무 분배 및 피드백"
    },
    scriptMd: "...",
    createdAt: new Date().toISOString(),
  },
  {
    id: "scn_fghij",
    params: {
      topic: "프로젝트 마일스톤 지연"
    },
    scriptMd: "...",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 어제
  }
]
