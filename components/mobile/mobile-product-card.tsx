"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";

interface MobileProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
  showQuickActions?: boolean;
}

export default function MobileProductCard({ 
  product, 
  layout = 'grid',
  showQuickActions = true 
}: MobileProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touched, setTouched] = useState(false);
  
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  
  const isWishlisted = isInWishlist(product.$id);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.$id);
    } else {
      addToWishlist(product);
    }
    
    // Haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      productId: product.$id,
      product,
      quantity: 1,
      customizations: {},
      totalPrice: product.salePrice || product.price
    });
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 50, 50]);
    }
  };

  const handleTouch = () => {
    setTouched(true);
    setTimeout(() => setTouched(false), 150);
  };

  if (layout === 'list') {
    return (
      <Link href={`/products/${product.$id}`}>
        <div 
          className={`
            flex space-x-4 p-4 bg-background-secondary rounded-xl border border-neutral-800
            active:scale-[0.98] transition-all duration-150
            ${touched ? 'bg-background-tertiary' : ''}
          `}
          onTouchStart={handleTouch}
        >
          {/* Image */}
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-background-tertiary">
            {product.images && product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-md font-medium">
                -{discountPercentage}%
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary truncate text-sm">
                  {product.title}
                </h3>
                <p className="text-xs text-text-muted truncate mt-0.5">
                  by {product.sellerName}
                </p>
                
                {/* Rating */}
                <div className="flex items-center mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-neutral-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-text-muted ml-1">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-bold text-text-primary text-sm">
                    {formatPrice(product.salePrice || product.price)}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-text-muted line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              {showQuickActions && (
                <div className="flex flex-col space-y-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleWishlistToggle}
                    className="p-1.5 h-auto"
                  >
                    <svg 
                      className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-text-muted'}`} 
                      fill={isWishlisted ? "currentColor" : "none"} 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleQuickAdd}
                    className="p-1.5 h-auto"
                  >
                    <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid layout
  return (
    <Link href={`/products/${product.$id}`}>
      <div 
        className={`
          group relative bg-background-secondary rounded-xl border border-neutral-800 overflow-hidden
          active:scale-[0.97] transition-all duration-150
          ${touched ? 'bg-background-tertiary' : ''}
        `}
        onTouchStart={handleTouch}
      >
        {/* Image Container */}
        <div className="relative aspect-square bg-background-tertiary">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className={`object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Overlay for actions */}
          <div className="absolute inset-0 bg-black/0 group-active:bg-black/10 transition-colors duration-150" />

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium">
              -{discountPercentage}%
            </div>
          )}

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWishlistToggle}
                className="w-8 h-8 p-0 bg-white/90 hover:bg-white text-black rounded-full"
              >
                <svg 
                  className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : ''}`} 
                  fill={isWishlisted ? "currentColor" : "none"} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleQuickAdd}
                className="w-8 h-8 p-0 bg-white/90 hover:bg-white text-black rounded-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-medium text-text-primary text-sm line-clamp-2 mb-1">
            {product.title}
          </h3>
          
          <p className="text-xs text-text-muted truncate mb-2">
            by {product.sellerName}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-neutral-600'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-text-muted ml-1">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="font-bold text-text-primary text-sm">
                {formatPrice(product.salePrice || product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-text-muted line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            {/* Stock indicator */}
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-xs text-orange-400 font-medium">
                Only {product.stock} left
              </span>
            )}
            {product.stock === 0 && (
              <span className="text-xs text-red-400 font-medium">
                Sold out
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 