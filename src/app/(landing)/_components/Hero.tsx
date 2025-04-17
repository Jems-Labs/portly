"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApp } from "@/stores/useApp";
import { validateUsername } from "@/lib/valideUsername";
import { Check, X, Loader2 } from "lucide-react";
import Link from "next/link";

function Hero() {
  const { setClaimedUsername, searchUsername } = useApp();
  const [error, setError] = useState<string>("");
  const [checking, setChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const { error, sanitized } = validateUsername(input);

    setClaimedUsername(sanitized);
    setError(error);
    setIsAvailable(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!error && sanitized) {
      setChecking(true);
      debounceRef.current = setTimeout(async () => {
        const available = await searchUsername(sanitized);
        setChecking(false);

        setIsAvailable(Boolean(available));

        setError(available ? "" : "Username already taken 😓");
      }, 500);
    } else {
      setChecking(false);
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center px-4 text-center bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 right-0 w-[300px] h-[300px] bg-blue-300 rounded-full blur-2xl opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-10 py-16">
        <div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-playfair font-extrabold leading-tight italic tracking-tight">
            The Portfolio
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-blue-600 font-manrope font-semibold mt-2">
            that actually works!
          </h1>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-manrope text-muted-foreground max-w-2xl mx-auto">
          Built for creators, founders, and doers <br />
          who need more than just another link in bio.
        </h2>

        <div className="w-full max-w-md mx-auto mt-4 flex flex-col sm:flex-row items-stretch gap-3">
          <div className="flex flex-col w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 font-medium">
                portly/
              </div>

              <Input
                type="text"
                placeholder="username"
                className="pl-[65px] pr-12 font-medium rounded-xl border-2 focus-visible:ring-2 focus-visible:ring-blue-500 h-12"
                onChange={handleUsernameChange}
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {checking && <Loader2 className="animate-spin text-gray-400 w-5 h-5" />}
                {!checking && isAvailable === true && (
                  <Check className="text-green-500 w-5 h-5" />
                )}
                {!checking && isAvailable === false && (
                  <X className="text-red-500 w-5 h-5" />
                )}
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2 text-left">{error}</p>
            )}
          </div>
          <Link href={'/signup'}>
            <Button variant={"secondary"} className="h-12 px-5 text-base">
              Claim
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
