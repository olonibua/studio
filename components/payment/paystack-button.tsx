"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { 
  generatePaymentReference, 
  formatAmountToKobo, 
  initializePaystackPopup,
  verifyPayment 
} from "@/lib/paystack";
import { formatPrice } from "@/lib/utils";

interface PaystackButtonProps {
  amount: number;
  email: string;
  metadata?: {
    orderId: string;
    userId: string;
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>;
  };
  onSuccess?: (reference: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function PaystackButton({
  amount,
  email,
  metadata,
  onSuccess,
  onError,
  disabled = false,
  children,
  className,
}: PaystackButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { clearCart } = useCartStore();
  const { user } = useAuthStore();

  const handlePayment = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setIsProcessing(true);

    try {
      const reference = generatePaymentReference();
      const paymentData = {
        email,
        amount: formatAmountToKobo(amount),
        currency: 'NGN',
        reference,
        metadata,
      };

      // Initialize Paystack popup
      initializePaystackPopup(
        paymentData,
        async (paymentReference: string) => {
          try {
            // Verify payment on the backend
            const verification = await verifyPayment(paymentReference);
            
            if (verification.status && verification.data.status === 'success') {
              // Payment successful
              clearCart();
              onSuccess?.(paymentReference);
              
              // Redirect to success page with order details
              router.push(`/checkout/success?ref=${paymentReference}`);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            onError?.('Payment verification failed. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },
        () => {
          // Payment cancelled
          setIsProcessing(false);
        }
      );
    } catch (error) {
      console.error('Payment initialization error:', error);
      onError?.('Failed to initialize payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isProcessing}
      className={className}
    >
      {isProcessing ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      ) : (
        children || `Pay ${formatPrice(amount)}`
      )}
    </Button>
  );
} 