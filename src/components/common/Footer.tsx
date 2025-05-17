"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Instagram, Twitter, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    // Placeholder: Log email or integrate with API
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer
      className="bg-black text-white py-12"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Branding */}
          <div>
            <Image
              src="/images/WCS Logo-transparentBG.png"
              alt="World Class Sports Logo"
              width={120}
              height={48}
              className="object-contain mb-4"
            />
            <p className="font-montserrat text-base">
              World Class Sports © {new Date().getFullYear()}
            </p>
            <p className="font-montserrat text-base mt-2">Salina, KS</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-bebas text-xl font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { name: "Teams", href: "/teams" },
                { name: "Schedules", href: "/schedules" },
                { name: "Shop", href: "/shop" },
                { name: "Join the Team", href: "/join" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-montserrat text-base hover:text-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bebas text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="font-montserrat text-base hover:text-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-montserrat text-base hover:text-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup and Social */}
          <div>
            <h3 className="font-bebas text-xl font-bold mb-4">
              Stay Connected
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-3 mb-6"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={cn(
                  "font-montserrat text-base px-4 py-2 rounded bg-white text-black w-full",
                  error && "border-2 border-red-500"
                )}
                aria-invalid={!!error}
                aria-describedby={error ? "email-error" : undefined}
              />
              {error && (
                <p
                  id="email-error"
                  className="font-montserrat text-sm text-red-400"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="bg-blue-600 text-white font-bebas text-base px-4 py-2 rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-white hover:text-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-colors duration-300"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-white hover:text-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-colors duration-300"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="mailto:info@wcshoops.com"
                aria-label="Email"
                className="text-white hover:text-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-colors duration-300"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
