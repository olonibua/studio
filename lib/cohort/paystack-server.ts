import { paystackConfig } from "@/lib/paystack";
import { COHORT_CONFIG } from "./constants";

interface PaystackTransaction {
  status: string;
  amount: number;
  currency: string;
  customer: { email: string };
}

interface PaystackListResponse {
  status: boolean;
  data: PaystackTransaction[];
}

interface PaystackCustomerResponse {
  status: boolean;
  data: {
    id: number;
    customer_code: string;
    email: string;
  };
}

const headers = {
  Authorization: `Bearer ${paystackConfig.secretKey}`,
  "Content-Type": "application/json",
};

/** Checks whether the given email has a successful Paystack payment for the cohort amount. */
export async function checkEmailHasPaid(email: string): Promise<boolean> {
  // Step 1: Look up customer by email to get their ID
  const customerRes = await fetch(
    `${paystackConfig.baseUrl}/customer/${encodeURIComponent(email)}`,
    { headers }
  );

  if (!customerRes.ok) return false;

  const customerJson: PaystackCustomerResponse = await customerRes.json();
  if (!customerJson.status || !customerJson.data) return false;

  // Step 2: Query transactions using the customer ID
  const txRes = await fetch(
    `${paystackConfig.baseUrl}/transaction?customer=${customerJson.data.id}&status=success`,
    { headers }
  );

  if (!txRes.ok) return false;

  const txJson: PaystackListResponse = await txRes.json();
  if (!txJson.status || !txJson.data) return false;

  const cohortAmountKobo = COHORT_CONFIG.price.ngn * 100;

  return txJson.data.some(
    (tx) => tx.status === "success" && tx.amount >= cohortAmountKobo
  );
}
