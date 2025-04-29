"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { months, years } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useApp } from "@/stores/useApp";

function AddExperience() {
  const router = useRouter();
  const { addExperience } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    companyWebsite: "",
    title: "",
    description: "",
    fromMonth: "",
    fromYear: "",
    toMonth: "",
    toYear: "",
    isCurrentlyWorking: false,
  });

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      isCurrentlyWorking: checked,
      toMonth: checked ? "" : prevData.toMonth,
      toYear: checked ? "" : prevData.toYear,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true)
    await addExperience(formData);
    setIsLoading(false)
  }
  return (
    <div className="px-5">
      <div className="flex items-center gap-4 py-3">
        <Button
          variant="outline"
          className="rounded-lg"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-bold">Add Experience</h1>
      </div>
      <Separator />

      <div className="flex flex-col gap-4 py-5">
        <div className="flex items-center gap-3">
          <Label className="text-sm font-semibold">
            Job Title <span className="text-red-500">*</span>
          </Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Website Developer"
            className="w-1/2 mt-2 bg-[#0D0D0D]"
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="text-sm font-semibold">
            Company name <span className="text-red-500">*</span>
          </Label>
          <Input
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Portly"
            className="w-1/2 mt-2 bg-[#0D0D0D]"
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="text-sm font-semibold">Company website</Label>
          <Input
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleInputChange}
            placeholder="portly.com"
            className="w-1/2 mt-2 bg-[#0D0D0D]"
          />
        </div>

        <div className="flex items-center gap-3 w-full">
          <Label className="text-sm font-semibold">
            Start Date <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-3">
            <select
              value={formData.fromMonth}
              onChange={(e) => handleSelectChange("fromMonth", e.target.value)}
              className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer"
            >
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={formData.fromYear}
              onChange={(e) => handleSelectChange("fromYear", e.target.value)}
              className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer"
            >
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full">
          <Label className="text-sm font-semibold">
            End Date <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-3">
            <select
              value={formData.toMonth}
              onChange={(e) => handleSelectChange("toMonth", e.target.value)}
              disabled={formData.isCurrentlyWorking}
              className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer"
            >
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={formData.toYear}
              onChange={(e) => handleSelectChange("toYear", e.target.value)}
              disabled={formData.isCurrentlyWorking}
              className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer"
            >
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full">
          <Checkbox
            id="current"
            className="w-4 h-4"
            checked={formData.isCurrentlyWorking}
            onCheckedChange={handleCheckboxChange}
          />
          <Label className="text-sm font-semibold" htmlFor="current">
            I currently work here
          </Label>
        </div>

        <div className="flex items-center gap-3">
          <Label className="text-sm font-semibold">Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Tell us about your responsibilities and achievements"
            className="w-1/2 mt-2 bg-[#0D0D0D]"
          />
        </div>
      </div>

      <Button className="mt-4 w-40" onClick={handleSave} disabled={isLoading}>{isLoading ? (
        <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
      ) : (
        "Save"
      )}</Button>
    </div>
  );
}

export default AddExperience;
