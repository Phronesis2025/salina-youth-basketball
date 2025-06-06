'use client';

import { useState } from 'react';
import { supabase } from '../../../src/lib/supabase/client';
import { Button } from '../../../src/components/ui/button';
import { Input } from '../../../src/components/ui/input';
import { Label } from '../../../src/components/ui/label';
import { useRouter } from 'next/navigation';

export default function CoachesLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Redirect to /coaches after successful login
    router.push('/coaches');
  };

  return (
    <main className="bg-[#002C51] min-h-screen pt-20 md:pt-24 pb-12 flex items-center justify-center">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-gray-900/50 border border-red-500/50 rounded-lg shadow-md p-6">
          <h1 className="text-white text-[clamp(2rem,4vw,2.5rem)] font-inter font-bold uppercase mb-4 text-center">
            Coach Login
          </h1>
          {error && (
            <div className="mb-4 p-4 bg-gray-900 border border-red-500/50 rounded-lg">
              <p className="text-red-500 text-sm font-rubik">{error}</p>
            </div>
          )}
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
                placeholder="Enter your email"
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
                placeholder="Enter your password"
              />
            </div>
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
