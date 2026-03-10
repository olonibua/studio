"use client";

import Header from "@/components/layout/header";
import HeroAnimated from "@/components/ui/hero-animated";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      {/* Hero Section - Animated */}
      <HeroAnimated />

      {/* Our Services Section */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-text-primary">
              What We Build
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              We specialize in rapid product development across multiple industries,
              helping founders and businesses bring their ideas to market fast
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "SaaS Platforms",
                description: "Full-stack web applications with user authentication, dashboards, and payment integration",
                icon: "💻",
                video: "/social_u9499386881_Modern_SaaS_dashboard_screenshot_or_wireframe_moc_fdf7560e-aa66-4473-949d-6734ab220294_2.mp4"
              },
              {
                title: "Mobile Apps", 
                description: "Cross-platform mobile applications built with React Native for iOS and Android",
                icon: "📱",
                video: "/social_u9499386881_Mobile_app_screens_--ar_7758_--motion_low_--video_6c33b953-19cd-4d82-ac64-1a8570ce1de5_3.mp4"
              },
              {
                title: "E-commerce Sites",
                description: "Online stores with inventory management, payment processing, and admin panels",
                icon: "🛒",
                video: "/social_u9499386881_E-commerce_website_or_shopping_interface_--ar_775_dec57dce-95f6-4ede-993c-6c85f2441e88_3.mp4"
              },
              {
                title: "Landing Pages",
                description: "High-converting landing pages with analytics, A/B testing, and lead capture",
                icon: "🎯",
                video: "/social_u9499386881_Landing_page_design_or_conversion_funnel_graphic__0d1265c1-c27f-4c35-84cf-b91d56adb6b7_1.mp4"
              },
              {
                title: "APIs & Backends",
                description: "Scalable backend services, REST APIs, and database architecture",
                icon: "⚙️",
                video: "/social_u9499386881_API_documentation_or_system_architecture_diagram__d1465279-b1b5-4bbf-8206-dcd57112f1f6_0.mp4"
              },
              {
                title: "AI Integration",
                description: "AI-powered features using OpenAI, machine learning models, and automation",
                icon: "🤖",
                video: "/social_u9499386881_AI_interface_or_chatbot_conversation_--ar_7758_--_1e8014d3-7bcb-46d7-9cc5-976ce4fea46a_1.mp4"
              }
            ].map((service, index) => (
              <div key={index} className="group bg-background-primary p-8 rounded-lg border border-neutral-800 hover:border-accent transition-all">
                <div className="aspect-video mb-6 rounded-lg overflow-hidden border border-neutral-700">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={service.video} type="video/mp4" />
                    {/* Fallback */}
                    <div className="w-full h-full bg-background-tertiary flex items-center justify-center">
                      <div className="text-center text-text-muted text-sm px-4">
                        <div className="text-4xl mb-4">{service.icon}</div>
                        <p>Video not supported</p>
                      </div>
                    </div>
                  </video>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">{service.title}</h3>
                <p className="text-text-muted leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-block bg-accent text-accent-text px-8 py-3 rounded font-medium hover:bg-accent/90 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-text-primary">
              Why Choose Our Studio
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              We combine technical expertise with business acumen to deliver products that not only work but thrive in the market
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold mb-3 text-text-primary">Lightning Fast</h3>
              <p className="text-text-muted text-sm leading-relaxed">2-week delivery timeline with daily progress updates and transparent communication</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold mb-3 text-text-primary">Market-Ready</h3>
              <p className="text-text-muted text-sm leading-relaxed">Built for real users with proper authentication, payments, and scalable architecture</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="font-semibold mb-3 text-text-primary">Full-Stack Expertise</h3>
              <p className="text-text-muted text-sm leading-relaxed">End-to-end development from UI/UX design to deployment and maintenance</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-semibold mb-3 text-text-primary">Ongoing Support</h3>
              <p className="text-text-muted text-sm leading-relaxed">30 days of free support plus optional maintenance and growth packages</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 p-12 bg-accent/10 rounded-lg border border-accent/20">
            <h3 className="text-3xl font-serif font-light mb-4 text-text-primary">Ready to Build Your Next Project?</h3>
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              Let's discuss your idea and create a plan to bring it to life in just 2 weeks
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-accent-text px-8 py-3 rounded font-medium hover:bg-accent/90 transition-colors"
              >
                Schedule Free Consultation
              </Link>
              <Link
                href="/portfolio"
                className="w-full sm:w-auto border border-accent text-accent px-8 py-3 rounded font-medium hover:bg-accent hover:text-accent-text transition-colors text-center"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
