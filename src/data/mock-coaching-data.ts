import { ValueKey } from "@/types";

export interface CoachingItem {
  id: string;
  value: ValueKey;
  title: string;
  summary: string;
  description: string;
  dailyMission: string;
  weeklyGoal: string;
  checklist: { id: string; text: string; completed: boolean }[];
}

export const mockCoachingData: CoachingItem[] = [
  // SafetyQuality
  {
    id: "coach_sq_01",
    value: "SafetyQuality",
    title: "품질 기준 명확화",
    summary: "팀원 모두가 동일한 품질 기준을 이해하고 따르도록 명확한 가이드라인을 설정합니다.",
    description: "프로젝트의 성공은 명확하고 공유된 품질 기준에서 시작됩니다. 리더는 팀원들과 함께 '좋은 결과물'이란 무엇인지 정의하고, 이를 측정할 수 있는 구체적인 지표를 만들어야 합니다. 이는 주관적인 판단을 줄이고, 일관성 있는 결과물을 만드는 데 도움이 됩니다.",
    dailyMission: "오늘 팀의 작업물 하나를 검토하며, 품질 기준에 대한 긍정적 피드백 한 가지 전달하기",
    weeklyGoal: "이번 주 내로 팀과 함께 프로젝트의 핵심 품질 기준 3가지를 문서화하고 공유하기",
    checklist: [
      { id: "sq_01_c1", text: "품질 기준 초안 작성", completed: false },
      { id: "sq_01_c2", text: "팀원들과 초안 리뷰 및 피드백 수렴", completed: false },
      { id: "sq_01_c3", text: "최종 품질 기준 확정 및 공지", completed: false },
    ],
  },
  // Perseverance
  {
    id: "coach_ps_01",
    value: "Perseverance",
    title: "장기 목표 분할",
    summary: "크고 어려운 목표를 작고 관리 가능한 단계로 나누어 팀이 지치지 않고 나아가게 합니다.",
    description: "거대한 목표는 팀에게 압도감을 줄 수 있습니다. 리더는 최종 목표를 여러 개의 작은 마일스톤으로 나누어 제시해야 합니다. 각 마일스톤을 달성할 때마다 팀은 성취감을 느끼고, 다음 단계로 나아갈 동력을 얻게 됩니다. 이는 집요함을 유지하는 핵심 전략입니다.",
    dailyMission: "오늘 가장 큰 업무의 다음 단계를 명확히 정의하고 팀원과 공유하기",
    weeklyGoal: "이번 주 프로젝트의 주요 마일스톤을 2개 이상 완료하기",
    checklist: [
      { id: "ps_01_c1", text: "최종 목표 정의", completed: true },
      { id: "ps_01_c2", text: "주요 마일스톤 설정", completed: false },
      { id: "ps_01_c3", text: "각 마일스톤별 담당자 및 기한 설정", completed: false },
    ],
  },
  // ... (다른 가치들에 대한 데이터 추가)
  // Experimentation
  {
    id: "coach_ex_01",
    value: "Experimentation",
    title: "안전한 실패 환경 조성",
    summary: "팀원들이 새로운 시도를 두려워하지 않도록 실패를 학습의 과정으로 인정하는 문화를 만듭니다.",
    description: "혁신은 수많은 실험과 실패 속에서 탄생합니다. 리더는 결과가 좋지 않더라도, 시도 자체의 가치를 인정하고 그 과정에서 무엇을 배웠는지 함께 회고하는 문화를 만들어야 합니다. '실패해도 괜찮다'는 심리적 안정감이 팀의 도전적인 문화를 만듭니다.",
    dailyMission: "오늘 팀원의 작은 아이디어나 제안에 대해 '좋은 시도네요!'라고 격려하기",
    weeklyGoal: "이번 주, 실패한 실험에 대한 회고 미팅을 진행하고, 배운 점 3가지를 정리하여 공유하기",
    checklist: [
      { id: "ex_01_c1", text: "실험 목표 및 가설 설정", completed: false },
      { id: "ex_01_c2", text: "실험 결과 분석 및 공유", completed: false },
      { id: "ex_01_c3", text: "실패 원인 분석이 아닌, '배운 점'에 초점 맞추기", completed: false },
    ],
  },
];
