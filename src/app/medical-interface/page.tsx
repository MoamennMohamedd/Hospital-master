'use client'

import { UserRound, Plus, User, ArrowLeftCircle } from "lucide-react"
import Link from "next/link"
import VoiceRecognition from "../components/Recognition"
import CameraFeed from "../components/CameraFeed"

export default function Component() {
  const diagnoses = [
    { name: 'Pneumonia', date: '2023-10-01' },
    { name: 'Asthma', date: '2023-10-01' },
    { name: 'Diabetes', date: '2023-10-01' },
    { name: 'Fracture', date: '2023-10-01' }
  ]

  return (
    <div className="min-h-screen bg-white p-6">
      <header className="mb-12 flex justify-between items-center">
      <div className="text-3xl font-semibold">
            Smart <span className="text-blue-500">Ambulance</span>
          </div>
        <div className="w-8 h-8 bg-white flex items-center justify-center">
          <Link href={"/"} className="bg-white">
            <button className="bg-white">
              <ArrowLeftCircle className="h-10 w-10 bg-white text-blue-500 rounded-full" />
            </button>
          </Link>
        </div>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col">
          <div className="flex items-start mb-8">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#00BCD4]">
              <UserRound className="h-20 w-20 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input 
                type="text"
                placeholder="Patient Name" 
                className="w-full bg-[#E5F6FF] pl-10 py-3 rounded-md"
              />
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>

            <input 
              type="text"
              placeholder="Age" 
              className="w-full bg-[#E5F6FF] py-3 rounded-md px-3"
            />

            <input 
              type="text"
              placeholder="Condition" 
              className="w-full bg-[#E5F6FF] py-3 rounded-md px-3"
            />

            <textarea 
              placeholder="Describe Issue" 
              className="w-full min-h-[150px] bg-slate-300 rounded-md p-3 resize-none"
            />

            <button className="w-full bg-[#0088CC] text-white py-3 rounded-md text-lg hover:bg-[#0088CC]/90 transition-colors">
              Submit
            </button>
          </div>
        </div>
        <div className="space-y-2">
            <VoiceRecognition/>
        </div>

        
      </div>
      <div className="space-x-2">
        <CameraFeed/>
      </div>
    </div>
  )
}