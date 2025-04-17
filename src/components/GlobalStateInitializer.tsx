"use client"

import { useApp } from "@/stores/useApp";
import { useEffect } from "react";

export const GlobalStateInitializer = () => {

    const { fetchUser } = useApp();
    useEffect(() => {
        fetchUser();
    }, [fetchUser])
    return null;
}