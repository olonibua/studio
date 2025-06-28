"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import WishlistButton from "@/components/ui/wishlist-button";
import SocialShare from "@/components/social/social-share";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.$id,
      product: product,
      quantity: 1,
      totalPrice: product.salePrice || product.price
    };
    addToCart(cartItem);
  };

  const discountPercentage = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        {/* Product Image */}
        <Link href={`/products/${product.$id}`}>
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-background-tertiary flex items-center justify-center">
              <svg className="w-16 h-16 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </Link>

        {/* Sale Badge */}
        {product.salePrice && product.salePrice < product.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
            -{discountPercentage}%
          </div>
        )}

        {/* Action Buttons - Top Right */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <WishlistButton product={product} />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <SocialShare product={product} />
          </div>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-white text-black hover:bg-gray-100 transition-colors"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product.$id}`}>
          <h3 className="font-medium text-text-primary mb-2 line-clamp-2 hover:text-text-secondary transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-text-muted text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Category */}
        <div className="mt-2">
          <span className="inline-block bg-background-secondary text-text-muted px-2 py-1 rounded-full text-xs">
            {product.category}
          </span>
        </div>
        
        {/* Price and Social Metrics */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-text-primary">
              {formatPrice(product.salePrice || product.price)}
            </span>
            {product.salePrice && product.salePrice < product.price && (
              <span className="text-sm text-text-muted line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          {/* Rating and Social Metrics */}
          <div className="flex items-center space-x-3">
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-sm text-text-muted">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            )}
            
            {/* Likes */}
            {product.likes > 0 && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm text-text-muted">{product.likes}</span>
              </div>
            )}
            
            {/* Shares */}
            {product.shares && product.shares > 0 && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="text-sm text-text-muted">{product.shares}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Seller Info */}
        <div className="mt-3 pt-3 border-t border-neutral-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-text-primary text-background-primary rounded-full flex items-center justify-center text-xs font-medium">
                {product.sellerName?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-text-muted">
                {product.sellerName || 'Unknown Seller'}
              </span>
            </div>
            
            {/* Views */}
            {product.views > 0 && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-xs text-text-muted">{product.views}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
} 