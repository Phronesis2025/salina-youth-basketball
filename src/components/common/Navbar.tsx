"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for shrinking navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: "Teams", href: "/teams" },
    { name: "Schedules", href: "/schedules" },
    { name: "Shop", href: "/shop" },
    { name: "Join the Team", href: "/join" },
  ];

  // Consistent design variables
  const colors = {
    primary: "#002C51", // Dark blue
    light: "#FFFFFF", // White
    text: "#0A0F15", // Dark text
    hover: "#E6ECEF", // Light gray hover
  };

  return (
    <header
      className={cn(
        "fixed top-[0px] left-[0px] right-[0px] z-50 flex justify-center w-full bg-[black] shadow-sm transition-all duration-500",
        scrolled ? "h-[48px]" : "h-[66px]"
      )}
    >
      <div
        className={cn(
          "flex h-full items-center justify-between transition-all duration-500",
          scrolled ? "w-[80%]" : "w-[95%]",
          "max-w-[75rem] px-[24px] md:px-[50px]"
        )}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/images/WCS Logo-transparentBG.png"
              alt="Salina Youth Basketball Club Logo"
              className={cn(
                "transition-all duration-300",
                scrolled ? "h-[45px]" : "h-[60px]"
              )}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex justify-end">
          <div className="flex space-x-[20px] items-center">
            {navItems.map((item, index) => {
              const isLastItem = index === navItems.length - 1;
              return (
                <div key={item.name}>
                  {isLastItem ? (
                    <Button
                      asChild
                      variant="default"
                      className={cn(
                        "bg-[#FFFFFF] text-[#0A0F15] font-medium hover:bg-[#E6ECEF] transition-all duration-300 rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] uppercase",
                        scrolled
                          ? "text-[10px] py-[5px] px-[10px]"
                          : "text-xs py-[8px] px-[16px] md:py-[15px] md:px-[30px]"
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
                        "text-[#FFFFFF] font-medium hover:text-[#E6ECEF] transition-all duration-300 no-underline uppercase",
                        scrolled ? "text-[10px]" : "text-xs"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
