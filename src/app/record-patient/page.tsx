"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'
import { ArrowLeftCircle } from 'lucide-react'

type FormData = {
  name: string;
  hasDiabetes: boolean;
  diabetesLevel: string;
  hasHypertension: boolean;
  bloodPressure: string;
  hasHeartDiseases: boolean;
  heartRate: string;
  hasBloodDiseases: boolean;
  hasThalassemia: boolean;
  hasSickleCellAnemia: boolean;
  fractures: string;
  symptoms: string;
};

export default function Component() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    hasDiabetes: false,
    diabetesLevel: '',
    hasHypertension: false,
    bloodPressure: '',
    hasHeartDiseases: false,
    heartRate: '',
    hasBloodDiseases: false,
    hasThalassemia: false,
    hasSickleCellAnemia: false,
    fractures: '',
    symptoms: ''
  })

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any } }) => {
    const { name, value, type, checked } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    // Here you would typically send the data to a server
  }

  return (

    <><main>
            <header className="mb-12 flex justify-between items-center">
      <div className="text-5xl font-semibold">
            Smart <span className="text-blue-500">Ambulance</span>
          </div>
        <div className="w-8 h-8 bg-white flex items-center justify-center mt-3 mr-3">
          <Link href={"/condition"} className="bg-white">
            <button className="bg-white">
              <ArrowLeftCircle className="h-10 w-10 bg-white text-blue-500 rounded-full" />
            </button>
          </Link>
        </div>
      </header>
    </main>
    <Card className="w-full max-w-4xl mx-auto mt-32">
      <CardHeader>
        <CardTitle>Medical Information Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="hasDiabetes" name="hasDiabetes" checked={formData.hasDiabetes} onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, hasDiabetes: checked }))} />
            <Label htmlFor="hasDiabetes">Has Diabetes</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="diabetesLevel">Diabetes Level</Label>
            <Input id="diabetesLevel" name="diabetesLevel" value={formData.diabetesLevel} onChange={handleChange} />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="hasHypertension" name="hasHypertension" checked={formData.hasHypertension} onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, hasHypertension: checked }))} />
            <Label htmlFor="hasHypertension">Has Hypertension</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bloodPressure">Blood Pressure</Label>
            <Input id="bloodPressure" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="hasHeartDiseases" name="hasHeartDiseases" checked={formData.hasHeartDiseases} onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, hasHeartDiseases: checked }))} />
            <Label htmlFor="hasHeartDiseases">Has Heart Diseases</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="heartRate">Heart Rate</Label>
            <Input id="heartRate" name="heartRate" value={formData.heartRate} onChange={handleChange} />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="hasBloodDiseases" name="hasBloodDiseases" checked={formData.hasBloodDiseases} onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, hasBloodDiseases: checked }))} />
            <Label htmlFor="hasBloodDiseases">Has Blood Diseases</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="hasThalassemia" name="hasThalassemia" checked={formData.hasThalassemia} onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, hasThalassemia: checked }))} />
            <Label htmlFor="hasThalassemia">Has Thalassemia</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="hasSickleCellAnemia" name="hasSickleCellAnemia" checked={formData.hasSickleCellAnemia} onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, hasSickleCellAnemia: checked }))} />
            <Label htmlFor="hasSickleCellAnemia">Has Sickle Cell Anemia</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fractures">Fractures</Label>
            <Input id="fractures" name="fractures" value={formData.fractures} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Current Symptoms</Label>
            <Input id="symptoms" name="symptoms" value={formData.symptoms} onChange={handleChange} />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit}>Save Record</Button>
      </CardFooter>
    </Card></>
  )
}