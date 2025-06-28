"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCartStore();
  const { user } = useAuthStore();

  if (!isOpen) return null;

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background-primary border-l border-neutral-800 z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <h2 className="text-xl font-semibold text-text-primary">
            Shopping Cart ({totalItems})
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-background-secondary rounded-full flex items-center justify-center hover:bg-background-tertiary transition-colors"
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-background-secondary rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">Your cart is empty</h3>
              <p className="text-text-muted mb-6">Add some amazing African art to get started!</p>
              <Button onClick={onClose} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${JSON.stringify(item.customizations)}`} className="bg-background-secondary border border-neutral-800 rounded-lg p-4">
                  <div className="flex space-x-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-background-tertiary rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.images && item.product.images.length > 0 ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/products/${item.productId}`}
                        onClick={onClose}
                        className="font-medium text-text-primary hover:text-text-secondary transition-colors line-clamp-2"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-text-muted mt-1">
                        {item.product.sellerName}
                      </p>
                      
                      {/* Customizations */}
                      {item.customizations && Object.keys(item.customizations).length > 0 && (
                        <div className="mt-2 space-y-1">
                          {Object.entries(item.customizations).map(([key, value]) => (
                            <p key={key} className="text-xs text-text-muted">
                              {key}: {value}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 bg-background-tertiary rounded border border-neutral-700 flex items-center justify-center text-text-primary hover:bg-background-primary transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-6 h-6 bg-background-tertiary rounded border border-neutral-700 flex items-center justify-center text-text-primary hover:bg-background-primary transition-colors"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-text-primary">
                            {formatPrice(item.totalPrice)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-text-muted">
                              {formatPrice((item.product.salePrice || item.product.price))} each
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="mt-3 text-xs text-red-500 hover:text-red-400 transition-colors flex items-center space-x-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-800 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg font-semibold">
              <span className="text-text-primary">Subtotal:</span>
              <span className="text-text-primary">{formatPrice(totalPrice)}</span>
            </div>

            {/* Shipping Note */}
            <p className="text-sm text-text-muted">
              Shipping and taxes calculated at checkout
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              {user ? (
                <>
                  <Link href="/checkout" onClick={onClose}>
                    <Button className="w-full bg-text-primary text-background-primary hover:bg-text-secondary">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={onClose}>
                    <Button className="w-full bg-text-primary text-background-primary hover:bg-text-secondary">
                      Login to Checkout
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </>
              )}
            </div>

            {/* Clear Cart */}
            {items.length > 0 && (
              <button
                onClick={() => {
                  clearCart();
                  onClose();
                }}
                className="w-full text-sm text-red-500 hover:text-red-400 transition-colors py-2"
              >
                Clear Cart
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
} 