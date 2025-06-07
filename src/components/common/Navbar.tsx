'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

// Fallback debounce function
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

interface NavbarProps {
  cartItemCount?: number;
}

export default function Navbar({ cartItemCount = 0 }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [localCartCount, setLocalCartCount] = useState<number>(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() ?? '';
  const router = useRouter();

  // Initialize cart count from localStorage
  useEffect(() => {
    const storedCount = localStorage.getItem('cartItemCount');
    setLocalCartCount(storedCount ? parseInt(storedCount, 10) : cartItemCount);
  }, [cartItemCount]);

  // Update localStorage when cart count changes
  useEffect(() => {
    localStorage.setItem('cartItemCount', localCartCount.toString());
  }, [localCartCount]);

  // Debug log
  useEffect(() => {
    console.log('Navbar rendered', {
      pathname,
      localCartCount,
      user,
      isMobileMenuOpen,
    });
  }, [pathname, localCartCount, user, isMobileMenuOpen]);

  // Fetch user state and listen for auth changes
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Scroll handling for logo shrink
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = debounce(() => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      lastScrollY = currentScrollY;
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Focus trapping for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
        if (e.key === 'Escape') {
          console.log('Escape key pressed, closing mobile menu');
          setIsMobileMenuOpen(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on outside click with debouncing to avoid race condition
  useEffect(() => {
    const handleOutsideClick = debounce((e: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !hamburgerButtonRef.current?.contains(e.target as Node)
      ) {
        console.log('Outside click detected, closing mobile menu', {
          target: e.target,
          mobileMenuContains: mobileMenuRef.current?.contains(e.target as Node),
          hamburgerContains: hamburgerButtonRef.current?.contains(
            e.target as Node
          ),
        });
        setIsMobileMenuOpen(false);
      }
    }, 10);

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Teams', href: '/teams' },
    { name: 'Schedules', href: '/schedules' },
    { name: 'Tournaments', href: '/tournaments' },
    ...(user ? [] : [{ name: 'Login', href: '/coaches/login' }]),
    { name: 'Sign Up', href: '/join' },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    console.log(`Navigating to ${href}, event:`, {
      href,
      currentPath: pathname,
      target: e.target ? (e.target as HTMLElement).outerHTML : 'no target',
    });
  };

  const handleToggleMobileMenu = () => {
    console.log('Toggling mobile menu, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    console.log('Logging out user');
    await supabase.auth.signOut();
    setUser(null);
    router.push('/coaches/login');
  };

  // Determine cart icon destination
  const cartHref = pathname.startsWith('/shop') ? '/shop/cart' : '/shop';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full min-h-14 bg-black opacity-100 transition-all duration-300'
      )}
    >
      <div className="flex h-14 items-center justify-between w-full max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skip to Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:z-50"
        >
          Skip to content
        </a>

        {/* Logo (Left) */}
        <div className="flex items-center">
          <Link href="/" aria-label="World Class Sports Home">
            <div
              className={cn(
                'relative transition-all duration-300',
                scrolled
                  ? 'md:h-8 md:w-[80px] h-10 w-[100px]'
                  : 'h-10 w-[100px]'
              )}
            >
              <Image
                src="/images/WCS Logo-transparentBG.png"
                alt="World Class Sports Logo"
                width={100}
                height={40}
                sizes="100px"
                priority
                loading="eager"
                className="object-contain w-full h-full p-1"
                onError={(e) => {
                  console.error('Failed to load Navbar logo');
                  e.currentTarget.src = '/images/placeholder-logo.png';
                }}
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation (Centered Links) */}
        <nav
          className="hidden md:flex items-center space-x-2"
          role="navigation"
        >
          {navItems.slice(0, user ? 4 : 5).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-white font-inter uppercase font-light hover:text-blue-400 rounded-sm transition-all duration-300 no-underline',
                scrolled ? 'text-xs' : 'text-sm',
                pathname.startsWith(item.href) && 'text-blue-400'
              )}
              onClick={(e) => handleNavClick(item.href, e)}
              aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className={cn(
                'text-white font-inter uppercase font-light hover:text-blue-400 rounded-sm transition-all duration-300 no-underline bg-transparent border-none cursor-pointer',
                scrolled ? 'text-xs' : 'text-sm'
              )}
            >
              Sign Out
            </button>
          )}
        </nav>

        {/* Right-Aligned Cart and Sign Up (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href={cartHref}
            className="relative text-white hover:text-blue-400 transition-all duration-300"
            onClick={(e) => handleNavClick(cartHref, e)}
            aria-current={pathname.startsWith(cartHref) ? 'page' : undefined}
            aria-live="polite"
          >
            <ShoppingCart
              className={cn('h-5 w-5', scrolled ? 'h-4 w-4' : 'h-5 w-5')}
            />
            {localCartCount > 0 && (
              <span
                className={cn(
                  'absolute -top-2 -right-2 bg-[#F11A20] text-white text-xs rounded-full flex items-center justify-center',
                  localCartCount >= 10 ? 'min-w-6 h-6' : 'min-w-5 h-5'
                )}
              >
                {localCartCount}
              </span>
            )}
          </Link>
          <Button
            asChild
            variant="default"
            className={cn(
              'bg-blue-600 text-white font-inter uppercase font-light rounded-md hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-sm',
              scrolled ? 'text-xs px-3 py-1' : 'text-sm px-4 py-1.5'
            )}
          >
            <Link
              href="/join"
              className="no-underline"
              onClick={(e) => handleNavClick('/join', e)}
              aria-current={pathname === '/join' ? 'page' : undefined}
            >
              Sign Up
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Link
            href={cartHref}
            className="relative text-white hover:text-blue-400 transition-all duration-300"
            onClick={(e) => handleNavClick(cartHref, e)}
            aria-current={pathname.startsWith(cartHref) ? 'page' : undefined}
            aria-live="polite"
          >
            <ShoppingCart className="h-5 w-5" />
            {localCartCount > 0 && (
              <span
                className={cn(
                  'absolute -top-1 -right-1 bg-[#F11A20] text-white text-xs rounded-full flex items-center justify-center h-4 w-4'
                )}
              >
                {localCartCount}
              </span>
            )}
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            ref={hamburgerButtonRef}
            onClick={handleToggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="text-white hover:bg-gray-800 hover:scale-105 w-10 h-10"
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
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              console.log('Backdrop clicked, closing mobile menu');
              setIsMobileMenuOpen(false);
            }}
            aria-hidden="true"
          />
          <nav
            ref={mobileMenuRef}
            className="absolute right-0 top-0 w-4/5 h-[calc(100vh-3.5rem)] bg-[#002C51] shadow-lg transform transition-transform duration-300 animate-slide-in"
            role="navigation"
          >
            <div className="flex flex-col h-full pt-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-blue-400 hover:bg-transparent self-start mx-4 mb-4 w-10 h-10"
                onClick={() => {
                  console.log('Close button clicked, closing mobile menu');
                  setIsMobileMenuOpen(false);
                }}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
              <div className="flex flex-col space-y-4 px-4 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'text-white font-inter uppercase font-semibold hover:text-blue-400 rounded-sm transition-all duration-300 block px-4 py-2 text-base',
                      pathname.startsWith(item.href) && 'text-blue-400'
                    )}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleNavClick(item.href, {} as any);
                    }}
                    aria-current={
                      pathname.startsWith(item.href) ? 'page' : undefined
                    }
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href={cartHref}
                  className={cn(
                    'text-white font-inter uppercase font-semibold hover:text-blue-400 rounded-sm transition-all duration-300 block px-4 py-2 text-base',
                    pathname.startsWith(cartHref) && 'text-blue-400'
                  )}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavClick(cartHref, {} as any);
                  }}
                  aria-current={
                    pathname.startsWith(cartHref) ? 'page' : undefined
                  }
                >
                  Cart {localCartCount > 0 && `(${localCartCount})`}
                </Link>
                {user && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      'text-white font-inter uppercase font-semibold hover:text-blue-400 rounded-sm transition-all duration-300 block px-4 py-2 text-base text-left bg-transparent border-none cursor-pointer'
                    )}
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
