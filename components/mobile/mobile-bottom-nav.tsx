"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useAuthStore } from "@/store/auth-store";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  badge?: number;
  requiresAuth?: boolean;
}

function MobileBottomNavContent() {
  const pathname = usePathname();
  const { items: cartItems } = useCartStore();
  const { getWishlistCount } = useWishlistStore();
  const { user } = useAuthStore();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = getWishlistCount();

  const handleNavClick = () => {
    // Haptic feedback on mobile
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const navItems: NavItem[] = [
    {
      href: "/",
      label: "Home",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      activeIcon: (
        <svg className="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      href: "/products",
      label: "Browse",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      activeIcon: (
        <svg className="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      href: "/buyer?tab=wishlist",
      label: "Wishlist",
      badge: wishlistCount,
      requiresAuth: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      activeIcon: (
        <svg className="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      href: "/cart",
      label: "Cart",
      badge: cartCount,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5" />
        </svg>
      ),
      activeIcon: (
        <svg className="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5" />
        </svg>
      )
    },
    {
      href: user?.role === 'seller' ? '/seller' : '/buyer',
      label: user ? "Dashboard" : "Account",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      activeIcon: (
        <svg className="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background-primary/95 backdrop-blur-md border-t border-neutral-800">
      {/* Safe area padding for devices with home indicator */}
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const showItem = !item.requiresAuth || user;
          
          if (!showItem) return null;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={`
                flex flex-col items-center justify-center px-3 py-2 min-w-0 flex-1 relative
                transition-colors duration-200 rounded-lg
                ${active 
                  ? 'text-blue-500' 
                  : 'text-text-muted hover:text-text-primary'
                }
                active:scale-95 active:bg-background-secondary
              `}
            >
              {/* Icon */}
              <div className="relative">
                {active ? item.activeIcon : item.icon}
                
                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1">
                    {item.badge > 99 ? '99+' : item.badge}
                  </div>
                )}
              </div>
              
              {/* Label */}
              <span className={`
                text-xs mt-1 font-medium truncate max-w-full
                ${active ? 'text-blue-500' : 'text-text-muted'}
              `}>
                {item.label}
              </span>

              {/* Active indicator */}
              {active && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function LoadingNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background-primary/95 backdrop-blur-md border-t border-neutral-800">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        <div className="animate-pulse flex space-x-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center justify-center px-3 py-2">
              <div className="w-6 h-6 bg-background-secondary rounded"></div>
              <div className="w-8 h-2 bg-background-secondary rounded mt-1"></div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function MobileBottomNav() {
  return (
    <Suspense fallback={<LoadingNav />}>
      <MobileBottomNavContent />
    </Suspense>
  );
} 