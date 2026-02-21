import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/cohort/auth";
import { COOKIE_NAMES } from "@/lib/cohort/constants";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAMES.session)?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const email = await verifySessionToken(token);
    if (!email) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, email });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
