import { NextResponse } from "next/server";
import { Resend } from "resend";
import { cohortEmailSchema } from "@/lib/validations";
import { createOTPChallenge } from "@/lib/cohort/auth";
import { checkEmailHasPaid } from "@/lib/cohort/paystack-server";
import { COOKIE_NAMES } from "@/lib/cohort/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = cohortEmailSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase();

    const hasPaid = await checkEmailHasPaid(email);
    if (!hasPaid) {
      return NextResponse.json(
        { error: "No payment found for this email. Please pay first." },
        { status: 403 }
      );
    }

    const { otp, token } = await createOTPChallenge(email);

    await resend.emails.send({
      from: "Ship With AI <noreply@studiomvp.co.uk>",
      to: [email],
      subject: "Your login code for Ship With AI",
      text: `Your verification code is: ${otp}\n\nThis code expires in 10 minutes.`,
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAMES.otpChallenge, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600, // 10 minutes
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("verify-email error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
