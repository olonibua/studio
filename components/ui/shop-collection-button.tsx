"use client";

import { useRouter } from "next/navigation";

interface ShopCollectionButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
}

export default function ShopCollectionButton({ 
  children, 
  className = "", 
  variant = "primary" 
}: ShopCollectionButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/products");
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