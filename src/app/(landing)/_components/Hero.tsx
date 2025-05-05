"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApp } from "@/stores/useApp";
import { validateUsername } from "@/lib/valideUsername";
import { Check, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <section className="relative isolate text-white flex items-center justify-center bg-gradient-to-t from-zinc-900 via-[#0D0D0D] to-[#0D0D0D]">


      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-r from-yellow-400/30 via-orange-500/20 to-transparent rounded-full blur-3xl opacity-40"></div>
        <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.07] mix-blend-overlay" />
      </div>
      <div className="relative z-10 px-6 pt-20 pb-20 lg:pt-28 text-center max-w-4xl mx-auto space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-playfair leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-yellow-500"
        >
          Your Next-Gen <br /> Portfolio Identity
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl md:text-2xl font-medium font-manrope text-white/80"
        >
          Not just a link in bio. <br />
          A digital identity crafted for builders & dreamers.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex gap-3"
        >
          <div className="flex flex-col w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 font-medium text-gray-400">
                portly.netlify.app/
              </div>

              <Input
                type="text"
                placeholder="username"
                className="pl-[150px] pr-12 rounded-lg h-12 border-none focus-visible:ring-2 focus-visible:ring-yellow-400 bg-white/10 text-white placeholder:text-white/50"
                onChange={handleUsernameChange}
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {checking && <Loader2 className="animate-spin text-gray-300 w-5 h-5" />}
                {!checking && isAvailable === true && (
                  <Check className="text-green-400 w-5 h-5 animate-pulse" />
                )}
                {!checking && isAvailable === false && (
                  <X className="text-red-400 w-5 h-5 animate-pulse" />
                )}
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-2 text-left">{error}</p>
            )}
          </div>

          <Link href={"/signup"}>
            <Button className="h-12 px-5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg">
              Claim
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
