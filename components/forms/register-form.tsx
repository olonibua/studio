"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["buyer", "seller"]),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register: registerUser } = useAuthStore();

  // Get role from URL parameters
  const roleFromUrl = searchParams.get('role');
  const defaultRole = (roleFromUrl === 'seller' || roleFromUrl === 'buyer') ? roleFromUrl : 'buyer';

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: defaultRole as "buyer" | "seller",
    },
  });

  // Set role from URL on component mount
  useEffect(() => {
    if (roleFromUrl === 'seller' || roleFromUrl === 'buyer') {
      setValue('role', roleFromUrl as "buyer" | "seller");
    }
  }, [roleFromUrl, setValue]);

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await registerUser(data.email, data.password, data.name, data.role);
      // Redirect to role-specific dashboard
      if (data.role === 'seller') {
        router.push('/seller');
      } else {
        router.push('/buyer');
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-background-secondary border border-neutral-800 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-light mb-2 text-text-primary">
            Join MOSÉ
          </h2>
          <p className="text-text-muted font-light">
            Create your account to discover authentic African art
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          {/* Role Selection */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-3 block">
              I want to:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="relative cursor-pointer">
                <input
                  {...register("role")}
                  type="radio"
                  value="buyer"
                  className="sr-only"
                />
                <div
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    selectedRole === "buyer"
                      ? "border-text-primary bg-text-primary text-background-primary"
                      : "border-neutral-700 bg-background-tertiary text-text-secondary hover:border-neutral-600"
                  }`}
                >
                  <div className="text-2xl mb-2">🛍️</div>
                  <div className="font-medium">Buy Art</div>
                  <div className="text-xs opacity-75">Discover & collect</div>
                </div>
              </label>
              <label className="relative cursor-pointer">
                <input
                  {...register("role")}
                  type="radio"
                  value="seller"
                  className="sr-only"
                />
                <div
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    selectedRole === "seller"
                      ? "border-text-primary bg-text-primary text-background-primary"
                      : "border-neutral-700 bg-background-tertiary text-text-secondary hover:border-neutral-600"
                  }`}
                >
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="font-medium">Sell Art</div>
                  <div className="text-xs opacity-75">Share your creations</div>
                </div>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register("name")}
              type="text"
              placeholder="Full name"
              error={errors.name?.message}
              className="bg-background-tertiary border-neutral-700 text-text-primary placeholder:text-text-muted"
            />
          </div>

          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Email address"
              error={errors.email?.message}
              className="bg-background-tertiary border-neutral-700 text-text-primary placeholder:text-text-muted"
            />
          </div>

          <div>
            <Input
              {...register("password")}
              type="password"
              placeholder="Password (min. 8 characters)"
              error={errors.password?.message}
              className="bg-background-tertiary border-neutral-700 text-text-primary placeholder:text-text-muted"
            />
          </div>

          <div>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm password"
              error={errors.confirmPassword?.message}
              className="bg-background-tertiary border-neutral-700 text-text-primary placeholder:text-text-muted"
            />
          </div>

          <div>
            <label className="flex items-start space-x-3 text-sm text-text-secondary">
              <input
                {...register("agreeToTerms")}
                type="checkbox"
                className="w-4 h-4 mt-0.5 bg-background-tertiary border-neutral-700 rounded"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-text-primary underline hover:text-text-secondary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-text-primary underline hover:text-text-secondary">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-text-primary text-background-primary hover:bg-text-secondary font-medium"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
          <p className="text-text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-text-primary hover:text-text-secondary transition-colors underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 