"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const userId = data.user?.id;
    const response = await fetch("/api/get-coach-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const result = await response.json();

    if (!response.ok || !result.role) {
      setError("User not found or not authorized");
      await supabase.auth.signOut();
      return;
    }

    if (result.role === "admin") {
      router.push("/coaches/admin");
    } else {
      router.push("/coaches");
    }
  };

  return (
    <main className="bg-[#002C51] min-h-screen flex items-center justify-center py-12">
      <div className="container max-w-md mx-auto px-4">
        <div className="bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md p-6">
          <h1 className="text-white text-2xl font-inter font-bold uppercase mb-6 text-center">
            Locker Room Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white font-rubik">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white font-rubik">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500 h-12"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm font-rubik">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-inter uppercase hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 transition-all duration-300 h-12"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
