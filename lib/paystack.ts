// Paystack payment integration utilities
export interface PaystackConfig {
  publicKey: string;
  secretKey: string;
  baseUrl: string;
}

export interface PaymentData {
  email: string;
  amount: number; // in kobo (multiply by 100)
  currency: string;
  reference: string;
  callback_url?: string;
  metadata?: {
    orderId: string;
    userId: string;
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>;
  };
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaymentVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: any;
    fees_breakdown: any;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
    };
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string;
      metadata: any;
      risk_action: string;
    };
  };
}

// Environment configuration
export const paystackConfig: PaystackConfig = {
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_example',
  secretKey: process.env.PAYSTACK_SECRET_KEY || 'sk_test_example',
  baseUrl: 'https://api.paystack.co',
};

// Generate unique payment reference
export function generatePaymentReference(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `MOSE_${timestamp}_${random}`.toUpperCase();
}

// Initialize payment
export async function initializePayment(paymentData: PaymentData): Promise<PaystackResponse> {
  try {
    const response = await fetch(`${paystackConfig.baseUrl}/transaction/initialize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackConfig.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw new Error('Failed to initialize payment');
  }
}

// Verify payment
export async function verifyPayment(reference: string): Promise<PaymentVerificationResponse> {
  try {
    const response = await fetch(`${paystackConfig.baseUrl}/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackConfig.secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Payment verification error:', error);
    throw new Error('Failed to verify payment');
  }
}

// Format amount to kobo (Paystack expects amounts in kobo)
export function formatAmountToKobo(amount: number): number {
  return Math.round(amount * 100);
}

// Format amount from kobo to naira
export function formatAmountFromKobo(amount: number): number {
  return amount / 100;
}

// Client-side Paystack popup integration
export function initializePaystackPopup(
  paymentData: Omit<PaymentData, 'callback_url'>,
  onSuccess: (reference: string) => void,
  onClose: () => void
) {
  if (typeof window === 'undefined') {
    throw new Error('Paystack popup can only be initialized on the client side');
  }

  // Load Paystack script if not already loaded
  if (!window.PaystackPop) {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => initPopup();
    document.head.appendChild(script);
  } else {
    initPopup();
  }

  function initPopup() {
    const handler = window.PaystackPop.setup({
      key: paystackConfig.publicKey,
      email: paymentData.email,
      amount: paymentData.amount,
      currency: paymentData.currency,
      ref: paymentData.reference,
      metadata: paymentData.metadata,
      onSuccess: (transaction: any) => {
        onSuccess(transaction.reference);
      },
      onCancel: () => {
        onClose();
      },
    });

    handler.openIframe();
  }
}

// Declare global Paystack types
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: any) => {
        openIframe: () => void;
      };
    };
  }
} 