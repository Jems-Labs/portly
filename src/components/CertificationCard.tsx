"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { ExternalLink, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApp } from "@/stores/useApp";
import { CertificationType } from "@/lib/types";
import Link from "next/link";


function CertificationCard({
    certificate,
    isDelete,
    isEdit,
}: {
    certificate: CertificationType;
    isDelete: boolean;
    isEdit: boolean;
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { deleteCertificate } = useApp();
    
    const handleDelete = async () => {
        setIsLoading(true);
        await deleteCertificate(certificate.id);
        setIsLoading(false);
    }




    return (
        <div className="rounded-2xl p-5 border shadow-sm transition-all hover:shadow-md w-full space-y-1">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <Link
                        href={
                            certificate.certificationUrl
                                ? certificate.certificationUrl.toString()
                                : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold hover:underline text-foreground flex items-center gap-2">
                        {certificate.name} <ExternalLink size={14}/>
                    </Link>
                    <p className="text-sm text-muted-foreground">{certificate.issuedBy}</p>
                    <p className="text-xs text-muted-foreground">
                        {certificate.issueMonth} {certificate.issueYear} –{" "}
                        {certificate.expirationMonth} {certificate.expirationYear}
                    </p>
                </div>

                <div className="flex gap-2 items-center">
                    {isEdit && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-accent rounded-full transition-transform border"
                            onClick={() =>
                                router.push(`/admin/resume/certification/${certificate.id}`)
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

export default CertificationCard;
