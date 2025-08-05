"use client";

import Header from "@/components/layout/header";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-8 tracking-wide">
              About Our Studio
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-light leading-relaxed">
              We're a team of experienced engineers and designers who specialize in rapid MVP development, 
              helping founders turn their ideas into market-ready products in just 2 weeks.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-serif font-light mb-6 text-text-primary">
                  Our Mission
                </h2>
                <p className="text-lg text-text-muted leading-relaxed mb-6">
                  Too many great ideas never see the light of day because traditional development 
                  takes too long and costs too much. We believe every founder deserves a chance 
                  to validate their idea quickly and affordably.
                </p>
                <p className="text-lg text-text-muted leading-relaxed">
                  That's why we've perfected our 2-week MVP process, combining proven frameworks, 
                  efficient workflows, and cutting-edge tools to deliver production-ready applications 
                  at startup speed.
                </p>
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border border-neutral-700">
                <img
                  src="/u9499386881_developers_rapidly_building_a_web_app_on_laptops__e75af36a-5ba9-44ab-8c0e-9f82cdafa0bc_1.png"
                  alt="Developers rapidly building a web app on laptops"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light mb-6 text-text-primary">
              Meet The Team
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              Our diverse team combines technical expertise with startup experience to deliver exceptional results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Alex Johnson",
                role: "Founder & Lead Developer",
                bio: "Full-stack engineer with 5+ years experience building scalable web applications. Previously worked at tech companies and co-founded a startup.",
                placeholder: "Insert image: Professional headshot of founder/lead developer"
              },
              {
                name: "Sarah Chen",
                role: "UI/UX Designer",
                bio: "Design lead specializing in user-centered design and conversion optimization. Previously worked at digital agencies and startups.",
                placeholder: "Insert image: Professional headshot of UI/UX designer"
              },
              {
                name: "Marcus Rodriguez",
                role: "Backend Architect",
                bio: "Systems architect focused on scalable infrastructure and API design. 6+ years experience with enterprise and startup environments.",
                placeholder: "Insert image: Professional headshot of backend architect"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square bg-background-secondary rounded-lg mb-6 flex items-center justify-center border border-neutral-800">
                  <div className="text-center text-text-muted text-sm px-4">
                    <div className="text-4xl mb-4">👤</div>
                    <p className="italic">{member.placeholder}</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-text-primary">{member.name}</h3>
                <p className="text-accent font-medium mb-3">{member.role}</p>
                <p className="text-text-muted text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light mb-6 text-text-primary">
              Our 2-Week Process
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              A proven methodology that gets you from idea to launch in record time
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  week: "Week 1",
                  title: "Foundation & Development",
                  tasks: ["Requirements gathering & user stories", "Technical architecture planning", "UI/UX design & wireframes", "Core feature development", "Database setup & API creation"]
                },
                {
                  week: "Week 2", 
                  title: "Polish & Launch",
                  tasks: ["Feature completion & integration", "Testing & bug fixes", "Deployment & hosting setup", "Documentation & handover", "Launch support & monitoring"]
                }
              ].map((phase, index) => (
                <div key={index} className="bg-background-primary p-8 rounded-lg border border-neutral-800">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="text-accent font-bold text-lg mb-2">{phase.week}</div>
                      <h3 className="text-2xl font-semibold text-text-primary">{phase.title}</h3>
                    </div>
                    <div className="md:w-2/3">
                      <ul className="space-y-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center text-text-muted">
                            <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light mb-6 text-text-primary">
              Our Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Speed Without Compromise",
                description: "We deliver fast without cutting corners on quality, security, or user experience."
              },
              {
                title: "Transparent Communication",
                description: "Daily updates, clear timelines, and honest feedback throughout the entire process."
              },
              {
                title: "Founder-First Mindset", 
                description: "We understand the startup journey and build products that help you succeed in the market."
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6">
                <h3 className="text-xl font-semibold mb-4 text-text-primary">{value.title}</h3>
                <p className="text-text-muted leading-relaxed">{value.description}</p>
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
              Ready to Work Together?
            </h2>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              Let's discuss your project and see how we can help bring your MVP to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-accent-text px-8 py-3 rounded font-medium hover:bg-accent/90 transition-colors"
              >
                Start Your Project
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