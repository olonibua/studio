"use client";

import Link from "next/link";
import { useState } from "react";

// WisprForm Design System Colors
const wisprColors = {
  background: '#F7F6F3',      // Warm off-white/cream
  cardBackground: '#FFFFFF',   // Pure white for cards
  textPrimary: '#1A1A1A',     // Near black for headings
  textSecondary: '#6B6B6B',   // Gray for subtitles
  textMuted: '#9B9B9B',       // Light gray for labels
  buttonPrimary: '#1A1A1A',   // Black buttons
  buttonText: '#FFFFFF',      // White text on black buttons
  border: '#E8E8E5',          // Subtle warm border
  success: '#10B981',         // Green for success
  error: '#EF4444',           // Red for errors
};

export default function WisprFormSupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          projectType: 'WisprForm Support',
          company: 'WisprForm App User',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How do I upload a form?",
      answer: "Tap the 'Upload Form' button on the home screen. You can upload PDF documents, images of forms, or take a photo of a paper form. Our AI will automatically detect the fillable fields."
    },
    {
      question: "How does voice filling work?",
      answer: "Once your form is uploaded and fields are detected, tap the microphone icon and simply speak your answers naturally. For example, say 'My name is John Smith' and WisprForm will fill in the name field automatically."
    },
    {
      question: "Why weren't all fields detected?",
      answer: "Our AI field detection works best with clearly formatted documents. Some handwritten forms, low-quality scans, or complex layouts may not have all fields detected. You can always add fields manually by tapping 'Add Field'."
    },
    {
      question: "How many free forms can I fill?",
      answer: "Guest users can fill 2 forms for free. Create an account to unlock more forms and additional features. Premium subscribers get unlimited form fills."
    },
    {
      question: "How do I download my completed form?",
      answer: "After filling all fields, tap 'Preview' to review your answers, then tap 'Download' to save the completed form to your device. You can also share it directly via email or other apps."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take your privacy seriously. Your form data is encrypted and processed securely. We do not store your completed forms on our servers after you download them. See our Privacy Policy for more details."
    },
    {
      question: "How do I delete my account?",
      answer: "Go to Profile > Settings > Delete Account. This will permanently remove your account and all associated data. This action cannot be undone."
    },
    {
      question: "Can I use WisprForm offline?",
      answer: "Currently, WisprForm requires an internet connection for AI-powered field detection and voice processing. Downloaded forms can be viewed offline."
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: wisprColors.background }}>
      {/* Header */}
      <header className="py-6 px-4 border-b" style={{ borderColor: wisprColors.border, backgroundColor: wisprColors.cardBackground }}>
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/wisprform" className="flex items-center gap-3">
            {/* WisprForm Logo */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: wisprColors.background }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                      stroke={wisprColors.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M13 2v7h7"
                      stroke={wisprColors.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <rect x="7" y="12" width="1.5" height="6" rx="0.75" fill={wisprColors.textPrimary}/>
                <rect x="9.5" y="15" width="1.5" height="3" rx="0.75" fill={wisprColors.textPrimary}/>
                <rect x="12" y="13" width="1.5" height="5" rx="0.75" fill={wisprColors.textPrimary}/>
                <rect x="14.5" y="15" width="1.5" height="3" rx="0.75" fill={wisprColors.textPrimary}/>
                <rect x="17" y="12" width="1.5" height="6" rx="0.75" fill={wisprColors.textPrimary}/>
              </svg>
            </div>
            <span className="text-xl font-semibold" style={{ color: wisprColors.textPrimary }}>WisprForm</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/wisprform/privacy"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: wisprColors.textSecondary }}
            >
              Privacy
            </Link>
            <Link
              href="/wisprform/terms"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: wisprColors.textSecondary }}
            >
              Terms
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: wisprColors.textPrimary }}>
            How can we help?
          </h1>
          <p className="text-lg md:text-xl" style={{ color: wisprColors.textSecondary }}>
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8" style={{ color: wisprColors.textPrimary }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: wisprColors.cardBackground,
                  borderColor: wisprColors.border
                }}
              >
                <h3 className="text-lg font-semibold mb-2" style={{ color: wisprColors.textPrimary }}>
                  {faq.question}
                </h3>
                <p className="leading-relaxed" style={{ color: wisprColors.textSecondary }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              className="p-8 rounded-2xl border"
              style={{
                backgroundColor: wisprColors.cardBackground,
                borderColor: wisprColors.border
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: wisprColors.textPrimary }}>
                Contact Support
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: `${wisprColors.success}15`, border: `1px solid ${wisprColors.success}30` }}>
                  <p className="text-sm" style={{ color: wisprColors.success }}>
                    Thank you! We've received your message and will respond within 24-48 hours.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: `${wisprColors.error}15`, border: `1px solid ${wisprColors.error}30` }}>
                  <p className="text-sm" style={{ color: wisprColors.error }}>
                    Sorry, there was an error. Please email us directly at support@wisprform.com
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: wisprColors.textPrimary }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: wisprColors.background,
                      borderColor: wisprColors.border,
                      color: wisprColors.textPrimary
                    }}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: wisprColors.textPrimary }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: wisprColors.background,
                      borderColor: wisprColors.border,
                      color: wisprColors.textPrimary
                    }}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                    style={{ color: wisprColors.textPrimary }}
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: wisprColors.background,
                      borderColor: wisprColors.border,
                      color: wisprColors.textPrimary
                    }}
                  >
                    <option value="">Select a topic</option>
                    <option value="account">Account Issues</option>
                    <option value="billing">Billing & Subscription</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="forms">Form Upload Issues</option>
                    <option value="voice">Voice Recognition Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: wisprColors.textPrimary }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all resize-none"
                    style={{
                      backgroundColor: wisprColors.background,
                      borderColor: wisprColors.border,
                      color: wisprColors.textPrimary
                    }}
                    placeholder="Describe your issue or question in detail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                  style={{
                    backgroundColor: wisprColors.buttonPrimary,
                    color: wisprColors.buttonText
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: wisprColors.textPrimary }}>
                  Other Ways to Reach Us
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${wisprColors.textPrimary}10` }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke={wisprColors.textPrimary} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: wisprColors.textPrimary }}>Email</h3>
                      <p style={{ color: wisprColors.textSecondary }}>support@wisprform.com</p>
                      <p className="text-sm" style={{ color: wisprColors.textMuted }}>We respond within 24-48 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${wisprColors.textPrimary}10` }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke={wisprColors.textPrimary} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: wisprColors.textPrimary }}>Help Center</h3>
                      <p style={{ color: wisprColors.textSecondary }}>Browse FAQs and guides</p>
                      <p className="text-sm" style={{ color: wisprColors.textMuted }}>Available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: wisprColors.cardBackground,
                  borderColor: wisprColors.border
                }}
              >
                <h3 className="text-lg font-semibold mb-4" style={{ color: wisprColors.textPrimary }}>
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/wisprform/privacy"
                    className="block hover:opacity-70 transition-opacity"
                    style={{ color: wisprColors.textPrimary }}
                  >
                    → Privacy Policy
                  </Link>
                  <Link
                    href="/wisprform/terms"
                    className="block hover:opacity-70 transition-opacity"
                    style={{ color: wisprColors.textPrimary }}
                  >
                    → Terms of Service
                  </Link>
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-70 transition-opacity"
                    style={{ color: wisprColors.textPrimary }}
                  >
                    → Download on App Store
                  </a>
                </div>
              </div>

              {/* App Info */}
              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: wisprColors.cardBackground,
                  borderColor: wisprColors.border
                }}
              >
                <h3 className="text-lg font-semibold mb-4" style={{ color: wisprColors.textPrimary }}>
                  About WisprForm
                </h3>
                <p className="leading-relaxed" style={{ color: wisprColors.textSecondary }}>
                  WisprForm is an AI-powered form filling app that lets you complete any form using just your voice.
                  Upload a document, speak your answers naturally, and download the completed form in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t" style={{ borderColor: wisprColors.border }}>
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm" style={{ color: wisprColors.textMuted }}>
            © {new Date().getFullYear()} WisprForm. All rights reserved.
          </p>
          <p className="text-sm mt-2" style={{ color: wisprColors.textMuted }}>
            Built by <a href="https://studiomvp.co.uk" className="underline hover:opacity-70">Studio MVP</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
