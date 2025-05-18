"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ShoppingCart } from "lucide-react";

interface NavbarProps {
  cartItemCount: number;
}

export default function Navbar({ cartItemCount }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Track if animation has run
  const pathname = usePathname();

  // Scroll effect for desktop only
  useEffect(() => {
    // Check if viewport is mobile (<768px)
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return; // Skip scroll listener on mobile

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

  // Close mobile menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isMobileMenuOpen && !(e.target as HTMLElement).closest("header")) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMobileMenuOpen]);

  // Set hasAnimated to true after initial render
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  const navItems = [
    { name: "Teams", href: "/teams" },
    { name: "Schedules", href: "/schedules" },
    { name: "Shop", href: "/shop" },
    { name: "Join the Team", href: "/join" },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    console.log(`Navigating to ${href}, event:`, {
      href,
      currentPath: window.location.pathname,
      target: (e.target as HTMLElement).outerHTML,
    });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center w-full bg-black transition-all duration-300 ease-in-out"
      )}
      style={{ animationDelay: "0.1s" }}
      data-animated={hasAnimated} // Prevent reanimation
    >
      <div
        className={cn(
          "flex h-full items-center justify-between w-full max-w-[75rem] px-4 sm:px-6 lg:px-8 space-x-2"
        )}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" aria-label="World Class Sports Home">
            <div
              className={cn(
                "relative transition-all duration-300",
                scrolled
                  ? "md:h-10 md:w-[100px] h-12 w-[120px]"
                  : "h-12 w-[120px]"
              )}
            >
              <Image
                src="/images/WCS Logo-transparentBG.png"
                alt="World Class Sports Logo"
                width={120}
                height={48}
                priority
                className="object-contain w-full h-full p-1"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  console.error("Failed to load Navbar logo");
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder-logo.png";
                }}
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-4"
          role="navigation"
        >
          {navItems.map((item, index) => {
            const isLastItem = index === navItems.length - 1;
            return (
              <div key={item.name}>
                {isLastItem ? (
                  <Button
                    asChild
                    variant="default"
                    className={cn(
                      "bg-blue-600 text-white font-medium font-inter uppercase rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-sm",
                      scrolled ? "text-sm px-4 py-1.5" : "text-base px-4 py-1.5"
                    )}
                  >
                    <Link
                      href={item.href}
                      className="no-underline"
                      onClick={(e) => handleNavClick(item.href, e)}
                    >
                      {item.name}
                    </Link>
                  </Button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-white font-medium font-inter uppercase hover:text-blue-400 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-all duration-300 no-underline",
                      scrolled ? "text-sm" : "text-base",
                      pathname === item.href && "text-blue-400 underline"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={(e) => handleNavClick(item.href, e)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            );
          })}
          {/* Cart Icon */}
          <Link
            href="/shop/cart"
            className="relative text-white hover:text-blue-400 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            onClick={(e) => handleNavClick("/shop/cart", e)}
          >
            <ShoppingCart
              className={cn("h-6 w-6", scrolled ? "h-5 w-5" : "h-6 w-6")}
            />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button
            type="button" // Prevent form submission
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault(); // Prevent any default navigation
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="text-white hover:bg-gray-800 hover:scale-105 focus:scale-105 w-12 h-12 transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            "md:hidden absolute left-0 w-full min-h-screen bg-black z-40 border-t border-gray-800 shadow-lg top-16"
          )}
          style={{ animationDelay: "0.2s" }}
          data-animated={hasAnimated} // Prevent reanimation
        >
          <nav
            className="flex flex-col items-center py-6 space-y-6 bg-gradient-to-b from-black to-gray-900"
            role="navigation"
          >
            {navItems.map((item, index) => {
              const isLastItem = index === navItems.length - 1;
              return (
                <div key={item.name} className="w-full text-center">
                  {isLastItem ? (
                    <Button
                      asChild
                      variant="default"
                      className="bg-blue-600 text-white font-medium font-inter uppercase rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 w-[calc(100%-2rem)] mx-4 px-4 py-2 text-base"
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        handleNavClick(item.href, e);
                      }}
                    >
                      <Link href={item.href} className="no-underline">
                        {item.name}
                      </Link>
                    </Button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-white font-medium font-inter uppercase hover:text-blue-400 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-all duration-300 no-underline text-base block px-4 py-2",
                        pathname === item.href && "text-blue-400 underline"
                      )}
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        handleNavClick(item.href, e);
                      }}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
            {/* Cart Link for Mobile */}
            <Link
              href="/shop/cart"
              className={cn(
                "text-white font-medium font-inter uppercase hover:text-blue-400 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-all duration-300 no-underline text-base block px-4 py-2",
                pathname === "/shop/cart" && "text-blue-400 underline"
              )}
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleNavClick("/shop/cart", e);
              }}
              aria-current={pathname === "/shop/cart" ? "page" : undefined}
            >
              Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
