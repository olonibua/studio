"use client";

import Header from "@/components/layout/header";
import { useState } from "react";

export default function PaySmallSmallPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    projectDescription: '',
    estimatedBudget: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/api/pay-small-small', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          projectDescription: '',
          estimatedBudget: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-accent/10 border border-accent/20 rounded-full px-6 py-2 mb-8">
              <span className="text-accent text-sm font-medium">Flexible Payment Plans</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-8 tracking-wide">
              Pay Small Small
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-light leading-relaxed max-w-3xl mx-auto">
              Got a great idea but can't pay everything upfront? No wahala.
              Start building your app today with a deposit, then spread the rest over a few months.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light mb-6 text-text-primary">
              How It Works
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
              Simple, transparent installment plans — no hidden fees, no interest
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Tell Us Your Idea",
                  description: "Fill in the form below with your project details. We'll review and get back to you within 24 hours."
                },
                {
                  step: "02",
                  title: "Agree on a Plan",
                  description: "We discuss the scope, total cost, and work out a payment schedule that suits your budget."
                },
                {
                  step: "03",
                  title: "Pay & Build",
                  description: "Pay the deposit to kick off development. The remaining balance is spread across monthly installments."
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent text-accent-text rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-text-primary">{item.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Plan Examples */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light mb-6 text-text-primary">
              Example Payment Plans
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
              Here's how the installments could look — final amounts are agreed during our conversation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plan 1 */}
            <div className="bg-background-secondary p-8 rounded-lg border border-neutral-800">
              <div className="text-accent text-xs font-medium uppercase tracking-wide mb-3">Starter Project</div>
              <h3 className="text-2xl font-bold text-text-primary mb-1">₦500,000</h3>
              <p className="text-text-muted text-sm mb-6">~$310 USD</p>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Deposit (to start)</span>
                  <span className="font-semibold text-text-primary">₦200,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Month 2</span>
                  <span className="font-semibold text-text-primary">₦100,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Month 3</span>
                  <span className="font-semibold text-text-primary">₦100,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Month 4</span>
                  <span className="font-semibold text-text-primary">₦100,000</span>
                </div>
              </div>

              <div className="text-xs text-text-muted">
                4 payments over 3 months
              </div>
            </div>

            {/* Plan 2 */}
            <div className="bg-background-secondary p-8 rounded-lg border border-accent ring-2 ring-accent/20 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-accent-text px-4 py-1 rounded-full text-sm font-medium">
                  Most Common
                </span>
              </div>
              <div className="text-accent text-xs font-medium uppercase tracking-wide mb-3">Standard Project</div>
              <h3 className="text-2xl font-bold text-text-primary mb-1">₦800,000</h3>
              <p className="text-text-muted text-sm mb-6">~$500 USD</p>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Deposit (to start)</span>
                  <span className="font-semibold text-text-primary">₦300,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Month 2</span>
                  <span className="font-semibold text-text-primary">₦200,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Month 3</span>
                  <span className="font-semibold text-text-primary">₦200,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Month 4 (Final)</span>
                  <span className="font-semibold text-text-primary">₦100,000</span>
                </div>
              </div>

              <div className="text-xs text-text-muted">
                4 payments over 3 months
              </div>
            </div>

            {/* Plan 3 */}
            <div className="bg-background-secondary p-8 rounded-lg border border-neutral-800">
              <div className="text-accent text-xs font-medium uppercase tracking-wide mb-3">Premium Project</div>
              <h3 className="text-2xl font-bold text-text-primary mb-1">₦1,500,000+</h3>
              <p className="text-text-muted text-sm mb-6">~$940+ USD</p>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Deposit (to start)</span>
                  <span className="font-semibold text-text-primary">₦500,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Month 2</span>
                  <span className="font-semibold text-text-primary">₦250,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Month 3</span>
                  <span className="font-semibold text-text-primary">₦250,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Month 4</span>
                  <span className="font-semibold text-text-primary">₦250,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                  <span className="text-text-muted text-sm">Month 5 (Final)</span>
                  <span className="font-semibold text-text-primary">₦250,000</span>
                </div>
              </div>

              <div className="text-xs text-text-muted">
                5 payments over 4 months
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-text-muted text-sm max-w-2xl mx-auto">
              These are examples only. The exact payment plan is flexible and will be discussed based on your project scope and budget. No interest, no hidden charges.
            </p>
          </div>
        </div>
      </section>

      {/* Interest Form */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-light mb-6 text-text-primary">
                Interested? Let's Talk
              </h2>
              <p className="text-lg text-text-muted leading-relaxed">
                Fill in your details and tell us about your idea. We'll reach out to discuss a payment plan that works for you.
              </p>
            </div>

            <div className="bg-background-primary p-8 rounded-lg border border-neutral-800">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm">
                    Thank you! We've received your details and will contact you within 24 hours to discuss your project and payment plan.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">
                    Sorry, there was an error. Please try again or reach out directly at officialstudiomvp@gmail.com
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background-secondary border border-neutral-700 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background-secondary border border-neutral-700 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background-secondary border border-neutral-700 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="+234..."
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-text-primary mb-2">
                    What do you want to build? *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background-secondary border border-neutral-700 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  >
                    <option value="">Select project type</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="web-app">Web Application / SaaS</option>
                    <option value="ecommerce">E-commerce Store</option>
                    <option value="landing-page">Landing Page / Website</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="estimatedBudget" className="block text-sm font-medium text-text-primary mb-2">
                    Estimated Budget Range
                  </label>
                  <select
                    id="estimatedBudget"
                    name="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background-secondary border border-neutral-700 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  >
                    <option value="">Select budget range</option>
                    <option value="500k">₦500,000 (~$310)</option>
                    <option value="500k-800k">₦500,000 - ₦800,000 (~$310 - $500)</option>
                    <option value="800k-1.5m">₦800,000 - ₦1,500,000 (~$500 - $940)</option>
                    <option value="1.5m+">₦1,500,000+ ($940+)</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-text-primary mb-2">
                    Tell us about your idea *
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background-secondary border border-neutral-700 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-vertical"
                    placeholder="Describe your app idea, key features, target audience, and anything else that helps us understand your vision..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-text py-4 px-6 rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? 'Sending...' : 'Submit & Get a Payment Plan'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-light mb-10 text-text-primary text-center">
              Common Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What's the minimum project cost for Pay Small Small?",
                  a: "The minimum project cost is ₦500,000 (~$310). The starting deposit for this is ₦200,000, with the rest spread over 3 months."
                },
                {
                  q: "Is there any interest or extra charges?",
                  a: "No. Zero interest, zero hidden fees. You pay the agreed total project cost — just spread out over time."
                },
                {
                  q: "When does development start?",
                  a: "Development begins as soon as your deposit is confirmed. We don't wait for full payment before we start building."
                },
                {
                  q: "What if I miss a payment?",
                  a: "We understand things happen. We'll work with you to adjust the schedule. However, continued missed payments may pause development until resolved."
                },
                {
                  q: "Can I pay off the balance early?",
                  a: "Absolutely! You can pay off the remaining balance at any time with no penalties."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-background-secondary p-6 rounded-lg border border-neutral-800">
                  <h3 className="font-semibold text-text-primary mb-2">{faq.q}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
