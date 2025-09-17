import { create } from 'zustand';
import { mockVoiceResult } from '@/data/mock-voice-data';

type VoiceStatus = 'idle' | 'recording' | 'processing' | 'speaking' | 'error';

interface VoiceState {
  status: VoiceStatus;
  error: string | null;
  userTranscript: string | null;
  aiAnswer: string | null;
  startRecording: () => void;
  stopRecording: () => Promise<void>;
  speakAnswer: (onEnd: () => void) => void;
  reset: () => void;
}

export const useVoiceStore = create<VoiceState>((set, get) => ({
  status: 'idle',
  error: null,
  userTranscript: null,
  aiAnswer: null,
  
  startRecording: () => {
    set({ status: 'recording', error: null, userTranscript: null, aiAnswer: null });
  },

  stopRecording: async () => {
    set({ status: 'processing' });
    try {
      // STT 및 AI 답변 생성 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      set({
        status: 'speaking',
        userTranscript: mockVoiceResult.stt,
        aiAnswer: mockVoiceResult.answer,
      });
    } catch (err) {
      set({ status: 'error', error: '음성 처리에 실패했습니다.' });
    }
  },

  speakAnswer: (onEnd) => {
    const textToSpeak = get().aiAnswer;
    if (!textToSpeak || typeof window === 'undefined' || !window.speechSynthesis) {
      if(onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'ko-KR';
    utterance.pitch = 1;
    utterance.rate = 1;
    
    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.cancel(); // 이전 발화 취소
    window.speechSynthesis.speak(utterance);
  },

  reset: () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    set({ status: 'idle', error: null, userTranscript: null, aiAnswer: null });
  },
}));
