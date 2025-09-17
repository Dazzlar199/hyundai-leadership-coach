import { create } from 'zustand';
import { toast } from 'sonner';
import { Assessment, ChatMessage } from '@/types';

interface AssessState {
  isStarting: boolean;
  isChatLoading: boolean;
  isAssessing: boolean;
  error: string | null;
  result: Assessment | null;
  messages: ChatMessage[];
  initialText: string | null;
  tone: string | null;
  startConversation: (input: { text: string; tone: string; }) => Promise<void>;
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
  tone: null,
  startConversation: async ({ text, tone }) => {
    set({
      isStarting: true,
      error: null,
      initialText: text,
      tone: tone, // Store the tone
      messages: [],
      result: null,
    });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [],
          userContext: { initialText: text, tone: tone }, // Pass tone to API
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start conversation');
      }

      const { message } = await response.json();
      set((state) => ({ messages: [...state.messages, message] }));
    } catch (error) {
      const errorMessage = '대화 시작 중 오류가 발생했습니다.';
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isStarting: false });
    }
  },
  sendMessage: async (message) => {
    const userMessage: ChatMessage = { role: 'user', content: message };
    const newMessages = [...get().messages, userMessage];
    set({ messages: newMessages, isChatLoading: true, error: null });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          userContext: { initialText: get().initialText, tone: get().tone }, // Pass tone with every message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const { message: assistantMessage } = await response.json();
      set((state) => ({ messages: [...state.messages, assistantMessage] }));
    } catch (error) {
      const errorMessage = '메시지 전송 중 오류가 발생했습니다.';
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isChatLoading: false });
    }
  },
  runAssessment: async () => {
    set({ isAssessing: true, error: null });
    const { messages, initialText } = get();

    // Construct the full conversation text
    const conversationText = messages
      .map((msg) => `${msg.role === "user" ? "나" : "팀장"}: ${msg.content}`)
      .join("\n");

    try {
      const response = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: initialText, // The initial context
          dialogue: conversationText, // The full conversation
        }),
      });
      if (!response.ok) throw new Error("Assessment failed");
      const result = await response.json();
      set({ result });
    } catch (error) {
      const errorMessage = "진단 결과 생성 중 오류가 발생했습니다.";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isAssessing: false });
    }
  },
  reset: () =>
    set({
      isStarting: false,
      isChatLoading: false,
      isAssessing: false,
      error: null,
      result: null,
      messages: [],
      initialText: null,
      tone: null,
    }),
}));
