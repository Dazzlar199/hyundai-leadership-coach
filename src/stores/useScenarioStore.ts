import { create } from 'zustand';
import { Scenario } from '@/types';
import { toast } from 'sonner';

interface ScenarioState {
  isLoading: boolean;
  error: string | null;
  scenario: Scenario | null;
  selectedScenario: { text: string; tone: string; } | null;
  generateScenario: (params: { situation: string; tone: string; turns: number }) => Promise<void>;
  startAssessmentWithScenario: (data: { text: string; tone: string; }) => void;
  reset: () => void;
}

export const useScenarioStore = create<ScenarioState>((set) => ({
  isLoading: false,
  error: null,
  scenario: null,
  selectedScenario: null,
  generateScenario: async (params) => {
    set({ isLoading: true, error: null, scenario: null });
    try {
      const response = await fetch('/api/scenarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to generate scenario');
      }

      const result = await response.json();
      set({ scenario: result, isLoading: false });
    } catch (error) {
      const errorMessage = '시나리오 생성 중 오류가 발생했습니다.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },
  startAssessmentWithScenario: (data) => {
    set({ selectedScenario: data });
  },
  reset: () => set({ scenario: null, isLoading: false, error: null, selectedScenario: null }),
}));
