"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { years } from '@/lib/utils'
import { useApp } from '@/stores/useApp'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function AddEducation() {
  const router = useRouter();
  const { addEducation } = useApp();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "2025",
    endDate: "2025",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }


  const handleSave = async () => {
    setIsLoading(true);
    await addEducation(formData);
    setIsLoading(false);
  }
  return (
    <div className="px-5">
      <div className="flex items-center gap-4 py-3">
        <Button variant="outline" className="rounded-lg" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-bold">Add Education</h1>
      </div>
      <Separator />
      <div className="flex flex-col gap-4 py-5">
        <div className="flex items-center gap-3">
          <Label className="text-sm font-semibold">
            School / College name <span className="text-red-500">*</span>
          </Label>
          <Input
            name="school"
            placeholder="Gujarat University"
            className="w-1/2 mt-2 bg-[#0D0D0D]"
            value={formData.school}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="text-sm font-semibold">
            Degree type <span className="text-red-500">*</span>
          </Label>
          <Input
            name="degree"
            placeholder="Bachelor of Science"
            className="w-1/2 mt-2 bg-[#0D0D0D]"
            value={formData.degree}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="text-sm font-semibold">
            Major / Field of study <span className="text-red-500">*</span>
          </Label>
          <Input
            name="fieldOfStudy"
            placeholder="Computer Science"
            className="w-1/2 mt-2 bg-[#0D0D0D]"
            value={formData.fieldOfStudy}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="text-sm font-semibold">
            Start Date <span className="text-red-500">*</span>
          </Label>
          <select
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="h-10 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer"
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <Label className="text-sm font-semibold">
            End Date <span className="text-red-500">*</span>
          </Label>
          <select
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="h-10 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer"
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button className="mt-4 w-40" onClick={handleSave} disabled={isLoading}>{isLoading ? (
        <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
      ) : (
        "Save"
      )}</Button>
    </div>
  )
}

export default AddEducation
