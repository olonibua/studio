"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      // Check for standalone mode (iOS)
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        return;
      }
      
      // Check for Android TWA
      if (document.referrer.includes('android-app://')) {
        setIsInstalled(true);
        return;
      }
      
      // Check for iOS Safari standalone
      if ((window.navigator as any).standalone === true) {
        setIsInstalled(true);
        return;
      }
    };

    checkIfInstalled();

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const event = e as BeforeInstallPromptEvent;
      setDeferredPrompt(event);
      
      // Show prompt after a delay if not already installed
      if (!isInstalled) {
        setTimeout(() => {
          setShowPrompt(true);
        }, 10000); // Show after 10 seconds
      }
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      
      // Track installation
      if ('gtag' in window) {
        (window as any).gtag('event', 'pwa_install', {
          method: 'browser_prompt'
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowPrompt(false);
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
      
      // Track user choice
      if ('gtag' in window) {
        (window as any).gtag('event', 'pwa_install_prompt', {
          outcome: outcome
        });
      }
    } catch (error) {
      console.error('Error during app installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    
    // Don't show again for 7 days
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    
    // Track dismissal
    if ('gtag' in window) {
      (window as any).gtag('event', 'pwa_install_prompt', {
        outcome: 'dismissed'
      });
    }
  };

  // Check if user dismissed recently
  useEffect(() => {
    const dismissedTime = localStorage.getItem('pwa-install-dismissed');
    if (dismissedTime) {
      const daysSinceDismissal = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissal < 7) {
        setShowPrompt(false);
      }
    }
  }, []);

  // Don't show if already installed or no prompt available
  if (isInstalled || !deferredPrompt || !showPrompt) {
    return null;
  }

  return (
    <>
      {/* Mobile Banner */}
      <div className="lg:hidden fixed top-16 left-4 right-4 z-50 animate-slide-down">
        <Card className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 border-none text-white shadow-xl">
          <div className="flex items-center space-x-3">
            {/* App Icon */}
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 19L5.82 22L7 14L2 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm">Install MOSÉ App</h3>
              <p className="text-xs text-white/80 mt-0.5">
                Get faster access and offline browsing
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={handleInstallClick}
                size="sm"
                className="bg-white text-blue-600 hover:bg-white/90 h-8 px-3 text-xs font-medium"
              >
                Install
              </Button>
              
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Desktop Modal */}
      <div className="hidden lg:block fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 bg-background-primary">
          <div className="text-center">
            {/* App Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 19L5.82 22L7 14L2 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Install MOSÉ App
            </h2>
            
            <p className="text-text-muted text-sm mb-6">
              Install our app for a better experience with faster loading, 
              offline access, and native app features.
            </p>
            
            {/* Features */}
            <div className="space-y-2 mb-6 text-left">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-text-muted">Faster loading and performance</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-text-muted">Works offline for browsing</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-text-muted">Native app-like experience</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleInstallClick}
                className="flex-1 h-11"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Install App
              </Button>
              
              <Button
                onClick={handleDismiss}
                variant="outline"
                className="flex-1 h-11"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
} 