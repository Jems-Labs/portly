"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApp } from "@/stores/useApp";
import { EducationType } from "@/lib/types";


function EducationCard({
    education,
    isDelete,
    isEdit,
}: {
    education: EducationType;
    isDelete: boolean;
    isEdit: boolean;
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { deleteEducation } = useApp();

    const handleDelete = async () => {
        setIsLoading(true);
        await deleteEducation(education.id);
        setIsLoading(false);
    }




    return (
        <div className="rounded-2xl p-5 border shadow-sm transition-all hover:shadow-md w-full space-y-1">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-lg font-semibold text-foreground">{education.school}</p>
                    <p className="text-sm text-muted-foreground">{education.degree} - {education.fieldOfStudy}</p>
                    <p className="text-xs text-muted-foreground pt-2">
                        {education.startDate} – {" "}
                        {education.endDate}
                    </p>
                </div>

                <div className="flex gap-2 items-center">
                    {isEdit && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-accent rounded-full transition-transform border"
                            onClick={() =>
                                router.push(`/admin/resume/education/${education.id}`)
                            }
                        >
                            <Pen className="h-4 w-4" />
                        </Button>
                    )}
                    {isDelete && (
                        <Button size="icon" variant="ghost" disabled={isLoading} onClick={handleDelete}>

                            {isLoading ? (
                                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                                <Trash className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" />
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EducationCard;
