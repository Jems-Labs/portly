"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateUsername } from "@/lib/valideUsername";
import { useApp } from "@/stores/useApp";
import Link from "next/link";
import { useState, useRef } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const { claimedUsername, setClaimedUsername, signup, searchUsername } = useApp();

  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [formData, setFormData] = useState({
    username: claimedUsername,
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAvailable) {
      toast.error("Username already taken")
      return;
    }

    setIsLoading(true);
    await signup(formData);
    setIsLoading(false);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const { error, sanitized } = validateUsername(input);

    setClaimedUsername(sanitized);
    setError(error);
    setIsAvailable(null);

    setFormData(prev => ({
      ...prev,
      username: sanitized,
    }));

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
    <div className="p-8 rounded-xl shadow-xl border font-manrope">
      <h1 className="text-3xl font-semibold mb-2 text-center font-playfair italic">
        Signup & Create your profile
      </h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        Join us and start sharing your creativity
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 font-medium text-gray-400">
              portly/
            </div>
            <Input
              id="username"
              type="text"
              placeholder="username"
              className="pl-[68px] pr-10 font-medium rounded-xl border-2 focus-visible:ring-2 focus-visible:ring-blue-500 h-12"
              onChange={handleUsernameChange}
              value={formData.username}
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
          {error && <p className="text-red-500 text-sm mt-2 text-left">{error}</p>}
        </div>

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
          <Input
            id="password"
            type="password"
            placeholder="*****"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="h-12 rounded-xl border-2"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          variant="secondary"
          className="w-full"
        >
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            "Signup"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
