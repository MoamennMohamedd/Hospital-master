'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MicOff } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function VoiceRecognition() {
  const [isRecording, setIsRecording] = useState(false)
  const [recognizedText, setRecognizedText] = useState('')
  const [language, setLanguage] = useState('ar-SA')
  const [storedTexts, setStoredTexts] = useState<string[]>([])
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = language

      recognitionRef.current.onresult = (event) => {
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
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error)
        setIsRecording(false)
      }
    } else {
      console.log('Speech recognition not supported')
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [language])

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop()
      setStoredTexts(prev => [...prev, recognizedText])
      toast({
        title: isArabic ? "تم حفظ النص" : "Text Saved",
        description: isArabic ? "تم حفظ النص المتعرف عليه" : "The recognized text has been saved",
      })
    } else {
      recognitionRef.current?.start()
      setRecognizedText('')
    }
    setIsRecording(!isRecording)
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    if (recognitionRef.current) {
      recognitionRef.current.lang = value
    }
    setRecognizedText('')
  }

  const isArabic = language === 'ar-SA'

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
              {isArabic ? 'إيقاف التسجيل' : 'Stop Recording'}
            </>
          ) : (
            <>
              <Mic className={`${isArabic ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {isArabic ? 'بدء التسجيل' : 'Start Recording'}
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