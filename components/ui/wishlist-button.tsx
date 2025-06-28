"use client";

import { useState } from "react";
import { useWishlistStore } from "@/store/wishlist-store";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface WishlistButtonProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "button";
  className?: string;
}

export default function WishlistButton({
  product,
  size = "md",
  variant = "icon",
  className = "",
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const inWishlist = isInWishlist(product.$id);

  const handleToggle = () => {
    setIsAnimating(true);
    
    if (inWishlist) {
      removeFromWishlist(product.$id);
    } else {
      addToWishlist(product);
    }

    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const buttonSizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  if (variant === "button") {
    return (
      <Button
        onClick={handleToggle}
        variant={inWishlist ? "default" : "outline"}
        size="sm"
        className={`${className} transition-all duration-200 ${
          isAnimating ? "scale-95" : "scale-100"
        }`}
      >
        <svg
          className={`${sizeClasses[size]} mr-2 transition-all duration-200 ${
            inWishlist ? "text-red-500 fill-current" : "text-current"
          }`}
          fill={inWishlist ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </Button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`
        ${buttonSizeClasses[size]} 
        ${className}
        relative flex items-center justify-center rounded-full
        bg-background-secondary/80 backdrop-blur-sm
        border border-neutral-700/50
        hover:bg-background-tertiary
        transition-all duration-200
        ${isAnimating ? "scale-95" : "scale-100 hover:scale-105"}
        group
      `}
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {/* Heart Icon */}
      <svg
        className={`
          ${sizeClasses[size]} 
          transition-all duration-200
          ${inWishlist 
            ? "text-red-500 fill-current scale-110" 
            : "text-text-muted group-hover:text-red-400"
          }
          ${isAnimating ? "animate-pulse" : ""}
        `}
        fill={inWishlist ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>

      {/* Floating Animation */}
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
        </div>
      )}
    </button>
  );
} 