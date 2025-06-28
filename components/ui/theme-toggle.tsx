"use client";

import { useTheme } from "@/lib/contexts/theme-context";
import { Button } from "./button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-10 h-10 p-0 rounded-full border border-neutral-700 hover:border-text-primary transition-all duration-200 text-text-secondary hover:text-text-primary"
      aria-label={`Switch to ${theme === "black" ? "white" : "black"} theme`}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Black theme icon (sun) - shown when in black theme */}
        <svg
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            theme === "black"
              ? "rotate-0 opacity-100"
              : "rotate-90 opacity-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        
        {/* White theme icon (moon) - shown when in white theme */}
        <svg
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            theme === "white"
              ? "rotate-0 opacity-100"
              : "-rotate-90 opacity-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </Button>
  );
} 