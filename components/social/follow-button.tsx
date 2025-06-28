"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FollowButtonProps {
  userId: string;
  isFollowing: boolean;
  followersCount: number;
  onFollow: (userId: string) => Promise<void>;
  onUnfollow: (userId: string) => Promise<void>;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  variant?: "default" | "outline" | "ghost";
  showCount?: boolean;
  className?: string;
}

export default function FollowButton({
  userId,
  isFollowing,
  followersCount,
  onFollow,
  onUnfollow,
  disabled = false,
  size = "default",
  variant = "default",
  showCount = false,
  className = ""
}: FollowButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [localFollowing, setLocalFollowing] = useState(isFollowing);
  const [localCount, setLocalCount] = useState(followersCount);

  const handleToggleFollow = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);
    
    try {
      if (localFollowing) {
        await onUnfollow(userId);
        setLocalFollowing(false);
        setLocalCount(prev => prev - 1);
      } else {
        await onFollow(userId);
        setLocalFollowing(true);
        setLocalCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      // Revert optimistic update on error
      setLocalFollowing(isFollowing);
      setLocalCount(followersCount);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonVariant = localFollowing 
    ? (variant === "default" ? "outline" : variant)
    : variant;

  return (
    <Button
      onClick={handleToggleFollow}
      disabled={disabled || isLoading}
      variant={buttonVariant}
      size={size}
      className={`${className} transition-all duration-200 ${
        isLoading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      <div className="flex items-center space-x-2">
        {/* Follow Icon */}
        {localFollowing ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
        
        {/* Button Text */}
        <span>
          {isLoading 
            ? (localFollowing ? 'Unfollowing...' : 'Following...') 
            : (localFollowing ? 'Following' : 'Follow')
          }
        </span>
        
        {/* Follower Count */}
        {showCount && (
          <span className="text-sm opacity-75">
            ({localCount})
          </span>
        )}
      </div>
    </Button>
  );
} 