"use client"

import { useApp } from "@/stores/useApp";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const UserLogged = () => {

    const { user } = useApp();
    const router = useRouter()
    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user]);
    return null;
}