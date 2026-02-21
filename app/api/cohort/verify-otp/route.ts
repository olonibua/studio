import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cohortOTPSchema } from "@/lib/validations";
import { verifyOTPChallenge, createSessionToken } from "@/lib/cohort/auth";
import { COOKIE_NAMES } from "@/lib/cohort/constants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = cohortOTPSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const challengeToken = cookieStore.get(COOKIE_NAMES.otpChallenge)?.value;
    if (!challengeToken) {
      return NextResponse.json(
        { error: "OTP expired. Please request a new code." },
        { status: 400 }
      );
    }

    const email = await verifyOTPChallenge(challengeToken, parsed.data.otp);
    if (!email) {
      return NextResponse.json(
        { error: "Invalid code. Please try again." },
        { status: 400 }
      );
    }

    const sessionToken = await createSessionToken(email);

    const response = NextResponse.json({ success: true });

    // Set session cookie
    response.cookies.set(COOKIE_NAMES.session, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    // Clear OTP challenge cookie
    response.cookies.delete(COOKIE_NAMES.otpChallenge);

    return response;
  } catch (error) {
    console.error("verify-otp error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
