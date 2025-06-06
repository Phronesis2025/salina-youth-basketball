"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Navbar({ cartItemCount = 0 }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate user authentication check
    console.log("Navbar rendered", { pathname, cartItemCount, user });
  }, [pathname, cartItemCount, user]);

  const handleNavigation = (
    path: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(`Navigating to ${path}`, { event });
    router.push(path);
  };

  return (
    <nav className="bg-[#002C51] fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/images/WCS Logo-transparentBG.png"
                alt="WCS Logo"
                width={40}
                height={40}
                className="object-contain"
                style={{ width: "40px", height: "40px" }}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link
              href="/"
              className={`text-gray-300 hover:text-white font-rubik text-sm uppercase ${pathname === "/" ? "text-white" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-gray-300 hover:text-white font-rubik text-sm uppercase ${pathname === "/about" ? "text-white" : ""}`}
            >
              About
            </Link>
            <Link
              href="/teams"
              className={`text-gray-300 hover:text-white font-rubik text-sm uppercase ${pathname === "/teams" ? "text-white" : ""}`}
            >
              Teams
            </Link>
            <Link
              href="/schedules"
              className={`text-gray-300 hover:text-white font-rubik text-sm uppercase ${pathname === "/schedules" ? "text-white" : ""}`}
            >
              Schedules
            </Link>
            <Link
              href="/tournaments"
              className={`text-gray-300 hover:text-white font-rubik text-sm uppercase ${pathname === "/tournaments" ? "text-white" : ""}`}
            >
              Tournaments
            </Link>
            <Link
              href="/coaches"
              className={`text-gray-300 hover:text-white font-rubik text-sm uppercase ${pathname === "/coaches" ? "text-white" : ""}`}
            >
              Locker Room
            </Link>
            <Link
              href="/shop"
              className={`text-gray-300 hover:text-white font-rubik text-sm uppercase ${pathname === "/shop" ? "text-white" : ""}`}
            >
              Shop
            </Link>
            <Link
              href="/join"
              className={`text-gray-300 hover:text-white font-rubik text-sm uppercase ${pathname === "/join" ? "text-white" : ""}`}
            >
              Join
            </Link>
          </div>

          {/* Cart and Sign Up */}
          <div className="flex items-center space-x-4">
            <Link href="/shop/cart" className="relative">
              <svg
                className="w-6 h-6 text-gray-300 hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Button
              onClick={(e) => handleNavigation("/signup", e)}
              className="bg-blue-600 text-white font-inter uppercase hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm px-4 py-2"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
