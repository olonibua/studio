"use client";

import Header from "@/components/layout/header";
import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-8 mt-10 md:mt-0 tracking-wide">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-light leading-relaxed">
              Real MVPs we've built for real founders. Each project was delivered 
              within our 2-week timeline and is now live in production.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background-secondary border-y border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">20+</div>
              <div className="text-sm uppercase tracking-wide text-text-muted">MVPs Launched</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-neutral-700"></div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">7</div>
              <div className="text-sm uppercase tracking-wide text-text-muted">Industries Served</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-neutral-700"></div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">95%</div>
              <div className="text-sm uppercase tracking-wide text-text-muted">Client Satisfaction</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-neutral-700"></div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">2 Weeks</div>
              <div className="text-sm uppercase tracking-wide text-text-muted">Average Timeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light mb-6 text-text-primary">
              Featured Projects
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              A selection of our most successful MVP launches across different industries
            </p>
          </div>
          
          <div className="space-y-24">
            {[
              {
                title: "EMURECCIMA - Community Financial Chamber",
                category: "FinTech Platform",
                description: "A community-focused financial platform providing collaborative savings, low-interest loans, and emergency assistance for chamber members. Built to strengthen local economic development through mutual support.",
                timeline: "12 days",
                techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
                features: ["Member savings accounts", "Loan management system", "Emergency assistance", "Annual dividend distribution", "Community events"],
                results: ["Active member community", "Successful loan program", "Strong retention rate"],
                link: "emureccima.org",
                image: "/img/Screenshot 2025-08-05 at 13.45.31.png",
                alt: "EMURECCIMA chamber website showing community financial services"
              },
              {
                title: "ErandWork - Service Marketplace",
                category: "Marketplace Platform", 
                description: "A digital marketplace connecting clients with verified local professionals for daily tasks and errands. Features secure payments, professional verification, and streamlined booking system.",
                timeline: "10 days",
                techStack: ["Next.js", "Firebase", "Stripe", "Google Maps API"],
                features: ["Professional verification", "Secure payment processing", "Service booking system", "Real-time tracking", "Review and rating system"],
                results: ["Growing professional network", "Successfully launched", "Positive user feedback"],
                link: "erandwork.com",
                image: "/img/Screenshot 2025-08-05 at 22.23.43.png",
                alt: "ErandWork marketplace showing trusted errand support services"
              },
              {
                title: "MOSÉ - African Art E-commerce",
                category: "E-commerce Platform",
                description: "An elegant e-commerce platform showcasing authentic African art and handcrafted gifts from talented artisans. Features artist profiles, cultural storytelling, and global shipping.",
                timeline: "14 days", 
                techStack: ["Next.js", "Shopify API", "Stripe", "Tailwind CSS"],
                features: ["Artisan marketplace", "Cultural storytelling", "Global shipping", "Authenticity verification", "Multi-currency support"],
                results: ["Active artisan community", "International reach", "Successful marketplace"],
                link: "mose-two.vercel.app",
                image: "/img/Screenshot 2025-08-05 at 21.06.55.png",
                alt: "MOSÉ e-commerce platform showing African art and handcrafted gifts"
              },
              {
                title: "Eyes on Imo - Government Investment Portal",
                category: "Government Website",
                description: "Official investment portal for Imo State showcasing economic opportunities, tourism attractions, and investment metrics. Designed to attract domestic and international investors to Nigeria's Eastern Heartland.",
                timeline: "16 days",
                techStack: ["Next.js", "React", "Chart.js", "Tailwind CSS"],
                features: ["Investment metrics dashboard", "Tourism showcase", "Economic data visualization", "Multi-language support", "Investment inquiry system"],
                results: ["Government partnership", "Public platform launch", "Tourism promotion success"],
                link: "eyesonimo.com", 
                image: "/img/Screenshot 2025-08-05 at 20.26.21.png",
                alt: "Eyes on Imo government portal showing investment opportunities"
              },
              {
                title: "Gab'z Laundromat - Service Booking Platform",
                category: "Service Platform",
                description: "A professional laundry service platform offering convenient pickup and delivery across Lagos. Features online booking, service tracking, and automated scheduling for busy professionals.",
                timeline: "8 days",
                techStack: ["Next.js", "Firebase", "Google Maps API", "Stripe"],
                features: ["Online booking system", "Pickup/delivery scheduling", "Service tracking", "Payment integration", "Service area mapping"],
                results: ["Growing customer base", "Reliable service delivery", "Lagos market presence"],
                link: "gabzlaundromat.com",
                image: "/img/Screenshot 2025-08-05 at 13.43.58.png",
                alt: "Gab'z Laundromat platform showing Lagos premier laundry services"
              }
            ].map((project, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="mb-4">
                    <span className="text-accent text-sm font-medium uppercase tracking-wide">{project.category}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-light mb-4 text-text-primary">
                    {project.title}
                  </h3>
                  <p className="text-lg text-text-muted mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-text-primary mb-3">Key Features:</h4>
                      <ul className="space-y-1 text-sm text-text-muted">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-text-primary mb-3">Results:</h4>
                      <ul className="space-y-1 text-sm text-text-muted">
                        {project.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-background-secondary text-xs text-text-muted rounded-full border border-neutral-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <span className="text-sm text-text-muted">
                      <span className="font-medium">Timeline:</span> {project.timeline}
                    </span>
                    <span className="text-sm text-text-muted">
                      <span className="font-medium">Demo:</span> {project.link}
                    </span>
                  </div>
                </div>
                
                <div className={`aspect-video rounded-lg overflow-hidden border border-neutral-800 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects Grid */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-text-primary">
              More Success Stories
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
              Additional projects across various industries and use cases
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "FindExperts.me - Expert Booking Platform",
                category: "Professional Services",
                description: "Africa's most powerful platform for expert booking and mentorship, connecting professionals with thought leaders across 35+ African countries.",
                tech: "Next.js + Firebase",
                image: "/img/Screenshot 2025-08-05 at 22.44.41.png",
                alt: "FindExperts platform showing expert booking and mentorship services",
                timeline: "14 days",
                results: ["Expert network established", "Platform successfully launched", "Positive user feedback"],
                link: "findexperts.me"
              },
              {
                title: "Ramadan Global - AI Spiritual Companion",
                category: "AI/Religious Tech",
                description: "AI-powered digital platform enhancing Muslims' spiritual experience during Ramadan with personalized guidance, prayer tracking, and community support.",
                tech: "React + OpenAI API",
                image: "/img/Screenshot 2025-08-05 at 22.44.14.png",
                alt: "Ramadan Global AI spiritual companion app",
                timeline: "12 days",
                results: ["Mobile app launched", "Community engagement", "Religious tech innovation"],
                link: "ramadan.global"
              }
            ].map((project, index) => (
              <div key={index} className="bg-background-primary p-8 rounded-lg border border-neutral-800 hover:border-accent/50 transition-all group">
                <div className="aspect-video rounded-lg mb-6 overflow-hidden border border-neutral-700 group-hover:border-accent/30 transition-all">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-background-tertiary flex items-center justify-center">
                      <div className="text-center text-text-muted text-sm px-4">
                        <div className="text-4xl mb-4">🌙</div>
                        <p className="italic">AI-powered Ramadan companion interface</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <span className="text-accent text-xs font-medium uppercase tracking-wide">{project.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">{project.title}</h3>
                <p className="text-text-muted text-sm mb-4 leading-relaxed">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-text-primary mb-2 text-sm">Results:</h4>
                  <ul className="space-y-1">
                    {project.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-center text-xs text-text-muted">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center text-xs text-text-muted">
                  <div>
                    <span className="font-medium">Tech:</span> {project.tech}
                  </div>
                  <div>
                    <span className="font-medium">Timeline:</span> {project.timeline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies We Use */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-text-primary">
              Technologies We Master
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
              We use proven, modern technologies to ensure your MVP is scalable and maintainable
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "React", "Next.js", "React Native", "Node.js", "PostgreSQL", "MongoDB",
              "TypeScript", "Tailwind CSS", "Stripe", "Firebase", "AWS", "Vercel",
              "GraphQL", "WebSocket", "Docker", "Git", "Figma", "OpenAI API"
            ].map((tech, index) => (
              <div key={index} className="bg-background-secondary p-4 rounded-lg border border-neutral-800 text-center hover:border-accent/50 transition-all">
                <div className="text-sm font-medium text-text-primary">{tech}</div>
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
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              Let's build your MVP and help you validate your idea in the market
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-accent-text px-8 py-3 rounded font-medium hover:bg-accent/90 transition-colors"
              >
                Start Your Project
              </Link>
              <Link
                href="/testimonials"
                className="border border-accent text-accent px-8 py-3 rounded font-medium hover:bg-accent hover:text-accent-text transition-colors"
              >
                Read Client Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}