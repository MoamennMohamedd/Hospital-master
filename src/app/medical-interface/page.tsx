'use client'

import { useState } from "react"
import { UserRound, Plus, User, ArrowLeftCircle, X, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Diagnosis {
  id: string
  name: string
  date: string
}

export default function Component() {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([
    { id: '1', name: 'Pneumonia', date: '2023-10-01' },
    { id: '2', name: 'Asthma', date: '2023-10-01' },
    { id: '3', name: 'Diabetes', date: '2023-10-01' },
    { id: '4', name: 'Fracture', date: '2023-10-01' }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newDiagnosis, setNewDiagnosis] = useState({ name: '', date: '' })

  const addDiagnosis = () => {
    if (newDiagnosis.name && newDiagnosis.date) {
      setDiagnoses([...diagnoses, { id: Date.now().toString(), ...newDiagnosis }])
      setNewDiagnosis({ name: '', date: '' })
      setIsModalOpen(false)
    }
  }

  const deleteDiagnosis = (id: string) => {
    setDiagnoses(diagnoses.filter(diagnosis => diagnosis.id !== id))
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <header className="mb-12 flex justify-between items-center">
      <div className="text-3xl font-semibold">
            Smart <span className="text-blue-500">Ambulance</span>
          </div>
        <div className="w-8 h-8 bg-white flex items-center justify-center">
          <Link href={"/condition"} className="bg-white">
            <Button variant="ghost" size="icon" className="bg-white">
              <ArrowLeftCircle className="h-24 w-24 bg-white text-blue-500 rounded-full" />
              <span className="sr-only">Go back</span>
            </Button>
          </Link>
        </div>
      </header>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Diagnosis</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="mb-6 flex items-center h-32">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#0088CC] text-white hover:bg-[#0088CC]/90 transition-colors">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Diagnosis
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Diagnosis</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newDiagnosis.name}
                      onChange={(e) => setNewDiagnosis({ ...newDiagnosis, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newDiagnosis.date}
                      onChange={(e) => setNewDiagnosis({ ...newDiagnosis, date: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={addDiagnosis}>Add Diagnosis</Button>
              </DialogContent>
            </Dialog>
          </div>
          {diagnoses.map((diagnosis) => (
            <div key={diagnosis.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{diagnosis.name}</h3>
                <p className="text-sm text-gray-500">Date Added: {diagnosis.date}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteDiagnosis(diagnosis.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-100"
              >
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Delete {diagnosis.name}</span>
              </Button>
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <div className="flex items-start mb-8">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#00BCD4]">
              <UserRound className="h-20 w-20 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input 
                type="text"
                placeholder="Patient Name" 
                className="w-full bg-[#E5F6FF] pl-10 py-3 rounded-md"
              />
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>

            <Input 
              type="text"
              placeholder="Age" 
              className="w-full bg-[#E5F6FF] py-3 rounded-md px-3"
            />

            <Input 
              type="text"
              placeholder="Condition" 
              className="w-full bg-[#E5F6FF] py-3 rounded-md px-3"
            />

            <textarea 
              placeholder="Describe Issue" 
              className="w-full min-h-[150px] bg-slate-300 rounded-md p-3 resize-none"
            />
          <Link href={'/'}>
            <Button className="w-full bg-[#0088CC] text-white py-3 rounded-md text-lg hover:bg-[#0088CC]/90 transition-colors">
              Submit
            </Button>
          </Link> 
          </div>
        </div>
      </div>
    </div>
  )
}