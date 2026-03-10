"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Sparkle SVG component
function Sparkle({ className = "", size = 24, color = "#10b981" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
    </svg>
  );
}

export default function HeroAnimated() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-primary">
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatSlow2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(6px); }
        }
        @keyframes sparkleFloat {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(1.2) rotate(15deg); opacity: 1; }
        }
        .hero-fade-up {
          opacity: 0;
          animation: heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-fade-in {
          opacity: 0;
          animation: heroFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .float-slow { animation: floatSlow 5s ease-in-out infinite; }
        .float-slow2 { animation: floatSlow2 4.5s ease-in-out infinite; }
        .sparkle-float { animation: sparkleFloat 3s ease-in-out infinite; }
      `}</style>

      {/* Scattered sparkle decorations */}
      {mounted && (
        <>
          <div className="absolute top-[20%] left-[12%] sparkle-float" style={{ animationDelay: "0s" }}>
            <Sparkle size={20} color="#34d399" />
          </div>
          <div className="absolute top-[65%] left-[8%] sparkle-float" style={{ animationDelay: "1.5s" }}>
            <Sparkle size={14} color="#818cf8" />
          </div>
          <div className="absolute top-[30%] right-[10%] sparkle-float" style={{ animationDelay: "0.8s" }}>
            <Sparkle size={18} color="#818cf8" />
          </div>
          <div className="absolute bottom-[25%] right-[15%] sparkle-float" style={{ animationDelay: "2s" }}>
            <Sparkle size={22} color="#34d399" />
          </div>
          <div className="absolute bottom-[35%] left-[20%] sparkle-float hidden md:block" style={{ animationDelay: "1s" }}>
            <Sparkle size={16} color="#fbbf24" />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-28 pb-12">

        {/* Stacked headline with inline decorative elements */}
        <div className="mb-8">

          {/* Line 1: "we" + arrow + colorful shapes */}
          <div
            className="hero-fade-up flex items-center justify-center gap-3 md:gap-5 mb-2 md:mb-0"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-text-primary leading-none">
              we
            </span>
            {/* Green arrow box */}
            <div className="hero-fade-in float-slow flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ animationDelay: "0.4s", background: "linear-gradient(135deg, #10b981, #059669)" }}>
              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            {/* Colorful circles cluster */}
            <div className="hero-fade-in float-slow2 flex-shrink-0 flex items-center -space-x-2" style={{ animationDelay: "0.5s" }}>
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg" style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }} />
              <div className="w-8 h-8 md:w-11 md:h-11 rounded-full shadow-lg" style={{ background: "linear-gradient(135deg, #22d3ee, #3b82f6)" }} />
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)" }}>
                <span className="text-lg md:text-2xl">🚀</span>
              </div>
            </div>
          </div>

          {/* Line 2: "elevate" + gradient pill */}
          <div
            className="hero-fade-up flex items-center justify-center gap-3 md:gap-5 mb-2 md:mb-0"
            style={{ animationDelay: "0.3s" }}
          >
            {/* Dashed connector - desktop only */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <div className="w-3 h-3 rounded-full" style={{ border: "2px solid #818cf8" }} />
              <div className="w-12 border-t-2 border-dashed" style={{ borderColor: "rgba(129, 140, 248, 0.3)" }} />
            </div>
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-text-primary leading-none">
              elevate
            </span>
            {/* Gradient toggle pill */}
            <div className="hero-fade-in float-slow flex-shrink-0 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg" style={{ animationDelay: "0.7s", background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)" }}>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-white shadow-sm" />
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/40" />
              </div>
            </div>
          </div>

          {/* Line 3: code icon + "your ideas" + dashed path */}
          <div
            className="hero-fade-up flex items-center justify-center gap-3 md:gap-5"
            style={{ animationDelay: "0.5s" }}
          >
            {/* Code icon circle */}
            <div className="hero-fade-in float-slow2 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg" style={{ animationDelay: "0.9s", background: "linear-gradient(135deg, #c4b5fd, #818cf8)" }}>
              <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-text-primary leading-none">
              your ideas
            </span>
            {/* Dashed path decoration - desktop only */}
            <div className="hidden lg:block flex-shrink-0">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
                <path d="M5 30 Q 30 5, 55 30 Q 80 55, 95 30" stroke="#818cf8" strokeOpacity="0.35" strokeWidth="2.5" strokeDasharray="6 4" fill="none" />
                <polygon points="90,25 100,30 90,35" fill="#818cf8" fillOpacity="0.35" />
              </svg>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="hero-fade-up text-base md:text-lg lg:text-xl text-text-muted font-light max-w-xl mx-auto leading-relaxed mb-10"
          style={{ animationDelay: "0.7s" }}
        >
          We architect and ship world-class digital products so your team can launch faster.
        </p>

        {/* CTAs */}
        <div
          className="hero-fade-up flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animationDelay: "0.9s" }}
        >
          <Link
            href="/contact"
            className="px-8 py-3.5 text-base font-semibold rounded-lg transition-all hover:scale-[1.03] shadow-lg text-white"
            style={{ background: "linear-gradient(135deg, #1a1a2e, #2d2b55)" }}
          >
            Start your project
          </Link>
          <Link
            href="/portfolio"
            className="text-text-muted hover:text-text-primary underline underline-offset-4 decoration-text-muted/30 hover:decoration-text-primary/50 text-base font-medium transition-all"
          >
            See how it works
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="hero-fade-up mt-16 flex flex-wrap justify-center items-center gap-10 text-text-muted"
          style={{ animationDelay: "1.1s" }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold mb-1 text-text-primary">20+</div>
            <div className="text-xs uppercase tracking-widest">Products Shipped</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-text-muted/20" />
          <div className="text-center">
            <div className="text-2xl font-bold mb-1 text-text-primary">2 Weeks</div>
            <div className="text-xs uppercase tracking-widest">Avg. Delivery</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-text-muted/20" />
          <div className="text-center">
            <div className="text-2xl font-bold mb-1 text-text-primary">95%</div>
            <div className="text-xs uppercase tracking-widest">Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - part of the content flow, not absolute */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-0">
        <svg className="w-4 h-4 text-text-muted/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
