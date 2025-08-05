"use client";

import Header from "@/components/layout/header";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-8 tracking-wide">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-light leading-relaxed">
              Comprehensive MVP development services designed to get your product to market 
              fast without compromising on quality or user experience.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {[
              {
                title: "Web Applications (SaaS)",
                description: "Full-stack web applications built with modern frameworks",
                features: [
                  "User authentication & authorization",
                  "Dashboard & admin panels", 
                  "Payment integration (Stripe/PayPal)",
                  "Real-time notifications",
                  "Data analytics & reporting",
                  "API integrations",
                  "Responsive design",
                  "SEO optimization"
                ],
                techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
                pricing: "Starting at $2,500",
                timeline: "10-14 days",
                image: "/u9499386881_Modern_SaaS_dashboard_interface_with_charts_table_b7fc2b96-3536-4c1e-8659-6e65b356fff8_1.png",
                alt: "Modern SaaS dashboard interface with charts and tables"
              },
              {
                title: "Mobile Applications",
                description: "Cross-platform mobile apps for iOS and Android",
                features: [
                  "Cross-platform development",
                  "Native performance",
                  "Push notifications",
                  "Offline functionality",
                  "App store optimization",
                  "Social media integration",
                  "In-app purchases",
                  "Analytics tracking"
                ],
                techStack: ["React Native", "Expo", "Firebase", "AsyncStorage"],
                pricing: "Starting at $3,000", 
                timeline: "12-14 days",
                image: "/u9499386881_Mobile_app_showing_multiple_screens_-_login_dashb_cdf6dca8-f3d9-4c2b-9319-ea10b44de238_1.png",
                alt: "Mobile app showing multiple screens - login, dashboard, profile"
              },
              {
                title: "E-commerce Platforms",
                description: "Complete online stores with inventory and order management",
                features: [
                  "Product catalog management",
                  "Shopping cart & checkout",
                  "Order processing",
                  "Inventory tracking",
                  "Customer accounts",
                  "Admin dashboard",
                  "Email notifications",
                  "Multi-payment options"
                ],
                techStack: ["Next.js", "Shopify API", "Stripe", "Tailwind CSS"],
                pricing: "Starting at $2,000",
                timeline: "8-12 days", 
                image: "/u9499386881_E-commerce_website_showing_product_grid_shopping__7dd6169e-5dfd-4a20-82da-52b721a8b912_3.png",
                alt: "E-commerce website showing product grid and shopping interface"
              },
              {
                title: "Landing Pages & Marketing Sites",
                description: "High-converting landing pages optimized for lead generation",
                features: [
                  "Conversion-optimized design",
                  "A/B testing setup",
                  "Lead capture forms",
                  "Analytics integration",
                  "Email marketing integration",
                  "SEO optimization",
                  "Mobile responsive",
                  "Fast loading speeds"
                ],
                techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Google Analytics"],
                pricing: "Starting at $700",
                timeline: "5-7 days",
                image: "/u9499386881_realistic_Landing_page_design_showing_hero_sectio_aa40d23f-47c3-44b9-a0b7-983708d7150f_3.png",
                alt: "Landing page design showing hero section, features, and CTA"
              }
            ].map((service, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-text-primary">
                    {service.title}
                  </h2>
                  <p className="text-lg text-text-muted mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-text-primary mb-3">Key Features:</h4>
                      <ul className="space-y-1 text-sm text-text-muted">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-text-primary mb-2">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.techStack.map((tech, techIndex) => (
                            <span key={techIndex} className="px-2 py-1 bg-background-secondary text-xs text-text-muted rounded border border-neutral-700">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-text-muted">Pricing:</span>
                          <span className="text-sm font-medium text-accent">{service.pricing}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-text-muted">Timeline:</span>
                          <span className="text-sm font-medium text-accent">{service.timeline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/contact"
                    className="inline-block bg-accent text-accent-text px-6 py-3 rounded font-medium hover:bg-accent/90 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
                
                <div className={`aspect-video rounded-lg overflow-hidden border border-neutral-800 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-text-primary">
              Additional Services
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
              Specialized services to enhance your MVP and support your growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "API Development",
                description: "Custom RESTful APIs and GraphQL endpoints for your applications",
                icon: "⚙️"
              },
              {
                title: "AI Integration", 
                description: "Integrate ChatGPT, custom models, and AI-powered features",
                icon: "🤖"
              },
              {
                title: "Database Design",
                description: "Scalable database architecture and optimization",
                icon: "🗃️"
              },
              {
                title: "DevOps & Deployment",
                description: "CI/CD pipelines, hosting setup, and monitoring",
                icon: "🚀"
              },
              {
                title: "UI/UX Design",
                description: "User-centered design and prototyping services",
                icon: "🎨"
              },
              {
                title: "Consulting & Strategy",
                description: "Technical architecture and product strategy consultation",
                icon: "💡"
              }
            ].map((service, index) => (
              <div key={index} className="bg-background-primary p-6 rounded-lg border border-neutral-800">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">{service.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-text-primary">
              How We Work
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
              Our streamlined process ensures fast delivery without compromising quality
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "We analyze your requirements and create a detailed project plan"
                },
                {
                  step: "02", 
                  title: "Design",
                  description: "UI/UX design and wireframes are created for approval"
                },
                {
                  step: "03",
                  title: "Development", 
                  description: "Rapid development with daily progress updates"
                },
                {
                  step: "04",
                  title: "Launch",
                  description: "Testing, deployment, and handover with documentation"
                }
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent text-accent-text rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-text-primary">{phase.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-text-primary">
              Transparent Pricing
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
              Fixed-price packages with no hidden fees or surprises
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$700 - $1,500 (£500 - £1,100)",
                description: "Perfect for landing pages and simple web apps",
                features: ["Up to 5 pages", "Basic functionality", "Responsive design", "1 week delivery", "30 days support"]
              },
              {
                name: "Professional", 
                price: "$2,000 - $3,500 (£1,400 - £2,500)",
                description: "Full-featured MVPs with advanced functionality",
                features: ["Full web/mobile app", "User authentication", "Payment integration", "Admin dashboard", "2 weeks delivery", "60 days support"],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$4,000+ (£2,800+)",
                description: "Complex applications with custom requirements",
                features: ["Complex functionality", "Third-party integrations", "Custom design", "API development", "Extended timeline", "90 days support"]
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
                <h3 className="text-xl font-semibold mb-2 text-text-primary">{plan.name}</h3>
                <div className="text-2xl font-bold text-accent mb-3">{plan.price}</div>
                <p className="text-text-muted text-sm mb-6">{plan.description}</p>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-text-muted">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
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

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-light mb-6 text-text-primary">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              Let's discuss your requirements and create a custom proposal for your MVP
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-accent-text px-8 py-3 rounded font-medium hover:bg-accent/90 transition-colors"
              >
                Get Free Consultation
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