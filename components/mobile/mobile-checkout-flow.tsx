"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { CartItem } from "@/lib/types";

interface CheckoutStep {
  id: number;
  title: string;
  icon: React.ReactNode;
}

interface MobileCheckoutFlowProps {
  cartItems: CartItem[];
  onComplete: (orderData: any) => void;
  onCancel: () => void;
}

export default function MobileCheckoutFlow({ 
  cartItems, 
  onComplete, 
  onCancel 
}: MobileCheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    shipping: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Nigeria'
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    },
    delivery: {
      option: 'standard',
      instructions: ''
    }
  });

  const steps: CheckoutStep[] = [
    {
      id: 1,
      title: "Shipping",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Payment",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Review",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = subtotal > 50000 ? 0 : 2500; // Free shipping over ₦50,000
  const tax = subtotal * 0.075; // 7.5% VAT
  const total = subtotal + shipping + tax;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ ...orderData, cartItems, total });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  const updateShipping = (field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      shipping: { ...prev.shipping, [field]: value }
    }));
  };

  const updatePayment = (field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      payment: { ...prev.payment, [field]: value }
    }));
  };

  const updateDelivery = (field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      delivery: { ...prev.delivery, [field]: value }
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        const { fullName, email, phone, address, city, state, postalCode } = orderData.shipping;
        return fullName && email && phone && address && city && state && postalCode;
      case 2:
        if (orderData.payment.method === 'card') {
          const { cardNumber, expiryDate, cvv, cardholderName } = orderData.payment;
          return cardNumber && expiryDate && cvv && cardholderName;
        }
        return true;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background-primary/95 backdrop-blur-md border-b border-neutral-800">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="p-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          
          <h1 className="text-lg font-semibold text-text-primary">Checkout</h1>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onCancel}
            className="p-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors
                  ${currentStep >= step.id 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'border-neutral-600 text-neutral-400'
                  }
                `}>
                  {currentStep > step.id ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.icon
                  )}
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-3 transition-colors
                    ${currentStep > step.id ? 'bg-blue-500' : 'bg-neutral-600'}
                  `} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-2">
            <span className="text-sm text-text-muted">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Step 1: Shipping Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Shipping Information</h3>
              
              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={orderData.shipping.fullName}
                  onChange={(e) => updateShipping('fullName', e.target.value)}
                  className="h-12"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={orderData.shipping.email}
                    onChange={(e) => updateShipping('email', e.target.value)}
                    className="h-12"
                  />
                  
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={orderData.shipping.phone}
                    onChange={(e) => updateShipping('phone', e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <Input
                  placeholder="Street Address"
                  value={orderData.shipping.address}
                  onChange={(e) => updateShipping('address', e.target.value)}
                  className="h-12"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="City"
                    value={orderData.shipping.city}
                    onChange={(e) => updateShipping('city', e.target.value)}
                    className="h-12"
                  />
                  
                  <Input
                    placeholder="State"
                    value={orderData.shipping.state}
                    onChange={(e) => updateShipping('state', e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <Input
                  placeholder="Postal Code"
                  value={orderData.shipping.postalCode}
                  onChange={(e) => updateShipping('postalCode', e.target.value)}
                  className="h-12"
                />
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Payment Information */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Method</h3>
              
              {/* Payment Method Selection */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center space-x-3 p-3 border border-neutral-700 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={orderData.payment.method === 'card'}
                    onChange={(e) => updatePayment('method', e.target.value)}
                    className="text-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Credit/Debit Card</span>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border border-neutral-700 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={orderData.payment.method === 'bank_transfer'}
                    onChange={(e) => updatePayment('method', e.target.value)}
                    className="text-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    <span>Bank Transfer</span>
                  </div>
                </label>
              </div>

              {/* Card Details */}
              {orderData.payment.method === 'card' && (
                <div className="space-y-4">
                  <Input
                    placeholder="Cardholder Name"
                    value={orderData.payment.cardholderName}
                    onChange={(e) => updatePayment('cardholderName', e.target.value)}
                    className="h-12"
                  />
                  
                  <Input
                    placeholder="Card Number"
                    value={orderData.payment.cardNumber}
                    onChange={(e) => updatePayment('cardNumber', e.target.value)}
                    className="h-12"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="MM/YY"
                      value={orderData.payment.expiryDate}
                      onChange={(e) => updatePayment('expiryDate', e.target.value)}
                      className="h-12"
                    />
                    
                    <Input
                      placeholder="CVV"
                      value={orderData.payment.cvv}
                      onChange={(e) => updatePayment('cvv', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              )}

              {/* Bank Transfer Info */}
              {orderData.payment.method === 'bank_transfer' && (
                <div className="bg-background-tertiary p-4 rounded-lg">
                  <p className="text-sm text-text-muted mb-2">
                    Transfer to the following account and upload proof of payment:
                  </p>
                  <div className="text-sm space-y-1">
                    <p><strong>Bank:</strong> First Bank of Nigeria</p>
                    <p><strong>Account Name:</strong> MOSÉ Art Marketplace</p>
                    <p><strong>Account Number:</strong> 3012345678</p>
                    <p><strong>Amount:</strong> {formatPrice(total)}</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Step 3: Review Order */}
        {currentStep === 3 && (
          <div className="space-y-4">
            {/* Order Summary */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-background-tertiary rounded-lg flex items-center justify-center">
                      <span className="text-xs font-medium">{item.quantity}x</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-text-muted">
                        {formatPrice(item.totalPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Shipping Details */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Shipping Details</h3>
              <div className="text-sm space-y-1 text-text-muted">
                <p>{orderData.shipping.fullName}</p>
                <p>{orderData.shipping.address}</p>
                <p>{orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.postalCode}</p>
                <p>{orderData.shipping.phone}</p>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Method</h3>
              <p className="text-sm text-text-muted capitalize">
                {orderData.payment.method.replace('_', ' ')}
              </p>
            </Card>
          </div>
        )}

        {/* Order Total - Fixed at bottom */}
        <Card className="p-4 sticky bottom-4 bg-background-secondary/95 backdrop-blur-md">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Subtotal</span>
              <span className="text-text-primary">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Shipping</span>
              <span className="text-text-primary">
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Tax (7.5%)</span>
              <span className="text-text-primary">{formatPrice(tax)}</span>
            </div>
            <div className="border-t border-neutral-700 pt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-text-primary">Total</span>
                <span className="text-text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleNext}
            disabled={!isStepValid()}
            className="w-full h-12 mt-4 text-base font-medium"
          >
            {currentStep === steps.length ? 'Place Order' : 'Continue'}
          </Button>
        </Card>
      </div>
    </div>
  );
} 