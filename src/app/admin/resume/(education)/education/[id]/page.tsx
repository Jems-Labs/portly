"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { years } from '@/lib/utils'
import { useApp } from '@/stores/useApp'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Education() {
  const router = useRouter();
  const { fetchEducation, editEducation } = useApp();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  })
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["education", id],
    queryFn: async () => {
      const res = await fetchEducation(id as string);

      return res;
    },
    staleTime: 1000 * 60 * 3,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        school: data.school,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        startDate: data.startDate.toString(),
        endDate: data.endDate.toString(),
      })
    }
  }, [data])
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
    await editEducation(formData, id as string);
    setIsLoading(false);
  }
  return (
    <div className="px-5">
      <div className="flex items-center gap-4 py-3">
        <Button variant="outline" className="rounded-lg" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-bold">Edit Education</h1>
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

export default Education
