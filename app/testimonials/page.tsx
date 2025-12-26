"use client";

import Header from "@/components/layout/header";
import Link from "next/link";

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-8 tracking-wide">
              Client Testimonials
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-light leading-relaxed">
              Don't just take our word for it. Here's what founders and entrepreneurs 
              say about working with our studio.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-background-secondary border-y border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">4.8/5</div>
              <div className="text-sm uppercase tracking-wide text-text-muted">Average Rating</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-neutral-700"></div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">95%</div>
              <div className="text-sm uppercase tracking-wide text-text-muted">Client Satisfaction</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-neutral-700"></div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">75%</div>
              <div className="text-sm uppercase tracking-wide text-text-muted">Repeat Clients</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-neutral-700"></div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">2 Weeks</div>
              <div className="text-sm uppercase tracking-wide text-text-muted">Average Timeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Coming Soon */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-background-secondary p-12 rounded-lg border border-neutral-800">
              <div className="text-6xl mb-6">💬</div>
              <h2 className="text-3xl font-serif font-light mb-4 text-text-primary">
                Testimonials Coming Soon
              </h2>
              <p className="text-lg text-text-muted mb-8 leading-relaxed">
                We're currently collecting feedback from our clients. Check back soon to see what founders are saying about their experience working with us.
              </p>
              <Link
                href="/portfolio"
                className="inline-block bg-accent text-accent-text px-8 py-3 rounded font-medium hover:bg-accent/90 transition-colors"
              >
                View Our Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent/10 border-t border-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-light mb-6 text-text-primary">
              Ready to Become Our Next Success Story?
            </h2>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              Join the founders who trusted us with their MVP and are now thriving in the market
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-accent-text px-8 py-3 rounded font-medium hover:bg-accent/90 transition-colors"
              >
                Start Your Project Today
              </Link>
              <Link
                href="/portfolio"
                className="border border-accent text-accent px-8 py-3 rounded font-medium hover:bg-accent hover:text-accent-text transition-colors"
              >
                See Our Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}