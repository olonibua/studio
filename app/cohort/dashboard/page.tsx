"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COHORT_CONFIG } from "@/lib/cohort/constants";

export default function CohortDashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cohort/session")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.replace("/cohort/login");
        } else {
          setEmail(data.email);
          setLoading(false);
        }
      })
      .catch(() => router.replace("/cohort/login"));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/cohort/logout", { method: "POST" });
    router.replace("/cohort/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <header className="border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/cohort" className="text-xl font-bold text-text-primary">
              Ship With AI
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-muted hidden sm:inline">
                {email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Welcome */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-light mb-2">
              Welcome to {COHORT_CONFIG.name}
            </h1>
            <p className="text-text-muted">
              Here&apos;s everything you need.
            </p>
          </div>

          {/* Cohort Info */}
          <div className="bg-background-secondary border border-neutral-800 rounded-lg p-6 md:p-8">
            <h2 className="text-lg font-semibold mb-4">Cohort Details</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-text-muted">Duration</dt>
                <dd className="font-medium">{COHORT_CONFIG.duration}</dd>
              </div>
              <div>
                <dt className="text-text-muted">Spots</dt>
                <dd className="font-medium">{COHORT_CONFIG.spots} participants</dd>
              </div>
              <div>
                <dt className="text-text-muted">Your email</dt>
                <dd className="font-medium">{email}</dd>
              </div>
            </dl>
          </div>

          {/* WhatsApp Group */}
          <div className="bg-background-secondary border border-neutral-800 rounded-lg p-6 md:p-8">
            <h2 className="text-lg font-semibold mb-2">Join the Community</h2>
            <p className="text-text-muted text-sm mb-4">
              Join the private WhatsApp group to connect with other participants
              and get updates.
            </p>
            <a
              href={COHORT_CONFIG.whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Join WhatsApp Group
            </a>
          </div>

          {/* Resources */}
          <div className="bg-background-secondary border border-neutral-800 rounded-lg p-6 md:p-8">
            <h2 className="text-lg font-semibold mb-4">Resources</h2>
            <div className="space-y-4">
              {COHORT_CONFIG.resources.map((resource, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-background-primary rounded-lg border border-neutral-800"
                >
                  <div className="w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-text-muted mt-1">
                      {resource.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help */}
          <div className="text-center text-sm text-text-muted">
            Need help?{" "}
            <a
              href={COHORT_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
