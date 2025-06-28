"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface MobileHeaderProps {
  showSearch?: boolean;
  showBack?: boolean;
  title?: string;
  onBack?: () => void;
}

export default function MobileHeader({ 
  showSearch = true, 
  showBack = false, 
  title,
  onBack 
}: MobileHeaderProps) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  
  const { user, logout } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const { getWishlistCount } = useWishlistStore();

  // PWA Install prompt handling
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    
    const result = await installPrompt.prompt();
    if (result.outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = getWishlistCount();

  return (
    <>
      {/* Main Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-background-primary/95 backdrop-blur-md border-b border-neutral-800">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            {showBack ? (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onBack}
                className="p-2 -ml-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setMenuOpen(true)}
                className="p-2 -ml-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            )}
            
            {title ? (
              <h1 className="text-lg font-semibold text-text-primary truncate">{title}</h1>
            ) : (
              <Link href="/" className="text-xl font-bold text-text-primary">
                MOSÉ
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Search Toggle */}
            {showSearch && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSearchVisible(!searchVisible)}
                className="p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Button>
            )}

            {/* Wishlist */}
            <Link href="/buyer?tab=wishlist">
              <Button variant="ghost" size="sm" className="p-2 relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="p-2 relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {searchVisible && (
          <div className="px-4 pb-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Input 
                placeholder="Search art, artists, categories..." 
                className="pl-10 pr-10 h-10"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSearchVisible(false)}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMenuOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-80 bg-background-primary border-r border-neutral-800 transform transition-transform duration-300">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <div className="flex items-center space-x-3">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 bg-background-tertiary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{user?.name?.[0] || 'G'}</span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-text-primary">{user?.name || 'Guest'}</p>
                  <p className="text-sm text-text-muted">{user?.email || 'Welcome to MOSÉ'}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setMenuOpen(false)}
                className="p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {/* Navigation Links */}
              <div className="space-y-1">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start h-12 text-left">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </Button>
                </Link>

                <Link href="/products" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start h-12 text-left">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Browse Art
                  </Button>
                </Link>

                <Link href="/categories" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start h-12 text-left">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Categories
                  </Button>
                </Link>

                <Link href="/artists" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start h-12 text-left">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Artists
                  </Button>
                </Link>
              </div>

              {user ? (
                <>
                  {/* User Dashboard */}
                  <div className="border-t border-neutral-800 pt-4 mt-4">
                    <Link href={user.role === 'seller' ? '/seller' : '/buyer'} onClick={() => setMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start h-12 text-left">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Dashboard
                      </Button>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-neutral-800 pt-4 mt-4">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start h-12 text-left text-red-400 hover:text-red-300"
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                /* Login/Register */
                <div className="border-t border-neutral-800 pt-4 mt-4 space-y-2">
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full h-12">Sign In</Button>
                  </Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-12">Create Account</Button>
                  </Link>
                </div>
              )}

              {/* PWA Install */}
              {installPrompt && (
                <div className="border-t border-neutral-800 pt-4 mt-4">
                  <Button 
                    onClick={handleInstallApp}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Install App
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 