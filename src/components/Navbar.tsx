"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useApp } from "@/stores/useApp";
import { ChevronRight } from "lucide-react";

function Navbar() {
  const { user } = useApp();


  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">

        <Link href="/">
          <span className="font-playfair text-2xl sm:text-3xl font-bold tracking-tight hover:opacity-80 transition cursor-pointer">
            Portly
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <Link href="/admin">
                <Button
                  variant="ghost"
                  className="rounded-lg px-4 gap-1 bg-gray-200 hover:bg-gray-200 transition"
                  type="button"
                >
                  Admin <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>

            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="rounded-lg px-5 bg-gray-200 hover:bg-gray-100 transition"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="secondary"
                  className="rounded-lg px-5 shadow-sm hover:shadow-md transition"
                >
                  Create Profile
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
