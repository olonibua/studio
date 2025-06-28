"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";

// Force dynamic rendering for authentication-dependent pages
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const { user, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect based on user role
      if (user.role === 'seller') {
        router.push('/seller');
      } else if (user.role === 'buyer') {
        router.push('/buyer');
      } else if (user.role === 'admin') {
        router.push('/admin');
      }
    } else if (!isLoading && !user) {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-primary text-text-primary">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-primary mx-auto mb-4"></div>
              <p className="text-text-muted">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-light mb-4">Welcome to MOSÉ</h1>
          <p className="text-text-muted mb-8">
            Your gateway to authentic African art and culture
          </p>
          <div className="max-w-2xl mx-auto text-left space-y-6">
            <div className="bg-background-secondary border border-neutral-800 rounded-lg p-6">
              <h2 className="text-xl font-serif mb-4 text-text-primary">Getting Started</h2>
              <ul className="space-y-2 text-text-secondary">
                <li>• Sign in or create an account to access your dashboard</li>
                <li>• Buyers: Browse and purchase authentic African art</li>
                <li>• Sellers: List your artwork and manage your store</li>
                <li>• Admins: Manage the platform and users</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 