"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ref for mobile menu container
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Handle click outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        mobileMenuButtonRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);


  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Promotional Banner */}
        <div className="bg-accent text-accent-text text-center py-2 text-xs md:text-sm font-medium tracking-wide">
          MVP DEVELOPMENT STUDIO | FROM IDEA TO LAUNCH IN 2 WEEKS
        </div>

        {/* Main Header */}
        <header className="bg-background-primary border-b border-neutral-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="text-2xl font-serif font-light text-text-primary">
                STUDIO
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors">
                  About
                </Link>
                <Link href="/services" className="text-text-secondary hover:text-text-primary transition-colors">
                  Services
                </Link>
                <Link href="/portfolio" className="text-text-secondary hover:text-text-primary transition-colors">
                  Portfolio
                </Link>
                <Link href="/pricing" className="text-text-secondary hover:text-text-primary transition-colors">
                  Pricing
                </Link>
                <Link href="/contact" className="text-text-secondary hover:text-text-primary transition-colors">
                  Contact
                </Link>
              </nav>


              {/* Right Side Actions */}
              <div className="items-center space-x-4 flex">
                {/* Theme Toggle */}
                <div className="hidden md:block">
                  <ThemeToggle />
                </div>

                {/* Contact CTA Button */}
                <Link
                  href="/contact"
                  className="hidden md:block bg-text-primary text-background-primary px-6 py-2 rounded hover:bg-text-secondary transition-colors font-medium"
                >
                  Start Your MVP
                </Link>

                {/* Mobile Menu Button */}
                <button
                  ref={mobileMenuButtonRef}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>


            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div ref={mobileMenuRef} className="md:hidden border-t border-neutral-800 py-4">
                <nav className="space-y-2">
                  <Link 
                    href="/about" 
                    className="block text-text-secondary hover:text-text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    href="/services" 
                    className="block text-text-secondary hover:text-text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <Link 
                    href="/portfolio" 
                    className="block text-text-secondary hover:text-text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Portfolio
                  </Link>
                  <Link 
                    href="/pricing" 
                    className="block text-text-secondary hover:text-text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block text-text-secondary hover:text-text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  
                  {/* Mobile Theme Toggle */}
                  <div className="py-2 flex items-center justify-between">
                    <span className="text-text-secondary">Theme</span>
                    <ThemeToggle />
                  </div>
                  
                  <div className="pt-4 border-t border-neutral-800">
                    <Link 
                      href="/contact" 
                      className="block bg-text-primary text-background-primary px-4 py-2 rounded hover:bg-text-secondary transition-colors text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Start Your MVP
                    </Link>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </header>
      </div>

    </>
  );
} 