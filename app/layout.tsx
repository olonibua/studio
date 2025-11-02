import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/contexts/theme-context";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  title: "MVP Development Studio - From Idea to Launch in 2 Weeks",
  description: "Professional MVP development studio helping founders build and validate their ideas with speed, precision, and elegance. Get your product to market in just 2 weeks.",
  keywords: "MVP development, startup development, web app development, mobile app development, SaaS development, rapid prototyping, startup studio",
  authors: [{ name: "MVP Studio Team" }],
  creator: "MVP Development Studio",
  publisher: "MVP Development Studio",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MVP Studio',
  },
  openGraph: {
    title: "MVP Development Studio - From Idea to Launch in 2 Weeks",
    description: "Professional MVP development studio helping founders build and validate their ideas with speed, precision, and elegance.",
    url: "https://www.studiomvp.co.uk/",
    siteName: "MVP Development Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MVP Development Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MVP Development Studio - From Idea to Launch in 2 Weeks",
    description: "Professional MVP development studio helping founders build and validate their ideas with speed, precision, and elegance.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'MVP Studio',
    'application-name': 'MVP Studio',
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.png" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Mobile specific meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="relative min-h-screen bg-background-primary text-text-primary">
            {/* PWA Install Prompt */}
            {/* <div id="pwa-install-prompt" className="hidden" /> */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
