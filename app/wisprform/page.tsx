import Link from "next/link";

// WisprForm Design System Colors
const wisprColors = {
  background: '#F7F6F3',
  cardBackground: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#6B6B6B',
  textMuted: '#9B9B9B',
  buttonPrimary: '#1A1A1A',
  buttonText: '#FFFFFF',
  border: '#E8E8E5',
  accentLight: '#F5F5F0',
};

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    title: 'Upload Any Form',
    description: 'PDF, DOC, or scanned documents - we handle them all',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    title: 'Fill with Voice',
    description: 'Just speak your answers naturally - no typing required',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'AI-Powered',
    description: 'Smart field detection for accurate form filling',
  },
];

export default function WisprFormLandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: wisprColors.background }}>
      {/* Header */}
      <header className="py-6 px-4 border-b" style={{ borderColor: wisprColors.border, backgroundColor: wisprColors.cardBackground }}>
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/wisprform/support" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: wisprColors.textSecondary }}>
              Support
            </Link>
            <Link href="/wisprform/privacy" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: wisprColors.textSecondary }}>
              Privacy
            </Link>
            <Link href="/wisprform/terms" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: wisprColors.textSecondary }}>
              Terms
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Logo */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl flex items-center justify-center" style={{ backgroundColor: wisprColors.cardBackground, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight" style={{ color: wisprColors.textPrimary }}>
            WisprForm
          </h1>
          <p className="text-xl md:text-2xl mb-12" style={{ color: wisprColors.textSecondary }}>
            Fill forms with your voice
          </p>

          {/* App Store Button */}
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: wisprColors.buttonPrimary, color: wisprColors.buttonText }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download on the App Store
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border text-center"
                style={{ backgroundColor: wisprColors.cardBackground, borderColor: wisprColors.border }}
              >
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: wisprColors.accentLight, color: wisprColors.buttonPrimary }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: wisprColors.textPrimary }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: wisprColors.textSecondary }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4" style={{ backgroundColor: wisprColors.cardBackground }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: wisprColors.textPrimary }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Upload', desc: 'Upload any form document' },
              { step: '2', title: 'Speak', desc: 'Answer questions with your voice' },
              { step: '3', title: 'Download', desc: 'Get your completed form instantly' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-xl font-bold"
                  style={{ backgroundColor: wisprColors.buttonPrimary, color: wisprColors.buttonText }}
                >
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: wisprColors.textPrimary }}>
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: wisprColors.textSecondary }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: wisprColors.textPrimary }}>
            Ready to fill forms faster?
          </h2>
          <p className="text-lg mb-8" style={{ color: wisprColors.textSecondary }}>
            Download WisprForm and start filling forms with your voice today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: wisprColors.buttonPrimary, color: wisprColors.buttonText }}
            >
              Download Now
            </a>
            <Link
              href="/wisprform/support"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border transition-all hover:opacity-70"
              style={{ borderColor: wisprColors.border, color: wisprColors.textPrimary }}
            >
              Get Support
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t" style={{ borderColor: wisprColors.border }}>
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: wisprColors.textMuted }}>
              © {new Date().getFullYear()} WisprForm. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/wisprform/support" className="text-sm hover:opacity-70 transition-opacity" style={{ color: wisprColors.textMuted }}>
                Support
              </Link>
              <Link href="/wisprform/privacy" className="text-sm hover:opacity-70 transition-opacity" style={{ color: wisprColors.textMuted }}>
                Privacy
              </Link>
              <Link href="/wisprform/terms" className="text-sm hover:opacity-70 transition-opacity" style={{ color: wisprColors.textMuted }}>
                Terms
              </Link>
            </div>
            <p className="text-sm" style={{ color: wisprColors.textMuted }}>
              Built by <a href="https://studiomvp.co.uk" className="underline hover:opacity-70">Studio MVP</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
