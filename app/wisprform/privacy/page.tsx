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
  success: '#10B981',
  accentLight: '#F5F5F0',
};

const privacySections = [
  {
    title: 'Information We Collect',
    content: 'We collect information you provide directly to us:',
    bullets: [
      'Account information (email, name) when you register',
      'Documents you upload for processing',
      'Voice recordings during form filling',
      'Usage data and app interactions',
    ],
  },
  {
    title: 'How We Use Your Data',
    content: 'We use your information to:',
    bullets: [
      'Process and fill your forms using AI',
      'Improve our voice recognition accuracy',
      'Provide customer support',
      'Send important service updates',
    ],
  },
  {
    title: 'Data Security',
    content: 'We implement industry-standard security measures to protect your data. All documents and voice recordings are encrypted in transit and at rest. Your uploaded documents are automatically deleted from our servers within 24 hours of processing.',
  },
  {
    title: 'Data Retention',
    content: 'We retain your account information for as long as your account is active. Uploaded documents are automatically deleted after 24 hours. Voice recordings are processed in real-time and not stored permanently.',
  },
  {
    title: 'Third-Party Services',
    content: 'We use trusted third-party services for payment processing and analytics. These services have their own privacy policies and we encourage you to review them. We never sell your personal data to third parties.',
  },
  {
    title: 'Your Rights',
    content: 'You have the right to:',
    bullets: [
      'Access your personal data',
      'Request correction of inaccurate data',
      'Request deletion of your data',
      'Export your data in a portable format',
      'Opt-out of marketing communications',
    ],
  },
  {
    title: 'Cookies & Tracking',
    content: 'Our mobile app uses minimal tracking for analytics purposes only. We do not use advertising trackers or sell your data to advertisers. You can opt-out of analytics in your account settings.',
  },
  {
    title: "Children's Privacy",
    content: 'WisprForm is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.',
  },
  {
    title: 'Policy Updates',
    content: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes through the app or via email. Your continued use of WisprForm after changes constitutes acceptance of the updated policy.',
  },
  {
    title: 'Contact Us',
    content: 'If you have questions about this Privacy Policy or our data practices, please contact us at support@wisprform.com. We aim to respond to all inquiries within 48 hours.',
  },
];

export default function WisprFormPrivacyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: wisprColors.background }}>
      {/* Header */}
      <header className="py-6 px-4 border-b" style={{ borderColor: wisprColors.border, backgroundColor: wisprColors.cardBackground }}>
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/wisprform/support" className="flex items-center gap-3">
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
            <Link href="/wisprform/support" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: wisprColors.textSecondary }}>
              Support
            </Link>
            <Link href="/wisprform/terms" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: wisprColors.textSecondary }}>
              Terms
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Intro Card */}
          <div className="text-center p-8 rounded-2xl border mb-8" style={{ backgroundColor: wisprColors.cardBackground, borderColor: wisprColors.border }}>
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: wisprColors.accentLight }}>
              <svg className="w-8 h-8" fill="none" stroke={wisprColors.buttonPrimary} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: wisprColors.textPrimary }}>
              Privacy Policy
            </h1>
            <p className="mb-2" style={{ color: wisprColors.textSecondary }}>
              Your privacy matters to us
            </p>
            <p className="text-sm" style={{ color: wisprColors.textMuted }}>
              Last updated: January 2026
            </p>
          </div>

          {/* Quick Summary */}
          <div className="p-6 rounded-2xl mb-8" style={{ backgroundColor: wisprColors.accentLight }}>
            <h2 className="font-semibold mb-4" style={{ color: wisprColors.textPrimary }}>
              Quick Summary
            </h2>
            <div className="space-y-2">
              {[
                'Documents deleted after 24 hours',
                'End-to-end encryption',
                'No data sold to third parties',
                'You control your data',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill={wisprColors.success} viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm" style={{ color: wisprColors.textPrimary }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {privacySections.map((section, index) => (
              <div key={index} className="border-b pb-8" style={{ borderColor: wisprColors.border }}>
                <h2 className="text-xl font-semibold mb-3" style={{ color: wisprColors.textPrimary }}>
                  {section.title}
                </h2>
                <p className="leading-relaxed mb-3" style={{ color: wisprColors.textSecondary }}>
                  {section.content}
                </p>
                {section.bullets && (
                  <ul className="space-y-2 ml-4">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: wisprColors.buttonPrimary }}></span>
                        <span style={{ color: wisprColors.textSecondary }}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-6 rounded-2xl border flex items-start gap-4" style={{ backgroundColor: wisprColors.cardBackground, borderColor: wisprColors.border }}>
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke={wisprColors.textMuted} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-sm leading-relaxed" style={{ color: wisprColors.textMuted }}>
              Your trust is important to us. We are committed to being transparent about our data practices.
            </p>
          </div>
        </div>
      </main>

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
