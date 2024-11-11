'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MicOff } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

// Type definitions for Web Speech API
interface SpeechRecognitionErrorEvent extends Event {
  error: SpeechRecognitionErrorEvent;
  message: string;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  start(): void;
  stop(): void;
}

interface Window {
  SpeechRecognition: {
    new (): SpeechRecognition;
  };
  webkitSpeechRecognition: {
    new (): SpeechRecognition;
  };
}

export default function VoiceRecognition() {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [recognizedText, setRecognizedText] = useState<string>('')
  const [language, setLanguage] = useState<string>('ar-SA')
  const [storedTexts, setStoredTexts] = useState<string[]>([])
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  
  const { toast } = useToast()

  const isArabic = language === 'ar-SA'
  
  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    let interimTranscript = ''
    let finalTranscript = ''

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript
      } else {
        interimTranscript += event.results[i][0].transcript
      }
    }

    setRecognizedText(finalTranscript || interimTranscript)
  }, [])

  const handleError = useCallback((event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error', event.error)
    setIsRecording(false)
  }, [])
  
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = language
        recognitionRef.current.onresult = handleResult
        recognitionRef.current.onerror = handleError
      }
    } else {
      console.log('Speech recognition not supported')
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [language, handleResult, handleError])

  const toggleRecording = useCallback(() => {
    if (recognitionRef.current) {
      if (isRecording) {
        recognitionRef.current.stop()
        setStoredTexts(prev => [...prev, recognizedText])
        toast({
          title: isArabic ? "تم حفظ النص" : "Text Saved",
          description: isArabic ? "تم حفظ النص المتعرف عليه" : "The recognized text has been saved",
        })
      } else {
        recognitionRef.current.start()
        setRecognizedText('')
      }
      setIsRecording(!isRecording)
    }
  }, [isRecording, recognizedText, isArabic, toast])

  const handleLanguageChange = useCallback((value: string) => {
    setLanguage(value)
    if (recognitionRef.current) {
      recognitionRef.current.lang = value
    }
    setRecognizedText('')
  }, [])

  return (
    <div className={`flex flex-col items-center justify-center p-4 pt-28 ${isArabic ? 'font-arabic' : 'font-sans'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {isArabic ? 'خدمة التعرف على الصوت' : 'Voice Recognition Service'}
        </h1>
        <Select onValueChange={handleLanguageChange} value={language}>
          <SelectTrigger className="w-full bg-[#E5F6FF]">
            <SelectValue placeholder={isArabic ? 'اختر اللغة' : 'Select Language'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ar-SA">العربية</SelectItem>
            <SelectItem value="en-US">English</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          onClick={toggleRecording}
          className={`w-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isRecording ? (
            <>
              <MicOff className={`${isArabic ? 'ml-2' : 'mr-2'} h-4 w-4 `} />
              <span>{isArabic ? 'إيقاف التسجيل' : 'Stop Recording'}</span>
            </>
          ) : (
            <>
              <Mic className={`${isArabic ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              <span>{isArabic ? 'بدء التسجيل' : 'Start Recording'}</span>
            </>
          )}
        </Button>
        <Textarea
          value={recognizedText}
          onChange={(e) => setRecognizedText(e.target.value)}
          placeholder={isArabic ? 'سيظهر النص المتعرف عليه هنا...' : 'Recognized text will appear here...'}
          className="w-full h-40 p-2 border rounded"
        />
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">
            {isArabic ? 'النصوص المحفوظة' : 'Stored Texts'}
          </h2>
          {storedTexts.map((text, index) => (
            <div key={index} className="p-2 bg-white rounded shadow">
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}