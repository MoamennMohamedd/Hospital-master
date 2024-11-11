// src/global.d.ts

declare global {
    interface Window {
      SpeechRecognition: typeof SpeechRecognition | undefined;
      webkitSpeechRecognition: typeof SpeechRecognition | undefined;
    }
  }
  
  // Define SpeechRecognition and related types
  type SpeechRecognition = {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  };
  
  interface SpeechRecognitionEvent {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
  }
  
  interface SpeechRecognitionErrorEvent {
    readonly error: string;
    readonly message: string;
  }
  
  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }
  
  interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
  }
  
  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }
  
  export {};
  