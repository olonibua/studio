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

/** Checks whether the given email has a successful Paystack payment for the cohort amount. */
export async function checkEmailHasPaid(email: string): Promise<boolean> {
  const res = await fetch(
    `${paystackConfig.baseUrl}/transaction?customer=${encodeURIComponent(email)}&status=success`,
    {
      headers: {
        Authorization: `Bearer ${paystackConfig.secretKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) return false;

  const json: PaystackListResponse = await res.json();
  if (!json.status || !json.data) return false;

  const cohortAmountKobo = COHORT_CONFIG.price.ngn * 100;

  return json.data.some(
    (tx) => tx.status === "success" && tx.amount >= cohortAmountKobo
  );
}
