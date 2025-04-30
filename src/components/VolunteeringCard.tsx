"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, ExternalLink, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApp } from "@/stores/useApp";
import { VolunteeringType } from "@/lib/types";


function VolunteeringCard({
    experience,
    isDelete,
    isEdit,
}: {
    experience: VolunteeringType;
    isDelete: boolean;
    isEdit: boolean;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    // const { deleteExperience } = useApp();

    const handleDelete = async (id: number) => {
        setIsLoading(true);
        // await deleteExperience(id);
        setIsLoading(false);
    };
    return (
        <div className="rounded-2xl p-5 border shadow-sm transition-all hover:shadow-md w-full space-y-1">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <Link
                        href={experience.organizationWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold hover:underline text-foreground flex items-center gap-2">
                        {experience.organization} <ExternalLink size={14} />
                    </Link>
                    <p className="text-sm text-muted-foreground">{experience.role}</p>
                    <p className="text-xs text-muted-foreground">
                        {experience.fromMonth} {experience.fromYear} –{" "}
                        {experience.isCurrentlyWorking
                            ? "Present"
                            : `${experience.toMonth} ${experience.toYear}`}
                    </p>
                </div>

                <div className="flex gap-2 items-center">
                    {isEdit && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-accent rounded-full transition-transform border"
                            onClick={() =>
                                router.push(`/admin/resume/experience/${experience.id}`)
                            }
                        >
                            <Pen className="h-4 w-4" />
                        </Button>
                    )}
                    {isDelete && (
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(experience.id)} disabled={isLoading}>

                            {isLoading ? (
                                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                                <Trash className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" />
                            )}
                        </Button>
                    )}
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsOpen(!isOpen)}
                        className="hover:bg-accent rounded-full transition-transform border"
                    >
                        {isOpen ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px]" : "max-h-0"
                    }`}
            >
                <p className="text-sm mt-2 leading-relaxed">{experience.description}</p>
            </div>
        </div>
    );
}

export default VolunteeringCard;
