"use client";

import Header from "@/components/layout/header";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-8 tracking-wide">
              Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-light leading-relaxed">
              Fixed-price packages with no hidden fees or surprises. 
              Choose the plan that fits your MVP needs and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-text-primary">
              Choose Your Plan
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
              All plans include professional development, responsive design, and ongoing support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$700 - $1,500",
                priceGBP: "£500 - £1,100",
                description: "Perfect for landing pages and simple web apps",
                features: [
                  "Up to 5 pages",
                  "Basic functionality", 
                  "Responsive design",
                  "Contact forms",
                  "SEO optimization",
                  "1 week delivery",
                  "30 days support"
                ],
                timeline: "5-7 days",
                ideal: "Startups, small businesses, personal projects"
              },
              {
                name: "Professional", 
                price: "$2,000 - $3,500",
                priceGBP: "£1,400 - £2,500",
                description: "Full-featured MVPs with advanced functionality",
                features: [
                  "Full web/mobile app",
                  "User authentication", 
                  "Payment integration",
                  "Admin dashboard",
                  "Database integration",
                  "API development",
                  "2 weeks delivery", 
                  "60 days support"
                ],
                popular: true,
                timeline: "10-14 days",
                ideal: "Growing startups, SaaS platforms, e-commerce"
              },
              {
                name: "Enterprise",
                price: "$4,000+",
                priceGBP: "£2,800+",
                description: "Complex applications with custom requirements",
                features: [
                  "Complex functionality",
                  "Third-party integrations", 
                  "Custom design",
                  "Advanced features",
                  "Scalable architecture",
                  "Priority support",
                  "Extended timeline",
                  "90 days support"
                ],
                timeline: "14+ days",
                ideal: "Large companies, complex projects, custom solutions"
              }
            ].map((plan, index) => (
              <div key={index} className={`bg-background-primary p-8 rounded-lg border ${plan.popular ? 'border-accent ring-2 ring-accent/20' : 'border-neutral-800'} relative`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-accent-text px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold mb-2 text-text-primary">{plan.name}</h3>
                  <div className="text-3xl font-bold text-accent mb-1">{plan.price}</div>
                  <div className="text-lg text-text-muted mb-3">{plan.priceGBP}</div>
                  <p className="text-text-muted text-sm">{plan.description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-text-primary mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-text-muted">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6 p-4 bg-background-secondary rounded-lg">
                  <div className="text-sm text-text-muted mb-2">
                    <span className="font-medium">Timeline:</span> {plan.timeline}
                  </div>
                  <div className="text-sm text-text-muted">
                    <span className="font-medium">Ideal for:</span> {plan.ideal}
                  </div>
                </div>
                
                <Link
                  href="/contact"
                  className={`block text-center py-3 px-4 rounded font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-accent text-accent-text hover:bg-accent/90' 
                      : 'border border-accent text-accent hover:bg-accent hover:text-accent-text'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Breakdown */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-text-primary">
              Service Pricing Breakdown
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
              Individual service pricing for specific project types
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                service: "Landing Pages",
                price: "$700",
                priceGBP: "£500",
                timeline: "5-7 days",
                description: "High-converting single pages with lead capture and analytics"
              },
              {
                service: "E-commerce Sites",
                price: "$2,000",
                priceGBP: "£1,400", 
                timeline: "8-12 days",
                description: "Complete online stores with payment processing and inventory"
              },
              {
                service: "SaaS Platforms",
                price: "$2,500",
                priceGBP: "£1,800",
                timeline: "10-14 days",
                description: "Web applications with user authentication and dashboards"
              },
              {
                service: "Mobile Apps",
                price: "$3,000",
                priceGBP: "£2,100",
                timeline: "12-14 days", 
                description: "Cross-platform mobile applications for iOS and Android"
              }
            ].map((service, index) => (
              <div key={index} className="bg-background-secondary p-6 rounded-lg border border-neutral-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-1">{service.service}</h3>
                    <p className="text-text-muted text-sm">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">{service.price}</div>
                    <div className="text-sm text-text-muted">{service.priceGBP}</div>
                  </div>
                </div>
                <div className="text-sm text-text-muted">
                  <span className="font-medium">Timeline:</span> {service.timeline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light mb-6 text-text-primary">
              Additional Services
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
              Optional add-ons to enhance your MVP
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                service: "SEO Setup",
                price: "$200",
                priceGBP: "£140",
                description: "Complete SEO optimization and Google Analytics setup"
              },
              {
                service: "Extra Revisions",
                price: "$100/round",
                priceGBP: "£70/round", 
                description: "Additional design or functionality revisions beyond included"
              },
              {
                service: "Priority Support",
                price: "$300/month",
                priceGBP: "£210/month",
                description: "Priority support and maintenance after launch"
              },
              {
                service: "Custom Integrations",
                price: "$400+",
                priceGBP: "£280+",
                description: "Third-party API integrations and custom functionality"
              },
              {
                service: "Training Session",
                price: "$150/hour",
                priceGBP: "£105/hour",
                description: "One-on-one training on managing your new platform"
              },
              {
                service: "Rush Delivery",
                price: "+50%",
                priceGBP: "+50%",
                description: "Expedited delivery in 50% of standard timeline"
              }
            ].map((addon, index) => (
              <div key={index} className="bg-background-primary p-4 rounded border border-neutral-800">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-text-primary">{addon.service}</h4>
                  <div className="text-right">
                    <div className="text-accent font-semibold">{addon.price}</div>
                    <div className="text-xs text-text-muted">{addon.priceGBP}</div>
                  </div>
                </div>
                <p className="text-text-muted text-xs">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light mb-6 text-text-primary">
              Pricing FAQ
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What's included in the base price?",
                answer: "All plans include development, responsive design, basic SEO, testing, deployment, and the specified support period. No hidden fees."
              },
              {
                question: "Do you offer payment plans?",
                answer: "Yes, we offer 50% upfront and 50% on delivery for all projects over $1,500. Custom payment plans available for Enterprise projects."
              },
              {
                question: "What if I need changes after delivery?",
                answer: "Minor tweaks are included in your support period. Major changes can be handled as additional work at our standard hourly rate."
              },
              {
                question: "Can I upgrade my plan during development?",
                answer: "Absolutely! You can upgrade to a higher tier and we'll adjust the pricing and timeline accordingly."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a full refund if we haven't started development. After work begins, refunds are prorated based on work completed."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-background-secondary p-6 rounded-lg border border-neutral-800">
                <h4 className="font-semibold text-text-primary mb-2">{faq.question}</h4>
                <p className="text-text-muted text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent/10 border-t border-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-light mb-6 text-text-primary">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              Get a detailed quote and timeline for your specific requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-accent-text px-8 py-3 rounded font-medium hover:bg-accent/90 transition-colors"
              >
                Get Free Quote
              </Link>
              <Link
                href="/portfolio"
                className="border border-accent text-accent px-8 py-3 rounded font-medium hover:bg-accent hover:text-accent-text transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}