import { create } from 'zustand';
import { Assessment } from '@/types';
import { toast } from 'sonner';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AssessState {
  isStarting: boolean; // For initial text submission
  isChatLoading: boolean; // For waiting on AI message
  isAssessing: boolean; // For final assessment
  error: string | null;
  result: Assessment | null;
  messages: ChatMessage[];
  initialText: string | null;
  startConversation: (input: { text: string; sample?: string; tags?: string[] }) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  runAssessment: () => Promise<void>;
  reset: () => void;
}

export const useAssessStore = create<AssessState>((set, get) => ({
  isStarting: false,
  isChatLoading: false,
  isAssessing: false,
  error: null,
  result: null,
  messages: [],
  initialText: null,
  
  startConversation: async (input) => {
    const textToUse = input.text || input.sample || '';
    if (!textToUse) return;

    set({ isStarting: true, result: null, messages: [], initialText: textToUse });
    
    // This function now only starts the chat.
    const { initialText } = get();
    if (!initialText) {
      set({ isStarting: false });
      return;
    }
    
    set({ isChatLoading: true });
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [], userContext: initialText }),
      });
      const data = await response.json();
      set({
        messages: [{ role: 'assistant', content: data.message }],
        isChatLoading: false,
      });
    } catch (error) {
      set({ isChatLoading: false });
      toast.error("대화 시작 중 오류가 발생했습니다.");
    } finally {
      set({ isStarting: false });
    }
  },

  sendMessage: async (message: string) => {
    const { initialText, messages } = get();
    if (!initialText) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: message }];
    set({ messages: newMessages, isChatLoading: true });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, userContext: initialText }),
      });
      const data = await response.json();
      set((state) => ({
        messages: [...state.messages, { role: 'assistant', content: data.message }],
        isChatLoading: false,
      }));
    } catch (error) {
       set({ isChatLoading: false });
       toast.error("메시지 전송 중 오류가 발생했습니다.");
    }
  },

  runAssessment: async () => {
    const { messages } = get();
    if (messages.length === 0) {
      toast.error("분석할 대화 내용이 없습니다.");
      return;
    }
    set({ isAssessing: true });
    try {
      // Format messages into a single string for the assess API
      const conversationText = messages.map(m => `${m.role === 'user' ? '나' : '팀장'}: ${m.content}`).join('\n');
      
      const response = await fetch('/api/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: conversationText }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || 'Failed to get assessment from server.');
      }
      
      const resultData = await response.json();
      const finalResult: Assessment = {
        id: `asmt_${Date.now()}`,
        input: { text: conversationText },
        createdAt: new Date().toISOString(),
        ...resultData,
      };

      set({ result: finalResult });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: errorMessage });
      toast.error("진단 중 오류가 발생했습니다.", {
        description: errorMessage,
      });
    } finally {
      set({ isAssessing: false });
    }
  },
  
  reset: () => set({ result: null, isStarting: false, isChatLoading: false, isAssessing: false, error: null, messages: [], initialText: null }),
}));
