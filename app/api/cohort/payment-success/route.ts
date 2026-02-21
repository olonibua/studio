import { NextResponse } from "next/server";
import { Resend } from "resend";
import { paystackConfig } from "@/lib/paystack";
import { COHORT_CONFIG } from "@/lib/cohort/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { reference, email } = await request.json();

    if (!reference || !email) {
      return NextResponse.json(
        { error: "Missing reference or email" },
        { status: 400 }
      );
    }

    // Verify the transaction with Paystack
    const verifyRes = await fetch(
      `${paystackConfig.baseUrl}/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${paystackConfig.secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!verifyRes.ok) {
      return NextResponse.json(
        { error: "Could not verify payment" },
        { status: 400 }
      );
    }

    const verification = await verifyRes.json();

    if (!verification.status || verification.data?.status !== "success") {
      return NextResponse.json(
        { error: "Payment not successful" },
        { status: 400 }
      );
    }

    const tx = verification.data;
    const amountNaira = (tx.amount / 100).toLocaleString();
    const paidAt = new Date(tx.paid_at).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send receipt email
    await resend.emails.send({
      from: "Ship With AI <noreply@studiomvp.co.uk>",
      to: [email.toLowerCase()],
      subject: "Payment Receipt — Ship With AI",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">Payment Confirmed</h1>
          <p style="color: #666; margin-bottom: 32px;">Thank you for enrolling in ${COHORT_CONFIG.name}!</p>

          <div style="background: #f9f9f9; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666;">Item</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${COHORT_CONFIG.name} Cohort</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Amount</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">\u20A6${amountNaira}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Reference</td>
                <td style="padding: 8px 0; text-align: right; font-family: monospace; font-size: 13px;">${tx.reference}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Date</td>
                <td style="padding: 8px 0; text-align: right;">${paidAt}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Status</td>
                <td style="padding: 8px 0; text-align: right; color: #16a34a; font-weight: 600;">Paid</td>
              </tr>
            </table>
          </div>

          <p style="margin-bottom: 8px;">Cohort starts <strong>${COHORT_CONFIG.startDate}</strong>.</p>
          <p style="margin-bottom: 24px;">Use this email to log in to your student dashboard when it opens.</p>

          <p style="color: #999; font-size: 13px; margin-top: 32px;">— ${COHORT_CONFIG.name} Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("payment-success error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
