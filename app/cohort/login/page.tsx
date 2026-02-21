"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "email" | "otp";

export default function CohortLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/cohort/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      setStep("otp");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOTPSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/cohort/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      router.push("/cohort/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background-primary text-text-primary flex flex-col">
      <header className="border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/cohort" className="text-xl font-bold text-text-primary">
              Ship With AI
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-serif font-light mb-2 text-center">
            Student Login
          </h1>
          <p className="text-text-muted text-center mb-8">
            {step === "email"
              ? "Enter the email you used to pay."
              : `We sent a 6-digit code to ${email}`}
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          {step === "email" ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-background-secondary border border-neutral-700 rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-accent-text py-3 rounded-full font-semibold hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? "Sending code..." : "Send verification code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium mb-2">
                  Verification code
                </label>
                <input
                  id="otp"
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="w-full bg-background-secondary border border-neutral-700 rounded-lg px-4 py-3 text-text-primary text-center text-2xl tracking-[0.5em] placeholder:text-text-muted/50 placeholder:tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-accent text-accent-text py-3 rounded-full font-semibold hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & login"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setError("");
                }}
                className="w-full text-text-muted text-sm hover:text-text-primary transition-colors"
              >
                Use a different email
              </button>
            </form>
          )}

          <p className="text-center text-text-muted text-sm mt-8">
            Don&apos;t have access?{" "}
            <Link href="/cohort" className="text-accent hover:underline">
              Pay &amp; enroll first
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
