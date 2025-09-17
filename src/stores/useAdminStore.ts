import { create } from 'zustand';
import { RuleSet } from '@/types';
import { toast } from "sonner";

interface AdminState {
  rules: RuleSet | null;
  isLoading: boolean;
  error: string | null;
  fetchRules: () => Promise<void>;
  saveRules: (updatedRules: RuleSet) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  rules: null,
  isLoading: false,
  error: null,
  fetchRules: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/rules');
      if (!response.ok) throw new Error('Failed to fetch rules.');
      const data: RuleSet = await response.json();
      set({ rules: data, isLoading: false });
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      set({ error: msg, isLoading: false });
      toast.error('규칙을 불러오는 데 실패했습니다.');
    }
  },
  saveRules: async (updatedRules) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRules),
      });
      if (!response.ok) throw new Error('Failed to save rules.');
      set({ rules: updatedRules, isLoading: false });
      toast.success('규칙이 성공적으로 저장되었습니다.');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      set({ error: msg, isLoading: false });
      toast.error('규칙 저장에 실패했습니다.');
    }
  },
}));
