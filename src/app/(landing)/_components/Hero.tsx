"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApp } from "@/stores/useApp";
import { validateUsername } from "@/lib/valideUsername";

function Hero() {
  const { setClaimedUsername } = useApp();
  const [error, setError] = useState<string>("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { error, sanitized } = validateUsername(e.target.value);
    setError(error);
    setClaimedUsername(sanitized);
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
                className="pl-[70px] h-12 font-medium rounded-xl border-2 focus-visible:ring-2 focus-visible:ring-blue-500"
                onChange={handleUsernameChange}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-left">{error}</p>
            )}
          </div>
          <Button className="h-12 px-6 text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition">
            Claim
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
