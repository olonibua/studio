"use client";

import Header from "@/components/layout/header";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/social_u9499386881_a_cinematic_outdoor_scene_of_a_startup_founder_wo_383fca36-d486-455c-bbd6-770974221c22_2.mp4" type="video/mp4" />
            {/* Fallback gradient background */}
            <div className="w-full h-full bg-gradient-to-br from-background-tertiary to-background-secondary"></div>
          </video>
          {/* Video overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-light mt-32 xs:mt-10 mb-4 tracking-wide text-white drop-shadow-lg">
            BUILD YOUR MVP
          </h1>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light mb-2 xs:mb-4 text-white/90 drop-shadow">
            In Just 2 Weeks
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed mb-2 xs:mb-6 drop-shadow">
            From idea to launch, we help founders build and validate their MVPs with speed, precision, and elegance
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="bg-white text-black px-10 py-2 xs:py-4 text-lg font-medium rounded hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              START YOUR PROJECT
            </Link>
            <Link
              href="/portfolio"
                className="border-2 border-white text-white px-10 py-2 xs:py-4 text-lg font-medium rounded hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-lg"
            >
              VIEW OUR WORK
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 sm:mt-10 flex flex-wrap justify-center items-center gap-8 text-white/70">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">20+</div>
              <div className="text-sm uppercase tracking-wide">MVPs Launched</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">2 Weeks</div>
              <div className="text-sm uppercase tracking-wide">Average Timeline</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">95%</div>
              <div className="text-sm uppercase tracking-wide">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-text-primary">
              What We Build
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              We specialize in rapid MVP development across multiple industries, 
              helping founders validate their ideas and get to market fast
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
              We combine technical expertise with business acumen to deliver MVPs that not only work but thrive in the market
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
            <h3 className="text-3xl font-serif font-light mb-4 text-text-primary">Ready to Build Your MVP?</h3>
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
