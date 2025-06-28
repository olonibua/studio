"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export default function RedirectHandler() {
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
    }
  }, [user, isLoading, router]);

  return null; // This component doesn't render anything
} 