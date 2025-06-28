"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Mock order data - in real app, this would come from URL params or API
  const orderData = {
    orderNumber: "MOSE-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    total: 156000,
    estimatedDelivery: "3-5 business days",
    email: user?.email || "customer@example.com",
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background-primary text-text-primary">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center py-16">
            <h1 className="text-2xl font-semibold mb-4">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-8 bg-green-500/10 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-serif font-light mb-4">Order Confirmed!</h1>
          <p className="text-xl text-text-muted mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          {/* Order Details Card */}
          <Card className="p-8 mb-8 text-left">
            <h2 className="text-xl font-semibold mb-6 text-center">Order Details</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-text-muted">Order Number:</span>
                <span className="font-medium">{orderData.orderNumber}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-text-muted">Email:</span>
                <span>{orderData.email}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-text-muted">Estimated Delivery:</span>
                <span>{orderData.estimatedDelivery}</span>
              </div>
              
              <div className="flex justify-between py-2 text-lg font-semibold">
                <span>Total Paid:</span>
                <span>₦{orderData.total.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <div className="bg-background-secondary border border-neutral-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium">Order Confirmation</p>
                  <p className="text-text-muted text-sm">You'll receive an email confirmation shortly</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-text-muted text-sm">The seller will prepare your items for shipping</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium">Shipping & Delivery</p>
                  <p className="text-text-muted text-sm">Track your package and receive it within {orderData.estimatedDelivery}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button className="bg-text-primary text-background-primary hover:bg-text-secondary">
                View Order History
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="mt-12 text-center">
            <p className="text-text-muted mb-4">
              Need help with your order?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@mose.com" 
                className="text-text-primary hover:text-text-secondary transition-colors"
              >
                📧 support@mose.com
              </a>
              <a 
                href="tel:+2348000000000" 
                className="text-text-primary hover:text-text-secondary transition-colors"
              >
                📞 +234 800 000 0000
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 