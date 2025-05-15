"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll effect for shrinking navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      lastScrollY = window.scrollY;
    };

    // Throttle scroll events
    let isThrottled = false;
    const throttledScroll = () => {
      if (!isThrottled) {
        isThrottled = true;
        requestAnimationFrame(() => {
          handleScroll();
          isThrottled = false;
        });
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [scrolled]);

  const navItems = [
    { name: "Teams", href: "/teams" },
    { name: "Schedules", href: "/schedules" },
    { name: "Shop", href: "/shop" },
    { name: "Join the Team", href: "/join" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center w-full bg-black transition-all duration-300",
        scrolled ? "h-12 shadow-md" : "h-16 shadow-none"
      )}
    >
      <div
        className={cn(
          "flex h-full items-center justify-between w-full max-w-[75rem] px-4 sm:px-6 lg:px-8"
        )}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" aria-label="World Class Sports Home">
            <div
              className={cn(
                "relative transition-all duration-300",
                scrolled ? "h-10 w-[100px]" : "h-12 w-[120px]"
              )}
            >
              <Image
                src="/images/WCS Logo-transparentBG.png"
                alt="World Class Sports Logo"
                width={120}
                height={48}
                priority
                className="object-contain w-full h-full"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {navItems.map((item, index) => {
            const isLastItem = index === navItems.length - 1;
            return (
              <div key={item.name}>
                {isLastItem ? (
                  <Button
                    asChild
                    variant="default"
                    className={cn(
                      "bg-blue-600 text-white font-medium uppercase rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-sm",
                      scrolled ? "text-sm px-3 py-1" : "text-base px-4 py-1.5"
                    )}
                  >
                    <Link href={item.href} className="no-underline">
                      {item.name}
                    </Link>
                  </Button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-white font-medium uppercase hover:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-all duration-300 no-underline",
                      scrolled ? "text-sm" : "text-base"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="text-white hover:bg-gray-800"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-12 left-0 w-full bg-black z-40 border-t border-gray-800">
          <nav className="flex flex-col items-center py-4 space-y-4">
            {navItems.map((item, index) => {
              const isLastItem = index === navItems.length - 1;
              return (
                <div key={item.name}>
                  {isLastItem ? (
                    <Button
                      asChild
                      variant="default"
                      className="bg-blue-600 text-white font-medium uppercase rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 px-4 py-1.5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href={item.href} className="no-underline">
                        {item.name}
                      </Link>
                    </Button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-white font-medium uppercase hover:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-all duration-300 no-underline text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
