"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function AuthSection() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Don't render anything on server side
  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Link
          href="/login"
          className="text-text-secondary hover:text-text-primary transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="bg-text-primary text-background-primary px-4 py-2 rounded hover:bg-text-secondary transition-colors"
        >
          Join
        </Link>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated && user ? (
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <div className="w-8 h-8 bg-text-primary text-background-primary rounded-full flex items-center justify-center">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:block">{user.name}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* User Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-background-secondary border border-neutral-800 rounded-lg shadow-lg">
              <div className="p-2">
                <div className="px-3 py-2 text-sm text-text-muted border-b border-neutral-800">
                  {user.email}
                </div>
                <Link
                  href={`/${user.role}`}
                  className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background-tertiary rounded"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background-tertiary rounded"
                >
                  Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background-tertiary rounded"
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background-tertiary rounded"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Link
            href="/login"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-text-primary text-background-primary px-4 py-2 rounded hover:bg-text-secondary transition-colors"
          >
            Join
          </Link>
        </div>
      )}
    </>
  );
} 