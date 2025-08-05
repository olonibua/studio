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

      {/* Featured Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light mb-6 text-text-primary">
              What Our Clients Say
            </h2>
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-16">
            {[
              {
                name: "Sarah Johnson",
                title: "Founder & CEO",
                company: "TaskFlow",
                image: "Insert image: Professional headshot of Sarah Johnson, founder of TaskFlow",
                rating: 5,
                testimonial: "Working with this studio was incredible. They took our complex project management idea and turned it into a beautiful, functional MVP in exactly 2 weeks. The attention to detail and technical expertise exceeded our expectations. Having a solid product helped us in our investor meetings.",
                project: "SaaS Platform - Project Management Tool",
                results: ["Successful MVP launch", "Growing user base", "Investor meetings"]
              },
              {
                name: "Marcus Chen",
                title: "Co-founder",
                company: "FoodieConnect",
                image: "Insert image: Professional headshot of Marcus Chen, co-founder of FoodieConnect",
                rating: 5,
                testimonial: "As first-time founders, we were nervous about building our first product. The team guided us through every step, from initial wireframes to app store submission. Their mobile development expertise is top-notch. The app launched successfully and gained good traction.",
                project: "Mobile App - Restaurant Discovery Platform",
                results: ["Successful app launch", "Growing downloads", "Positive user reviews"]
              },
              {
                name: "Emily Rodriguez",
                title: "Founder",
                company: "EcoMarket",
                image: "Insert image: Professional headshot of Emily Rodriguez, founder of EcoMarket",  
                rating: 5,
                testimonial: "I needed an e-commerce platform for sustainable products, and they delivered beyond expectations. The multi-vendor functionality, sustainability scoring system, and admin dashboard were all perfectly executed. The platform launched successfully and we're growing steadily.",
                project: "E-commerce Platform - Sustainable Products Marketplace",
                results: ["Strong platform launch", "Vendor partnerships", "Market expansion"]
              }
            ].map((testimonial, index) => (
              <div key={index} className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <div className="bg-background-secondary p-8 rounded-lg border border-neutral-800 relative">
                      <div className="absolute -top-4 left-8">
                        <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>
                      
                      <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className={`w-4 h-4 ${star <= testimonial.rating ? 'text-yellow-400' : 'text-neutral-600'} fill-current`} viewBox="0 0 24 24">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                        ))}
                      </div>
                      
                      <p className="text-lg text-text-primary leading-relaxed mb-6 italic">
                        "{testimonial.testimonial}"
                      </p>
                      
                      <div className="text-sm text-text-muted">
                        <span className="font-medium">Project:</span> {testimonial.project}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center lg:text-left">
                    <div className="w-32 h-32 bg-background-secondary rounded-full mx-auto lg:mx-0 mb-4 flex items-center justify-center border border-neutral-800">
                      <div className="text-center text-text-muted text-xs px-4">
                        <div className="text-2xl mb-2">👤</div>
                        <p className="italic text-xs">{testimonial.image}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-primary mb-1">{testimonial.name}</h3>
                    <p className="text-accent font-medium mb-1">{testimonial.title}</p>
                    <p className="text-text-muted text-sm mb-4">{testimonial.company}</p>
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-text-primary">Results:</h4>
                      {testimonial.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center justify-center lg:justify-start text-sm text-text-muted">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Testimonials Grid */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-text-primary">
              More Success Stories
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "David Park",
                company: "MentorMatch",
                testimonial: "The team understood our vision perfectly and delivered a platform that exceeded expectations. The mentor-mentee matching algorithm they built works flawlessly.",
                rating: 5
              },
              {
                name: "Lisa Wang",
                company: "FitTracker Pro",
                testimonial: "Professional, fast, and incredibly skilled. They built our fitness app with all the features we needed plus some we didn't even think of. Highly recommend!",
                rating: 5
              },
              {
                name: "Alex Thompson",
                company: "StudyBuddy",
                testimonial: "As a non-technical founder, I was worried about the development process. They made it so easy and kept me informed every step of the way.",
                rating: 5
              },
              {
                name: "Maria Santos",
                company: "LocalServices Hub",
                testimonial: "The marketplace platform they built for us has been a game-changer. We've connected thousands of homeowners with service providers.",
                rating: 5
              },
              {
                name: "James Wilson",
                company: "InvestorConnect",
                testimonial: "Their fintech expertise really showed. They built all the compliance features we needed and made the platform incredibly secure.",
                rating: 5
              },
              {
                name: "Rachel Kim",
                company: "EventPro",
                testimonial: "From concept to launch in 2 weeks! The event management platform they built handles everything we need. Amazing work.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-background-primary p-6 rounded-lg border border-neutral-800">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className={`w-4 h-4 ${star <= testimonial.rating ? 'text-yellow-400' : 'text-neutral-600'} fill-current`} viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-text-muted text-sm leading-relaxed mb-4 italic">
                  "{testimonial.testimonial}"
                </p>
                
                <div className="border-t border-neutral-700 pt-4">
                  <h4 className="font-semibold text-text-primary">{testimonial.name}</h4>
                  <p className="text-accent text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Feedback */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-text-primary">
              What Clients Love About Our Process
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "⚡",
                title: "Speed",
                feedback: "2-week delivery timeline that never slips. We've never missed a deadline."
              },
              {
                icon: "💬",
                title: "Communication",
                feedback: "Daily updates and transparent progress reports. You're never left wondering."
              },
              {
                icon: "🎯",
                title: "Quality",
                feedback: "Production-ready code with proper testing, security, and scalability."
              },
              {
                icon: "🤝",
                title: "Support",
                feedback: "30 days of free support plus ongoing maintenance options."
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-text-primary">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Placeholder */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-text-primary">
              Video Testimonials
            </h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
              Hear directly from our clients about their experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                client: "Sarah Johnson - TaskFlow CEO",
                placeholder: "Insert video: Client testimonial video from Sarah Johnson discussing the project experience and results"
              },
              {
                client: "Marcus Chen - FoodieConnect Co-founder", 
                placeholder: "Insert video: Client testimonial video from Marcus Chen about the mobile app development process"
              }
            ].map((video, index) => (
              <div key={index} className="aspect-video bg-background-tertiary rounded-lg flex items-center justify-center border border-neutral-700">
                <div className="text-center text-text-muted text-sm px-6">
                  <div className="text-4xl mb-4">🎥</div>
                  <p className="font-medium mb-2">{video.client}</p>
                  <p className="italic text-xs">{video.placeholder}</p>
                </div>
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