"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

interface BecomeSellerButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
}

export default function BecomeSellerButton({ 
  children, 
  className = "", 
  variant = "primary" 
}: BecomeSellerButtonProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const handleClick = () => {
    if (!isAuthenticated) {
      // Redirect to registration with seller role pre-selected
      router.push("/register?role=seller");
    } else if (user?.role === "seller") {
      // Already a seller, go to seller dashboard
      router.push("/seller");
    } else {
      // User is authenticated but not a seller, redirect to seller registration
      router.push("/register?role=seller");
    }
  };

  const baseClasses = "px-6 py-3 rounded-md transition-colors font-medium";
  const variantClasses = variant === "primary" 
    ? "bg-text-primary text-background-primary hover:bg-text-secondary"
    : "border border-text-primary text-text-primary hover:bg-text-primary hover:text-background-primary";

  return (
    <button 
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
} 