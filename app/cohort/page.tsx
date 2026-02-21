"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import {
  generatePaymentReference,
  initializePaystackPopup,
  formatAmountToKobo,
} from "@/lib/paystack";
import { useRouter } from "next/navigation";
import { COHORT_CONFIG } from "@/lib/cohort/constants";

const WHATSAPP_LINK = COHORT_CONFIG.whatsappLink;

export default function CohortPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [payEmail, setPayEmail] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-redirect to login after successful payment
  useEffect(() => {
    if (paymentSuccess) {
      const timer = setTimeout(() => {
        router.push("/cohort/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [paymentSuccess, router]);

  const handlePay = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!payEmail) return;
      setPaymentLoading(true);

      const reference = generatePaymentReference();

      initializePaystackPopup(
        {
          email: payEmail,
          amount: formatAmountToKobo(COHORT_CONFIG.price.ngn),
          currency: "NGN",
          reference,
        },
        () => {
          // onSuccess — send receipt email in the background
          setPaymentLoading(false);
          setPaymentSuccess(true);

          fetch("/api/cohort/payment-success", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference, email: payEmail }),
          }).catch(() => {
            // Receipt is best-effort, don't block the user
          });
        },
        () => {
          // onClose / onCancel
          setPaymentLoading(false);
        }
      );
    },
    [payEmail]
  );

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      {/* Header */}
      <header className="border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-text-primary">
              Ship With AI
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/cohort/login"
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                Student Login
              </Link>
              <button
                onClick={() => setShowPayModal(true)}
                className="bg-accent text-accent-text px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all"
              >
                Pay Now
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-text-muted hover:text-text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-neutral-800 py-4 space-y-3">
              <Link
                href="/cohort/login"
                className="block text-text-muted hover:text-text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Student Login
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowPayModal(true);
                }}
                className="w-full bg-accent text-accent-text px-5 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-all"
              >
                Pay Now
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-8 tracking-tight leading-[1.1]">
                Learn to build your own app with AI.<br />
                Ship it in 2 weeks.
              </h1>
              <p className="text-lg md:text-xl text-text-muted font-light leading-relaxed max-w-2xl mb-4">
                A hands-on mentorship where you learn AI coding tools and ship a real product.
                Not a course. Not a tutorial. You build something real.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10">
                <button
                  onClick={() => setShowPayModal(true)}
                  className="bg-accent text-accent-text px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all"
                >
                  Pay Now — {COHORT_CONFIG.spots} spots only
                </button>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-neutral-700 text-text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-background-secondary transition-all"
                >
                  I have questions
                </a>
              </div>
              <p className="text-sm text-text-muted mt-4">
                Next cohort starts {COHORT_CONFIG.startDate}. Limited to {COHORT_CONFIG.spots} spots.
              </p>
            </div>

            {/* Hero Image Collage */}
            <div className="hidden lg:block relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden border border-neutral-800">
                    <Image
                      src="/u9499386881_Modern_SaaS_dashboard_interface_with_charts_table_b7fc2b96-3536-4c1e-8659-6e65b356fff8_1.png"
                      alt="SaaS dashboard built with AI"
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-neutral-800">
                    <Image
                      src="/u9499386881_E-commerce_website_showing_product_grid_shopping__7dd6169e-5dfd-4a20-82da-52b721a8b912_3.png"
                      alt="E-commerce site built with AI"
                      width={400}
                      height={250}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-lg overflow-hidden border border-neutral-800">
                    <Image
                      src="/u9499386881_Mobile_app_showing_multiple_screens_-_login_dashb_cdf6dca8-f3d9-4c2b-9319-ea10b44de238_1.png"
                      alt="Mobile app built with AI"
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-neutral-800">
                    <Image
                      src="/u9499386881_realistic_Landing_page_design_showing_hero_sectio_aa40d23f-47c3-44b9-a0b7-983708d7150f_3.png"
                      alt="Landing page built with AI"
                      width={400}
                      height={250}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-text-primary">
              AI tools are powerful. But watching demos isn&apos;t building.
            </h2>
            <div className="space-y-4 text-lg text-text-muted leading-relaxed">
              <p>
                You&apos;ve seen the threads. You&apos;ve bookmarked the tutorials. Maybe you&apos;ve played around with Claude Code or Cursor for an afternoon.
              </p>
              <p>
                But you still don&apos;t have a shipped project.
              </p>
              <p>
                Building a real product requires more than a tool — it requires a plan, a process, and the discipline to finish. That&apos;s what this program provides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-background-secondary border border-neutral-800 rounded-lg p-8 md:p-12">
              <h3 className="text-sm uppercase tracking-widest text-accent mb-8 font-medium">
                What you get
              </h3>
              <ul className="space-y-4">
                {[
                  "2 weeks of structured mentorship",
                  "Live sessions + recordings",
                  "1-on-1 check-ins & code reviews",
                  "Full curriculum, templates & study materials",
                  "Private community access",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-lg text-text-primary">
                    <div className="w-2 h-2 bg-accent rounded-full mr-4 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Real Projects with Images */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-text-primary">
              Real projects, built during the program.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                type: "SaaS MVP",
                description: "A task management app with AI prioritization. Next.js, Supabase, deployed to Vercel.",
                image: "/u9499386881_Modern_SaaS_dashboard_interface_with_charts_table_b7fc2b96-3536-4c1e-8659-6e65b356fff8_1.png",
              },
              {
                type: "Chrome Extension",
                description: "An email summarizer for Gmail. From idea to Chrome Web Store in 2 weeks.",
                image: "/u9499386881_developers_rapidly_building_a_web_app_on_laptops__e75af36a-5ba9-44ab-8c0e-9f82cdafa0bc_1.png",
              },
              {
                type: "Internal Tool",
                description: "A client dashboard that replaced 4 spreadsheets. Used by a real team daily.",
                image: "/u9499386881_E-commerce_website_showing_product_grid_shopping__7dd6169e-5dfd-4a20-82da-52b721a8b912_3.png",
              },
              {
                type: "Mobile App",
                description: "A habit tracker with smart reminders. React Native, deployed to TestFlight.",
                image: "/u9499386881_Mobile_app_showing_multiple_screens_-_login_dashb_cdf6dca8-f3d9-4c2b-9319-ea10b44de238_1.png",
              },
              {
                type: "Portfolio Site",
                description: "A designer's portfolio with an AI-powered case study generator. Figma to live site.",
                image: "/u9499386881_realistic_Landing_page_design_showing_hero_sectio_aa40d23f-47c3-44b9-a0b7-983708d7150f_3.png",
              },
              {
                type: "AI Bot",
                description: "A customer support agent trained on company docs. Handling real tickets within 2 weeks.",
                image: "/u9499386881_developers_rapidly_building_a_web_app_on_laptops__e75af36a-5ba9-44ab-8c0e-9f82cdafa0bc_1.png",
              },
            ].map((project, i) => (
              <div
                key={i}
                className="bg-background-primary rounded-lg border border-neutral-800 overflow-hidden"
              >
                <div className="aspect-video relative">
                  <Image
                    src={project.image}
                    alt={project.type}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{project.type}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2-Week Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-text-primary">
              2 weeks. One project. Shipped.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                week: "W01",
                title: "Learn the tools & build",
                description: "Pick your AI coding tool. Write your PRD. Scaffold your project. Build core features, database, and real data. By the end of week one, you have a working app.",
              },
              {
                week: "W02",
                title: "Polish & ship",
                description: "Responsive design. Loading states. Error handling. Deploy to a live URL. Record your demo. Present on Demo Day. Your project is on the internet.",
              },
            ].map((week, i) => (
              <div
                key={i}
                className="bg-background-secondary p-8 rounded-lg border border-neutral-800"
              >
                <span className="text-sm font-semibold uppercase tracking-widest text-accent mb-3 block">
                  {week.week}
                </span>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{week.title}</h3>
                <p className="text-text-muted leading-relaxed">{week.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Image Banner */}
      <section className="py-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {[
            "/u9499386881_Modern_SaaS_dashboard_interface_with_charts_table_b7fc2b96-3536-4c1e-8659-6e65b356fff8_1.png",
            "/u9499386881_Mobile_app_showing_multiple_screens_-_login_dashb_cdf6dca8-f3d9-4c2b-9319-ea10b44de238_1.png",
            "/u9499386881_E-commerce_website_showing_product_grid_shopping__7dd6169e-5dfd-4a20-82da-52b721a8b912_3.png",
            "/u9499386881_realistic_Landing_page_design_showing_hero_sectio_aa40d23f-47c3-44b9-a0b7-983708d7150f_3.png",
          ].map((src, i) => (
            <div key={i} className="aspect-video relative">
              <Image src={src} alt="Project showcase" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-text-primary">
              What participants say.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "I'd been sitting on my app idea for six months. Shipped it in two weeks during the program.",
                name: "Amara K.",
                role: "Product Designer at Figma",
              },
              {
                quote: "I'm a PM who can't code. Or couldn't. I built and launched an internal tool my team uses every day.",
                name: "James R.",
                role: "Product Manager at Shopify",
              },
              {
                quote: "The prompting techniques and MCP setup changed everything. I was barely scratching the surface before.",
                name: "Priya S.",
                role: "Full-Stack Developer at Vercel",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-background-primary p-8 rounded-lg border border-neutral-800"
              >
                <p className="text-text-primary leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-text-primary">{testimonial.name}</p>
                  <p className="text-sm text-text-muted">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-sm uppercase tracking-widest text-text-muted mb-4">Pricing</h3>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-text-primary">
              Simple pricing. One-time payment.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* NGN Price */}
            <div className="bg-background-secondary p-8 rounded-lg border border-neutral-800">
              <div className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
                ₦{COHORT_CONFIG.price.ngn.toLocaleString()}
              </div>
              <p className="text-sm font-medium text-accent mb-1">NGN</p>
              <p className="text-text-muted text-sm">One-time payment</p>
            </div>

            {/* USD Price */}
            <div className="bg-accent p-8 rounded-lg">
              <div className="text-4xl md:text-5xl font-bold text-accent-text mb-2">
                ${COHORT_CONFIG.price.usd}
              </div>
              <p className="text-sm font-medium text-accent-text/70 mb-1">USD</p>
              <p className="text-accent-text/60 text-sm">One-time payment</p>
            </div>
          </div>

          <div className="text-center mt-12 space-y-4">
            <button
              onClick={() => setShowPayModal(true)}
              className="inline-block bg-accent text-accent-text px-10 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all"
            >
              Pay Now — {COHORT_CONFIG.spots} spots only
            </button>
            <div>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-neutral-700 text-text-primary px-8 py-3 rounded-full font-medium hover:bg-background-secondary transition-all"
              >
                I have questions
              </a>
            </div>
            <p className="text-sm text-text-muted">
              Starts {COHORT_CONFIG.startDate}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-text-primary">
              Questions.
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Do I need to know how to code?",
                answer: "No. This program is designed for non-developers and beginners. AI coding tools handle the heavy lifting — you'll learn how to direct them effectively. If you can describe what you want in plain English, you can build it.",
              },
              {
                question: "How much time do I need per week?",
                answer: "Plan for 8–10 hours per week. That includes live sessions, building your project, and check-ins. Most participants do evenings and weekends.",
              },
              {
                question: "What if I don't finish in 2 weeks?",
                answer: "You'll still have everything you need to finish — recordings, templates, community access, and study materials.",
              },
              {
                question: "Is this just a course with videos?",
                answer: "No. This is a hands-on mentorship. You build a real project from day one, with live sessions, code reviews, and 1-on-1 guidance. Videos are just the recordings of our live sessions.",
              },
              {
                question: "Is there a refund policy?",
                answer: "If you're not satisfied within the first 7 days, we'll give you a full refund. No questions asked.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-neutral-800 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-background-tertiary transition-colors"
                >
                  <span className="font-semibold text-text-primary pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-text-muted leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-text-primary">
              You&apos;ve got the idea. Now build it.
            </h2>
            <p className="text-lg text-text-muted mb-10">
              Pay now and get instant access. Cohort starts {COHORT_CONFIG.startDate}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowPayModal(true)}
                className="bg-accent text-accent-text px-10 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all"
              >
                Pay Now — {COHORT_CONFIG.spots} spots only
              </button>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-neutral-700 text-text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-background-secondary transition-all"
              >
                I have questions
              </a>
            </div>
            <p className="text-sm text-text-muted mt-6">
              Already paid?{" "}
              <Link href="/cohort/login" className="text-accent hover:underline">
                Log in to your dashboard
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">&copy; 2026 Ship With AI</p>
            <p className="text-sm text-text-muted">studiomvp.co.uk</p>
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-background-primary border border-neutral-800 rounded-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => {
                setShowPayModal(false);
                if (paymentSuccess) {
                  setPaymentSuccess(false);
                  setPayEmail("");
                }
              }}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {paymentSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Payment successful!</h3>
                <p className="text-text-muted text-sm mb-6">
                  You&apos;re in. Redirecting you to login...
                </p>
                <Link
                  href="/cohort/login"
                  className="inline-block bg-accent text-accent-text px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
                >
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-1">Pay for Ship With AI</h3>
                <p className="text-text-muted text-sm mb-6">
                  ₦{COHORT_CONFIG.price.ngn.toLocaleString()} &middot; One-time payment
                </p>

                <form onSubmit={handlePay} className="space-y-4">
                  <div>
                    <label htmlFor="pay-email" className="block text-sm font-medium mb-2">
                      Email address
                    </label>
                    <input
                      id="pay-email"
                      type="email"
                      required
                      value={payEmail}
                      onChange={(e) => setPayEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-background-secondary border border-neutral-700 rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={paymentLoading}
                    className="w-full bg-accent text-accent-text py-3 rounded-full font-semibold hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {paymentLoading ? "Opening Paystack..." : `Pay ₦${COHORT_CONFIG.price.ngn.toLocaleString()}`}
                  </button>
                </form>

                <p className="text-xs text-text-muted text-center mt-4">
                  Secure payment via Paystack. You&apos;ll use this email to log in after payment.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
