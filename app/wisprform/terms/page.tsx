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

const termsSections = [
  {
    title: 'Acceptance of Terms',
    content: 'By accessing or using WisprForm, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.',
  },
  {
    title: 'Description of Service',
    content: 'WisprForm is a mobile application that allows users to fill forms using voice input. Our AI-powered system detects form fields and transcribes your spoken responses into text.',
  },
  {
    title: 'AI Field Detection Limitations',
    content: 'Our AI-powered field detection technology may not identify all fields in every document. Detection accuracy varies depending on document complexity, format, and quality. Users are responsible for reviewing detected fields and manually adding any fields that were not automatically detected. We provide editing tools to add, modify, or remove fields as needed. Always review your completed form before downloading to ensure all required information has been entered.',
  },
  {
    title: 'User Accounts',
    content: 'You may use WisprForm with or without creating an account. Creating an account allows you to access premium features and sync your data across devices. You are responsible for maintaining the confidentiality of your account credentials.',
  },
  {
    title: 'Acceptable Use',
    content: 'You agree to use WisprForm only for lawful purposes. You may not use our service to process documents containing illegal content, to infringe on intellectual property rights, or to transmit harmful or malicious content.',
  },
  {
    title: 'Privacy & Data',
    content: 'Your privacy is important to us. Documents uploaded to WisprForm are processed securely and automatically deleted after 24 hours. We do not sell your personal information to third parties. Please review our Privacy Policy for more details.',
  },
  {
    title: 'Subscription & Billing',
    content: 'Premium features require a paid subscription. Subscriptions automatically renew unless cancelled. You can cancel your subscription at any time through your account settings. Refunds are handled according to the app store policies.',
  },
  {
    title: 'Intellectual Property',
    content: 'WisprForm and its original content, features, and functionality are owned by WisprForm and are protected by international copyright, trademark, and other intellectual property laws.',
  },
  {
    title: 'Limitation of Liability',
    content: 'WisprForm is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service, including but not limited to errors in form processing or data loss.',
  },
  {
    title: 'Changes to Terms',
    content: 'We reserve the right to modify these terms at any time. We will notify users of significant changes through the app or via email. Continued use of WisprForm after changes constitutes acceptance of the new terms.',
  },
  {
    title: 'Contact Us',
    content: 'If you have any questions about these Terms of Service, please contact us at support@wisprform.com',
  },
];

export default function WisprFormTermsPage() {
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
            <Link href="/wisprform/privacy" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: wisprColors.textSecondary }}>
              Privacy
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: wisprColors.textPrimary }}>
              Terms of Service
            </h1>
            <p className="text-sm" style={{ color: wisprColors.textMuted }}>
              Last updated: January 2026
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {termsSections.map((section, index) => (
              <div key={index} className="p-6 rounded-2xl border" style={{ backgroundColor: wisprColors.cardBackground, borderColor: wisprColors.border }}>
                <div className="flex items-start gap-4">
                  <span
                    className="text-sm font-bold px-2 py-1 rounded"
                    style={{ backgroundColor: wisprColors.accentLight, color: wisprColors.buttonPrimary }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold mb-2" style={{ color: wisprColors.textPrimary }}>
                      {section.title}
                    </h2>
                    <p className="leading-relaxed" style={{ color: wisprColors.textSecondary }}>
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-6 rounded-2xl text-center" style={{ backgroundColor: wisprColors.accentLight }}>
            <p className="text-sm leading-relaxed" style={{ color: wisprColors.textSecondary }}>
              By using WisprForm, you acknowledge that you have read and understood these terms.
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
