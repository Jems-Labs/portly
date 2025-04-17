"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center px-4 text-center bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 right-0 w-[300px] h-[300px] bg-blue-300 rounded-full blur-2xl opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-3xl space-y-8 py-16">
        <h1 className="text-6xl sm:text-7xl font-playfair font-bold italic text-gray-900 leading-tight">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-manrope font-semibold text-blue-600">
          Page Not Found
        </h2>
        <p className="text-muted-foreground text-lg sm:text-xl font-manrope max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been removed or never existed.
        </p>

        <Link href="/">
          <Button variant="secondary" className="gap-2 mt-5">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </section>
  );
}
