"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { months, years } from '@/lib/utils'
import { useApp } from '@/stores/useApp'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function AddCertification() {
    const router = useRouter();
    const { addCertification } = useApp();
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        certificationUrl: "",
        issuedBy: "",
        issueMonth: "January",
        issueYear: "2025",
        expirationMonth: "January",
        expirationYear: "2025",
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
        await addCertification(formData);
        setIsLoading(false);
    }

    return (
        <div className="px-5">
            <div className="flex items-center gap-4 py-3">
                <Button variant="outline" className="rounded-lg" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-lg font-bold">Add Certification</h1>
            </div>
            <Separator />

            <div className="flex flex-col gap-4 py-5">
                <div className="flex items-center gap-3">
                    <Label className="text-sm font-semibold">Certification Name</Label>
                    <Input
                        name="name"
                        placeholder="System Design"
                        className="w-1/2 mt-2 bg-[#0D0D0D]"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <Label className="text-sm font-semibold">Issued By</Label>
                    <Input
                        name="issuedBy"
                        placeholder="Google"
                        className="w-1/2 mt-2 bg-[#0D0D0D]"
                        value={formData.issuedBy}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <Label className="text-sm font-semibold">Certification URL</Label>
                    <Input
                        name="certificationUrl"
                        placeholder="https://example.com"
                        className="w-1/2 mt-2 bg-[#0D0D0D]"
                        value={formData.certificationUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center gap-3 w-full">
                    <Label className="text-sm font-semibold">Issue Date</Label>
                    <div className="flex gap-3">
                        <select
                            name="issueMonth"
                            value={formData.issueMonth}
                            onChange={handleChange}
                            className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer"
                        >
                            {months.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                        <select
                            name="issueYear"
                            value={formData.issueYear}
                            onChange={handleChange}
                            className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer"
                        >
                            {years.map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full">
                    <Label className="text-sm font-semibold">Expiration Date</Label>
                    <div className="flex gap-3">
                        <select
                            name="expirationMonth"
                            value={formData.expirationMonth}
                            onChange={handleChange}
                            className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer"
                        >
                            {months.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                        <select
                            name="expirationYear"
                            value={formData.expirationYear}
                            onChange={handleChange}
                            className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer"
                        >
                            {years.map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>

            <Button className="mt-4 w-40" onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                    <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                ) : (
                    "Save"
                )}
            </Button>
        </div>
    )
}

export default AddCertification;
