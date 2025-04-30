"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { months, years } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useApp } from "@/stores/useApp";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

function Volunteering() {
  const router = useRouter();
  const { fetchVolunteerExperience, editVolunteerExperience } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams()
  const [formData, setFormData] = useState({
    organization: "",
    organizationWebsite: "",
    role: "",
    description: "",
    fromMonth: "January",
    fromYear: "2024",
    toMonth: "January",
    toYear: "2024",
    isCurrentlyWorking: false,
  });
  const { data } = useQuery({
    queryKey: ["volunteerexperience", id],
    queryFn: async () => {
      const res = await fetchVolunteerExperience(id as string)
      return res;
    },
    staleTime: 1000 * 60 * 3,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        organization: data?.organization,
        organizationWebsite: data?.organizationWebsite,
        role: data?.role,
        description: data?.description,
        fromMonth: data?.fromMonth || "January",
        fromYear: JSON.stringify(data?.fromYear) || "2024",
        toMonth: data?.toMonth || "January",
        toYear: JSON.stringify(data?.toYear) || "2024",
        isCurrentlyWorking: data?.isCurrentlyWorking,
      })
    }
  }, [data])
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
    if (!formData.organization || !formData.role || !formData.fromMonth || !formData.fromYear) {
      toast.error("Please fill all required fields")
      setIsLoading(false)
      return;
    }
    await editVolunteerExperience(formData, id as string);
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
        <h1 className="text-lg font-bold">Edit Volunteering Experience</h1>
      </div>
      <Separator />

      <div className="flex flex-col gap-4 py-5">
        <div className="flex items-center gap-3">
          <Label className="text-sm font-semibold">
            Role <span className="text-red-500">*</span>
          </Label>
          <Input
            name="role"
            value={formData.role}
            onChange={handleInputChange}

            className="w-1/2 mt-2 bg-[#0D0D0D]"
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="text-sm font-semibold">
            Organization <span className="text-red-500">*</span>
          </Label>
          <Input
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
            placeholder="Portly"
            className="w-1/2 mt-2 bg-[#0D0D0D]"
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="text-sm font-semibold">Organization website</Label>
          <Input
            name="organizationWebsite"
            value={formData.organizationWebsite}
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

export default Volunteering;
