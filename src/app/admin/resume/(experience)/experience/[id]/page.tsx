'use client';

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
import { useQuery } from "@tanstack/react-query";

function Experience() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { fetchExperience, editExperience } = useApp();
    const { id } = useParams();
    const { data } = useQuery({
        queryKey: ["experience", id],
        queryFn: async () => {
            const parsedId = parseInt(id as string, 10);
            const res = await fetchExperience(parsedId);
            return res;
        },
        staleTime: 1000 * 60 * 3,
    });
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        companyWebsite: "",
        description: "",
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        isCurrentlyWorking: false,
    });

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title,
                company: data.company,
                companyWebsite: data.companyWebsite,
                description: data.description,
                fromMonth: data.fromMonth,
                fromYear: data.fromYear?.toString() || "",
                toMonth: data.toMonth || "",
                toYear: data.toYear?.toString() || "",
                isCurrentlyWorking: data.isCurrentlyWorking || false,
            });
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleCheckboxChange = (checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            isCurrentlyWorking: checked,
            ...(checked && { toMonth: "", toYear: "" }),
        }));
    }

    const handleSave = async () => {
        setIsLoading(true);

        await editExperience(formData, id as string);
        setIsLoading(false);
    }

    return (
        <div className="px-5">
            <div className="flex items-center gap-4 py-3">
                <Button
                    variant="outline"
                    className="rounded-lg"
                    onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-lg font-bold">Edit Experience</h1>
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        placeholder="Portly"
                        className="w-1/2 mt-2 bg-[#0D0D0D]"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Label className="text-sm font-semibold">Company website</Label>
                    <Input
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleChange}
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
                            name="fromMonth"
                            value={formData.fromMonth}
                            onChange={handleChange}
                            className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer"
                        >
                            {months.map((month, index) => (
                                <option key={index} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select
                            name="fromYear"
                            value={formData.fromYear}
                            onChange={handleChange}
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
                        End Date {formData.isCurrentlyWorking ? '' : <span className="text-red-500">*</span>}
                    </Label>
                    <div className="flex gap-3">
                        <select
                            name="toMonth"
                            value={formData.toMonth}
                            onChange={handleChange}
                            disabled={formData.isCurrentlyWorking}
                            className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer disabled:opacity-50"
                        >
                            {months.map((month, index) => (
                                <option key={index} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select
                            name="toYear"
                            value={formData.toYear}
                            onChange={handleChange}
                            disabled={formData.isCurrentlyWorking}
                            className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer disabled:opacity-50"
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
                        onCheckedChange={(checked) => handleCheckboxChange(!!checked)}
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
                        onChange={handleChange}
                        placeholder="Tell us about your responsibilities and achievements"
                        className="w-1/2 mt-2 bg-[#0D0D0D]"
                    />
                </div>
            </div>

            <Button className="mt-4 w-40" disabled={isLoading} onClick={handleSave}>
                {isLoading ? (
                    <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                ) : (
                    "Save"
                )}
            </Button>
        </div>
    );
}

export default Experience;
