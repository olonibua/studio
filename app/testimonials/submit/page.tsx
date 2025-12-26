"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import Link from "next/link";

export default function SubmitTestimonialPage() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    testimonial: "",
    projectType: "",
    rating: 5,
    results: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/testimonials/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit testimonial");
      }

      setStatus("success");
      setFormData({
        name: "",
        title: "",
        company: "",
        email: "",
        testimonial: "",
        projectType: "",
        rating: 5,
        results: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-light mb-6 tracking-wide">
                Share Your Experience
              </h1>
              <p className="text-lg md:text-xl text-text-muted font-light leading-relaxed">
                Thank you for working with us! We'd love to hear about your experience
                and share your success story with future clients.
              </p>
            </div>

            {status === "success" ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-semibold mb-4 text-green-400">
                  Thank You!
                </h2>
                <p className="text-text-muted mb-6">
                  Your testimonial has been submitted successfully. We appreciate you
                  taking the time to share your experience.
                </p>
                <Link
                  href="/testimonials"
                  className="inline-block bg-accent text-accent-text px-6 py-3 rounded font-medium hover:bg-accent/90 transition-colors"
                >
                  View Testimonials
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-background-secondary p-8 rounded-lg border border-neutral-800">
                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-text-primary">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background-primary border border-neutral-700 rounded text-text-primary focus:outline-none focus:border-accent transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Title */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-2 text-text-primary">
                        Your Title/Position <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background-primary border border-neutral-700 rounded text-text-primary focus:outline-none focus:border-accent transition-colors"
                        placeholder="Founder & CEO"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2 text-text-primary">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background-primary border border-neutral-700 rounded text-text-primary focus:outline-none focus:border-accent transition-colors"
                        placeholder="Your Company"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-primary">
                        Email Address (optional)
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background-primary border border-neutral-700 rounded text-text-primary focus:outline-none focus:border-accent transition-colors"
                        placeholder="john@company.com"
                      />
                      <p className="text-xs text-text-muted mt-1">
                        In case we need to follow up with you
                      </p>
                    </div>

                    {/* Rating */}
                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium mb-2 text-text-primary">
                        Overall Rating <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background-primary border border-neutral-700 rounded text-text-primary focus:outline-none focus:border-accent transition-colors"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ - Excellent</option>
                        <option value={4}>⭐⭐⭐⭐ - Very Good</option>
                        <option value={3}>⭐⭐⭐ - Good</option>
                        <option value={2}>⭐⭐ - Fair</option>
                        <option value={1}>⭐ - Poor</option>
                      </select>
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium mb-2 text-text-primary">
                        Project Type/Description
                      </label>
                      <input
                        type="text"
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background-primary border border-neutral-700 rounded text-text-primary focus:outline-none focus:border-accent transition-colors"
                        placeholder="e.g., E-commerce Platform, Mobile App, SaaS Dashboard"
                      />
                    </div>

                    {/* Testimonial */}
                    <div>
                      <label htmlFor="testimonial" className="block text-sm font-medium mb-2 text-text-primary">
                        Your Testimonial <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="testimonial"
                        name="testimonial"
                        value={formData.testimonial}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-background-primary border border-neutral-700 rounded text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                        placeholder="Tell us about your experience working with our team. What did you appreciate most? How did the project turn out?"
                      />
                      <p className="text-xs text-text-muted mt-1">
                        Please share specific details about your experience
                      </p>
                    </div>

                    {/* Results */}
                    <div>
                      <label htmlFor="results" className="block text-sm font-medium mb-2 text-text-primary">
                        Results Achieved (optional)
                      </label>
                      <textarea
                        id="results"
                        name="results"
                        value={formData.results}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-background-primary border border-neutral-700 rounded text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                        placeholder="e.g., Successful launch, 1000+ users in first month, Raised funding"
                      />
                      <p className="text-xs text-text-muted mt-1">
                        Separate multiple results with commas
                      </p>
                    </div>
                  </div>
                </div>

                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
                    {errorMessage}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex-1 bg-accent text-accent-text px-8 py-4 rounded font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Submitting..." : "Submit Testimonial"}
                  </button>
                  <Link
                    href="/testimonials"
                    className="px-8 py-4 rounded font-medium border border-neutral-700 hover:bg-background-secondary transition-colors text-center"
                  >
                    Cancel
                  </Link>
                </div>

                <p className="text-xs text-text-muted text-center">
                  By submitting this testimonial, you consent to us using your feedback
                  on our website and marketing materials.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
