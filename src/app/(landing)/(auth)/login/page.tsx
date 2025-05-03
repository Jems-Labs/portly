"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/stores/useApp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useApp();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // for toggling password visibility

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    await login(formData, router.push);
    setIsLoading(false);
  };

  return (
    <div className="p-8 rounded-xl shadow-xl border font-manrope">
      <h1 className="text-3xl font-semibold mb-2 text-center font-playfair">
        Login
      </h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        Welcome back! Please log in to continue where you left off.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="eg. johndoe@email.com"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="h-12 rounded-xl border-2"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={isOpen ? "text" : "password"}
              placeholder="*****"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="h-12 rounded-xl border-2 pr-10"
            />
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 pr-3 cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? (
                <Eye className="text-gray-500 w-5 h-5" />
              ) : (
                <EyeClosed className="text-gray-500 w-5 h-5" />
              )}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-4">
        Don&apos;t have an account?
        <Link
          href="/signup"
          className="text-blue-500 hover:underline hover:text-blue-700 ml-1"
        >
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
